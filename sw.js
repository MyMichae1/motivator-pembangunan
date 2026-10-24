const CACHE_VERSION = 'mpm-pwa-v3';
const CORE_CACHE = `${CACHE_VERSION}-core`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;

const CORE_URLS = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './assets/css/style.css',
  './assets/js/main.js',
  './assets/js/header.js',
  './assets/js/footer.js',
  './components/header.html',
  './components/footer.html',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/images/logo mpm.webp'
];

const PAGE_URLS = [
  './pages/blog.html',
  './pages/donasi.html',
  './pages/fasilitas.html',
  './pages/kegiatan.html',
  './pages/kontak.html',
  './pages/newsletter.html',
  './pages/produk.html',
  './pages/program.html',
  './pages/publikasi.html',
  './pages/search.html',
  './pages/tentang.html',
  './pages/blog/belajar-bersama-petani-peneliti.html',
  './pages/blog/green-ambassador.html',
  './pages/blog/menanam-pengetahuan-harapan-strategi-perubahan-iklim-lembang-ullin.html',
  './pages/blog/pelatihan-kompos-kakondongan-mahasiswa-uki-toraja.html',
  './pages/blog/penyerahan-550-bibit-pohon-camp-paskah-ppgt-nonongan-salu.html',
  './pages/blog/perkuat-ketangguhan-desa-mpm-latih-tim-siaga-bencana-mamuju.html',
  './pages/blog/rapat-koordinasi-dlh-ympm-proklim-2026.html',
  './pages/blog/siaga-bencana.html',
  './pages/kegiatan/dialog-damai.html',
  './pages/kegiatan/monitoring-pertanian.html',
  './pages/kegiatan/panen-raya.html',
  './pages/kegiatan/pelatihan-diversifikasi.html',
  './pages/kegiatan/sekolah-lapangan.html',
  './pages/kegiatan/tanam-pohon-rycam.html',
  './pages/program/ems.html',
  './pages/program/light-house-project.html',
  './pages/program/peacebuilding.html',
  './pages/program/rycam.html'
];

const LOCAL_ASSETS = [
  './assets/js/blog-data.js',
  './assets/js/contact.js',
  './assets/js/donation.js',
  './assets/js/fasilitas.js',
  './assets/js/field-stories.js',
  './assets/js/home-carousels.js',
  './assets/js/produk.js',
  './assets/js/publications.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CORE_CACHE).then(cache => cache.addAll(CORE_URLS)),
      caches.open(ASSET_CACHE).then(cache => cache.addAll(PAGE_URLS.concat(LOCAL_ASSETS)))
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => !key.startsWith(CACHE_VERSION)).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => new Response(
        JSON.stringify({ error: 'Fitur ini membutuhkan koneksi internet.' }),
        { status: 503, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      ))
    );
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          if (!url.search) caches.open(ASSET_CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(async () => {
        const cached = await caches.match(request);
        return cached || caches.match('./offline.html');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(ASSET_CACHE).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
