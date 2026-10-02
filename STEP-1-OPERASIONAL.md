# v4.7 — Step 1 Operasional
Masuk:
- transisi status kegiatan melalui transitionKegiatanStatus
- aturan izin melalui updateKegiatanIzinRule
- absensi massal melalui saveAbsensiBatch
- daftar/verifikasi izin melalui getBatchIzinVerifikasi + verifyIzinKegiatan
- pengajuan izin anggota melalui getMyIzinKegiatan + submitMemberIzin
- absensi GPS/radius tetap memakai validasi server V3.2

Deploy ulang ApiGateway.gs sebagai New version setelah update.
