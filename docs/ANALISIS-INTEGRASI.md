# Analisis integrasi SAKA Dirgantara
Tanggal: 3 Oktober 2026. Sumber: SAKA-Dirgantara-Perbaikan.zip (54 file) dan source.zip (11 file + 1 direktori).

## Kesimpulan
Frontend React/Vite di Vercel belum setara dengan aplikasi Apps Script. Kendala paling besar adalah gateway, bukan ketiadaan fungsi backend. Dari **66 action unik** yang diminta service frontend, **16 memiliki pemetaan** dan **50 belum memiliki case** di ApiGateway.gs. Tersedianya pemetaan belum membuktikan koneksi deployment berhasil.

Alur kode: halaman React → src/services/api.js → /api/gas → doPost → dispatchApiAction_ → Kode.gs → Google Sheets/Drive. Apps Script juga memiliki UI tersendiri melalui doGet, Index, Stylesheet, dan JavaScript.

Paket hasil ini berisi analisis dan perapian struktur dokumentasi. **Tidak menambahkan integrasi baru atau mengubah perilaku aplikasi.** Kekurangan berikut masih harus diperbaiki sebelum dinyatakan terintegrasi penuh.

## Status per kelompok
| Kelompok | Hasil pemeriksaan kode |
|---|---|
| Login, logout, pemulihan sesi | Action tersedia; pengujian autentikasi deployment belum dilakukan |
| Dashboard, baca modul, baca permission | Action tersedia; UI hanya memakai sebagian hasil backend |
| Anggota: agenda, absensi GPS, izin dengan bukti | Action tersedia dan mengarah ke fungsi backend; perlu uji perangkat dan upload nyata |
| Rekap bulanan, riwayat anggota, baca SKK | Action tersedia |
| Pemeriksaan struktur | Action tersedia, tetapi backend mempunyai bug ketika sheet belum ada |
| CRUD anggota, kegiatan, kas, inventaris, surat, pengurus, users | 14 action save/delete belum dipetakan |
| Status kegiatan, aturan/tutup izin, tautan | Service dan tombol ada; gateway belum memetakan |
| Absensi massal dan verifikasi izin | Service dan UI ada; gateway belum memetakan |
| Tulis penilaian/komponen/SKK dan PDF | Service dan UI ada; gateway belum memetakan; payload SKK tidak cocok |
| Inventaris kegiatan, foto, dokumentasi, laporan/PDF | Service dan UI ada; gateway belum memetakan; form pengembalian belum lengkap |
| Action Center | Backend tersedia pada system.notifications, frontend meminta notifications.get; aksi lanjut juga belum dipetakan |
| Simpan permission, update struktur, reset sesi, impor Excel | UI dan backend tersedia; gateway belum memetakan |

Daftar tiap action, asal service, fungsi tujuan, serta kebutuhan adapter ada di **MATRIKS-ACTION.md**. Jangan menggunakan dispatcher global dinamis untuk mengekspos semua fungsi Kode.gs; gunakan whitelist dan pertahankan validasi sesi/permission di fungsi publik.

