/**
 * PaketCard — kartu paket umrah di halaman listing
 * Route tujuan: /paket-umrah/:id (halaman detail paket)
 * Status: KERANGKA — menampilkan info dasar dari data paket.ts,
 * badge promo & indikator kuota menyusul (lihat FITUR-PENCARIAN-TIKET.md)
 */
import { Link } from 'react-router-dom'
import type { Paket } from '../../data/paket'
import Badge from '../ui/Badge'
import { formatRupiah } from '../../utils/format'

interface PaketCardProps {
  paket: Paket
  /** Prefix route detail: '/paket-umrah' (default) atau '/paket-haji' */
  basePath?: string
}

function PaketCard({ paket }: PaketCardProps) {
  const hargaMulai = paket.hargaQuad ?? paket.harga
  // Haji → /paket-haji/:id ; Umrah → /paket-umrah/:id
  const basePath = paket.jenis === 'haji' ? '/paket-haji' : '/paket-umrah'

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow hover:shadow-lg">
      <Link to={`${basePath}/${paket.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-100">
          <img
            src={paket.gambar}
            alt={paket.nama}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute left-3 top-3 bg-white/90 text-brand-800">
            {paket.durasi}
          </Badge>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-brand-900">{paket.nama}</h3>
          <p className="mt-1 text-sm text-gray-500">{paket.maskapai}</p>
          <p className="mt-1 text-xs text-gray-400">
            {paket.jadwal} · {paket.hotel}
          </p>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500">Harga mulai</p>
              <p className="text-xl font-bold text-brand-700">
                {formatRupiah(hargaMulai)}
              </p>
            </div>
            <span className="text-sm font-semibold text-brand-600 group-hover:underline">
              Lihat detail →
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default PaketCard
