/**
 * Halaman: Galeri
 * Route: /galeri
 * Status: KOSONG — galeri foto/video belum tersedia.
 * Foto dokumentasi sementara bisa dilihat di halaman /dokumentasi.
 */
import { Link } from 'react-router-dom'
import Icon from '../components/ui/Icon'
import { waLink } from '../utils/format'

function Galeri() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-soft">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
          <Icon name="sparkle" className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-3xl text-brand-900">Galeri Segera Hadir</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
          Galeri foto & video perjalanan jamaah sedang disiapkan. Sementara
          itu, lihat dokumentasi keberangkatan di halaman Dokumentasi.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/dokumentasi"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Lihat Dokumentasi
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
          <a
            href={waLink('Assalamualaikum, saya ingin melihat foto/video dokumentasi Ebitour')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-brand-300 hover:text-brand-600"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Minta via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export default Galeri
