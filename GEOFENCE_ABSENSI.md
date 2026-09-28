# Absensi Mandiri Anggota — Geofence 2 KM

## Konfigurasi Admin
1. Login sebagai ADMIN.
2. Buka **Pengaturan**.
3. Pada **Area Absensi 2 KM**, isi label lokasi.
4. Tekan **Gunakan Lokasi Saya** untuk mengambil titik admin atau masukkan latitude/longitude secara manual.
5. Tekan **Simpan Titik Absensi**.
6. Radius selalu 2.000 meter dan tidak dapat diubah dari UI.

## Alur Pengurus
Alur kegiatan tetap sama. Ketika absensi mandiri akan dibuka:
1. Pastikan tanggal kegiatan adalah hari ini.
2. Ubah status kegiatan menjadi **Berjalan**.
3. Kegiatan otomatis tersedia pada dashboard dan menu **Absen** akun ANGGOTA.

## Alur Anggota
1. Login dengan akun role **ANGGOTA**.
2. Buka **Beranda** atau **Absen**.
3. Tekan **Absen Sekarang** pada kegiatan yang sedang berjalan.
4. Izinkan akses lokasi/GPS.
5. Sistem mengambil lokasi dengan `enableHighAccuracy` dan tanpa cache lokasi lama.
6. Backend memeriksa bahwa akurasi GPS maksimal ±500 m dan jarak ke titik admin maksimal 2.000 m.
7. Jika valid, status **Hadir** tersimpan dengan metode `Portal Anggota GPS`.

## Validasi
Absensi ditolak bila:
- titik admin belum diatur;
- akun bukan ANGGOTA atau belum terhubung ke AnggotaID;
- status anggota tidak Aktif/Calon Anggota;
- kegiatan tidak berstatus Berjalan;
- tanggal kegiatan bukan hari ini;
- izin lokasi ditolak atau GPS tidak tersedia;
- akurasi GPS lebih buruk dari 500 m;
- data lokasi lebih lama dari 2 menit;
- jarak lebih dari 2.000 m;
- status kehadiran sebelumnya sudah Izin/Sakit/Alpa.

> Catatan: geolocation browser membantu memverifikasi posisi perangkat, tetapi web browser tidak dapat menjamin anti-GPS-spoofing setingkat aplikasi native dengan device attestation. Validasi jarak tetap dilakukan di backend agar manipulasi UI/frontend saja tidak cukup untuk melewati geofence.
