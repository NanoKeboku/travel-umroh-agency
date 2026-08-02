/**
 * PaketUnggulan — grid kartu paket umrah (bergambar, mobile-first)
 * Layout: 1 kolom (mobile) → 2 (sm) → 3 (lg)
 * Data dari src/data/paket.ts (gambar sementara link Wikimedia Commons)
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
    <section className="bg-sand-100 py-14 sm:py-20 lg:py-24">
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

        {/* Grid kartu — 1 kolom mobile, 2 tablet, 3 desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PAKET_UMRAH.map((paket) => (
            <motion.article
              key={paket.id}
              variants={fadeUp}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-gray-100 transition-all hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Gambar — ratio 16/10, mobile tetap proporsional */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={paket.gambar}
                  alt={paket.nama}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradasi bawah + badge durasi */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-800 shadow backdrop-blur">
                  {paket.durasi}
                </span>
                <span className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-xs font-medium text-white/90">
                  <Icon name="calendar" className="h-3.5 w-3.5" />
                  {paket.jadwal}
                </span>
              </div>

              {/* Konten */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-base font-bold text-brand-900 sm:text-lg">
                  {paket.nama}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                  <Icon name="plane" className="h-3.5 w-3.5" />
                  {paket.maskapai}
                </p>

                {/* Harga */}
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-xl font-extrabold text-brand-600 sm:text-2xl">
                    {paket.harga > 0 ? formatRupiah(paket.harga) : 'Hubungi Admin'}
                  </p>
                  {paket.harga > 0 && (
                    <span className="text-xs text-gray-400">/orang</span>
                  )}
                </div>

                {/* Fasilitas ringkas */}
                <ul className="mt-4 flex-1 space-y-2 border-t border-gray-100 pt-4">
                  {paket.fasilitas.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Aksi — tombol full-width di mobile */}
                <div className="mt-5 flex flex-col gap-2">
                  <a
                    href={waLink(`Assalamualaikum, saya tertarik dengan ${paket.nama} (${paket.harga > 0 ? formatRupiah(paket.harga) : 'hubungi admin'})`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    <Icon name="whatsapp" className="h-4 w-4" />
                    Tanya Paket Ini
                  </a>
                  <Link
                    to="/paket-umrah"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-brand-300 hover:text-brand-600"
                  >
                    Detail Paket
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 text-center sm:mt-10"
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
