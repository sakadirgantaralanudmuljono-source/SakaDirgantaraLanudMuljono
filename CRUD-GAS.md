# CRUD GAS v4.6
CRUD utama sudah tersambung ke fungsi asli `Kode.gs`.

- Anggota: saveAnggota / deleteAnggota
- Kegiatan: saveKegiatan / deleteKegiatan
- Absensi admin: saveAbsensi / deleteAbsensi
- Kas: saveKas / deleteKas
- Inventaris: saveInventaris / deleteInventaris
- Surat: saveSurat / deleteSurat
- Pengurus: savePengurus / deletePengurus
- Pengguna: saveUser / deleteUser

Permission create/edit/delete tetap diputuskan backend melalui `requirePermission_()` / `requireSession_()`.

Setelah mengganti ApiGateway.gs: Deploy > Manage deployments > Edit > New version > Deploy.
