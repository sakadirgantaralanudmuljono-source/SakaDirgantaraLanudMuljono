# Changelog v3.6.0 — Portal Anggota

## Fitur baru

- Role baru `ANGGOTA` pada autentikasi.
- Relasi akun anggota melalui `Users.AnggotaID`.
- Beranda anggota dengan KPI kehadiran, agenda mendatang, progres SKK, dan riwayat terbaru.
- Halaman Profil Saya yang bersifat read-only.
- Halaman Kehadiran Saya dengan statistik dan riwayat pribadi.
- Halaman Progres SKK dengan checklist read-only berdasarkan data penilaian yang sudah diverifikasi pengurus.
- Manajemen Pengguna ADMIN dapat membuat akun ANGGOTA dan menautkannya ke master Anggota.
- Pengamanan penghapusan anggota yang masih terhubung ke akun portal.
- Dukungan import Excel Users untuk kolom `AnggotaID` dan role `ANGGOTA`.
- Cache PWA dinaikkan ke `saka-pwa-v1.1.0` agar asset versi baru diperbarui.

## Keamanan

- Role ANGGOTA tidak memperoleh permission modul organisasi.
- Payload portal dibentuk di backend dari `session.AnggotaID`.
- Riwayat absensi difilter berdasarkan `AnggotaID` akun yang login.
- Data SKK portal dibatasi ke progress milik anggota tersebut dan tidak dapat diedit dari portal.
- `getModulesData()` tetap membatasi data organisasi menggunakan permission ADMIN/PENGURUS.
- Data Users tetap hanya dapat dibuka ADMIN.

## Migrasi

Setelah kode Apps Script v3.6.0 dipasang, login sebagai ADMIN lalu jalankan **System Maintenance → Cek Struktur → Update Struktur** satu kali. Proses ini menambahkan `AnggotaID` pada sheet `Users` tanpa menghapus akun yang sudah ada.
