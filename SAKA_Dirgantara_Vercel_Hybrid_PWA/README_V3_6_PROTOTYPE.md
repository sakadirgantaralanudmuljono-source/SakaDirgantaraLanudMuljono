# SAKA Dirgantara v3.6.0 — Security & Attendance Prototype

Prototype ini dibuat dari basis v3.5.3 tanpa mengganti arsitektur Vercel + Google Apps Script + Google Sheets.

## Yang sudah diterapkan

- Session login dipindahkan ke cookie `HttpOnly; Secure; SameSite=Strict` di gateway Vercel.
- Migrasi transparan dari token v3.5 yang sebelumnya tersimpan di `localStorage`.
- Rate limiting login/check-in pada gateway dan backend Apps Script.
- Timeout upstream Vercel → Apps Script (45 detik) dan request ID.
- Kartu Anggota Digital menampilkan PIN check-in 6 digit dan QR identitas NTA.
- PIN dihitung server-side menggunakan secret Script Properties; tidak perlu kolom PIN baru di Google Sheet.
- Public QR attendance sekarang memerlukan NTA + PIN.
- Audit Log dapat dibuka Administrator dari menu Pengguna.
- Login/logout/check-in QR ikut dicatat ke `System_Log`.
- PWA cache dinaikkan ke v3.6.0 dan update tersedia melalui banner “Versi baru tersedia”.
- Header keamanan tambahan pada deployment Vercel.

## Langkah deploy

1. Ganti kode Apps Script dengan `GAS_BACKEND/Kode_Vercel_API.gs`, simpan, lalu deploy ulang Web App Apps Script.
2. Pastikan Environment Variables Vercel `GAS_API_URL` dan `GAS_API_SECRET` tetap terisi.
3. Deploy project ini ke Vercel.
4. Login sebagai Admin/Pengurus, buka Data Anggota → tombol Kartu Anggota. PIN akan dibuat otomatis.
5. Mulai kegiatan dan buka QR Absensi. Form publik kini meminta NTA dan PIN.
6. Admin dapat membuka Pengguna → Audit Log.

## Catatan prototype

- QR pada kartu anggota saat ini mengenkode NTA saja; PIN tetap ditampilkan terpisah agar PIN tidak dikirim ke layanan QR pihak ketiga.
- Rate limiter di Vercel bersifat best-effort per instance; limiter backend Apps Script tetap membatasi percobaan per username/NTA. Untuk deployment skala besar, rate limit terdistribusi (mis. Redis/KV) disarankan.
- PIN berubah jika NTA anggota berubah atau secret PIN di Script Properties diganti.
