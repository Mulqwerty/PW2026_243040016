import { useState } from 'react'
import Kartu from './Kartu'

function Penghitung() {
  const [jumlah, setJumlah] = useState(0)

  return (
    <Kartu judul="Penghitung Klik">
      <p>Tombol sudah diklik {jumlah} kali</p>
      {jumlah >= 5 && <p>Wah, kamu rajin sekali mengklik!</p>}
      <div className="baris">
        <button className="tombol" onClick={() => setJumlah((nilai) => nilai + 1)}>
          Klik Saya
        </button>
        <button className="tombol tombol-merah" onClick={() => setJumlah(0)}>
          Ulangi
        </button>
      </div>
    </Kartu>
  )
}

export default Penghitung
