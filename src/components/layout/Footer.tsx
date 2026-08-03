/**
 * Footer — arketipe "statement" (Ft1): band pernyataan + CTA di atas,
 * lalu kolom tautan ringkas + kontak, bottom bar.
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
  { to: '/galeri', label: 'Galeri' },
  { to: '/testimoni', label: 'Testimoni' },
]

const LINK_BANTU = [
  { to: '/faq', label: 'FAQ' },
  { to: '/pendaftaran', label: 'Form Pendaftaran' },
  { to: '/lokasi', label: 'Lokasi Kantor' },
  { to: '/kontak', label: 'Kontak' },
]

function Footer() {
  return (
    <footer>
      {/* Band 1 — pernyataan + CTA */}
      <div className="bg-brand-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Icon name="kaaba" className="h-5 w-5" />
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                Ebitour<span className="text-brand-400">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
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

          <div className="lg:justify-self-end lg:text-right">
            <h2 className="font-display text-2xl text-white sm:text-3xl">
              Siap Menunaikan Ibadah Umrah?
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Konsultasikan rencana perjalanan ibadah Anda bersama admin kami.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 lg:justify-end">
              <a
                href={waLink('Assalamualaikum, saya ingin mendaftar paket umrah Ebitour')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-brand-800 shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Icon name="whatsapp" className="h-4 w-4 text-green-600" />
                Konsultasi via WhatsApp
              </a>
              <Link
                to="/paket-umrah"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Lihat Paket Umrah
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Band 2 — tautan ringkas + kontak */}
      <div className="bg-brand-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">
              Halaman
            </h3>
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

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">
              Bantuan
            </h3>
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

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">
              Hubungi Kami
            </h3>
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
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-brand-950 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {KONTAK.nama}. Hak cipta dilindungi.
      </div>
    </footer>
  )
}

export default Footer
