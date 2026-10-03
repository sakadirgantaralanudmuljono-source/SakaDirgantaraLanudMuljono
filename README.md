# SAKA Dirgantara — Frontend Vercel

Paket ini adalah React + Vite, dengan proxy `api/gas.js`. Backend tersedia terpisah di `source.zip`.
**Gateway backend yang diperiksa belum melayani semua action frontend. Perapian ini tidak menyelesaikan integrasi tersebut.**

## Panduan dokumen
- [Analisis integrasi](docs/ANALISIS-INTEGRASI.md)
- [Matriks action](docs/MATRIKS-ACTION.md)
- [Hasil verifikasi](docs/VERIFIKASI.md)
- [Riwayat perubahan lama](docs/RIWAYAT-PERUBAHAN.md)

## Struktur
| Lokasi | Tanggung jawab |
|---|---|
| api/ | Handler proxy GAS dan health Vercel |
| src/pages/ | Halaman auth, admin/pengurus, anggota |
| src/components/ | Komponen umum dan layout |
| src/context/, src/routes/ | Sesi dan navigasi |
| src/services/ | Kontrak permintaan backend |
| src/hooks/, src/utils/, src/styles/ | Hook, konstanta, tampilan |
| docs/ | Analisis, hasil pemeriksaan, histori |

## Build dan konfigurasi
Versi engine yang ditentukan paket: Node.js 24.x. Jalankan `npm ci` lalu `npm run build`.
Root Directory proyek Vercel tetap `.`; output `dist`; konfigurasi tersedia di vercel.json.
Gunakan `.env.example` sebagai contoh. `GAS_API_URL` harus URL Web App Apps Script `/exec`; `GAS_PROXY_SECRET` sama dengan Script Property `VERCEL_PROXY_SECRET`. `VITE_API_PATH=/api/gas`, `VITE_USE_MOCK=false`. Secret tidak memakai prefix VITE_.

`npm run dev` hanya menjalankan Vite; API memerlukan runtime Vercel. Backend Apps Script harus memuat Kode.gs dan ApiGateway.gs dalam proyek yang sama. Pertahankan tiga HTML jika doGet masih melayani UI GAS. Gunakan deployment backend pengujian ketika memverifikasi integrasi.

Baca docs/VERIFIKASI.md untuk hasil pemeriksaan paket ini; health Vercel saja tidak membuktikan koneksi GAS berhasil.
