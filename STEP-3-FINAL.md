# v4.9 — Step 3 Final
Ditambahkan:
- System Maintenance: check/update struktur
- konfirmasi cleanup sebelum menghapus elemen spreadsheet ekstra
- import .xlsx/.xls per batch 25 baris (maks backend 40)
- reset semua sesi (tidak menghapus database)
- endpoint link absensi/izin
- endpoint PDF penilaian/laporan
- preview bukti izin
- foto inventaris kegiatan
- detail/verifikasi Action Center

Keamanan:
- maintenance/import/reset hanya ADMIN di backend
- browser tidak menerima GAS_PROXY_SECRET
- radius tetap divalidasi Kode.gs
- role/permission tetap divalidasi server.
