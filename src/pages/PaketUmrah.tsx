/**
 * Halaman: Paket Umrah (listing + pencarian)
 * Route: /paket-umrah
 * Status: KERANGGA — grid kartu & widget pencarian jalan; filter
 * sidebar menyusul fase 2. Kartu mengarah ke /paket-umrah/:id.
 */
import { useSearchParams } from 'react-router-dom'
import { PAKET_UMRAH } from '../data/paket'
import PaketCard from '../components/paket/PaketCard'
import SearchWidget from '../components/paket/SearchWidget'
import FilterSidebar from '../components/paket/FilterSidebar'
import Badge from '../components/ui/Badge'

function PaketUmrah() {
  const [searchParams] = useSearchParams()
  const bulan = searchParams.get('bulan')
  const jenis = searchParams.get('jenis')

  // KERANGGA: filter belum diterapkan — semua paket ditampilkan.
  // Bulan & jenis dari query dipertahankan sebagai state awal pencarian.
  const daftar = PAKET_UMRAH

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-brand-900">Paket Umrah</h1>
        <p className="mx-auto mt-2 max-w-2xl text-gray-500">
          Pilih bulan keberangkatan dan jenis paket untuk menemukan tiket
          umroh yang sesuai.
        </p>
      </header>

      <div className="mt-8">
        <SearchWidget />
      </div>

      {(bulan || jenis) && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>Pencarian aktif:</span>
          {bulan && <Badge>Bulan: {bulan}</Badge>}
          {jenis && <Badge>Jenis: {jenis}</Badge>}
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <FilterSidebar />

        <div>
          <p className="text-sm text-gray-500">
            Menampilkan {daftar.length} paket
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {daftar.map((paket) => (
              <PaketCard key={paket.id} paket={paket} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaketUmrah
