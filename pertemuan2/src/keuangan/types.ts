export type JenisTransaksi = 'pemasukan' | 'pengeluaran'

export interface Transaksi {
  id: number
  keterangan: string
  nominal: number
  jenis: JenisTransaksi
}

export type TransaksiBaru = Omit<Transaksi, 'id'>
