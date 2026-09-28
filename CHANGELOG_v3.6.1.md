# SAKA Dirgantara v3.6.1 — Backend Gateway Diagnostics

## Perbaikan

- Memperjelas error `Backend Apps Script mengembalikan respons non-JSON`.
- Validasi `GAS_API_URL` harus URL Web App production `script.google.com/.../exec`.
- Menolak Test deployment `/dev` dengan pesan spesifik.
- Mendeteksi halaman login Google, akses ditolak, deployment tidak ditemukan, dan deployment Apps Script lama.
- Menambahkan timeout gateway 55 detik dan kode diagnostik yang tampil di frontend.
- Menangani UTF-8 BOM sebelum parsing JSON.

## Diagnostik baru

- `GET /api/health` pada Vercel untuk memeriksa konfigurasi dan akses Apps Script tanpa mengekspos secret.
- `GET <GAS_API_URL>?health=1` pada Apps Script mengembalikan status teknis non-sensitif serta versi backend.

## Deployment

Setelah mengganti source Apps Script, wajib memperbarui deployment melalui **Deploy → Manage deployments → Edit → New version → Deploy**. Gunakan Web App URL `/exec`, Execute as pemilik/deployer, dan akses yang dapat dipanggil tanpa login Google.
