# SAKA Dirgantara — Vercel Frontend + GAS Backend

Paket ini sudah dikonversi dari Google Apps Script HTML Service ke frontend statis Vercel dengan gateway `/api/rpc`. Backend Google Sheets/Drive tetap menggunakan Apps Script.

## Struktur

```text
index.html
styles.css
app.js
api/rpc.js
package.json
vercel.json
GAS_BACKEND/Kode_Vercel_API.gs   # jangan dideploy sebagai file statis Vercel
```

## A. Update backend Google Apps Script

1. Backup project Apps Script lama.
2. Buka file `GAS_BACKEND/Kode_Vercel_API.gs`.
3. Ganti isi `Kode.gs` pada project Apps Script dengan file tersebut (atau merge perubahan jika source Anda sudah berubah).
4. Save.
5. Dari Apps Script Editor, pilih fungsi `setupVercelGateway_` lalu **Run** satu kali.
6. Buka **Execution log** dan salin nilai yang diawali `GAS_API_SECRET=`.
7. Deploy -> New deployment -> Web app.
   - Execute as: Me
   - Who has access: opsi yang memungkinkan Vercel memanggil web app tanpa login Google (umumnya Anyone pada akun yang mendukungnya).
8. Salin deployment URL yang berakhir `/exec`. Itu menjadi `GAS_API_URL`.

> `doGet()` lama tetap dipertahankan sebagai fallback. `doPost()` baru menjadi endpoint JSON untuk Vercel.

## B. Deploy frontend ke Vercel

1. Upload folder ini ke GitHub (disarankan), atau gunakan Vercel CLI.
2. Vercel -> Add New -> Project -> import repository.
3. Framework Preset: **Other**. Build command/output directory tidak perlu diisi untuk frontend statis ini.
4. Tambahkan Environment Variables:

```text
GAS_API_URL=https://script.google.com/macros/s/.../exec
GAS_API_SECRET=<nilai dari setupVercelGateway_()>
```

5. Deploy.
6. Catat URL production, misalnya `https://saka-dirgantara.vercel.app`.

## C. Arahkan QR dan link izin ke Vercel

Di Apps Script buka **Project Settings -> Script Properties**, tambahkan:

```text
SAKA_PUBLIC_APP_URL = https://saka-dirgantara.vercel.app
```

Tanpa properti ini, backend sengaja fallback ke URL Apps Script lama agar migrasi tidak memutus layanan.

Setelah properti terpasang:

```text
https://saka-dirgantara.vercel.app/?checkin=<KegiatanID>
https://saka-dirgantara.vercel.app/?izin=<KegiatanID>
```

akan menjadi URL publik untuk QR/check-in dan izin.

## D. Smoke test wajib

1. Buka `/api/rpc` dengan browser: seharusnya tidak menjalankan RPC karena endpoint hanya menerima POST.
2. Buka homepage Vercel dan login.
3. Pastikan Dashboard tampil.
4. Buka Anggota/Kegiatan/Absensi/Kas/Inventaris/Surat/Pengurus.
5. Buat satu QR kegiatan dan pastikan URL memakai domain Vercel.
6. Test public check-in dan izin.
7. Test upload foto/bukti dan PDF.
8. Test role PENGURUS dan ADMIN.

## Catatan payload Vercel

Frontend melakukan fail-fast jika body RPC lebih dari sekitar 4 MB agar error file besar lebih jelas. Foto dokumentasi aplikasi sudah dikompresi sebelum dikirim. PDF/bukti yang sangat besar tetap perlu dikecilkan atau kemudian dipindahkan ke mekanisme direct-upload.

## Keamanan

- `GAS_API_SECRET` hanya disimpan di Vercel Environment Variables dan Script Properties, tidak di `app.js`.
- Gateway Vercel dan Apps Script sama-sama memiliki whitelist 63 method.
- `GAS_BACKEND/**` dikecualikan dari deployment Vercel lewat `.vercelignore`.
- Jangan commit file `.env` yang berisi secret.

## Jika muncul error

**Konfigurasi gateway belum lengkap** -> periksa `GAS_API_URL` / `GAS_API_SECRET` di Vercel lalu redeploy.

**Unauthorized gateway request** -> secret Vercel berbeda dengan Script Property. Jalankan `setupVercelGateway_()` dan sinkronkan secret.

**Backend Apps Script mengembalikan respons non-JSON** -> biasanya URL deployment salah, deployment belum menjadi Web App, atau akses deployment meminta login Google.

**QR masih ke script.google.com** -> tambahkan Script Property `SAKA_PUBLIC_APP_URL` dengan URL production Vercel.