## Ketidakcocokan yang tetap ada meskipun gateway dilengkapi
1. **SKK: checked versus Checked.** AssessmentPage.jsx/saveSkk membuat `{MasterSKKID, checked}`; Kode.gs/saveSkkChecklist membaca `change.Checked`. Tanpa normalisasi, centang dianggap false dan butir yang sudah selesai dapat terhapus. Kirim `Checked` secara konsisten dan uji tambah serta hapus.
2. **Action Center: isi dan ID berbeda.** NotificationsPage.jsx membaca `message` dan memilih `refId/referenceId/entityId/id`; buildActionNotifications_ mengirim `detail`, `recordId`, `targetId`, `kind`, `action`. `id` adalah fingerprint notifikasi, bukan ID IzinKegiatan. Gunakan `detail` dan `recordId` untuk izin; arahkan kegiatan, inventaris, surat, kas sesuai action, jangan semua dibuka sebagai pengajuan izin.
3. **Permission lintas role.** PermissionsPage.jsx mengirim baris role lain bersama role terpilih; saveRolePermissions memakai Set dengan kunci Module saja. Jika modul sama ada pada dua role, backend menolak 'Modul hak akses dikirim berulang'. Kirim satu role saja atau ubah validasi backend ke pasangan Role+Module dengan pengujian tidak menimpa role lain.
4. **Ringkasan izin bukan objek agregat.** activity.permissionSummary belum mempunyai endpoint langsung yang cocok. getKegiatanIzinRingkas menghasilkan array keputusan Disetujui/Ditolak; getBatchIzinVerifikasi menghasilkan array semua status. UI mengharapkan total/menunggu/disetujui/ditolak. Buat agregasi dari semua status setelah permission diperiksa.
5. **Pengembalian inventaris belum lengkap.** ActivityDetailsPage.jsx menawarkan StatusPemakaian=Selesai tanpa input JumlahSetelah, JumlahRusakKembali, KondisiSetelah. saveKegiatanInventaris mewajibkan JumlahSetelah saat pengembalian. Tabel juga membaca JumlahKembali, sedangkan backend mengirim JumlahSetelah. Pertahankan Versi saat edit dan tangani catatan yang sudah dikunci.
6. **Atur izin memakai konsep lama.** ActivitiesPage meminta BatasIzinHari/IzinHariH/JamTutupIzin, tetapi getIzinWindow_ memakai H-3 tetap dan AbsensiSelesai. Endpoint updateKegiatanIzinRule menyimpan field yang tidak menentukan jendela izin saat ini. Selaraskan UI dengan aturan backend; closeIzinKegiatan menutup absensi mandiri juga, sehingga label 'Tutup Izin' kurang lengkap.
7. **Tautan masih menuju Apps Script.** getAttendanceLink/getIzinLink mengembalikan ScriptApp.getService().getUrl(), bukan domain Vercel. Ini bukan tautan kegiatan spesifik. Jika ingin seluruh pengguna di Vercel, buat tujuan login/absensi Vercel yang mempertahankan autentikasi; jangan hidupkan kembali endpoint NTA publik yang sengaja ditolak.
8. **Absensi massal belum mengisi status dari data lama.** AdminAttendancePage menginisialisasi semua anggota Hadir hanya saat daftar anggota berubah; pergantian kegiatan tidak membentuk ulang status dari absensi/izin kegiatan tersebut. Data riwayat juga tidak dimuat ulang setelah simpan. Diperlukan prefill per kegiatan serta hasil izin agar operator tidak mengirim status yang keliru.
9. **Permission UI belum konsisten.** CrudPage memperbolehkan tombol jika flag hilang atau permintaan permission gagal; halaman khusus mempunyai tombol tanpa pemeriksaan per operasi. AppLayout tetap menampilkan CORE_STAFF. Backend tetap harus menolak operasi tanpa izin, tetapi pengalaman UI belum selaras.
10. **HTTP error/sesi.** doPost mengembalikan ok:false tanpa status error aplikasi; proxy mengembalikan HTTP 200 jika upstream 200. apiRequest memang menampilkan error, tetapi cabang penghapusan token yang menunggu HTTP 401 tidak bekerja untuk error sesi dari GAS. Tambahkan kode error terstruktur dan mapping status yang sesuai, bukan menebak semua kegagalan sebagai 401.
11. **Cek struktur saat sheet hilang.** checkSystemStructure membuat baris exists:false tanpa extraHeaders, kemudian memanggil item.extraHeaders.map. Pemeriksaan dapat gagal justru saat sheet belum lengkap. Ini bug backend tersendiri, bukan kekurangan gateway.
12. **Indikator koneksi terlalu optimistis.** /api/health hanya membalas JSON statis; 'API aktif' bukan bukti GAS/Sheets tersambung. Dashboard juga menulis 'Backend terhubung' setelah loading selesai walau error ada.

