/**
 * Navbar — navigasi utama (sticky, mobile menu)
 * "Layanan" = dropdown berisi Paket Umrah & Paket Haji.
 * Desktop: dropdown muncul saat hover. Mobile: item bisa di-expand.
 */
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Icon from '../ui/Icon'

const NAV_ITEMS = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang', label: 'Tentang Kami' },
  { to: '/dokumentasi', label: 'Dokumentasi' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/artikel', label: 'Artikel' },
  { to: '/kontak', label: 'Kontak' },
]

const LAYANAN_ITEMS = [
  { to: '/paket-umrah', label: 'Paket Umrah' },
  { to: '/paket-haji', label: 'Paket Haji' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [layananOpen, setLayananOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Icon name="kaaba" className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-brand-900">
            Ebitour<span className="text-brand-500">.</span>
          </span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}

          {/* Dropdown Layanan (hover) */}
          <li className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-brand-600"
            >
              Layanan
              <Icon
                name="chevronDown"
                className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
              />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 rounded-xl bg-white p-2 opacity-0 shadow-xl ring-1 ring-gray-100 transition-all duration-150 group-hover:visible group-hover:opacity-100">
              {LAYANAN_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-brand-600'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </li>
        </ul>

        {/* CTA desktop */}
        <div className="hidden lg:block">
          <NavLink
            to="/pendaftaran"
            className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Daftar Sekarang
          </NavLink>
        </div>

        {/* Tombol hamburger (mobile) */}
        <button
          type="button"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
          onClick={() => {
            setOpen((o) => !o)
            setLayananOpen(false)
          }}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
        >
          <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-6 pt-2 lg:hidden">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {/* Layanan — expandable */}
            <li>
              <button
                type="button"
                onClick={() => setLayananOpen((o) => !o)}
                aria-expanded={layananOpen}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Layanan
                <Icon
                  name="chevronDown"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    layananOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {layananOpen && (
                <ul className="ml-3 space-y-1 border-l border-gray-100 pl-3">
                  {LAYANAN_ITEMS.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-brand-50 text-brand-700'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li className="pt-2">
              <NavLink
                to="/pendaftaran"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-brand-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
              >
                Daftar Sekarang
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
