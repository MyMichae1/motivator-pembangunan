# Situs Yayasan MPM

## Menjalankan secara lokal

Gunakan Node.js 22.13 atau lebih baru, lalu jalankan dari folder proyek:

```sh
npm start
```

Buka `http://localhost:3000`. Server Node.js ini menyajikan situs dan API rating/komentar. Data rating dan komentar disimpan secara persisten di `data/blog.sqlite`; metadata artikel dan tag dikelola di `assets/js/blog-data.js`.

Untuk menampilkan rating dan komentar kepada pengunjung lain, deploy server Node.js beserta database SQLite pada host yang sama. Jangan membuka halaman artikel melalui Live Server atau `file://`, karena permintaan API harus menuju server ini.