## Fitur Apps Script yang belum setara di UI React
- Kartu anggota (`showMemberCard`) tersedia di JavaScript.html; tidak ditemukan alur kartu anggota di halaman React.
- Unduh template Excel (`downloadExcelTemplate`) serta laporan kesalahan/peringatan dan normalisasi header impor yang lebih lengkap belum diport. MaintenancePage baru membaca nama sheet persis dan menampilkan jumlah berhasil/gagal.
- Unduh/share payload PDF penilaian (`getPenilaianPdfPayload`) belum ada di service React; UI React baru mencoba membuka URL PDF.
- Jadwal/susunan kegiatan (`SusunanKegiatanJSON`) didukung backend laporan, tetapi form laporan React belum menyediakan editor jadwal.
- Data kas dapat dikaitkan ke KegiatanID di backend, tetapi form Kas React belum menyediakan pilihan kegiatan; form surat belum menyediakan AsalTujuan, form pengurus belum menyediakan Bidang.
- Pemilihan koordinat kegiatan dari GPS pengurus pada UI GAS belum tersedia di form kegiatan React, yang hanya menyediakan input angka.
- Dashboard anggota React belum menampilkan seluruh detail riwayat absensi, pengajuan, dan catatan verifikasi seperti UI GAS.
- Opsi inventaris cepat (`getInventoryQuickOptions`) dan opsi anggota aktif (`getActiveAnggotaOptions`) belum dipanggil service React; beberapa pilihan memakai data modules.get sebagai pengganti. Ini kesenjangan alur, bukan alasan mengekspos semua helper backend.
- runAttendanceAutomation dan helper internal tetap berjalan di GAS/trigger, tidak perlu dipindah menjadi endpoint Vercel.

## Perapian yang dilakukan
- Kedua ZIP tetap terpisah sesuai target deployment: frontend Vercel dan backend Apps Script.
- Root Vercel tetap memuat package.json, lockfile, index.html, vite.config.js, vercel.json, api/, src/. Dokumentasi rinci dipusatkan di docs/.
- CATATAN-PERBAIKAN.md dan PANDUAN-TAHAP-1.md digabung ke docs/RIWAYAT-PERUBAHAN.md, lalu dua file lama dihapus. Isinya dipertahankan sebagai histori, bukan bukti integrasi saat ini.
- README frontend ditulis ulang agar jelas paket backend kini tersedia terpisah dan gateway belum lengkap. Klaim build lama tidak digunakan sebagai bukti pemeriksaan saat ini.
- PERBAIKAN.md backend dipindah ke docs/RIWAYAT-PERUBAHAN.md. Root backend tetap datar agar nama template GAS dan path tests tetap bekerja.
- Semua 42 file src/ terjangkau dari src/main.jsx; tidak ada file kode yang terbukti tidak dipakai. Kedua handler api/ adalah entrypoint terpisah dan dipertahankan.
- Index.html, Stylesheet.html, JavaScript.html tetap dipertahankan: doGet memuat Index; Index include Stylesheet dan JavaScript. Kelima file tests dipertahankan karena berguna untuk regresi.
- Tidak menghapus API/fungsi GAS hanya karena tidak diimpor React. Pemanggilan GAS, trigger dan UI HTML tidak menggunakan import graph React.
- Tidak menyertakan node_modules/, dist/, cache atau file environment rahasia dalam ZIP hasil.

## Urutan penyelesaian integrasi yang disarankan
1. Lengkapi whitelist gateway berdasarkan matriks, sertai pengujian argumen, sesi, dan hak akses untuk setiap action.
2. Perbaiki kontrak SKK, permission, notifikasi, ringkasan izin, pengembalian inventaris dan aturan izin.
3. Lengkapi prefill absensi, form yang belum lengkap, kartu anggota, template Excel, jadwal dan unduh/share PDF sesuai kebutuhan operasional.
4. Uji akun ADMIN/PENGURUS/ANGGOTA dengan spreadsheet uji: CRUD, role ditolak, sesi habis, geofence, izin sekali, upload, PDF, stok dan import; baru deploy versi gateway dan frontend yang cocok.

## Batas verifikasi
Audit berbasis kode ZIP, bukan pemeriksaan deployment Vercel atau proyek Google milik pengguna. Tidak mengakses data produksi atau menjalankan update struktur/reset sesi. Pengujian lokal backend memakai mock dan tidak membuktikan operasi Sheets/Drive berhasil. Hasil perintah terbaru ada di VERIFIKASI.md.
