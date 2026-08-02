/**
 * Navbar — navigasi utama
 * Status: KERANGKA — siap diisi (logo, menu responsif, tombol CTA)
 */
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang', label: 'Tentang Kami' },
  { to: '/paket-umrah', label: 'Paket Umrah' },
  { to: '/paket-haji', label: 'Paket Haji' },
  { to: '/dokumentasi', label: 'Dokumentasi' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/artikel', label: 'Artikel' },
  { to: '/kontak', label: 'Kontak' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-brand-900">
          Ebitour<span className="text-brand-600">.</span>
        </NavLink>

        {/* Menu (desktop) */}
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-600'
                      : 'text-gray-600 hover:text-brand-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <NavLink
          to="/pendaftaran"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Daftar Sekarang
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
