/**
 * Halaman: Artikel (Blog)
 * Route: /artikel
 * Status: KOSONG — artikel belum tersedia. Tampilkan empty state
 * dengan arahan ke WhatsApp/kontak. Diisi saat konten artikel siap.
 */
import { Link } from 'react-router-dom'
import Icon from '../components/ui/Icon'
import { waLink } from '../utils/format'

function Artikel() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-soft">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
          <Icon name="sparkle" className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-3xl text-brand-900">Artikel Segera Hadir</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
          Belum ada artikel yang bisa ditampilkan. Nantikan tips persiapan
          umrah, berita keberangkatan, dan cerita jamaah di sini.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={waLink('Assalamualaikum, saya ingin bertanya tentang umrah Ebitour')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Tanya via WhatsApp
          </a>
          <Link
            to="/kontak"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-brand-300 hover:text-brand-600"
          >
            Hubungi Kami
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Artikel
