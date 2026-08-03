/**
 * Hero — bagian pembuka halaman Beranda
 * Gaya: background foto (Ka'bah malam) + overlay gradasi gelap,
 * konten kiri, kartu kaca melayang (informasi singkat) di kanan.
 * Mobile-first: kartu di bawah teks, naik ke kanan di lg.
 */
import { motion } from 'framer-motion'
import Icon from '../ui/Icon'
import { staggerContainer, fadeUp } from './anim'
import { KONTAK } from '../../data/kontak'
import { waLink } from '../../utils/format'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-900">
      {/* Background foto */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero.jpg"
          alt="Ka'bah di malam hari"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:pb-24 lg:pt-32"
      >
        {/* ===== KONTEN KIRI ===== */}
        <div>
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-brand-950/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-100 backdrop-blur"
          >
            <Icon name="kaaba" className="h-4 w-4" />
            Travel Umrah Terpercaya di Purworejo
          </motion.p>

          {/* Headline */}
          <motion.p
            variants={fadeUp}
            className="mt-6 text-4xl  leading-tight sm:text-5xl lg:text-6xl text-white/90"
          >
            Wujudkan Panggilan Suci,
            Ibadah dengan Hati Tenang
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a
              href={waLink('Assalamualaikum, saya ingin konsultasi paket umrah Ebitour')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-sky-100 px-5 py-3 text-sm font-bold text-brand-950 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-sky-300 sm:px-6 sm:py-3.5"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              Konsultasi via WhatsApp
            </a>
            <a
              href="/paket-umrah"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-brand-950/40 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-brand-950/60 sm:px-6 sm:py-3.5"
            >
              Lihat Paket Umrah
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Statistik kecil */}
          <motion.dl
            variants={fadeUp}
            // Tambahkan bg-white, padding, rounded, dan shadow. Hapus border-t dan pt-6.
            className="mt-10 grid max-w-xl grid-cols-2 gap-20 rounded-2xl bg-white p-6 shadow-xl sm:grid-cols-4 sm:p-8"
          >
            {[
              { angka: '2.500+', label: 'Jamaah' },
              { angka: '10+', label: 'Tahun' },
              { angka: '48+', label: 'Keberangkatan' },
              { angka: '5.0', label: 'Rating' },
            ].map((s) => (
              <div key={s.label}>
                {/* Ubah text-white menjadi warna gelap biar kontras dengan background putih */}
                <dt className="text-xl font-extrabold text-brand-950 sm:text-2xl">
                  {s.angka}
                </dt>
                {/* Ubah text-white/80 menjadi warna abu-abu/gelap transparan */}
                <dd className="mt-0.5 text-[11px] font-medium text-brand-950/70 sm:text-xs">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ===== KARTU (kanan) ===== */}
        {/* Deskripsi */}
        <motion.div
          variants={fadeUp}
          className="relative justify-self-end self-end w-full max-w-sm text-right lg:max-w-md"
        >
          <motion.p
            variants={fadeUp}
            className="text-base font-medium leading-relaxed text-justify text-white/90 sm:text-lg "
          >
            {KONTAK.nama} mendampingi perjalanan ibadah umrah & haji Anda dengan pelayanan profesional, pembimbing berpengalaman, dan fasilitas
            terbaik — dari keberangkatan hingga kepulangan.
          </motion.p>


        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
