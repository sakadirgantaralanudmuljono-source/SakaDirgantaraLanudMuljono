# Portal Anggota — SAKA Dirgantara v3.6.0

Portal Anggota adalah mode aplikasi khusus role `ANGGOTA`. Satu akun anggota ditautkan ke satu baris pada sheet `Anggota` melalui kolom `Users.AnggotaID`.

## Fitur

- **Beranda** — ringkasan kehadiran, jumlah hadir, progres SKK, agenda mendatang, dan riwayat terbaru.
- **Profil Saya** — NTA, Krida, jabatan, biodata, kontak, tanggal bergabung, dan pelantikan.
- **Kehadiran Saya** — statistik serta seluruh riwayat Hadir/Izin/Sakit/Alpa milik akun tersebut.
- **Progres SKK** — progres per kelompok SKK, butir selesai/belum, dan poin yang tercatat. Bersifat read-only untuk anggota.

## Membuat akun anggota

1. Login sebagai ADMIN.
2. Pastikan **System Maintenance → Update Struktur** sudah dijalankan setelah upgrade v3.6.0.
3. Buka **Pengguna → Tambah Pengguna**.
4. Isi username dan password (minimal 8 karakter).
5. Pilih role **ANGGOTA**.
6. Pada **Tautkan Anggota**, pilih anggota yang sesuai.
7. Simpan dan uji login akun tersebut.

Nama akun role ANGGOTA otomatis mengikuti nama pada master `Anggota` saat akun dibuat/diperbarui.

## Model keamanan

Role ANGGOTA tidak menerima permission modul organisasi. `getDashboardData()` mendeteksi role ANGGOTA dan membangun payload pribadi di backend berdasarkan `session.AnggotaID`. Dengan demikian browser anggota tidak menerima tabel Anggota, Absensi seluruh organisasi, Kas, Inventaris, Surat, Users, atau data administratif lainnya.

Akun ANGGOTA juga ditolak oleh `getModulesData()` karena fungsi permission organisasi hanya mengizinkan ADMIN/PENGURUS. Data SKK pada portal hanya dibaca; perubahan checklist tetap melalui modul Penilaian milik ADMIN/PENGURUS.
