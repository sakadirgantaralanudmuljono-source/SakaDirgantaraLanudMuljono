# Tahap 3 — Integrasi API

Arsitektur:
React browser -> `/api/gas` (Vercel Function) -> Apps Script `doPost()` -> business logic V3.2 -> Google Sheets.

## Yang sudah dibuat
- `src/services/api.js`: satu pintu request frontend.
- `src/services/auth.service.js`: login/session/logout.
- `src/services/attendance.service.js`: absensi anggota + payload GPS.
- `src/services/module.service.js`: adapter modul admin/anggota.
- `api/gas.js`: proxy server-side Vercel.
- `source/ApiGateway.gs`: gateway yang ditambahkan ke project Apps Script.

## Konfigurasi
1. Tambahkan `ApiGateway.gs` ke project Apps Script yang sama dengan `Kode.gs`.
2. Script Properties: `VERCEL_PROXY_SECRET=<secret panjang>`.
3. Deploy Apps Script sebagai Web App dan salin URL `/exec`.
4. Di Vercel Environment Variables:
   - `GAS_API_URL=<URL /exec>`
   - `GAS_PROXY_SECRET=<secret yang sama>`
5. Frontend cukup menggunakan `VITE_API_PATH=/api/gas`.

## Catatan mapping
`ApiGateway.gs` sengaja menjadi adapter. Bila nama fungsi V3.2 berbeda, ubah mapping di `dispatchApiAction_()` saja. Jangan memindahkan validasi role/radius ke React.

## Keamanan
- URL Apps Script dan proxy secret tidak berada di bundle browser.
- Identitas anggota harus tetap berasal dari session backend.
- Koordinat browser hanya input; backend tetap menentukan valid/tidaknya radius.
