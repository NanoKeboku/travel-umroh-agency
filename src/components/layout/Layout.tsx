/**
 * Layout — pembungkus seluruh halaman
 * Berisi: Navbar + konten halaman (Outlet) + Footer + FloatingWhatsApp
 */
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ChatWidget from '../chat/ChatWidget'
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
      <ChatWidget />
    </div>
  )
}

export default Layout
