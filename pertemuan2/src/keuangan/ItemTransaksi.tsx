import type { Transaksi } from './types'

interface ItemTransaksiProps {
  transaksi: Transaksi
  formatRupiah: (nilai: number) => string
  onHapus: (id: number) => void
}

function ItemTransaksi({ transaksi, formatRupiah, onHapus }: ItemTransaksiProps) {
  const pemasukan = transaksi.jenis === 'pemasukan'

  return (
    <li className="item-transaksi">
      <div className="detail-transaksi">
        <strong>{transaksi.keterangan}</strong>
        <span>{pemasukan ? 'Pemasukan' : 'Pengeluaran'}</span>
      </div>
      <strong className={pemasukan ? 'nilai-pemasukan' : 'nilai-pengeluaran'}>
        {pemasukan ? '+' : '−'}
        {formatRupiah(transaksi.nominal)}
      </strong>
      <button
        className="tombol-hapus-transaksi"
        type="button"
        aria-label={`Hapus transaksi ${transaksi.keterangan}`}
        onClick={() => onHapus(transaksi.id)}
      >
        Hapus
      </button>
    </li>
  )
}

export default ItemTransaksi
