# SAKA Dirgantara — PWA

Versi ini sudah dapat diinstal sebagai Progressive Web App (PWA) pada browser yang mendukung.

## Fitur PWA
- Web App Manifest
- Service Worker
- Ikon 192x192, 512x512, maskable, Apple Touch Icon, favicon
- Instalasi PWA dipusatkan di **Pengaturan → Instal Aplikasi (PWA)** agar antarmuka utama tetap bersih
- Petunjuk manual Add to Home Screen pada Safari iPhone/iPad
- Shell aplikasi dapat dibuka saat offline
- Request `/api/*`, login, data organisasi, dan mutation **tidak di-cache**
- Banner offline ketika koneksi terputus

## Deploy
Upload/commit seluruh isi folder ini ke repository Vercel yang sama. Tidak ada perubahan pada GAS backend atau Environment Variables.

Setelah Vercel selesai redeploy, buka domain HTTPS produksi. Browser mungkin membutuhkan refresh penuh sekali agar service worker terdaftar.

## Instal
### Android / Chrome / Edge
Masuk ke **Pengaturan → Instal Aplikasi (PWA)** lalu tekan **Instal Aplikasi**. Menu browser > Install app juga tetap dapat digunakan.

### Windows/macOS Chrome/Edge
Masuk ke **Pengaturan → Instal Aplikasi (PWA)** atau gunakan ikon install pada address bar.

### iPhone/iPad Safari
Masuk ke **Pengaturan → Instal Aplikasi (PWA)** untuk melihat petunjuk, lalu Share > Add to Home Screen > Add.

## Catatan Offline
PWA ini tidak mengubah Google Apps Script menjadi database offline. UI/shell dapat dibuka dari cache, tetapi data operasional tetap membutuhkan internet agar sinkron dengan GAS/Google Sheets.
