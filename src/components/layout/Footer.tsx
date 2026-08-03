/**
 * Footer — multi-kolom + bottom bar
 * Konten data dari src/data/kontak.ts (placeholder — ganti data asli Ebitour)
 */
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { KONTAK } from '../../data/kontak'
import { waLink } from '../../utils/format'

const LINK_UTAMA = [
  { to: '/tentang', label: 'Tentang Kami' },
  { to: '/paket-umrah', label: 'Paket Umrah' },
  { to: '/paket-haji', label: 'Paket Haji' },
  { to: '/dokumentasi', label: 'Dokumentasi' },
  { to: '/testimoni', label: 'Testimoni' },
  { to: '/artikel', label: 'Artikel' },
]

const LINK_BANTU = [
  { to: '/faq', label: 'FAQ' },
  { to: '/pendaftaran', label: 'Form Pendaftaran' },
  { to: '/lokasi', label: 'Lokasi Kantor' },
  { to: '/kontak', label: 'Kontak' },
]

function Footer() {
  return (
    <footer className="bg-brand-800 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Kolom 1: Profil */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            {/* <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Icon name="kaaba" className="h-5 w-5" />
            </span> */}
            <span className="text-lg font-extrabold tracking-tight">
              Ebitour<span className="text-brand-400">.</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Travel umrah & haji terpercaya di Purworejo. Mendampingi perjalanan
            ibadah Anda dengan pelayanan profesional dan penuh keikhlasan.
          </p>
          {/* Sosmed (placeholder link) */}
          <div className="mt-5 flex gap-2.5">
            {(
              [
                { ikon: 'facebook', label: 'Facebook', href: KONTAK.sosmed.facebook },
                { ikon: 'sparkle', label: 'Instagram', href: KONTAK.sosmed.instagram },
                { ikon: 'whatsapp', label: 'WhatsApp', href: waLink('Assalamualaikum') },
              ] as const
            ).map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-brand-600 hover:text-white"
              >
                <Icon name={s.ikon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Kolom 2: Tautan utama */}
        <div>
          <p className="text-sm font-normal tracking-wide text-white/70">
            Halaman
          </p>
          <ul className="mt-4 space-y-2.5">
            {LINK_UTAMA.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Bantuan */}
        <div>
          <p className="text-sm font-normal tracking-wide text-white/70">
            Bantuan
          </p>
          <ul className="mt-4 space-y-2.5">
            {LINK_BANTU.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 4: Kontak */}
        <div>
          <p className="text-sm font-normal tracking-wide text-white/70">
            Hubungi Kami
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-3">
              <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              {KONTAK.alamat}
            </li>
            <li>
              <a
                href={waLink('Assalamualaikum, saya ingin bertanya tentang Ebitour')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Icon name="whatsapp" className="h-4 w-4 shrink-0 text-brand-400" />
                {KONTAK.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`tel:${KONTAK.telepon}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Icon name="phone" className="h-4 w-4 shrink-0 text-brand-400" />
                {KONTAK.telepon}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${KONTAK.email}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Icon name="mail" className="h-4 w-4 shrink-0 text-brand-400" />
                {KONTAK.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {KONTAK.nama}. Hak cipta dilindungi.
      </div>
    </footer>
  )
}

export default Footer
