# Perbaikan Data v4.5

Semua halaman aktif sudah menggunakan backend GAS V3.2. Placeholder data telah dihapus.

## Endpoint yang dipakai
- Dashboard: `getDashboardData`
- Anggota/Kegiatan/Absensi/Kas/Inventaris/Surat/Pengurus/Users: `getModulesData`
- Penilaian bulanan: `getPenilaianBulanan`
- Penilaian anggota: `getPenilaianRiwayatAnggota`
- Absensi anggota: `getMyActiveKegiatan`, `getMemberAttendanceLocationRule`, `submitMemberAttendance`

## Setelah mengganti file
1. Ganti `ApiGateway.gs` pada project GAS dengan versi paket ini.
2. Deploy ulang Web App GAS: Deploy > Manage deployments > Edit > New version > Deploy.
3. Pastikan `GAS_API_URL` Vercel menunjuk URL `/exec` deployment tersebut.
4. Pastikan `VITE_USE_MOCK=false`.
5. Redeploy Vercel tanpa cache bila perlu.
6. Logout lalu login kembali.

Jika halaman kosong tetapi tidak error, cek bahwa sheet terkait memang memiliki baris data dan akun mempunyai RolePermissions `CanView=TRUE`.
