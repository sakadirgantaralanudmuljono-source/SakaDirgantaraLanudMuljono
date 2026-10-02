# SAKA Dirgantara — Web App

Frontend React + Vite dan proxy API Vercel. Kode aplikasi aktif berada di `src/`.

## Struktur inti

| Lokasi | Isi |
| --- | --- |
| `src/pages/admin/` | Halaman admin dan pengurus |
| `src/pages/member/` | Halaman anggota |
| `src/pages/auth/` | Login |
| `src/components/` | Komponen umum dan tata letak |
| `src/context/`, `src/routes/` | Sesi, navigasi, proteksi halaman |
| `src/services/`, `src/hooks/`, `src/utils/` | Request API, hooks, konstanta |
| `src/styles/globals.css` | Tampilan aplikasi |
| `api/gas.js` | Proxy Google Apps Script, berjalan di Vercel |
| `api/health.js` | Pemeriksaan API Vercel |
| `index.html` | Entry HTML, memuat `/src/main.jsx` |
| `vite.config.js` | Build React dengan plugin JSX |
| `vercel.json` | Pengaturan build dan rewrite SPA |
| `package.json`, `package-lock.json` | Dependency dan versi terkunci |
| `.env.example`, `.gitignore` | Contoh konfigurasi dan pengecualian Git |

## Deploy Vercel

1. Ekstrak ZIP. Isi ZIP langsung berisi `package.json`, `src/`, dan `api/`; tidak ada folder pembungkus.
2. Ganti isi proyek lama dengan isi paket ini. Jangan sekadar menambahkan file karena salinan lama akan tertinggal. Commit penghapusan file lama bersama file baru. Jangan hapus pengaturan Git repositori Anda.
3. `package.json`, `index.html`, `vite.config.js`, `vercel.json`, `src/`, dan `api/` harus sejajar di root repository.
4. Pilih Root Directory `.` (root repository), bukan `src`, `dist`, atau `frontend`.
5. Framework: **Vite**; Node.js: **24.x**; Install: `npm ci`; Build: `npm run build`; Output: `dist`. Pengaturan build juga tersedia di `vercel.json`.
6. Isi Environment Variables berikut untuk environment deployment yang digunakan, kemudian redeploy.

| Variabel | Nilai |
| --- | --- |
| `GAS_API_URL` | URL deployment Google Apps Script berakhiran `/exec` |
| `GAS_PROXY_SECRET` | Secret yang sama dengan `VERCEL_PROXY_SECRET` di backend |
| `VITE_API_PATH` | `/api/gas` |
| `VITE_USE_MOCK` | `false` |

Jangan memberi prefix `VITE_` pada secret. Jangan unggah `.env`, `node_modules`, atau `dist` ke repository.

## Backend yang diperlukan

ZIP sumber hanya berisi frontend dan proxy Vercel. File `Kode.gs` dan `ApiGateway.gs` **tidak disertakan dalam ZIP sumber**, sehingga tidak dibuat atau dihapus dalam perapian ini. Gunakan backend Apps Script milik proyek yang sudah ada dan pastikan gateway `doPost()` menerima action dari `src/services/`, memeriksa secret, sesi, role, dan radius absensi. Panduan lama merujuk file GAS yang tidak tersedia dalam paket.

## Pengembangan lokal

Gunakan Node.js 24.x, jalankan `npm ci`, salin `.env.example` menjadi `.env`, lalu `npm run dev`. Vite lokal hanya menjalankan frontend; endpoint `api/` memerlukan runtime Vercel (misalnya `vercel dev` dengan Vercel CLI). `npm run preview` juga hanya menyajikan hasil build frontend.

Build produksi: `npm run build`.

## Perubahan perapian

- Menghapus 38 salinan JavaScript/JSX/CSS di root. Beberapa merupakan versi lama; versi aktif di `src/` dan `api/` dipertahankan.
- Menggabungkan 12 dokumen tahap/versi lama ke panduan operasional ini.
- Menghapus tiga modul yang tidak terjangkau dari entry aplikasi: `src/pages/admin/ModulePage.jsx`, `src/components/common/ModuleToolbar.jsx`, dan `src/components/common/StatusBadge.jsx`.
- Menormalkan `env.example` menjadi `.env.example`.
- Menambahkan konfigurasi plugin React, `.gitignore`, lockfile, dan konfigurasi build Vercel eksplisit.
- Mengunci versi dependency hasil instalasi dan Node.js major 24 agar tidak otomatis berpindah major.
- Memperbaiki callback unggah di `ActivityDetailsPage.jsx` menjadi `async`: sebelumnya `await` berada dalam callback non-async dan menyebabkan build gagal. File aktif lainnya serta kedua handler `api/` tidak diubah.

## Verifikasi deployment

Setelah deploy: periksa `/api/health`, buka `/login` langsung dan refresh, lalu uji login admin/anggota, pembatasan role, CRUD, dan absensi dengan backend aktif. Build yang berhasil belum membuktikan koneksi Apps Script atau validasi absensi bekerja.

Referensi konfigurasi: https://vite.dev/guide/using-plugins.html dan https://vercel.com/docs/project-configuration/vercel-json.

## Hasil pemeriksaan paket

Instalasi bersih `npm ci` dan build produksi `npm run build` berhasil pada Node.js 24.19.0. Pemeriksaan impor lokal tidak menemukan referensi file hilang. Build masih memberi peringatan ukuran bundle di atas 500 kB; ini bukan kegagalan build. Integrasi backend dan deployment Vercel langsung belum diuji.
