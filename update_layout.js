const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname);
const pagesDir = path.join(baseDir, 'pages');

const indexPath = path.join(baseDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf-8');

const searchRegex = /<div id="searchOverlay".*?<\/div>\s*<\/div>/s;
const headerRegex = /<header class="site-header.*?<\/header>/s;
const mobileRegex = /<div id="mobileMenu".*?<\/nav>\s*<\/div>/s;
const footerRegex = /<footer class="bg-dark.*?<\/footer>/s;

const searchOverlayCode = indexHtml.match(searchRegex)[0];
const headerCode = indexHtml.match(headerRegex)[0];
const mobileCode = indexHtml.match(mobileRegex)[0];
const footerCode = indexHtml.match(footerRegex)[0];

function adjustPathsForSubdir(htmlChunk, depth) {
    let result = htmlChunk;
    const dots = '../'.repeat(depth);
    result = result.replace(/href="pages\/([^"]+)"/g, `href="${dots}$1"`);
    result = result.replace(/href="index\.html"/g, `href="${dots}index.html"`);
    result = result.replace(/src="assets\//g, `src="${dots}assets/`);
    return result;
}

function processDir(dir, depth) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDir(filePath, depth + 1);
    } else if (file.endsWith('.html') && file !== 'produk.html' && file !== 'fasilitas.html') {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      const pSearch = adjustPathsForSubdir(searchOverlayCode, depth);
      const pHeader = adjustPathsForSubdir(headerCode, depth);
      const pMobile = adjustPathsForSubdir(mobileCode, depth);
      const pFooter = adjustPathsForSubdir(footerCode, depth);
      
      // We will replace header, footer, searchOverlay, mobileMenu in the file.
      content = content.replace(/<div id="searchOverlay".*?<\/div>\s*<\/div>/s, pSearch);
      content = content.replace(/<header class="site-header.*?<\/header>/s, pHeader);
      content = content.replace(/<div id="mobileMenu".*?<\/nav>\s*<\/div>/s, pMobile);
      content = content.replace(/<footer class="bg-dark.*?<\/footer>/s, pFooter);
      
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated layout for \${filePath}`);
    }
  });
}

processDir(pagesDir, 1);
console.log("All pages updated.");
