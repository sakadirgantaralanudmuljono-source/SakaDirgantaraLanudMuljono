# Backend GAS Connected

Paket ini sudah memakai nama fungsi aktual dari `Kode.gs` V3.2.

Mapping utama:
- auth.login -> `login(payload)`
- auth.logout -> `logout(token)`
- auth.me -> `requireSession_()` + `publicSession_()`
- dashboard.get -> `getDashboardData(token)`
- modules.get -> `getModulesData(token, modules)`
- member.activities.active -> `getMyActiveKegiatan(token)`
- member.attendance.rule -> `getMemberAttendanceLocationRule(token, kegiatanId)`
- member.attendance.submit -> `submitMemberAttendance(token, kegiatanId, position)`
- system.structure -> `checkSystemStructure(token)`

## Instalasi GAS
1. Gunakan `source/Kode.gs` sebagai backend utama Anda.
2. Tambahkan `source/ApiGateway.gs` ke project Apps Script yang sama.
3. Project Settings > Script Properties:
   `VERCEL_PROXY_SECRET = <secret acak panjang>`
4. Deploy > New deployment > Web app.
5. Execute as: Me.
6. Access sesuai kebutuhan deployment Anda.
7. Salin URL `/exec`.

## Vercel
Environment Variables:
- `GAS_API_URL` = URL `/exec`
- `GAS_PROXY_SECRET` = sama dengan Script Property
- `VITE_API_PATH` = `/api/gas`
- `VITE_USE_MOCK` = `false`

Setelah environment berubah, Redeploy.
