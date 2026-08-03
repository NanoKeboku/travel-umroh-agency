/**
 * TiketTerbaru — kartu tiket (voucher) paling baru di Beranda
 * Menampilkan 3 jadwal keberangkatan terdekat dari semua paket umrah.
 * Klik kartu → halaman tiket detail dengan tanggal itu sudah terpilih
 * di form pesan (?tanggal=...).
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import Badge from '../ui/Badge'
import { fadeUp, viewportOnce } from './anim'
import { PAKET_UMRAH } from '../../data/paket'
import type { Paket, JadwalUmrah } from '../../data/paket'
import { formatRupiah } from '../../utils/format'

interface TiketEntry {
  paket: Paket
  jadwal: JadwalUmrah
}

const BULAN_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

/** "5 November 2026" -> timestamp (parser manual biar aman di semua engine) */
function parseTanggal(t: string): number {
  const [d, b, y] = t.split(' ')
  const m = BULAN_ID.indexOf(b)
  if (m < 0) return 0
  return new Date(Number(y), m, Number(d)).getTime()
}

/** Semua jadwal dari semua paket umrah, urutkan terdekat, ambil 3 */
function tiketTerbaru(): TiketEntry[] {
  const semua: TiketEntry[] = PAKET_UMRAH.flatMap((paket) =>
    (paket.keberangkatan ?? []).map((jadwal) => ({ paket, jadwal })),
  )
  return semua
    .filter((t) => parseTanggal(t.jadwal.tanggal) > 0)
    .sort((a, b) => parseTanggal(a.jadwal.tanggal) - parseTanggal(b.jadwal.tanggal))
    .slice(0, 3)
}

function TiketTerbaru() {
  const tiket = tiketTerbaru()

  if (tiket.length === 0) return null

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-brand-900">Tiket Terbaru</h3>
        <Link
          to="/paket-umrah"
          className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Lihat Semua →
        </Link>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tiket.map(({ paket, jadwal }) => {
          const harga = jadwal.hargaQuad ?? paket.hargaQuad ?? paket.harga
          const tanggalLabel = new Date(parseTanggal(jadwal.tanggal)).toLocaleDateString(
            'id-ID',
            { day: 'numeric', month: 'long', year: 'numeric' },
          )
          const link = `/paket-umrah/${paket.id}?tanggal=${encodeURIComponent(jadwal.tanggal)}`

          return (
            <motion.div key={`${paket.id}-${jadwal.tanggal}`} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <Link
                to={link}
                className="group flex h-full flex-col rounded-2xl bg-white p-5 shadow-soft ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Header voucher: tanggal + sisa kursi */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
                    <Icon name="calendar" className="h-4 w-4" />
                    {tanggalLabel}
                  </div>
                  <Badge
                    className={
                      jadwal.sisaKuota <= 5
                        ? 'bg-red-50 text-red-600'
                        : 'bg-brand-50 text-brand-700'
                    }
                  >
                    Sisa {jadwal.sisaKuota} kursi
                  </Badge>
                </div>

                {/* Isi tiket */}
                <h4 className="mt-3 text-base font-bold text-brand-900 group-hover:text-brand-700">
                  {paket.nama}
                </h4>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                  <Icon name="plane" className="h-3.5 w-3.5" />
                  {paket.maskapai} · {paket.durasi}
                </p>

                {/* Harga */}
                <div className="mt-4 flex items-baseline gap-2 border-t border-dashed border-gray-200 pt-3">
                  <p className="text-lg font-extrabold text-brand-600">{formatRupiah(harga)}</p>
                  <span className="text-xs text-gray-400">/orang</span>
                </div>

                {/* CTA */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-brand-600 group-hover:underline">
                    Lihat Tiket
                  </span>
                  <Icon name="arrowRight" className="h-4 w-4 text-brand-500 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default TiketTerbaru
