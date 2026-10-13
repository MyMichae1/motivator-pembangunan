<#
optimize-images.ps1
Batch image optimizer for the MPM website.

Usage examples (run in PowerShell from repository root):
  # Dry run to see which files would be processed
  .\optimize-images.ps1 -DryRun

  # Actual run, create optimized webp files in assets/images-optimized
  .\optimize-images.ps1 -Quality 78 -MaxWidth 1400

Notes:
- This script requires one of the following tools in PATH: cwebp (from libwebp) or magick (ImageMagick).
  Install on Windows (recommended):
    - Chocolatey: choco install imagemagick --confirm
    - Or: download WebP binaries and add to PATH (https://developers.google.com/speed/webp)
- The script never overwrites original files. Optimized files are written to the output directory (default: assets/images-optimized) preserving subfolders.
- Default behavior: convert JPG/PNG to WebP at the requested quality and resize images wider than MaxWidth.
- If you prefer AVIF, install avifenc and modify the script accordingly.

Parameters:
  -DryRun    : do everything but do not write output files
  -Quality   : webp quality (0-100) default 80
  -OutDir    : output directory for optimized images (default: assets/images-optimized)
  -MaxWidth  : maximum width in px; larger images will be resized proportionally (default: 1600)
#>
[CmdletBinding()]
param(
  [switch] $DryRun,
  [int] $Quality = 80,
  [string] $OutDir = "assets/images-optimized",
  [int] $MaxWidth = 1600
)

$projectRoot = (Get-Location).Path
Write-Output "Project root: $projectRoot"

# Find available encoder
$hasCwebp = (Get-Command cwebp -ErrorAction SilentlyContinue) -ne $null
$hasMagick = (Get-Command magick -ErrorAction SilentlyContinue) -ne $null

if (-not($hasCwebp) -and -not($hasMagick)) {
  Write-Warning "Neither 'cwebp' nor 'magick' found in PATH. Install one of them and re-run this script. See script header for installation tips."
}
else {
  Write-Output "Using encoder: $([bool]$hasCwebp ? 'cwebp' : 'magick')"
}

# File types to process
$includes = @('*.png','*.jpg','*.jpeg','*.gif','*.webp')
$files = Get-ChildItem -Path . -Recurse -File -Include $includes | Where-Object { $_.FullName -notmatch '\.git\\' -and $_.FullName -notmatch '\/node_modules\/' }

if ($files.Count -eq 0) {
  Write-Output "No image files found."
  return
}

# Prepare outdir
if (-not $DryRun) {
  if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }
}

$summary = [System.Collections.Generic.List[psobject]]::new()

foreach ($f in $files) {
  $relative = $f.FullName.Substring($projectRoot.Length).TrimStart('\','/')
  $targetDir = Join-Path $OutDir ([IO.Path]::GetDirectoryName($relative))
  if (-not $DryRun) { New-Item -ItemType Directory -Path $targetDir -Force | Out-Null }

  $baseName = [IO.Path]::GetFileNameWithoutExtension($f.Name)
  $outPath = Join-Path $targetDir ($baseName + '.webp')

  # Skip if already webp and small
  if ($f.Extension -ieq '.webp' -and $f.Length -lt 150KB) {
    $summary.Add([pscustomobject]@{ File = $relative; Action = 'skip (already webp & small)'; OriginalKB = [math]::Round($f.Length/1024,1); OutKB = [math]::Round($f.Length/1024,1) })
    continue
  }

  $tempInput = $f.FullName
  $needsResize = $false

  try {
    # Check image width if possible (use magick identify if available)
    if ($hasMagick) {
      $identify = & magick identify -format "%w %h" -quiet -- "$($f.FullName)" 2>$null
      if ($identify) {
        $parts = $identify -split '\s+'
        if ($parts.Length -ge 1) { $width = [int]$parts[0]; if ($width -gt $MaxWidth) { $needsResize = $true } }
      }
    }

    if ($needsResize -and $hasMagick) {
      # Create a resized temporary file
      $tempResized = Join-Path $env:TEMP ([IO.Path]::GetRandomFileName() + $f.Extension)
      & magick convert "$($f.FullName)" -resize ${MaxWidth}x "$tempResized"
      $tempInput = $tempResized
    }

    if ($hasCwebp) {
      $cmd = "cwebp -q $Quality `"$tempInput`" -o `"$outPath`""
      if ($DryRun) {
        Write-Output "[DRY] $cmd"
      } else {
        & cwebp -q $Quality "$tempInput" -o "$outPath" | Out-Null
      }
    } elseif ($hasMagick) {
      if ($DryRun) {
        Write-Output "[DRY] magick convert \"$tempInput\" -quality $Quality -strip -define webp:method=6 \"$outPath\""
      } else {
        & magick convert "$tempInput" -quality $Quality -strip -define webp:method=6 "$outPath"
      }
    }

    if (-not $DryRun) {
      $origKB = [math]::Round($f.Length/1024,1)
      $outSize = (Get-Item $outPath).Length
      $outKB = [math]::Round($outSize/1024,1)
      $summary.Add([pscustomobject]@{ File = $relative; Action = 'converted'; OriginalKB = $origKB; OutKB = $outKB })
    }

  } finally {
    if ($tempInput -and $tempInput -ne $f.FullName -and (Test-Path $tempInput)) { Remove-Item $tempInput -Force -ErrorAction SilentlyContinue }
  }
}

# Print summary
Write-Output "`n=== Summary ==="
$summary | Sort-Object OriginalKB -Descending | Format-Table -AutoSize

Write-Output "\nOptimized images written to: $OutDir (or review dry run output)."
Write-Output "Tip: Review the optimized files and then replace originals or update HTML to use optimized paths."
