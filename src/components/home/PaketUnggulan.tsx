/**
 * Paket Unggulan — kartu paket umrah di Beranda
 * Data dari src/data/paket.ts (placeholder — ganti konten asli Ebitour)
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'
import { staggerContainer, fadeUp, viewportOnce } from './anim'
import { PAKET_UMRAH } from '../../data/paket'
import { formatRupiah, waLink } from '../../utils/format'

function PaketUnggulan() {
  return (
    <section className="bg-sand-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Paket Umrah"
            title="Pilihan Paket Terbaik Kami"
            description="Harga transparan, fasilitas jelas. Pilih paket yang sesuai kebutuhan Anda."
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {PAKET_UMRAH.map((paket) => (
            <motion.article
              key={paket.id}
              variants={fadeUp}
              className="group flex flex-col rounded-2xl bg-white p-6 shadow-soft ring-1 ring-gray-100 transition-all hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Nama + badge */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-brand-900">{paket.nama}</h3>
                <span className="shrink-0 rounded-full bg-brand-100 px-3 py-1 text-[11px] font-semibold text-brand-700">
                  {paket.durasi}
                </span>
              </div>

              {/* Harga */}
              <p className="mt-4 text-2xl font-extrabold text-brand-600">
                {paket.harga > 0 ? formatRupiah(paket.harga) : 'Hubungi Admin'}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {paket.jadwal} • {paket.maskapai}
              </p>

              {/* Fasilitas ringkas */}
              <ul className="mt-5 flex-1 space-y-2 border-t border-gray-100 pt-5">
                {paket.fasilitas.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Icon name="check" className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Aksi */}
              <div className="mt-6 flex flex-col gap-2.5">
                <a
                  href={waLink(`Assalamualaikum, saya tertarik dengan ${paket.nama} (${formatRupiah(paket.harga)})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  Tanya Paket Ini
                </a>
                <Link
                  to="/paket-umrah"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-brand-300 hover:text-brand-600"
                >
                  Detail Paket
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 text-center"
        >
          <Link
            to="/paket-umrah"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Lihat Semua Paket Umrah
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </motion.p>
      </div>
    </section>
  )
}

export default PaketUnggulan
