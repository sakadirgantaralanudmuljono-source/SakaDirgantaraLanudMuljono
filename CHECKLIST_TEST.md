# Checklist Test Setelah Deploy

## Autentikasi
- [ ] Login ADMIN
- [ ] Login PENGURUS
- [ ] Logout
- [ ] Session lama/invalid kembali ke login

## Dashboard & permission
- [ ] Dashboard termuat
- [ ] Statistik benar
- [ ] Notification/Action Center
- [ ] Hak akses PENGURUS sesuai role permission

## CRUD
- [ ] Anggota create/edit/delete
- [ ] Kegiatan create/edit/status/delete
- [ ] Absensi single + massal
- [ ] Kas create/edit/delete
- [ ] Inventaris + pemakaian kegiatan
- [ ] Surat
- [ ] Pengurus
- [ ] Users (ADMIN)

## Public flow
- [ ] QR memakai domain Vercel
- [ ] `?checkin=` membuka halaman check-in publik
- [ ] `?izin=` membuka halaman izin publik
- [ ] Submit izin + bukti
- [ ] Verifikasi izin

## File & laporan
- [ ] Upload dokumentasi kegiatan
- [ ] Preview dokumentasi
- [ ] Upload foto inventaris
- [ ] Generate PDF kegiatan
- [ ] Generate PDF penilaian
- [ ] Preview/download bukti izin

## Mobile
- [ ] Login
- [ ] Bottom navigation
- [ ] Sidebar
- [ ] Modal/form
- [ ] Table horizontal scroll/card responsive
- [ ] Check-in/izin publik


## Portal Anggota v3.6.0

- [ ] Jalankan System Maintenance → Update Struktur dan pastikan sheet `Users` memiliki kolom `AnggotaID`.
- [ ] ADMIN dapat membuat user role `ANGGOTA` dengan anggota tertaut.
- [ ] Pembuatan akun ANGGOTA tanpa `AnggotaID` ditolak backend.
- [ ] Anggota yang sama tidak dapat ditautkan ke dua akun ANGGOTA.
- [ ] Login akun ANGGOTA menampilkan menu Beranda, Profil Saya, Kehadiran Saya, dan Progres SKK saja.
- [ ] Akun ANGGOTA tidak dapat membuka URL/modul Anggota, Kas, Inventaris, Surat, Pengurus, Pengguna, atau Maintenance melalui navigasi maupun RPC manual.
- [ ] Profil Saya hanya menampilkan record anggota yang tertaut pada akun.
- [ ] Kehadiran Saya hanya menampilkan baris Absensi dengan `AnggotaID` milik akun tersebut.
- [ ] Progres SKK hanya menampilkan checklist pribadi dan tidak menyediakan tombol edit.
- [ ] ADMIN/PENGURUS tetap dapat menggunakan seluruh fitur lama sesuai permission sebelumnya.
- [ ] Menghapus Anggota yang masih tertaut ke akun portal ditolak backend.
- [ ] PWA setelah deploy mengambil cache versi baru (`saka-pwa-v1.1.0`).
