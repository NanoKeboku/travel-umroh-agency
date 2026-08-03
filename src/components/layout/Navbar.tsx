/**
 * Navbar — navigasi utama (sticky, mobile menu)
 * Arketipe: masthead (N6) — utility bar (kontak) di atas + bar navigasi utama.
 * "Paket Umrah" & "Paket Haji" digabung di dropdown "Layanan".
 */
import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon'
import { KONTAK } from '../../data/kontak'
import { waLink } from '../../utils/format'

const NAV_AWAL = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang', label: 'Tentang Kami' },
]

const NAV_AKHIR = [
  { to: '/dokumentasi', label: 'Dokumentasi' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/artikel', label: 'Artikel' },
  { to: '/kontak', label: 'Kontak' },
]

function Navbar() {
  const [open, setOpen] = useState(false) // menu mobile
  const [layananOpen, setLayananOpen] = useState(false) // dropdown desktop
  const [layananMobileOpen, setLayananMobileOpen] = useState(false) // accordion mobile
  const location = useLocation()

  const layananAktif =
    location.pathname.startsWith('/paket-umrah') ||
    location.pathname.startsWith('/paket-haji')

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600'
    }`

  const layananItemCls = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'
    }`

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar — kontak singkat (masthead, tersembunyi di mobile) */}
      <div className="hidden border-b border-white/10 bg-brand-950 text-white/80 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <p className="flex items-center gap-1.5">
            <Icon name="mapPin" className="h-3.5 w-3.5 text-brand-300" />
            {KONTAK.alamat}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${KONTAK.telepon}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Icon name="phone" className="h-3.5 w-3.5 text-brand-300" />
              {KONTAK.telepon}
            </a>
            <a
              href={waLink('Assalamualaikum, saya ingin bertanya tentang Ebitour')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Icon name="whatsapp" className="h-3.5 w-3.5 text-brand-300" />
              WhatsApp
            </a>
            <a
              href={`mailto:${KONTAK.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Icon name="mail" className="h-3.5 w-3.5 text-brand-300" />
              {KONTAK.email}
            </a>
          </div>
        </div>
      </div>

      {/* Bar navigasi utama */}
      <div className="border-b border-gray-100 bg-white/90 backdrop-blur">
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
            {NAV_AWAL.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}

            {/* Dropdown Layanan (Paket Umrah + Paket Haji) */}
            <li className="relative">
              <button
                type="button"
                onClick={() => setLayananOpen((o) => !o)}
                aria-expanded={layananOpen}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  layananAktif ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600'
                }`}
              >
                Layanan
                <Icon
                  name="chevronDown"
                  className={`h-4 w-4 transition-transform ${layananOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {layananOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setLayananOpen(false)}
                    aria-hidden="true"
                  />
                  <div className="absolute left-0 top-full z-20 mt-2 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                    <NavLink
                      to="/paket-umrah"
                      onClick={() => setLayananOpen(false)}
                      className={layananItemCls}
                    >
                      Paket Umrah
                    </NavLink>
                    <NavLink
                      to="/paket-haji"
                      onClick={() => setLayananOpen(false)}
                      className={layananItemCls}
                    >
                      Paket Haji
                    </NavLink>
                  </div>
                </>
              )}
            </li>

            {NAV_AKHIR.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
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
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </nav>

        {/* Menu mobile */}
        {open && (
          <div className="border-t border-gray-100 bg-white px-4 pb-6 pt-2 lg:hidden">
            <ul className="space-y-1">
              {NAV_AWAL.map((item) => (
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

              {/* Layanan (accordion mobile) */}
              <li>
                <button
                  type="button"
                  onClick={() => setLayananMobileOpen((o) => !o)}
                  aria-expanded={layananMobileOpen}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    layananAktif
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Layanan
                  <Icon
                    name="chevronDown"
                    className={`h-4 w-4 transition-transform ${
                      layananMobileOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {layananMobileOpen && (
                  <ul className="ml-3 mt-1 space-y-1 border-l-2 border-brand-100 pl-3">
                    <li>
                      <NavLink
                        to="/paket-umrah"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-brand-50 text-brand-700'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`
                        }
                      >
                        Paket Umrah
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/paket-haji"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-brand-50 text-brand-700'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`
                        }
                      >
                        Paket Haji
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {NAV_AKHIR.map((item) => (
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
      </div>
    </header>
  )
}

export default Navbar
