/**
 * SearchWidget — widget pencarian tiket umroh (bulan keberangkatan + jenis paket)
 * Dipakai di halaman listing (/paket-umrah).
 * Status: KERANGKA — form sudah jalan, hasil filter menyusul fase 2.
 * Catatan (FITUR-PENCARIAN-TIKET.md): "tanggal berangkat" = filter JADWAL,
 * bukan filter paket — nanti query bulan akan di-join ke jadwal di backend.
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

const BULAN_OPTIONS = [
  'November 2026',
  'Desember 2026',
  'Januari 2027',
  'Februari 2027',
  'Maret 2027',
  'April 2027',
]

const JENIS_OPTIONS = ['Reguler', 'Hemat', 'VIP', 'Premium', 'Furoda']

function SearchWidget() {
  const navigate = useNavigate()
  const [bulan, setBulan] = useState('')
  const [jenis, setJenis] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (bulan) params.set('bulan', bulan)
    if (jenis) params.set('jenis', jenis)
    navigate(`/paket-umrah${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-5 shadow-soft"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-600">
            Bulan Keberangkatan
          </span>
          <select
            value={bulan}
            onChange={(e) => setBulan(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-brand-500 focus:outline-none"
          >
            <option value="">Semua Bulan</option>
            {BULAN_OPTIONS.map((b) => (
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
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-brand-500 focus:outline-none"
          >
            <option value="">Semua Jenis</option>
            {JENIS_OPTIONS.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
        </label>

        <label className="block lg:col-span-2">
          <span className="mb-1 block text-sm font-medium text-gray-600">
            &nbsp;
          </span>
          <Button type="submit" className="w-full">
            Cari Paket Umroh
          </Button>
        </label>
      </div>
    </form>
  )
}

export default SearchWidget
