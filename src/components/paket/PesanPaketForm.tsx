/**
 * PesanPaketForm — form pemesanan paket umroh
 * Blueprint: form "Pesan Paket" (referensi Nur Ramadhan) — DOKUMEN-INTERNAL 3c
 * Fase 1: pilihan (program hari, bandara, tanggal + sisa kursi, kamar,
 *         tiket domestik) diambil dari data paket (dummy). Total otomatis.
 * Fase 2: submit → kirim booking ke admin via WhatsApp (Fonnte).
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Paket } from '../../data/paket'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import { formatRupiah, waLink } from '../../utils/format'

interface PesanPaketFormProps {
  paket: Paket
  /** Tanggal yang sudah terpilih (mis. dari kartu voucher: ?tanggal=...) */
  initialTanggal?: string
}

const KAMAR = [
  { key: 'hargaQuad', label: 'Quad (1 Kamar ber-4)' },
  { key: 'hargaTriple', label: 'Triple (1 Kamar ber-3)' },
  { key: 'hargaDouble', label: 'Double (1 Kamar ber-2)' },
] as const

type KamarKey = (typeof KAMAR)[number]['key']

const SELECT_CLS =
  'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-brand-500 focus:outline-none'

function PesanPaketForm({ paket, initialTanggal }: PesanPaketFormProps) {
  const durasiList = paket.durasiList ?? [paket.durasi]
  const bandaraList = paket.bandara ?? ['Soekarno-Hatta (CGK)']
  const jadwalList = paket.keberangkatan ?? []
  const tambahanList = paket.tambahanPesawat ?? []

  const [programHari, setProgramHari] = useState(durasiList[0])
  const [bandara, setBandara] = useState(bandaraList[0])
  const [tanggal, setTanggal] = useState(
    () =>
      jadwalList.find((j) => j.tanggal === initialTanggal)?.tanggal ??
      jadwalList[0]?.tanggal ??
      '',
  )
  const [tambahan, setTambahan] = useState(tambahanList[0]?.label ?? 'Tanpa Tiket Domestik')
  const [jumlah, setJumlah] = useState<Record<KamarKey, number>>({
    hargaQuad: 0,
    hargaTriple: 0,
    hargaDouble: 0,
  })

  const jadwalDipilih = jadwalList.find((j) => j.tanggal === tanggal)
  const sisaKuota = jadwalDipilih?.sisaKuota ?? 0

  function hargaKamar(key: KamarKey): number {
    return jadwalDipilih?.[key] ?? paket[key] ?? paket.harga
  }

  function updateJumlah(key: KamarKey, delta: number) {
    setJumlah((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }))
  }

  const totalPax = KAMAR.reduce((acc, k) => acc + jumlah[k.key], 0)
  const hargaTambahan = tambahanList.find((t) => t.label === tambahan)?.harga ?? 0
  const totalHarga =
    KAMAR.reduce((acc, k) => acc + hargaKamar(k.key) * jumlah[k.key], 0) + hargaTambahan
  const overKuota = sisaKuota > 0 && totalPax > sisaKuota

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Fase 2: kirim data booking ke admin via WhatsApp (Fonnte)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-soft">
      <h3 className="text-lg font-bold text-brand-900">Pesan Paket</h3>
      <p className="mt-1 text-xs text-gray-400">
        {paket.nama} · {programHari} · {paket.maskapai}
      </p>

      <div className="mt-5 space-y-4">
        {/* Program Hari */}
        <label className="block">
          <span className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-600">
            <Icon name="calendar" className="h-4 w-4 text-brand-500" /> Program Hari
          </span>
          <select
            value={programHari}
            onChange={(e) => setProgramHari(e.target.value)}
            className={SELECT_CLS}
          >
            {durasiList.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>

        {/* Bandara Keberangkatan */}
        <label className="block">
          <span className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-600">
            <Icon name="plane" className="h-4 w-4 text-brand-500" /> Bandara Keberangkatan
          </span>
          <select
            value={bandara}
            onChange={(e) => setBandara(e.target.value)}
            className={SELECT_CLS}
          >
            {bandaraList.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>

        {/* Tanggal Keberangkatan + sisa kursi */}
        <label className="block">
          <span className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-600">
            <Icon name="clock" className="h-4 w-4 text-brand-500" /> Tanggal Keberangkatan
          </span>
          <select
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className={SELECT_CLS}
          >
            {jadwalList.map((j) => (
              <option key={j.tanggal} value={j.tanggal}>
                {j.tanggal} — sisa {j.sisaKuota} kursi
              </option>
            ))}
            {jadwalList.length === 0 && <option value="">Belum ada jadwal</option>}
          </select>
        </label>

        {jadwalDipilih && (
          <p className="text-xs text-gray-400">
            Sisa kuota:{' '}
            <span className="font-semibold text-brand-600">{sisaKuota} kursi</span> · Harga
            mulai {formatRupiah(hargaKamar('hargaQuad'))}/pax
          </p>
        )}

        {/* Pilihan kamar */}
        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
            <Icon name="users" className="h-4 w-4 text-brand-500" /> Pilihan Kamar
          </p>
          {KAMAR.map((k) => (
            <div
              key={k.key}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
            >
              <div>
                <p className="text-sm font-semibold text-gray-700">{k.label}</p>
                <p className="text-xs text-gray-400">{formatRupiah(hargaKamar(k.key))} / pax</p>
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

        {/* Tambahan tiket pesawat domestik */}
        <label className="block">
          <span className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-600">
            <Icon name="plane" className="h-4 w-4 text-brand-500" /> Tambahan Tiket Pesawat Domestik
          </span>
          <select
            value={tambahan}
            onChange={(e) => setTambahan(e.target.value)}
            className={SELECT_CLS}
          >
            {tambahanList.map((t) => (
              <option key={t.label} value={t.label}>
                {t.label}
                {t.harga > 0 ? ` (+ ${formatRupiah(t.harga)})` : ''}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Total */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-400">Total Pax</p>
          <p className="text-lg font-bold text-brand-900">{totalPax} Pax</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Total Harga</p>
          <p className="text-lg font-bold text-brand-700">{formatRupiah(totalHarga)}</p>
        </div>
      </div>

      <Button type="submit" className="mt-4 w-full" disabled={totalPax === 0 || overKuota}>
        Pesan Sekarang
      </Button>
      {overKuota && (
        <p className="mt-2 text-center text-xs font-medium text-red-500">
          Jumlah pax melebihi sisa kuota ({sisaKuota} kursi)
        </p>
      )}

      <div className="mt-3 grid grid-cols-2 gap-3">
        <a
          href={waLink(`Assalamualaikum, saya ingin konsultasi paket ${paket.nama} (${programHari}, ${tanggal})`)}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-lg border border-brand-600 px-4 py-2.5 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50"
        >
          <Icon name="whatsapp" className="h-4 w-4" /> Konsultasi Paket
        </a>
        {paket.brosurUrl ? (
          <a
            href={paket.brosurUrl}
            download
            className="flex items-center justify-center gap-1.5 rounded-lg border border-brand-600 px-4 py-2.5 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50"
          >
            <Icon name="download" className="h-4 w-4" /> Download Brosur
          </a>
        ) : (
          <a
            href={waLink(`Assalamualaikum, mohon kirimkan brosur ${paket.nama}`)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-brand-600 px-4 py-2.5 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50"
          >
            <Icon name="download" className="h-4 w-4" /> Minta Brosur
          </a>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-gray-400">
        KERANGKA — pengiriman booking ke admin via WhatsApp menyusul fase 2
      </p>
    </form>
  )
}

export default PesanPaketForm
