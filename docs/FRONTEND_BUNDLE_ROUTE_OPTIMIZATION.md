# Frontend Bundle & Route Optimization

## Perubahan

1. Route sudah menggunakan React.lazy sehingga halaman tidak dimuat seluruhnya pada initial load.
2. Loading state route dipisahkan menjadi komponen reusable.
3. Vite manualChunks ditambahkan untuk memisahkan:
- React runtime
- icon library
- spreadsheet engine XLSX

## Dampak

Initial bundle lebih kecil karena library berat tidak masuk ke bundle utama.
Halaman hanya mengambil modul ketika route dibuka.

## File terkait

Frontend:
- src/routes/AppRoutes.jsx
- src/components/common/RouteLoader.jsx
- vite.config.js

GAS:
Tidak ada perubahan. Tahap ini hanya optimalisasi sisi client.
Backend tetap menggunakan:
- ServerQuery.gs
- PerformanceCache.gs
- ApiGateway.gs
