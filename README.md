# SAKA Dirgantara Frontend V4

Frontend terpisah untuk deployment Vercel. Stack: React + Vite.

## Menjalankan lokal
1. `npm install`
2. salin `.env.example` menjadi `.env`
3. `npm run dev`

Secara default `.env.example` menggunakan `VITE_USE_MOCK=true` agar UI dapat diuji sebelum REST API Google Apps Script selesai.

## Produksi
- set `VITE_USE_MOCK=false`
- isi `VITE_API_URL` dengan endpoint backend
- `npm run build`

## Prinsip arsitektur
- `pages/`: halaman per modul
- `components/`: UI reusable
- `services/`: satu-satunya lapisan komunikasi API
- `hooks/`: browser capability seperti GPS
- `context/`: state global autentikasi
- `routes/`: routing dan proteksi halaman
- `utils/`: konstanta/helper tanpa UI

Validasi keamanan (role, session, radius, duplikasi absensi) wajib tetap dilakukan backend.
