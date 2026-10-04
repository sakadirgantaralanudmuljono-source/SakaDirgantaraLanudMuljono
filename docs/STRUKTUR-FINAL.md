# Struktur Final SAKA Dirgantara

## Backend Google Apps Script
- Kode.gs : seluruh business logic dan akses spreadsheet.
- ApiGateway.gs : satu-satunya pintu REST API dari Vercel.

## Frontend Vercel
- src/pages : halaman aplikasi.
- src/services : komunikasi API.
- api/gas.js : proxy aman menuju Google Apps Script.

## Aturan integrasi
- Action frontend harus memiliki case pada ApiGateway.gs.
- Secret GAS hanya berada pada environment Vercel dan Script Properties.
- Frontend tidak memanggil Google Apps Script secara langsung.
