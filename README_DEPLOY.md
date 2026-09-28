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


## Upgrade v3.6.0 — Portal Anggota

Versi 3.6.0 menambahkan role **ANGGOTA** dan portal pribadi (Beranda, Profil Saya, Kehadiran Saya, dan Progres SKK).

### Langkah upgrade dari versi sebelumnya

1. Ganti source Apps Script dengan `GAS_BACKEND/Kode_Vercel_API.gs` versi terbaru lalu deploy ulang Web App Apps Script bila diperlukan.
2. Login sebagai **ADMIN** pada aplikasi.
3. Buka **Pengaturan → Pemeliharaan Database → Cek Struktur** lalu jalankan **Update Struktur**. Langkah ini menambahkan kolom `AnggotaID` pada sheet `Users` tanpa menghapus akun lama.
4. Deploy ulang project Vercel dengan file frontend versi terbaru.
5. Buka **Pengguna → Tambah Pengguna**, pilih role `ANGGOTA`, lalu pilih **Tautkan Anggota** dan isi username/password.
6. Login menggunakan akun anggota tersebut. Akun ANGGOTA hanya dapat melihat data pribadinya sendiri.

### Catatan keamanan Portal Anggota

- Satu akun `ANGGOTA` wajib terhubung ke satu `AnggotaID` yang valid.
- Satu data anggota hanya dapat mempunyai satu akun portal anggota.
- Endpoint modul organisasi tetap menolak role ANGGOTA; portal mengambil dataset pribadi yang sudah difilter di backend.
- Anggota yang masih tertaut ke akun portal tidak dapat dihapus dari database. Nonaktifkan anggota atau hapus/ubah akun portal terlebih dahulu.
- Checklist SKK pada portal bersifat **read-only**. Verifikasi checklist tetap dilakukan ADMIN/PENGURUS dari modul Penilaian.

## Diagnostik backend (v3.7.0)

Jika aplikasi menampilkan error backend/non-JSON, lakukan pemeriksaan berikut secara berurutan:

1. Di Apps Script, simpan source `GAS_BACKEND/Kode_Vercel_API.gs` terbaru.
2. Jalankan `setupVercelGateway_()` satu kali bila secret belum pernah dibuat. Salin `GAS_API_SECRET` dari Execution log.
3. **Penting:** buka **Deploy → Manage deployments → Edit (ikon pensil) → Version: New version → Deploy**. Menyimpan source saja tidak memperbarui URL `/exec` yang sedang dipakai production.
4. Deployment harus berupa **Web app** dengan:
   - **Execute as:** Me / User deploying.
   - **Who has access:** **Anyone** yang dapat membuka tanpa login Google (akses anonim). Jangan gunakan Test deployment `/dev`.
5. Salin **Web app URL** production yang berakhir `/exec` ke `GAS_API_URL` di Vercel.
6. Pastikan `GAS_API_SECRET` di Vercel sama dengan Script Property `SAKA_VERCEL_GATEWAY_SECRET`.
7. Setelah mengubah Environment Variables, lakukan **Redeploy** project Vercel.
8. Buka `https://DOMAIN-VERCEL-ANDA/api/health`.

Hasil normal v3.7.0 mirip:

```json
{
  "success": true,
  "gateway": "ok",
  "appsScript": {
    "service": "SAKA DIRGANTARA",
    "version": "3.7.0",
    "gatewayConfigured": true
  }
}
```

Kode diagnostik penting:

- `GAS_URL_TEST_DEPLOYMENT`: `GAS_API_URL` memakai `/dev`; ganti dengan `/exec`.
- `GAS_LOGIN_REQUIRED`: deployment Apps Script meminta login Google; ubah akses Web App menjadi anonim/publik.
- `GAS_ACCESS_DENIED`: Apps Script/layanan Google menolak akses atau belum diotorisasi.
- `GAS_DEPLOYMENT_NOT_FOUND`: URL deployment salah, dihapus, atau tidak aktif.
- `GAS_HEALTH_NOT_JSON`: endpoint health belum ada pada deployment aktif; deploy **New version** dari backend v3.7.0.
- `GAS_HTML_RESPONSE`: Apps Script mengirim HTML, biasanya karena deployment stale/salah atau akses meminta login.


## Upgrade v3.7.0 — UI/UX + Absensi Geofence

Versi 3.7.0 tidak menambah kolom database untuk geofence. Titik pusat absensi disimpan pada Apps Script Properties.

### Setelah deploy

1. Deploy `GAS_BACKEND/Kode_Vercel_API.gs` sebagai **New version** pada deployment Web App Apps Script yang sama.
2. Deploy frontend v3.7.0 ke Vercel.
3. Login sebagai **ADMIN** lalu buka **Pengaturan**.
4. Pada **Area Absensi 2 KM**, isi label lokasi dan tekan **Gunakan Lokasi Saya** atau masukkan latitude/longitude manual.
5. Tekan **Simpan Titik Absensi**. Radius selalu 2.000 meter.
6. Pastikan kegiatan yang akan diabsen memiliki tanggal hari ini dan ubah status menjadi **Berjalan**.
7. Login dengan akun `ANGGOTA`; kegiatan tersebut akan muncul pada Beranda dan menu **Absen**.
8. Tekan **Absen Sekarang**, izinkan GPS, lalu sistem akan memvalidasi akurasi dan jarak sebelum menyimpan `Hadir`.

### Persyaratan lokasi

- Aplikasi production harus dibuka melalui HTTPS.
- Browser/perangkat harus mengizinkan geolocation.
- Akurasi GPS wajib maksimal ±500 meter.
- Jarak ke titik admin wajib maksimal 2.000 meter.
- Lokasi yang dikirim harus baru (maksimum 2 menit).
- Koordinat GPS anggota tidak disimpan di sheet `Absensi`; hanya jarak hasil validasi yang dicatat pada `Catatan`.
