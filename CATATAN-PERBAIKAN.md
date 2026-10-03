# Catatan perbaikan integrasi

Paket ini memperbaiki fungsi yang sudah ada di service tetapi belum terhubung ke halaman, plus dua bug alur simpan.

## Fungsi yang disambungkan

- `operationsService.closeIzin` dan `permissionLink` masuk ke panel kelola kegiatan.
- `step2Service.attendanceLink`, `permissionLink`, `permissionSummary`, dan `activityInventory` masuk ke detail kegiatan.
- `step2Service.permissionProof` masuk ke verifikasi absensi pengurus.
- `attendanceService.dashboardActivities` masuk ke beranda anggota.
- `moduleService.attendance` masuk sebagai riwayat tercatat pada absensi pengurus.
- `step2Service.permissions` mengendalikan tombol tambah, edit, dan hapus pada halaman CRUD. Backend tetap menjadi penentu akhir.

## Bug yang diperbaiki

- Update struktur memakai laporan lama karena `setReport` belum selesai saat `cleanupRequired` dibaca.
- Simpan permission hanya mengirim peran yang sedang dibuka. Sekarang peran lain ikut dikirim.
- PDF penilaian membuka jendela setelah request selesai, sehingga popup sering terblokir. Pola pembukaan tab sekarang sama dengan PDF laporan kegiatan.
- Menu pengurus menghilang jika `visibleModules` kosong atau gagal dimuat. Menu operasional tetap tampil.
- Proxy API menolak body string. Body sekarang diparse sebelum diteruskan ke Apps Script.

## Penyesuaian alur UI

Menu dibagi menjadi Operasional, Data Organisasi, dan Sistem. Beranda menampilkan langkah kerja berikutnya. Kegiatan dikelola dari panel empat langkah: data, status, izin, absensi. Login yang sudah punya sesi langsung masuk dasbor.
