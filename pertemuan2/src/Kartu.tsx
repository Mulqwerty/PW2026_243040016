import type { PropsWithChildren } from 'react'

interface KartuProps extends PropsWithChildren {
  judul: string
}

function Kartu({ judul, children }: KartuProps) {
  return (
    <section className="kartu">
      <h2>{judul}</h2>
      {children}
    </section>
  )
}

export default Kartu
