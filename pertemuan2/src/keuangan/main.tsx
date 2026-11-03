import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppKeuangan from './AppKeuangan'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Elemen #root tidak ditemukan.')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppKeuangan />
  </StrictMode>,
)
