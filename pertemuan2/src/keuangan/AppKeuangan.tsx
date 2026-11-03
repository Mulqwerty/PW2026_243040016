import { useEffect, useState } from 'react'
import DaftarTransaksi from './DaftarTransaksi'
import FormTransaksi from './FormTransaksi'
import type { Transaksi, TransaksiBaru } from './types'
import './keuangan.css'

const KUNCI_PENYIMPANAN = 'catatan-keuangan-transaksi'
const formatRupiah = (nilai: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 2,
  }).format(nilai)

function isTransaksi(value: unknown): value is Transaksi {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const transaksi = value as Record<string, unknown>
  return (
    typeof transaksi.id === 'number' &&
    Number.isSafeInteger(transaksi.id) &&
    typeof transaksi.keterangan === 'string' &&
    typeof transaksi.nominal === 'number' &&
    Number.isFinite(transaksi.nominal) &&
    transaksi.nominal > 0 &&
    (transaksi.jenis === 'pemasukan' || transaksi.jenis === 'pengeluaran')
  )
}

function bacaTransaksiTersimpan(): Transaksi[] {
  const dataTersimpan = localStorage.getItem(KUNCI_PENYIMPANAN)
  if (dataTersimpan === null) {
    return []
  }

  const data: unknown = JSON.parse(dataTersimpan)
  if (!Array.isArray(data) || !data.every(isTransaksi)) {
    throw new Error('Data catatan keuangan di localStorage memiliki format yang tidak valid.')
  }

  return data
}

function AppKeuangan() {
  const [transaksi, setTransaksi] = useState<Transaksi[]>(bacaTransaksiTersimpan)

  useEffect(() => {
    localStorage.setItem(KUNCI_PENYIMPANAN, JSON.stringify(transaksi))
  }, [transaksi])

  const tambahTransaksi = (transaksiBaru: TransaksiBaru) => {
    setTransaksi((transaksiSaatIni) => {
      const id = Math.max(Date.now(), ...transaksiSaatIni.map((item) => item.id + 1))
      return [...transaksiSaatIni, { ...transaksiBaru, id }]
    })
  }

  const hapusTransaksi = (id: number) => {
    setTransaksi((transaksiSaatIni) =>
      transaksiSaatIni.filter((item) => item.id !== id),
    )
  }

  const saldo = transaksi.reduce(
    (total, item) =>
      total + (item.jenis === 'pemasukan' ? item.nominal : -item.nominal),
    0,
  )

  return (
    <main className="keuangan-app">
      <header className="header-keuangan">
        <div>
          <p className="label-keuangan">PRAKTIKUM WEB · MODUL 2</p>
          <h1>Catatan Keuangan Mini</h1>
          <p className="deskripsi-keuangan">
            Catat pemasukan dan pengeluaranmu dalam satu tempat.
          </p>
        </div>
        <a href="/" className="tautan-tugas">
          Daftar Tugas Praktikum
        </a>
      </header>

      <section className="saldo-card" aria-label="Ringkasan saldo">
        <span>Total saldo</span>
        <strong>{formatRupiah(saldo)}</strong>
        <small>Dihitung otomatis dari seluruh transaksi</small>
      </section>

      <section className="panel-keuangan">
        <h2>Tambah Transaksi</h2>
        <FormTransaksi onTambah={tambahTransaksi} />
      </section>

      <section className="panel-keuangan">
        <div className="judul-daftar">
          <h2>Riwayat Transaksi</h2>
          <span>{transaksi.length} transaksi</span>
        </div>
        <DaftarTransaksi
          transaksi={transaksi}
          formatRupiah={formatRupiah}
          onHapus={hapusTransaksi}
        />
      </section>
    </main>
  )
}

export default AppKeuangan
