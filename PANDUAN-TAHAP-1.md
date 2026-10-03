# Tahap 1 — izin/sakit, PDF, dan pesan hasil

## Perubahan

Hanya dua file kode diubah dari paket Clean sebelumnya:
- src/pages/member/AttendancePage.jsx
- src/pages/admin/ActivityDetailsPage.jsx

Form izin/sakit menyediakan alasan maksimal 500 karakter dan lampiran wajib PDF/JPG/PNG/WEBP maksimal 3 MB. Izin memakai Surat Izin; sakit memakai Surat Dokter atau Bukti Obat. Payload mengikuti kontrak submitMemberIzin di backend. Validasi backend tetap berlaku. Klik submit berulang selama proses dicegah.

Pesan keberhasilan absen/izin tetap terlihat setelah daftar diperbarui. Bila refresh gagal setelah penyimpanan sukses, tampil peringatan terpisah agar pengguna tidak mengira penyimpanan gagal.

Pembuatan PDF mengembalikan hasil API, membuka tab yang disiapkan saat klik, serta menyediakan tombol Buka PDF jika popup diblokir. Kegagalan pembuatan menutup tab kosong. Pesan keberhasilan tindakan detail kegiatan tidak dihapus oleh refresh.

## Cara memasang dengan aman

1. Cadangkan repository/commit frontend yang sedang digunakan.
2. Jika memakai paket SAKA-Dirgantara-Clean sebelumnya, cukup ganti dua file kode di atas. ZIP ini juga berisi proyek frontend lengkap jika dibutuhkan.
3. Jalankan npm ci lalu npm run build.
4. Deploy terlebih dahulu sebagai Preview Vercel. Pastikan variabel environment Preview mengarah ke backend pengujian, spreadsheet uji, dan folder Drive uji. Preview yang memakai backend produksi tetap dapat mengubah data produksi.
5. Gunakan backend dari SAKA-GAS-Clean. Tahap ini tidak membutuhkan perubahan GAS, reset sesi, migrasi spreadsheet, atau setup ulang.
6. Jalankan daftar uji di bawah. Setelah lulus, deploy frontend produksi dan periksa ulang dengan data uji yang terkontrol.
7. Bila ada masalah, rollback commit/deployment frontend. Rollback kode tidak membatalkan data yang sudah dikirim.

## Uji manual sebelum rilis

| Uji | Hasil yang diharapkan |
| --- | --- |
| Anggota mengirim Izin + Surat Izin + lampiran valid | Tersimpan, menunggu verifikasi, bukti dapat dibuka pengurus |
| Anggota mengirim Sakit + Surat Dokter atau Bukti Obat | Jenis bukti dan file tersimpan sesuai pilihan |
| Tanpa bukti, format tidak didukung, file kosong, atau lebih dari 3 MB | Ditolak sebelum request dikirim |
| Klik Kirim berulang saat proses | Satu request selama proses berlangsung |
| Request ditolak backend | Pesan error terlihat dan form dapat diperbaiki/dikirim kembali |
| Absensi GPS di dalam/luar radius serta GPS ditolak | Tetap mengikuti validasi backend yang sudah ada |
| Kirim berhasil kemudian refresh daftar gagal | Pesan berhasil tetap terlihat, disertai peringatan refresh |
| Generate PDF sebagai pengguna berizin | PDF dibuat dan tab terbuka, tombol Buka PDF tersedia |
| Browser memblokir popup | Buka PDF tetap bisa diklik untuk membuka hasil |
| Backend gagal membuat PDF | Pesan error terlihat dan tab kosong ditutup |

Pastikan kegiatan uji membuka jendela izin/absensi dan akun memiliki hak akses yang diperlukan. Tautan PDF tetap mengikuti izin akses Google Drive; perubahan ini tidak membuat dokumen menjadi publik.

## Hasil verifikasi

- Build produksi berhasil.
- Pengujian fungsi frontend dengan layanan simulasi lulus: bukti wajib/format/ukuran, payload sakit, submit ganda, pesan sukses saat refresh gagal, PDF berhasil, popup diblokir, dan PDF gagal.
- Uji browser otomatis belum berhasil dijalankan karena browser uji tidak berhasil diunduh. Layout/interaksi browser dan koneksi GAS/Sheets/Drive langsung belum terverifikasi.
- Peringatan bundle lebih dari 500 kB masih ada; bukan error build.
- Tahap 2 (tombol sesuai permission), tahap 3 (pencarian/filter/pagination/status koneksi), dan pengujian integrasi deployment penuh belum dikerjakan dalam paket tahap 1 ini.
