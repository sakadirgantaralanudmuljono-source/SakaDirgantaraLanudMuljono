# Performance Optimization

- activity.list memakai pagination server-side GAS.
- CacheService digunakan untuk list kegiatan selama 120 detik.
- Frontend memakai request cache untuk data yang sering dipanggil.
- Route React menggunakan lazy loading.
- Hindari request modul berulang.
