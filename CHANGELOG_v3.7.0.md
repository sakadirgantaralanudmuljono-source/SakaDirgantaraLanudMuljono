# SAKA Dirgantara v3.7.0 — Modern UX + Geofence Attendance

## UI/UX
- Penyegaran visual agar lebih clean, profesional, dan konsisten tanpa mengubah alur CRUD utama.
- Navigasi diringkas menjadi Utama, Operasional, dan Aplikasi.
- `System Maintenance` dipindahkan ke halaman `Pengaturan` bersama pengaturan tampilan dan PWA.
- Tombol instal PWA mengambang dihapus. Instalasi sekarang tersedia hanya melalui `Pengaturan`.
- Navigasi mobile anggota menjadi: Beranda, Absen, Profil, SKK, Setting.

## Absensi mandiri anggota
- Admin dapat menyimpan titik pusat absensi melalui `Pengaturan → Area Absensi 2 KM`.
- Radius dikunci pada 2.000 meter.
- Admin dapat mengambil koordinat dari GPS perangkat atau memasukkan latitude/longitude manual.
- Saat kegiatan berstatus `Berjalan` dan tanggalnya hari ini, kegiatan muncul otomatis pada akun ANGGOTA.
- Anggota menekan `Absen Sekarang`; browser wajib memberikan lokasi presisi.
- Backend memvalidasi role ANGGOTA, AnggotaID, status keanggotaan, kegiatan, tanggal, GPS, akurasi, dan jarak Haversine.
- GPS dengan akurasi lebih buruk dari 500 meter ditolak.
- Di luar radius 2 km ditolak.
- Kehadiran yang sudah Izin/Sakit/Alpa tidak ditimpa otomatis.
- Koordinat GPS anggota tidak disimpan di sheet Absensi; catatan hanya menyimpan jarak dari titik pusat.

## Backend/API
Metode baru:
- `getAttendanceGeofenceSettings`
- `saveAttendanceGeofenceSettings`
- `memberAttendanceCheckin`

Pengaturan geofence disimpan pada Apps Script Properties sehingga tidak menambah sheet/kolom database.
