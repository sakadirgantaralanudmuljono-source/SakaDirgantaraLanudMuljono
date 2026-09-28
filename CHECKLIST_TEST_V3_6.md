# Checklist Test SAKA Dirgantara v3.6.0

## A. Session & Login
- [ ] Login Admin berhasil.
- [ ] Login Pengurus berhasil.
- [ ] Setelah login, `localStorage` tidak berisi `saka_v2_token`.
- [ ] Cookie `saka_session` terlihat sebagai HttpOnly/Secure di DevTools > Application > Cookies.
- [ ] Refresh halaman tidak meminta login ulang selama sesi masih aktif.
- [ ] Logout menghapus cookie dan kembali ke halaman login.
- [ ] Token localStorage dari versi 3.5 dimigrasikan otomatis pada request pertama.
- [ ] Percobaan login berulang terkena rate limit.

## B. Kartu Anggota Digital
- [ ] Buka Data Anggota.
- [ ] Klik ikon Kartu Anggota.
- [ ] Nama/NTA/Krida/Jabatan/Status tampil benar.
- [ ] PIN check-in 6 digit tampil.
- [ ] QR identitas NTA tampil.
- [ ] PIN anggota yang sama konsisten selama NTA dan secret tidak berubah.

## C. Absensi QR + PIN
- [ ] Mulai kegiatan sampai status mengizinkan check-in.
- [ ] Buka tautan/QR absensi.
- [ ] Form menampilkan NTA + PIN.
- [ ] NTA benar + PIN salah ditolak.
- [ ] NTA benar + PIN benar berhasil.
- [ ] Check-in kedua untuk anggota/kegiatan sama ditolak oleh aturan absensi existing.
- [ ] Percobaan PIN berulang terkena rate limit.
- [ ] Jika GAS backend belum v3.6, frontend menolak membuka form absensi dan memberi instruksi update backend.

## D. Audit Log
- [ ] Login sebagai Admin.
- [ ] Pengguna > Audit Log terbuka.
- [ ] Login tercatat.
- [ ] Logout sebelumnya tercatat.
- [ ] Check-in QR tercatat.
- [ ] Aktivitas System_Log existing tetap tampil.
- [ ] Pengurus non-Admin tidak dapat memanggil getSystemAuditLog.

## E. PWA Update
- [ ] Cache version service worker adalah `saka-pwa-v3.6.0`.
- [ ] Deploy versi baru lalu buka aplikasi dengan service worker lama.
- [ ] Banner “Versi baru tersedia” muncul.
- [ ] Klik Perbarui mengaktifkan service worker baru dan reload aplikasi.
- [ ] Cache lama terhapus pada activate.

## F. Regression
- [ ] Dashboard tetap termuat.
- [ ] Anggota CRUD tetap berjalan.
- [ ] Kegiatan CRUD/status tetap berjalan.
- [ ] Absensi massal tetap berjalan.
- [ ] Kas tetap berjalan.
- [ ] Inventaris tetap berjalan.
- [ ] Surat tetap berjalan.
- [ ] Pengurus dan role permission tetap berjalan.
- [ ] Penilaian/SKK/PDF tetap berjalan.
- [ ] Izin online publik tetap berjalan.
