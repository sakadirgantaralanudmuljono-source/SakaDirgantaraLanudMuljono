# Tahap 2 - Migrasi UI

Frontend telah dipecah menjadi halaman per modul agar mudah dirawat.

## Admin/Pengurus
- Dashboard
- Anggota
- Kegiatan
- Absensi
- Penilaian & SKK
- Kas Organisasi
- Inventaris
- Surat
- Struktur Pengurus
- Pengguna
- System Maintenance

## Anggota
- Beranda
- Profil Saya
- Absensi Saya (GPS)
- Penilaian Saya

## Komponen reusable
- PageHeader
- ModuleToolbar
- DataTable
- StatusBadge

Data aktual masih melalui service API pada tahap berikutnya. Validasi keamanan/radius tetap wajib dilakukan server-side.
