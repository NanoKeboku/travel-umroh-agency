/**
 * Halaman: Detail Paket (Umrah & Haji)
 * Route: /paket-umrah/:slug dan /paket-haji/:slug
 * Blueprint: DOKUMEN-INTERNAL 3b & 3c.
 * Menu Fasilitas / Persyaratan / Itinerary / Penerbangan / S&K
 * pakai Accordion (bisa dibuka-tutup). Form pesan sticky di kanan.
 */
import { Link, useParams, useSearchParams } from 'react-router-dom'
import type { PenerbanganLeg } from '../data/paket'
import Badge from '../components/ui/Badge'
import AccordionSection from '../components/ui/Accordion'
import Icon from '../components/ui/Icon'
import PesanPaketForm from '../components/paket/PesanPaketForm'
import { formatRupiah, waLink } from '../utils/format'
import { usePaketDetail } from '../hooks/usePaket'

/** Tabel penerbangan (keberangkatan / kepulangan) */
function PenerbanganTabel({ judul, legs }: { judul: string; legs?: PenerbanganLeg[] }) {
  if (!legs || legs.length === 0) {
    return <p className="text-sm text-gray-400">KERANGKA — data penerbangan menyusul</p>
  }
  return (
    <div>
      <h3 className="text-sm text-gray-700">{judul}</h3>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-400">
              <th className="py-2 pr-4">Kode</th>
              <th className="py-2 pr-4">Tanggal</th>
              <th className="py-2 pr-4">Pergi</th>
              <th className="py-2">Tiba</th>
            </tr>
          </thead>
          <tbody>
            {legs.map((leg) => (
              <tr key={leg.kode} className="border-b border-gray-50">
                <td className="py-2 pr-4 font-semibold text-brand-700">{leg.kode}</td>
                <td className="py-2 pr-4 text-gray-600">{leg.tanggal}</td>
                <td className="py-2 pr-4 text-gray-600">{leg.pergi}</td>
                <td className="py-2 text-gray-600">{leg.tiba}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PaketDetail() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const tanggalParam = searchParams.get('tanggal') ?? undefined
  const { data: paket, loading } = usePaketDetail(slug)

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="animate-pulse space-y-4">
          <div className="mx-auto h-8 w-1/2 rounded bg-gray-200" />
          <div className="mx-auto h-4 w-2/3 rounded bg-gray-100" />
          <div className="mx-auto h-64 w-full max-w-xl rounded-2xl bg-gray-200" />
        </div>
        <p className="mt-4 text-sm text-gray-400">Memuat detail paket…</p>
      </section>
    )
  }

  if (!paket) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl text-brand-900">Paket tidak ditemukan</h1>
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
  const basePath = paket.jenis === 'haji' ? '/paket-haji' : '/paket-umrah'
  const labelJenis = paket.jenis === 'haji' ? 'Haji' : 'Umrah'

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400">
        <Link to="/" className="hover:text-brand-600">
          Beranda
        </Link>
        {' / '}
        <Link to={basePath} className="hover:text-brand-600">
          {paket.jenis === 'haji' ? 'Paket Haji' : 'Paket Umrah'}
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
            <Badge className="bg-sand-200 text-brand-900">{labelJenis}</Badge>
            {paket.maskapai && <Badge className="bg-brand-50 text-brand-700">{paket.maskapai}</Badge>}
          </div>
          <h1 className="mt-3 text-3xl text-brand-900">{paket.nama}</h1>
          <p className="mt-2 text-gray-500">{paket.hotel}</p>

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
            <a
              href="#pesan"
              className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Pesan Sekarang
            </a>
            <a
              href={waLink(`Assalamualaikum, saya ingin konsultasi paket ${paket.nama}`)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50"
            >
              <Icon name="whatsapp" className="h-4 w-4" /> Konsultasi Paket
            </a>
            {paket.brosurUrl ? (
              <a
                href={paket.brosurUrl}
                download
                className="flex items-center gap-1.5 rounded-lg border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50"
              >
                <Icon name="download" className="h-4 w-4" /> Download Brosur
              </a>
            ) : (
              <a
                href={waLink(`Assalamualaikum, mohon kirimkan brosur ${paket.nama}`)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50"
              >
                <Icon name="download" className="h-4 w-4" /> Minta Brosur
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Detail: menu buka-tutup + form pesan */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          <AccordionSection title="Fasilitas Termasuk" defaultOpen>
            <ul className="grid gap-2 sm:grid-cols-2">
              {paket.fasilitas.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {f}
                </li>
              ))}
            </ul>
          </AccordionSection>

          <AccordionSection title="Persyaratan Peserta">
            <ul className="grid gap-2 sm:grid-cols-2">
              {paket.persyaratan.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {p}
                </li>
              ))}
            </ul>
          </AccordionSection>

          <AccordionSection title="Rencana Perjalanan (Itinerary)">
            {paket.itinerary && paket.itinerary.length > 0 ? (
              <ol className="space-y-4">
                {paket.itinerary.map((h) => (
                  <li key={h.hari} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                      {h.hari}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Hari Ke-{h.hari} · {h.rute}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">{h.deskripsi}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-gray-400">
                KERANGKA — timeline itinerary per hari menyusul fase 2.
              </p>
            )}
          </AccordionSection>

          <AccordionSection title="Informasi Penerbangan">
            {paket.penerbangan ? (
              <div className="space-y-5">
                <PenerbanganTabel
                  judul="Keberangkatan"
                  legs={paket.penerbangan.keberangkatan}
                />
                <PenerbanganTabel judul="Kepulangan" legs={paket.penerbangan.kepulangan} />
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                KERANGKA — tabel penerbangan menyusul fase 2.
              </p>
            )}
          </AccordionSection>

          <AccordionSection title="Syarat & Ketentuan">
            {paket.sk && paket.sk.length > 0 ? (
              <ul className="space-y-2">
                {paket.sk.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">
                KERANGKA — kebijakan pembatalan, reschedule, aturan Nusuk, dsb. menyusul.
              </p>
            )}
          </AccordionSection>
        </div>

        {/* Form pesan paket (sticky di desktop) */}
        <div id="pesan" className="lg:sticky lg:top-24 lg:self-start">
          <PesanPaketForm paket={paket} initialTanggal={tanggalParam} />
        </div>
      </div>
    </section>
  )
}

export default PaketDetail
