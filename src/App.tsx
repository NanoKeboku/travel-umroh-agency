/**
 * App — routing utama
 * Semua route dibungkus Layout (Navbar + Footer + FloatingWhatsApp)
 * Status: KERANGKA — route sudah terpasang, konten halaman menyusul
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import PaketUmrah from './pages/PaketUmrah'
import PaketDetail from './pages/PaketDetail'
import PaketHaji from './pages/PaketHaji'
import Pembimbing from './pages/Pembimbing'
import Muthawif from './pages/Muthawif'
import Dokumentasi from './pages/Dokumentasi'
import Galeri from './pages/Galeri'
import Testimoni from './pages/Testimoni'
import Artikel from './pages/Artikel'
import FAQ from './pages/FAQ'
import Kontak from './pages/Kontak'
import Lokasi from './pages/Lokasi'
import Pendaftaran from './pages/Pendaftaran'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route publik — dibungkus Layout (Navbar + Footer + FloatingWA) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/paket-umrah" element={<PaketUmrah />} />
          <Route path="/paket-umrah/:slug" element={<PaketDetail />} />
          <Route path="/paket-haji" element={<PaketHaji />} />
          <Route path="/paket-haji/:slug" element={<PaketDetail />} />
          <Route path="/pembimbing" element={<Pembimbing />} />
          <Route path="/muthawif" element={<Muthawif />} />
          <Route path="/dokumentasi" element={<Dokumentasi />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/lokasi" element={<Lokasi />} />
          <Route path="/pendaftaran" element={<Pendaftaran />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Route admin — DI LUAR Layout (tanpa navbar/footer), akses langsung /admin */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
