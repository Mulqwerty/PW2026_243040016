# Praktikum Web - Modul 2

Aplikasi Daftar Tugas Praktikum dibuat dengan React dan TypeScript, mengikuti panduan laboratorium sampai Langkah 7B.

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

## Fitur

- Penghitung klik dengan `useState` dan conditional rendering.
- Form tugas terkendali dengan validasi judul maksimal 50 karakter.
- Penambahan, perubahan status, dan penghapusan tugas secara immutable.
- Komponen kartu yang menerima `children`.
- Inisialisasi daftar tugas dari `localStorage` (Langkah 7B), dengan dua tugas contoh jika belum ada data tersimpan.

Penyimpanan perubahan ke `localStorage` serta pembaruan judul tab merupakan Langkah 7C dan belum termasuk dalam cakupan ini.
