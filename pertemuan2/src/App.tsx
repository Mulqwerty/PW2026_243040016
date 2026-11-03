import { useState } from 'react'
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

  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length

  return (
    <main className="wadah">
      <h1 className="judul">Daftar Tugas Praktikum</h1>
      <p className="subjudul">Laboratorium Informatika - Modul 2: React Lanjutan</p>

      <Penghitung />

      <Kartu judul="Tambah Tugas Baru">
        <FormTugas onTambah={tambahTugas} />
      </Kartu>

      <Kartu judul="Daftar Tugas">
        <p className="ringkasan">
          {jumlahSelesai} dari {daftarTugas.length} tugas selesai
        </p>

        {daftarTugas.length === 0 ? (
          <p className="kosong">Belum ada tugas. Yuk tambahkan tugas pertamamu!</p>
        ) : (
          <ul className="daftar">
            {daftarTugas.map((tugas) => (
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
