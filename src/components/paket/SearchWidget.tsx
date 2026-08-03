/**
 * SearchWidget — widget pencarian tiket umroh (bulan keberangkatan + jenis paket)
 * Dipakai di halaman listing (/paket-umrah).
 * Opsi bulan & jenis DIHITUNG dari data paket (bukan hardcode) sehingga selalu
 * konsisten dengan jadwal yang tersedia di tiket.
 * State select disinkronkan dengan query string URL (?bulan=&jenis=).
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { Paket } from '../../data/paket'
import Button from '../ui/Button'

interface SearchWidgetProps {
  paket: Paket[]
  /** Label tombol cari (default: "Cari Paket Umroh") */
  buttonLabel?: string
}

const SELECT_CLS =
  'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-brand-500 focus:outline-none'

/** "5 November 2026" -> "November 2026" */
function bulanDariTanggal(tanggal: string): string {
  const parts = tanggal.split(' ')
  return parts.length >= 3 ? `${parts[1]} ${parts[2]}` : tanggal
}

/** Urutkan "November 2026" secara kronologis */
function timestampBulan(bulan: string): number {
  const [b, y] = bulan.split(' ')
  return new Date(`${b} 1, ${y}`).getTime()
}

function SearchWidget({ paket }: SearchWidgetProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Opsi unik dari data jadwal yang benar-benar tersedia
  const bulanOptions = Array.from(
    new Set(
      paket.flatMap((p) => p.keberangkatan?.map((j) => bulanDariTanggal(j.tanggal)) ?? []),
    ),
  ).sort((a, b) => timestampBulan(a) - timestampBulan(b))

  const jenisOptions = Array.from(
    new Set(paket.map((p) => p.kategori).filter(Boolean)),
  ).sort()

  const [bulan, setBulan] = useState(searchParams.get('bulan') ?? '')
  const [jenis, setJenis] = useState(searchParams.get('jenis') ?? '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (bulan) params.set('bulan', bulan)
    if (jenis) params.set('jenis', jenis)
    const qs = params.toString()
    navigate(`/paket-umrah${qs ? `?${qs}` : ''}`)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-600">
            Bulan Keberangkatan
          </span>
          <select
            value={bulan}
            onChange={(e) => setBulan(e.target.value)}
            className={SELECT_CLS}
          >
            <option value="">Semua Bulan</option>
            {bulanOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-600">
            Jenis Paket
          </span>
          <select
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            className={SELECT_CLS}
          >
            <option value="">Semua Jenis</option>
            {jenisOptions.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
        </label>

        <label className="block lg:col-span-2">
          <span className="mb-1 block text-sm font-medium text-gray-600">&nbsp;</span>
          <Button type="submit" className="w-full">
            Cari Paket Umroh
          </Button>
        </label>
      </div>
    </form>
  )
}

export default SearchWidget
