import ItemTransaksi from './ItemTransaksi'
import type { Transaksi } from './types'

interface DaftarTransaksiProps {
  transaksi: Transaksi[]
  formatRupiah: (nilai: number) => string
  onHapus: (id: number) => void
}

function DaftarTransaksi({
  transaksi,
  formatRupiah,
  onHapus,
}: DaftarTransaksiProps) {
  if (transaksi.length === 0) {
    return (
      <p className="kosong-transaksi">
        Belum ada transaksi. Tambahkan pemasukan atau pengeluaran pertamamu.
      </p>
    )
  }

  return (
    <ul className="daftar-transaksi">
      {transaksi.map((item) => (
        <ItemTransaksi
          key={item.id}
          transaksi={item}
          formatRupiah={formatRupiah}
          onHapus={onHapus}
        />
      ))}
    </ul>
  )
}

export default DaftarTransaksi
