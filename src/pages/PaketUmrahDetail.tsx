/**
 * Halaman: Detail Paket Umrah
 * Route: /paket-umrah/:slug
 * Status: KERANGKA — struktur section sesuai blueprint
 * (FITUR-PENCARIAN-TIKET.md 3b & 3c): header, harga kamar, deskripsi,
 * spesial program, penerbangan, fasilitas, persyaratan, S&K, itinerary,
 * form pesan. Konten detail menyusul fase 2.
 */
import { Link, useParams } from 'react-router-dom'
import { PAKET_UMRAH, PAKET_HAJI } from '../data/paket'
import Badge from '../components/ui/Badge'
import PesanPaketForm from '../components/paket/PesanPaketForm'
import { formatRupiah } from '../utils/format'

function PaketUmrahDetail() {
  const { slug } = useParams()
  const paket = [...PAKET_UMRAH, ...PAKET_HAJI].find((p) => p.id === slug)

  if (!paket) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-brand-900">Paket tidak ditemukan</h1>
        <p className="mt-3 text-gray-500">
          Paket dengan tautan ini tidak ada atau sudah tidak tersedia.
        </p>
        <Link
          to="/paket-umrah"
          className="mt-6 inline-block font-semibold text-brand-600 hover:underline"
        >
          ← Kembali ke daftar paket
        </Link>
      </section>
    )
  }

  const hargaMulai = paket.hargaQuad ?? paket.harga

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400">
        <Link to="/" className="hover:text-brand-600">
          Beranda
        </Link>
        {' / '}
        <Link to="/paket-umrah" className="hover:text-brand-600">
          Paket Umrah
        </Link>
        {' / '}
        <span className="text-gray-600">{paket.nama}</span>
      </nav>

      {/* Header paket */}
      <header className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-brand-100 shadow-soft">
          <img
            src={paket.gambar}
            alt={paket.nama}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{paket.durasi}</Badge>
            <Badge>{paket.jadwal}</Badge>
            <Badge className="bg-sand-200 text-brand-900">{paket.jenis === 'umrah' ? 'Umrah' : 'Haji'}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-brand-900">{paket.nama}</h1>
          <p className="mt-2 text-gray-500">{paket.maskapai}</p>
          <p className="mt-1 text-sm text-gray-400">{paket.hotel}</p>

          <div className="mt-6">
            <p className="text-sm text-gray-500">Harga mulai</p>
            <p className="text-3xl font-bold text-brand-700">
              {formatRupiah(hargaMulai)}
            </p>
            {paket.dpPerPax && (
              <p className="mt-1 text-sm text-gray-500">
                DP mulai {formatRupiah(paket.dpPerPax)} / pax
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="#pesan"
              className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Pesan Sekarang
            </Link>
            <a
              href="#"
              className="rounded-lg border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </header>

      {/* Harga per kamar (blueprint 3c — form pesan) */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          {/* Fasilitas */}
          <section className="rounded-2xl bg-white p-6 shadow-soft">
            <h2 className="text-xl font-bold text-brand-900">Fasilitas Termasuk</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {paket.fasilitas.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-0.5 text-brand-600">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* Persyaratan */}
          <section className="rounded-2xl bg-white p-6 shadow-soft">
            <h2 className="text-xl font-bold text-brand-900">Persyaratan Peserta</h2>
            <ul className="mt-4 grid gap-2">
              {paket.persyaratan.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-0.5 text-brand-600">•</span>
                  {p}
                </li>
              ))}
            </ul>
          </section>

          {/* Itinerary */}
          <section className="rounded-2xl bg-white p-6 shadow-soft">
            <h2 className="text-xl font-bold text-brand-900">Rencana Perjalanan</h2>
            <p className="mt-2 text-sm text-gray-400">
              KERANGKA — timeline itinerary per hari menyusul fase 2
              (blueprint: Hari Ke-N, rute/lokasi, deskripsi kegiatan).
            </p>
          </section>

          {/* Informasi penerbangan */}
          <section className="rounded-2xl bg-white p-6 shadow-soft">
            <h2 className="text-xl font-bold text-brand-900">Informasi Penerbangan</h2>
            <p className="mt-2 text-sm text-gray-400">
              KERANGKA — tabel keberangkatan &amp; kepulangan (kode pesawat,
              jam pergi/tiba, bandara) menyusul fase 2.
            </p>
          </section>

          {/* Syarat & ketentuan */}
          <section className="rounded-2xl bg-white p-6 shadow-soft">
            <h2 className="text-xl font-bold text-brand-900">Syarat &amp; Ketentuan</h2>
            <p className="mt-2 text-sm text-gray-400">
              KERANGKA — kebijakan pembatalan, penjadwalan ulang, aturan
              Nusuk (1 paspor = 1 bed), dsb. menyusul fase 2.
            </p>
          </section>
        </div>

        {/* Form pesan paket (sticky di desktop) */}
        <div id="pesan" className="lg:sticky lg:top-24 lg:self-start">
          <PesanPaketForm paket={paket} />
        </div>
      </div>
    </section>
  )
}

export default PaketUmrahDetail
