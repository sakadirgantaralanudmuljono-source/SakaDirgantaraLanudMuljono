# Deploy Vercel — v4.3

## 1. Backend Apps Script
- Tambahkan `source/ApiGateway.gs` ke project Apps Script V3.2.
- Set Script Property `VERCEL_PROXY_SECRET` dengan secret acak panjang.
- Cocokkan nama fungsi pada `dispatchApiAction_()` dengan fungsi aktual di `Kode.gs`.
- Deploy sebagai Web App dan gunakan URL `/exec`.

## 2. Vercel
Import folder `frontend/` sebagai project.
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 20+

Environment Variables:
- `GAS_API_URL` = URL Apps Script `/exec`
- `GAS_PROXY_SECRET` = sama dengan Script Property backend
- `VITE_API_PATH` = `/api/gas`
- `VITE_USE_MOCK` = `false`

Jangan menggunakan prefix `VITE_` untuk secret.

## 3. Smoke test
1. `/api/health` harus mengembalikan `ok: true`.
2. Login akun Admin.
3. Refresh browser: session harus divalidasi ulang oleh backend.
4. Login akun Anggota.
5. Pastikan `/anggota`, `/kas`, `/users`, dll. tidak dapat dibuka anggota.
6. Buka Absensi dengan GPS mati: request harus gagal.
7. GPS aktif tetapi di luar radius: backend harus menolak.
8. GPS di dalam radius: absensi berhasil.
9. Klik absen dua kali: tidak boleh membuat dua record.
10. Logout, lalu refresh: halaman protected harus kembali ke login.

## Catatan
Route guard React hanya perlindungan UI. Backend tetap WAJIB memeriksa role/permission untuk setiap action.
