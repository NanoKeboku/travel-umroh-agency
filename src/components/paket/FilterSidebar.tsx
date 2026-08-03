/**
 * FilterSidebar — filter daftar paket umroh
 * Status: KERANGKA — UI placeholder, logika filter menyusul fase 2
 * Rencana filter (DOKUMEN-INTERNAL): jenis, range harga,
 * bulan, bintang hotel, "hanya promo".
 */
import Badge from '../ui/Badge'

function FilterSidebar() {
  return (
    <aside className="rounded-2xl bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-brand-900">Filter</h2>
        <Badge>menyusul</Badge>
      </div>

      <div className="mt-4 space-y-4 text-sm text-gray-500">
        <p>Filter akan tersedia di fase 2:</p>
        <ul className="list-inside list-disc space-y-1 text-xs text-gray-400">
          <li>Jenis paket (Reguler / VIP / Furoda)</li>
          <li>Rentang harga (min – maks)</li>
          <li>Bulan keberangkatan</li>
          <li>Bintang hotel</li>
          <li>Hanya promo</li>
        </ul>
      </div>
    </aside>
  )
}

export default FilterSidebar
