import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.join(projectRoot, 'data');
const databasePath = process.env.BLOG_DB_PATH || path.join(dataDirectory, 'blog.sqlite');
const port = Number(process.env.PORT || 3000);
const knownSlugs = new Set([
  'perkuat-ketangguhan-desa-mpm-latih-tim-siaga-bencana-mamuju',
  'rapat-koordinasi-dlh-ympm-proklim-2026',
  'pelatihan-kompos-kakondongan-mahasiswa-uki-toraja',
  'penyerahan-550-bibit-pohon-camp-paskah-ppgt-nonongan-salu',
  'menanam-pengetahuan-harapan-strategi-perubahan-iklim-lembang-ullin',
  'belajar-bersama-petani-peneliti',
  'green-ambassador',
  'siaga-bencana',
  'newsletter-maret-2026',
  'newsletter-april-2026',
  'newsletter-mei-2026',
  'newsletter-juni-2026',
  'newsletter-juli-2026',
  'newsletter-agustus-2026',
  'newsletter-september-2026'
]);
const commentRateLimits = new Map();
const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.pdf', 'application/pdf'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp']
]);

await mkdir(dataDirectory, { recursive: true });
const database = new DatabaseSync(databasePath);
database.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS blog_ratings (
    slug TEXT NOT NULL,
    voter_id TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 5),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (slug, voter_id)
  );
  CREATE TABLE IF NOT EXISTS blog_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,
    author TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS blog_comments_slug_created
    ON blog_comments (slug, created_at DESC);
