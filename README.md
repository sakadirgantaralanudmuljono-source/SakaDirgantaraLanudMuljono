# SAKA Dirgantara — Frontend Vercel

Frontend React/Vite dengan proxy `api/gas.js`. Backend pasangan tersedia di folder `../GAS/`.

Panduan pemasangan, daftar perbaikan, hasil pengujian, dan batas verifikasi terbaru tersedia di `../PETUNJUK_PEMASANGAN.md`.

Gunakan Node.js 24. Jalankan `npm ci`, `npm test`, dan `npm run build` dari folder ini. Root Directory deployment Vercel adalah `VERCEL/`; output build `dist`.

Konfigurasi: `GAS_API_URL`, `GAS_PROXY_SECRET`, `VITE_API_PATH=/api/gas`, dan `VITE_USE_MOCK=false`. Contoh ada di `.env.example`. Secret backend tidak boleh menggunakan prefix `VITE_`.

File `docs/` lainnya menyimpan analisis dan riwayat paket sebelumnya. Backend dan frontend versi perbaikan harus dipasang bersama.
