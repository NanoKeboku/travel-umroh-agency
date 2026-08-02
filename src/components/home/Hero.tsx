/**
 * Hero — bagian pembuka halaman Beranda
 * Gaya: gradasi olive gelap (sesuai STYLE-REFERENCE), teks putih,
 * pola geometris islami halus, CTA, dan statistik kecil.
 */
import { motion } from 'framer-motion'
import Icon from '../ui/Icon'
import { staggerContainer, fadeUp } from './anim'
import { KONTAK } from '../../data/kontak'
import { waLink } from '../../utils/format'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-900">
      {/* Latar: gradasi olive + pola geometris islami */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-700 to-brand-600"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'%23FFFFFF\' stroke-width=\'1\'%3E%3Cpath d=\'M40 0L55 20L40 40L25 20Z\'/%3E%3Cpath d=\'M40 40L55 60L40 80L25 60Z\'/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />
      {/* Cahaya lembut */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-sand-200/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sand-200 backdrop-blur"
        >
          <Icon name="kaaba" className="h-4 w-4" />
          Travel Umrah Terpercaya di Purworejo
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          Wujudkan Panggilan Suci,
          <span className="block text-sand-200">Ibadah dengan Hati Tenang</span>
        </motion.h1>

        {/* Deskripsi */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          {KONTAK.nama} mendampingi perjalanan ibadah umrah & haji Anda dengan
          pelayanan profesional, pembimbing berpengalaman, dan fasilitas
          terbaik — dari keberangkatan hingga kepulangan.
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          <a
            href={waLink('Assalamualaikum, saya ingin konsultasi paket umrah Ebitour')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-sand-200 px-6 py-3.5 text-sm font-bold text-brand-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
            Konsultasi via WhatsApp
          </a>
          <a
            href="/paket-umrah"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20"
          >
            Lihat Paket Umrah
            <Icon name="arrowRight" className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Statistik kecil */}
        <motion.dl
          variants={fadeUp}
          className="mt-14 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4"
        >
          {[
            { angka: '2.500+', label: 'Jamaah Berangkat' },
            { angka: '10+', label: 'Tahun Pengalaman' },
            { angka: '48+', label: 'Keberangkatan' },
            { angka: '5.0', label: 'Rating Jamaah' },
          ].map((s) => (
            <div key={s.label}>
              <dt className="text-2xl font-extrabold text-white sm:text-3xl">
                {s.angka}
              </dt>
              <dd className="mt-1 text-xs text-white/70">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  )
}

export default Hero
