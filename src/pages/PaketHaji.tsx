/**
 * Halaman: Paket Haji (listing + pencarian)
 * Route: /paket-haji
 * Data dari API (/api/paket?jenis=haji) via hook usePaketList — fallback ke statis.
 * Sama persis pola halaman Paket Umrah (lihat PaketUmrah.tsx).
 */
import { useSearchParams } from 'react-router-dom'
import PaketCard from '../components/paket/PaketCard'
import PaketCardSkeleton from '../components/paket/PaketCardSkeleton'
import SearchWidget from '../components/paket/SearchWidget'
import FilterSidebar from '../components/paket/FilterSidebar'
import Badge from '../components/ui/Badge'
import { usePaketList } from '../hooks/usePaket'
import { PAKET_HAJI } from '../data/paket'

function PaketHaji() {
  const [searchParams, setSearchParams] = useSearchParams()
  const bulan = searchParams.get('bulan')
  const jenis = searchParams.get('jenis')

  const filters: Record<string, string> = { jenis: 'haji' }
  if (bulan) filters.bulan = bulan
  if (jenis) filters.kategori = jenis

  const { data: daftar, loading } = usePaketList(filters)
  const pencarianAktif = Boolean(bulan || jenis)

  function resetPencarian() {
    setSearchParams({})
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="font-display text-3xl text-brand-900">Paket Haji</h1>
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
          {loading ? (
            <>
              <p className="text-sm text-gray-400">Memuat data…</p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <PaketCardSkeleton key={i} />
                ))}
              </div>
            </>
          ) : daftar && daftar.length > 0 ? (
            <>
              <p className="text-sm text-gray-500">Menampilkan {daftar.length} paket</p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {daftar.map((paket) => (
                  <PaketCard key={paket.id} paket={paket} />
                ))}
              </div>
            </>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  )
}

export default PaketHaji
