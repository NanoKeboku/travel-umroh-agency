/**
 * Halaman: Paket Haji (listing + pencarian)
 * Route: /paket-haji
 * Sama seperti halaman Paket Umrah: widget pencarian, filter,
 * grid kartu → detail /paket-haji/:slug
 */
import { useSearchParams } from 'react-router-dom'
import { PAKET_HAJI } from '../data/paket'
import type { Paket } from '../data/paket'
import PaketCard from '../components/paket/PaketCard'
import SearchWidget from '../components/paket/SearchWidget'
import FilterSidebar from '../components/paket/FilterSidebar'
import Badge from '../components/ui/Badge'

/** Cocokkan filter bulan ke jadwal keberangkatan (fallback: jadwal bulan paket) */
function matchBulan(p: Paket, bulan: string | null): boolean {
  if (!bulan) return true
  if (p.keberangkatan && p.keberangkatan.length > 0) {
    return p.keberangkatan.some((j) => j.tanggal.includes(bulan))
  }
  return p.jadwal.includes(bulan)
}

/** Cocokkan filter jenis ke kategori paket */
function matchJenis(p: Paket, jenis: string | null): boolean {
  if (!jenis) return true
  return p.kategori === jenis
}

function PaketHaji() {
  const [searchParams, setSearchParams] = useSearchParams()
  const bulan = searchParams.get('bulan')
  const jenis = searchParams.get('jenis')

  const daftar = PAKET_HAJI.filter((p) => matchBulan(p, bulan) && matchJenis(p, jenis))
  const pencarianAktif = Boolean(bulan || jenis)

  function resetPencarian() {
    setSearchParams({})
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-brand-900">Paket Haji</h1>
        <p className="mx-auto mt-2 max-w-2xl text-gray-500">
          Pilih bulan keberangkatan dan jenis paket untuk menemukan paket
          haji yang sesuai.
        </p>
      </header>

      <div className="mt-8">
        <SearchWidget paket={PAKET_HAJI} />
      </div>

      {pencarianAktif && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>Pencarian aktif:</span>
          {bulan && <Badge>Bulan: {bulan}</Badge>}
          {jenis && <Badge>Jenis: {jenis}</Badge>}
          <button
            type="button"
            onClick={resetPencarian}
            className="text-xs font-semibold text-brand-600 hover:underline"
          >
            Reset pencarian
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <FilterSidebar />

        <div>
          <p className="text-sm text-gray-500">Menampilkan {daftar.length} paket</p>

          {daftar.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
              <p className="text-lg font-semibold text-brand-900">
                Tidak ada paket yang cocok
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Belum ada jadwal keberangkatan pada bulan yang dipilih, atau
                jenis paket yang dicari belum tersedia.
              </p>
              <button
                type="button"
                onClick={resetPencarian}
                className="mt-6 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Tampilkan Semua Paket
              </button>
            </div>
          ) : (
            <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {daftar.map((paket) => (
                <PaketCard key={paket.id} paket={paket} basePath="/paket-haji" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PaketHaji
