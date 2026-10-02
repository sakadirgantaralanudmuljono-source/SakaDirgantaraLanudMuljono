# QA Checklist

## Authentication
- [ ] Password salah ditolak
- [ ] User nonaktif ditolak
- [ ] Token invalid/expired diarahkan ke login
- [ ] Refresh browser melakukan `auth.me`
- [ ] Logout menghapus token

## Authorization
- [ ] Anggota tidak dapat membuka route admin
- [ ] Request API admin dari akun anggota ditolak backend
- [ ] Identitas absensi berasal dari session backend

## Geofence
- [ ] Permission GPS ditolak -> tidak absen
- [ ] GPS unavailable -> tidak absen
- [ ] Accuracy di luar batas -> tidak absen
- [ ] Timestamp GPS basi -> tidak absen
- [ ] Di luar radius -> tidak absen
- [ ] Di dalam radius -> berhasil
- [ ] Radius dihitung backend

## Data integrity
- [ ] Double click tidak menggandakan absensi
- [ ] Refresh tidak menggandakan transaksi
- [ ] Error backend tidak ditampilkan sebagai sukses

## Vercel
- [ ] `/api/health` 200
- [ ] Deep link `/dashboard` dapat direfresh
- [ ] Environment production tidak menggunakan mock
- [ ] `GAS_PROXY_SECRET` tidak muncul di source browser
