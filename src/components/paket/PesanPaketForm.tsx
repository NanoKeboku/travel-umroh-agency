/**
 * PesanPaketForm — form pemesanan paket (blueprint: referensi Nur Ramadhan)
 * Dipakai di halaman detail paket.
 * Status: KERANGKA — struktur form; hitung total otomatis & kirim ke
 * admin via WhatsApp (Fonnte) menyusul fase 2.
 */
import { useState } from 'react'
import type { Paket } from '../../data/paket'
import Button from '../ui/Button'
import { formatRupiah } from '../../utils/format'

interface PesanPaketFormProps {
  paket: Paket
}

/** Jenis kamar: label + harga per pax (fallback ke harga paket) */
const KAMAR = [
  { key: 'hargaQuad', label: 'Quad (1 Kamar ber-4)' },
  { key: 'hargaTriple', label: 'Triple (1 Kamar ber-3)' },
  { key: 'hargaDouble', label: 'Double (1 Kamar ber-2)' },
] as const

function PesanPaketForm({ paket }: PesanPaketFormProps) {
  const [jumlah, setJumlah] = useState<Record<string, number>>({
    hargaQuad: 0,
    hargaTriple: 0,
    hargaDouble: 0,
  })

  function updateJumlah(key: string, delta: number) {
    setJumlah((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] ?? 0) + delta),
    }))
  }

  function totalPax(): number {
    return KAMAR.reduce((acc, k) => acc + (jumlah[k.key] ?? 0), 0)
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-2xl bg-white p-6 shadow-soft"
    >
      <h3 className="text-lg font-bold text-brand-900">Pesan Paket</h3>
      <p className="mt-1 text-xs text-gray-400">
        {paket.nama} · {paket.durasi} · {paket.jadwal}
      </p>

      <div className="mt-5 space-y-4">
        {KAMAR.map((k) => (
          <div
            key={k.key}
            className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
          >
            <div>
              <p className="text-sm font-semibold text-gray-700">{k.label}</p>
              <p className="text-xs text-gray-400">
                {paket[k.key] ? `${formatRupiah(paket[k.key]!)} / pax` : 'Harga menyusul'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => updateJumlah(k.key, -1)}
                className="h-8 w-8 rounded-full border border-gray-200 text-gray-500 hover:border-brand-500 hover:text-brand-600"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold text-gray-700">
                {jumlah[k.key]}
              </span>
              <button
                type="button"
                onClick={() => updateJumlah(k.key, 1)}
                className="h-8 w-8 rounded-full border border-gray-200 text-gray-500 hover:border-brand-500 hover:text-brand-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-400">Total Pax</p>
          <p className="text-lg font-bold text-brand-900">{totalPax()} Pax</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Total Harga</p>
          <p className="text-lg font-bold text-brand-700">
            {totalPax() === 0
              ? formatRupiah(0)
              : formatRupiah(
                  KAMAR.reduce(
                    (acc, k) => acc + (paket[k.key] ?? paket.harga) * (jumlah[k.key] ?? 0),
                    0,
                  ),
                )}
          </p>
        </div>
      </div>

      <Button type="submit" className="mt-4 w-full" disabled={totalPax() === 0}>
        Pesan Sekarang
      </Button>
      <p className="mt-2 text-center text-xs text-gray-400">
        KERANGKA — pengiriman ke admin via WhatsApp menyusul fase 2
      </p>
    </form>
  )
}

export default PesanPaketForm
