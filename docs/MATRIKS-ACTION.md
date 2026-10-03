# Matriks action Vercel → Apps Script

Audit statis 3 Oktober 2026. Action CRUD diperluas berdasarkan 7 modul yang benar-benar dipanggil halaman. Jumlah ini menghitung action unik, bukan jumlah fitur atau persentase keberhasilan.

66 action frontend: 16 sudah memiliki case gateway; 50 belum. Gateway memiliki 17 case, termasuk `system.notifications` yang tidak dipanggil service frontend.

| Action | Status gateway | Fungsi tujuan / adapter yang diperlukan | Lokasi service |
|---|---|---|---|
| `activity.attendanceLink` | BELUM | `getAttendanceLink(token, payload.kegiatanId)` | src/services/operations.service.js:7; src/services/step2.service.js:13 |
| `activity.documentation.delete` | BELUM | `deleteKegiatanDokumentasi(token, payload.id)` | src/services/step2.service.js:11 |
| `activity.documentation.preview` | BELUM | `getKegiatanDokumentasiPreview(token, payload.id)` | src/services/step2.service.js:11 |
| `activity.documentation.update` | BELUM | `updateKegiatanDokumentasiMetadata(token, payload.id, payload.data)` | src/services/step2.service.js:11 |
| `activity.documentation.upload` | BELUM | `uploadKegiatanDokumentasi(token, payload.kegiatanId, payload.file)` | src/services/step2.service.js:10 |
| `activity.inventory.delete` | BELUM | `deleteKegiatanInventaris(token, payload.id)` | src/services/step2.service.js:8 |
| `activity.inventory.get` | BELUM | `adapter berizin: getModulesData(token, [kegiatanInventaris]), lalu filter KegiatanID` | src/services/step2.service.js:6 |
| `activity.inventory.photo` | BELUM | `uploadKegiatanInventarisPhoto(token, payload.kegiatanId, payload.recordId, payload.phase, payload.file)` | src/services/step2.service.js:18 |
| `activity.inventory.save` | BELUM | `saveKegiatanInventaris(token, payload.kegiatanId, payload.data)` | src/services/step2.service.js:7 |
| `activity.permission.close` | BELUM | `closeIzinKegiatan(token, payload.kegiatanId)` | src/services/operations.service.js:5 |
| `activity.permissionLink` | BELUM | `getIzinLink(token, payload.kegiatanId)` | src/services/operations.service.js:8; src/services/step2.service.js:14 |
| `activity.permissionRule.update` | BELUM | `updateKegiatanIzinRule(token, payload)` | src/services/operations.service.js:4 |
| `activity.permissionSummary` | BELUM | `adapter: getBatchIzinVerifikasi(token, payload.kegiatanId), hitung total/menunggu/disetujui/ditolak` | src/services/step2.service.js:15 |
| `activity.report.get` | BELUM | `getKegiatanReportData(token, payload.kegiatanId)` | src/services/step2.service.js:9 |
| `activity.report.pdf` | BELUM | `generateKegiatanReportPdf(token, payload.kegiatanId)` | src/services/step2.service.js:17 |
| `activity.report.save` | BELUM | `saveLaporanKegiatan(token, payload.kegiatanId, payload.data)` | src/services/step2.service.js:9 |
| `activity.transition` | BELUM | `transitionKegiatanStatus(token, payload.kegiatanId, payload.targetStatus, payload.alasan)` | src/services/operations.service.js:3 |
| `assessment.component.delete` | BELUM | `deleteKomponenPenilaian(token, payload.id)` | src/services/step2.service.js:3 |
| `assessment.component.save` | BELUM | `saveKomponenPenilaian(token, payload.data)` | src/services/step2.service.js:3 |
| `assessment.entry.delete` | BELUM | `deletePenilaianAnggota(token, payload.id)` | src/services/step2.service.js:4 |
| `assessment.entry.save` | BELUM | `savePenilaianAnggota(token, payload.data)` | src/services/step2.service.js:4 |
| `assessment.memberHistory` | Ada | `getPenilaianRiwayatAnggota(token, payload.anggotaId)` | src/services/assessment.service.js:4 |
| `assessment.month` | Ada | `getPenilaianBulanan(token, payload.period)` | src/services/assessment.service.js:3 |
| `assessment.pdf.generate` | BELUM | `generatePenilaianBulananPdf(token, payload.period)` | src/services/step2.service.js:16 |
| `assessment.skk` | Ada | `getSkkChecklist(token, payload.anggotaId)` | src/services/assessment.service.js:5 |
| `assessment.skk.save` | BELUM | `saveSkkChecklist(token, payload.anggotaId, payload.tanggal, changes dengan Checked)` | src/services/step2.service.js:5 |
| `attendance.batch.save` | BELUM | `saveAbsensiBatch(token, payload)` | src/services/operations.service.js:6 |
| `auth.login` | Ada | `login(payload)` | src/services/auth.service.js:4 |
| `auth.logout` | Ada | `logout(token)` | src/services/auth.service.js:10 |
| `auth.me` | Ada | `{user: publicSession_(requireSession_(token))}` | src/services/auth.service.js:8 |
| `crud.anggota.delete` | BELUM | `deleteAnggota(token, payload.id)` | src/services/crud.service.js (dinamis) |
| `crud.anggota.save` | BELUM | `saveAnggota(token, payload.data)` | src/services/crud.service.js (dinamis) |
| `crud.inventaris.delete` | BELUM | `deleteInventaris(token, payload.id)` | src/services/crud.service.js (dinamis) |
| `crud.inventaris.save` | BELUM | `saveInventaris(token, payload.data)` | src/services/crud.service.js (dinamis) |
| `crud.kas.delete` | BELUM | `deleteKas(token, payload.id)` | src/services/crud.service.js (dinamis) |
| `crud.kas.save` | BELUM | `saveKas(token, payload.data)` | src/services/crud.service.js (dinamis) |
| `crud.kegiatan.delete` | BELUM | `deleteKegiatan(token, payload.id)` | src/services/crud.service.js (dinamis) |
| `crud.kegiatan.save` | BELUM | `saveKegiatan(token, payload.data)` | src/services/crud.service.js (dinamis) |
| `crud.pengurus.delete` | BELUM | `deletePengurus(token, payload.id)` | src/services/crud.service.js (dinamis) |
| `crud.pengurus.save` | BELUM | `savePengurus(token, payload.data)` | src/services/crud.service.js (dinamis) |
| `crud.surat.delete` | BELUM | `deleteSurat(token, payload.id)` | src/services/crud.service.js (dinamis) |
| `crud.surat.save` | BELUM | `saveSurat(token, payload.data)` | src/services/crud.service.js (dinamis) |
| `crud.users.delete` | BELUM | `deleteUser(token, payload.id)` | src/services/crud.service.js (dinamis) |
| `crud.users.save` | BELUM | `saveUser(token, payload.data)` | src/services/crud.service.js (dinamis) |
| `dashboard.get` | Ada | `getDashboardData(token, payload.forceRefresh === true)` | src/services/module.service.js:9 |
| `member.activities.active` | Ada | `getMyActiveKegiatan(token)` | src/services/attendance.service.js:5 |
| `member.activities.dashboard` | Ada | `getMyDashboardKegiatan(token)` | src/services/attendance.service.js:4 |
| `member.activities.permission` | Ada | `getMyIzinKegiatan(token)` | src/services/attendance.service.js:6 |
| `member.attendance.rule` | Ada | `getMemberAttendanceLocationRule(token, payload.kegiatanId)` | src/services/attendance.service.js:7 |
| `member.attendance.submit` | Ada | `submitMemberAttendance(token, payload.kegiatanId, payload.position)` | src/services/attendance.service.js:8 |
| `member.permission.submit` | Ada | `submitMemberIzin(token, payload)` | src/services/attendance.service.js:17 |
| `modules.get` | Ada | `getModulesData(token, payload.modules || [])` | src/services/module.service.js:4 |
| `notifications.get` | BELUM | `getActionNotifications(token)` | src/services/step2.service.js:12 |
| `notifications.permissionDetail` | BELUM | `getActionPermissionDetail(token, payload.id)` | src/services/step2.service.js:20 |
| `notifications.permissionVerify` | BELUM | `verifyActionPermission(token, payload.id, payload.decision, payload.note)` | src/services/step2.service.js:21 |
| `notifications.read` | BELUM | `markActionNotificationsRead(token, payload.ids)` | src/services/step2.service.js:12 |
| `permission.batch.get` | BELUM | `getBatchIzinVerifikasi(token, payload.kegiatanId)` | src/services/operations.service.js:9 |
| `permission.proofPreview` | BELUM | `getIzinBuktiPreview(token, payload.izinId)` | src/services/step2.service.js:19 |
| `permission.verify` | BELUM | `verifyIzinKegiatan(token, payload.izinId, payload.decision, payload.catatan)` | src/services/operations.service.js:10 |
| `permissions.get` | Ada | `getRolePermissions(token)` | src/services/module.service.js:10; src/services/step2.service.js:22 |
| `permissions.save` | BELUM | `saveRolePermissions(token, rows satu role / perbaiki kunci duplikat Role+Module)` | src/services/step2.service.js:22 |
| `system.importBatch` | BELUM | `importExcelDatabaseBatch(token, payload)` | src/services/maintenance.service.js:6 |
| `system.importFinish` | BELUM | `finishExcelDatabaseImport(token, payload.summary)` | src/services/maintenance.service.js:7 |
| `system.safeReset` | BELUM | `safeResetSystem(token)` | src/services/maintenance.service.js:5 |
| `system.structure` | Ada | `checkSystemStructure(token)` | src/services/maintenance.service.js:3; src/services/module.service.js:21 |
| `system.updateStructure` | BELUM | `updateSpreadsheetStructure(token, payload.confirmCleanup)` | src/services/maintenance.service.js:4 |
