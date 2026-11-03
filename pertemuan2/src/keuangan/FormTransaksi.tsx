import { useState, type FormEvent } from 'react'
import type { JenisTransaksi, TransaksiBaru } from './types'

interface FormTransaksiProps {
  onTambah: (transaksi: TransaksiBaru) => void
}

function FormTransaksi({ onTambah }: FormTransaksiProps) {
  const [keterangan, setKeterangan] = useState('')
  const [nominal, setNominal] = useState('')
  const [jenis, setJenis] = useState<JenisTransaksi>('pemasukan')
  const nilaiNominal = Number(nominal)
  const keteranganTidakValid = keterangan.trim() === '' || keterangan.trim().length > 80
  const nominalTidakValid = !Number.isFinite(nilaiNominal) || nilaiNominal <= 0
  const tidakValid = keteranganTidakValid || nominalTidakValid

  const tanganiKirim = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (tidakValid) {
      return
    }

    onTambah({
      keterangan: keterangan.trim(),
      nominal: nilaiNominal,
      jenis,
    })
    setKeterangan('')
    setNominal('')
    setJenis('pemasukan')
  }

  return (
    <form className="form-transaksi" onSubmit={tanganiKirim}>
      <label className="field-transaksi">
        <span>Keterangan</span>
        <input
          type="text"
          value={keterangan}
          maxLength={80}
          placeholder="Contoh: Gaji bulanan"
          onChange={(event) => setKeterangan(event.target.value)}
          required
        />
      </label>

      <div className="field-row">
        <label className="field-transaksi">
          <span>Nominal (Rp)</span>
          <input
            type="number"
            value={nominal}
            min="0.01"
            step="0.01"
            placeholder="50000"
            onChange={(event) => setNominal(event.target.value)}
            required
          />
        </label>

        <label className="field-transaksi">
          <span>Jenis</span>
          <select
            value={jenis}
            onChange={(event) => {
              const nilaiJenis = event.target.value
              if (nilaiJenis === 'pemasukan' || nilaiJenis === 'pengeluaran') {
                setJenis(nilaiJenis)
              }
            }}
          >
            <option value="pemasukan">Pemasukan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
        </label>
      </div>

      {keterangan.trim().length > 80 && (
        <p className="pesan-validasi">Keterangan maksimal 80 karakter.</p>
      )}
      {nominal !== '' && nominalTidakValid && (
        <p className="pesan-validasi">Nominal harus berupa angka lebih besar dari nol.</p>
      )}

      <button className="tombol-simpan" type="submit" disabled={tidakValid}>
        Tambah Transaksi
      </button>
    </form>
  )
}

export default FormTransaksi
