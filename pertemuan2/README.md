# Praktikum Web - Modul 2

Aplikasi praktikum React dan TypeScript untuk latihan interaksi, state, formulir, efek samping, dan pembaruan daftar secara immutable.

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

Buka halaman yang sesuai dari alamat Vite:

- `/` untuk **Daftar Tugas Praktikum**.
- `/keuangan.html` untuk **Catatan Keuangan Mini**.

## Daftar Tugas Praktikum

- Penghitung klik, formulir tugas terkendali (judul maksimal 50 karakter), dan komponen kartu dengan `children`.
- Tambah, ubah status, dan hapus tugas menggunakan pembaruan state immutable.
- Filter Semua, Belum Selesai, dan Selesai; hapus massal untuk tugas selesai.
- Data dibaca dan disimpan di `localStorage`; judul tab menampilkan jumlah tugas belum selesai.

## Catatan Keuangan Mini

- Formulir terkendali dengan validasi keterangan, nominal positif, dan jenis transaksi.
- Transaksi dapat dihapus; saldo dihitung dari transaksi yang tersimpan di state.
- Nilai pemasukan dan pengeluaran dibedakan dengan warna dan tanda.
- Daftar tersimpan di `localStorage` dan menampilkan pesan khusus saat kosong.

## Validasi

```bash
npm run build
npm run lint
```

Kedua halaman memakai komponen terpisah dan dapat diuji dengan menyegarkan halaman untuk memastikan data lokal tetap tersimpan.

Laporan, analisis, hasil skenario uji, dan tangkapan layar tersedia di [Laporan Praktikum Modul 2](./Laporan%20Praktikum%20Modul%202.md).
