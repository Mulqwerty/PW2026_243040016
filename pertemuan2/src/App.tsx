import { useEffect, useState } from 'react'
import './App.css'
import FormTugas from './FormTugas'
import ItemTugas from './ItemTugas'
import Kartu from './Kartu'
import Penghitung from './Penghitung'
import type { Tugas } from './types'

const tugasAwal: Tugas[] = [
  { id: 1, judul: 'Install Node.js dan Vite', selesai: true },
  { id: 2, judul: 'Pelajari useState', selesai: false },
]

type FilterTugas = 'semua' | 'belum' | 'selesai'

function isTugas(value: unknown): value is Tugas {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const tugas = value as Record<string, unknown>
  return (
    typeof tugas.id === 'number' &&
    typeof tugas.judul === 'string' &&
    typeof tugas.selesai === 'boolean'
  )
}

function bacaTugasTersimpan(): Tugas[] {
  const dataTersimpan = localStorage.getItem('daftar-tugas')
  if (dataTersimpan === null) {
    return tugasAwal
  }

  const data: unknown = JSON.parse(dataTersimpan)
  if (!Array.isArray(data) || !data.every(isTugas)) {
    throw new Error('Data "daftar-tugas" di localStorage memiliki format yang tidak valid.')
  }

  return data
}

function App() {
  const [daftarTugas, setDaftarTugas] = useState<Tugas[]>(bacaTugasTersimpan)
  const [filter, setFilter] = useState<FilterTugas>('semua')

  useEffect(() => {
    console.log('Aplikasi Daftar Tugas siap digunakan!')
  }, [])

  useEffect(() => {
    const sisa = daftarTugas.filter((tugas) => !tugas.selesai).length
    document.title = `(${sisa}) Tugas Belum Selesai`
  }, [daftarTugas])

  useEffect(() => {
    localStorage.setItem('daftar-tugas', JSON.stringify(daftarTugas))
  }, [daftarTugas])

  const tambahTugas = (judul: string) => {
    setDaftarTugas((tugasSaatIni) => {
      const id = Math.max(Date.now(), ...tugasSaatIni.map((tugas) => tugas.id + 1))
      return [...tugasSaatIni, { id, judul, selesai: false }]
    })
  }

  const ubahStatus = (id: number) => {
    setDaftarTugas((tugasSaatIni) =>
      tugasSaatIni.map((tugas) =>
        tugas.id === id ? { ...tugas, selesai: !tugas.selesai } : tugas,
      ),
    )
  }

  const hapusTugas = (id: number) => {
    setDaftarTugas((tugasSaatIni) => tugasSaatIni.filter((tugas) => tugas.id !== id))
  }

  const hapusTugasSelesai = () => {
    setDaftarTugas((tugasSaatIni) => tugasSaatIni.filter((tugas) => !tugas.selesai))
  }

  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length
  const tugasDitampilkan = daftarTugas.filter((tugas) => {
    if (filter === 'belum') {
      return !tugas.selesai
    }

    if (filter === 'selesai') {
      return tugas.selesai
    }

    return true
  })

  return (
    <main className="wadah">
      <h1 className="judul">Daftar Tugas Praktikum</h1>
      <p className="subjudul">Laboratorium Informatika - Modul 2: React Lanjutan</p>
      <a className="tautan-aplikasi" href="/keuangan.html">
        Buka Catatan Keuangan Mini
      </a>

      <Penghitung />

      <Kartu judul="Tambah Tugas Baru">
        <FormTugas onTambah={tambahTugas} />
      </Kartu>

      <Kartu judul="Daftar Tugas">
        <p className="ringkasan">
          {jumlahSelesai} dari {daftarTugas.length} tugas selesai
        </p>

        <div className="filter-tugas" role="group" aria-label="Filter daftar tugas">
          {([
            ['semua', 'Semua'],
            ['belum', 'Belum Selesai'],
            ['selesai', 'Selesai'],
          ] as const).map(([nilai, label]) => (
            <button
              key={nilai}
              className={`tombol tombol-filter${filter === nilai ? ' tombol-filter-aktif' : ''}`}
              type="button"
              aria-pressed={filter === nilai}
              onClick={() => setFilter(nilai)}
            >
              {label}
            </button>
          ))}
        </div>

        {jumlahSelesai > 0 && (
          <button
            className="tombol tombol-merah tombol-hapus-selesai"
            type="button"
            onClick={hapusTugasSelesai}
          >
            Hapus Semua yang Selesai
          </button>
        )}

        {daftarTugas.length === 0 ? (
          <p className="kosong">Belum ada tugas. Yuk tambahkan tugas pertamamu!</p>
        ) : tugasDitampilkan.length === 0 ? (
          <p className="kosong">Tidak ada tugas dalam kategori ini.</p>
        ) : (
          <ul className="daftar">
            {tugasDitampilkan.map((tugas) => (
              <ItemTugas
                key={tugas.id}
                tugas={tugas}
                onUbahStatus={ubahStatus}
                onHapus={hapusTugas}
              />
            ))}
          </ul>
        )}
      </Kartu>
    </main>
  )
}

export default App
