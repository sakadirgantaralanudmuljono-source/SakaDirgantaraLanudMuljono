# FIX GAS_HTML_RESPONSE — v3.8.1

Jika UI menampilkan `GAS_HTML_RESPONSE`, Vercel menerima halaman HTML dari URL Apps Script, bukan JSON API.

## Deployment Apps Script yang wajib
1. Ganti source Apps Script dengan `GAS_BACKEND/Kode_Vercel_API.gs` versi ini.
2. Save project.
3. Jalankan `setupVercelGateway_()` satu kali dan catat `GAS_API_SECRET`.
4. Deploy → Manage deployments → Edit.
5. Pilih **New version**.
6. Type harus **Web app**.
7. Execute as: **Me / User deploying**.
8. Who has access: **Anyone** yang tidak meminta login (manifest: `ANYONE_ANONYMOUS`).
9. Deploy dan salin URL yang berakhir `/exec`. Jangan gunakan `/dev`.
10. Di Vercel, set `GAS_API_URL` ke URL `/exec` dan `GAS_API_SECRET` ke secret dari langkah 3.
11. Redeploy Vercel setelah environment variable diubah.

## Tes
Buka `<domain-vercel>/api/health`. Respons yang benar adalah JSON dengan `success: true`, `gateway: "ok"`, serta `appsScript.status: "ok"`.

Jika akun Google Workspace tidak menyediakan opsi akses tanpa login, kebijakan domain kemungkinan memblokir deployment anonim. Dalam kondisi itu deployment ini tidak dapat dipakai sebagai backend anonim dari Vercel sampai administrator Workspace mengizinkannya atau backend dipindahkan ke layanan server lain.
