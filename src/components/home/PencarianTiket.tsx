/**
 * PencarianTiket — widget pencarian tiket di Beranda
 * Ditempatkan di bawah section Tentang Ringkasan.
 * Memakai SearchWidget yang sama dengan halaman /paket-umrah —
 * hasil pencarian diarahkan ke listing dengan query param (?bulan=&jenis=).
 */
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import SearchWidget from '../paket/SearchWidget'
import TiketTerbaru from './TiketTerbaru'
import { staggerContainer, fadeUp, viewportOnce } from './anim'
import { PAKET_UMRAH } from '../../data/paket'

function PencarianTiket() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Cari Tiket"
            title="Temukan Jadwal Keberangkatan Anda"
            description="Pilih bulan keberangkatan dan jenis paket untuk melihat tiket umroh yang tersedia."
          />
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-8 max-w-4xl"
        >
          <SearchWidget paket={PAKET_UMRAH} />
        </motion.div>

        {/* Kartu tiket terbaru (voucher) — 3 jadwal terdekat */}
        <TiketTerbaru />
      </div>
    </section>
  )
}

export default PencarianTiket
