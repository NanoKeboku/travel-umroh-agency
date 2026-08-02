/**
 * Layout — pembungkus seluruh halaman
 * Berisi: Navbar + konten halaman (Outlet) + Footer + FloatingWhatsApp
 */
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingWhatsApp from './FloatingWhatsApp'
import useScrollToTop from '../../hooks/useScrollToTop'

function Layout() {
  useScrollToTop()

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default Layout
