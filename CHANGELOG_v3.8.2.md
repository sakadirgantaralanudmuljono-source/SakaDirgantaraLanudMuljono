# SAKA Dirgantara v3.8.2 — User Management Performance Fix

## Perbaikan
- Halaman Manajemen Pengguna tidak lagi memuat seluruh data Anggota pada request awal.
- Daftar pengguna tampil lebih dulu dari sheet Users.
- Label anggota tertaut dimuat secara lazy di background.
- Form Tambah/Edit Pengguna memuat opsi anggota melalui endpoint ringan `getUserMemberOptions`.
- Opsi anggota dicache di Apps Script selama 120 detik untuk mengurangi baca Google Sheets berulang.
- Pembacaan sheet Users dibatasi ke schema kolom yang dikenal untuk menghindari range melebar tidak perlu.
- Versi PWA cache dinaikkan.

## Deployment
Apps Script wajib di-update ke source v3.8.2 lalu deployment `/exec` dibuat New version. Setelah itu redeploy frontend Vercel.