`);

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(JSON.stringify(data));
}

function readJson(request, maximumBytes = 16 * 1024) {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    request.setEncoding('utf8');
    request.on('data', chunk => {
      size += Buffer.byteLength(chunk);
      if (size > maximumBytes) {
        const error = new Error('Ukuran permintaan terlalu besar.');
        error.statusCode = 413;
        reject(error);
        request.resume();
        return;
      }
      body += chunk;
    });
    request.on('end', () => {
      if (size > maximumBytes) return;
      try {
        resolve(JSON.parse(body));
      } catch {
        const error = new Error('Format JSON tidak valid.');
        error.statusCode = 400;
        reject(error);
      }
    });
    request.on('error', reject);
  });
}

function getComments(slug) {
  return database.prepare(`
    SELECT author, body, created_at AS createdAt
    FROM blog_comments
    WHERE slug = ?
    ORDER BY id DESC
    LIMIT 100
  `).all(slug).map(comment => ({
    ...comment,
    createdAt: `${comment.createdAt.replace(' ', 'T')}Z`
  }));
}

function getRating(slug, voterId) {
  const totals = database.prepare(`
    SELECT COUNT(*) AS count, COALESCE(AVG(score), 0) AS average
    FROM blog_ratings
    WHERE slug = ?
  `).get(slug);
  const distribution = Object.fromEntries([1, 2, 3, 4, 5].map(score => [score, 0]));
  database.prepare(`
    SELECT score, COUNT(*) AS count
    FROM blog_ratings
    WHERE slug = ?
    GROUP BY score
  `).all(slug).forEach(row => {
    distribution[row.score] = row.count;
  });
  const ownRating = voterId
    ? database.prepare('SELECT score FROM blog_ratings WHERE slug = ? AND voter_id = ?').get(slug, voterId)
    : null;
  return {
    rating: {
      count: totals.count,
      average: Number(totals.average),
      distribution
    },
    myRating: ownRating?.score || null
  };
}

async function handleApi(request, response, url) {
  const match = url.pathname.match(/^\/api\/blogs\/([a-z0-9-]+)\/(engagement|ratings|comments)$/);
  if (!match || !knownSlugs.has(match[1])) {
    sendJson(response, 404, { error: 'Artikel tidak ditemukan.' });
    return;
  }

  const [, slug, resource] = match;
  if (request.method === 'GET' && resource === 'engagement') {
    const voterId = request.headers['x-voter-id'];
    const voteData = typeof voterId === 'string' && /^[a-f0-9-]{36}$/i.test(voterId)
      ? getRating(slug, voterId)
      : getRating(slug, null);
    sendJson(response, 200, {
      ...voteData,
      comments: getComments(slug)
    });
    return;
  }

  if (request.method === 'POST' && resource === 'ratings') {
    const voterId = request.headers['x-voter-id'];
    if (typeof voterId !== 'string' || !/^[a-f0-9-]{36}$/i.test(voterId)) {
      sendJson(response, 400, { error: 'Identitas pemilih tidak valid.' });
      return;
    }
    const payload = await readJson(request);
    if (!payload || typeof payload !== 'object' || !Number.isInteger(payload.score) || payload.score < 1 || payload.score > 5) {
      sendJson(response, 400, { error: 'Rating harus berupa angka 1 sampai 5.' });
      return;
    }
    database.prepare(`
      INSERT INTO blog_ratings (slug, voter_id, score)
      VALUES (?, ?, ?)
      ON CONFLICT (slug, voter_id)
      DO UPDATE SET score = excluded.score, created_at = CURRENT_TIMESTAMP
    `).run(slug, voterId, payload.score);
    sendJson(response, 200, getRating(slug, voterId));
    return;
  }

  if (request.method === 'POST' && resource === 'comments') {
    const address = request.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const recent = (commentRateLimits.get(address) || []).filter(timestamp => now - timestamp < 60_000);
    if (recent.length >= 5) {
      sendJson(response, 429, { error: 'Batas komentar tercapai. Coba lagi dalam satu menit.' });
      return;
    }

    const payload = await readJson(request);
    const author = payload && typeof payload.author === 'string' ? payload.author.trim() : '';
    const body = payload && typeof payload.body === 'string' ? payload.body.trim() : '';
    if (author.length < 1 || author.length > 80) {
      sendJson(response, 400, { error: 'Nama harus berisi 1 sampai 80 karakter.' });
      return;
    }
    if (body.length < 1 || body.length > 2000) {
      sendJson(response, 400, { error: 'Komentar harus berisi 1 sampai 2000 karakter.' });
      return;
    }

    commentRateLimits.set(address, [...recent, now]);
    database.prepare('INSERT INTO blog_comments (slug, author, body) VALUES (?, ?, ?)').run(slug, author, body);
    sendJson(response, 201, { comments: getComments(slug) });
    return;
  }

  sendJson(response, 405, { error: 'Metode tidak didukung.' });
}

async function serveStatic(request, response, url) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    sendJson(response, 405, { error: 'Metode tidak didukung.' });
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    sendJson(response, 400, { error: 'Alamat halaman tidak valid.' });
    return;
  }
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.resolve(projectRoot, `.${pathname}`);
  const relativePath = path.relative(projectRoot, filePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath) || relativePath.split(path.sep)[0] === 'data' || relativePath.split(path.sep)[0] === 'node_modules') {
    sendJson(response, 403, { error: 'Akses ditolak.' });
    return;
  }

  try {
    const fileInfo = await stat(filePath);
    if (!fileInfo.isFile()) {
      sendJson(response, 404, { error: 'File tidak ditemukan.' });
      return;
    }
    response.writeHead(200, {
      'Content-Type': mimeTypes.get(path.extname(filePath).toLowerCase()) || 'application/octet-stream',
      'Content-Length': fileInfo.size,
      'X-Content-Type-Options': 'nosniff'
    });
    if (request.method === 'HEAD') response.end();
    else createReadStream(filePath).pipe(response);
  } catch (error) {
    if (error.code === 'ENOENT') sendJson(response, 404, { error: 'File tidak ditemukan.' });
    else throw error;
  }
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
    if (url.pathname.startsWith('/api/')) await handleApi(request, response, url);
    else await serveStatic(request, response, url);
  } catch (error) {
    console.error('Request failed:', error);
    if (!response.headersSent) sendJson(response, error.statusCode || 500, { error: error.statusCode ? error.message : 'Terjadi kesalahan server.' });
    else response.destroy(error);
  }
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} sedang digunakan. Periksa proses yang memakai port tersebut atau tentukan PORT lain.`);
    process.exitCode = 1;
    return;
  }

  console.error('Server gagal dijalankan:', error);
  process.exitCode = 1;
});

server.listen(port, () => {
  console.log(`MPM blog server listening at http://localhost:${port}`);
  console.log(`SQLite database: ${databasePath}`);
});

function closeServer() {
  server.close(() => {
    database.close();
    process.exit(0);
  });
}

process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
