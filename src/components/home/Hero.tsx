/**
 * Hero — bagian pembuka halaman Beranda
 * Gaya: background foto (Ka'bah malam) + overlay gradasi gelap,
 * konten kiri, kartu kaca melayang (informasi singkat) di kanan.
 * Mobile-first: kartu di bawah teks, naik ke kanan di lg.
 */
import { motion } from 'framer-motion'
import Icon from '../ui/Icon'
import { staggerContainer, fadeUp } from './anim'
import { PAKET_UMRAH } from '../../data/paket'
import { KONTAK } from '../../data/kontak'
import { formatRupiah, waLink } from '../../utils/format'

const HERO_BG =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Kaaba_at_night.jpg/1280px-Kaaba_at_night.jpg'

/** Paket yang ditampilkan di kartu melayang (paket reguler = tengah) */
const PAKET_FLOAT = PAKET_UMRAH.find((p) => p.id === 'umrah-reguler') ?? PAKET_UMRAH[0]

function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-900">
      {/* Background foto */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Ka'bah di malam hari"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        {/* Overlay gradasi: gelap di kiri (teks), transparan di kanan (kartu) */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/80 to-brand-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-brand-900/60" />
        {/* Pola geometris islami halus */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'%23FFFFFF\' stroke-width=\'1\'%3E%3Cpath d=\'M40 0L55 20L40 40L25 20Z\'/%3E%3Cpath d=\'M40 40L55 60L40 80L25 60Z\'/%3E%3C/g%3E%3C/svg%3E")',
          }}
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
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sand-200 backdrop-blur"
          >
            <Icon name="kaaba" className="h-4 w-4" />
            Travel Umrah Terpercaya di Purworejo
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Wujudkan Panggilan Suci,
            <span className="block text-sand-200">Ibadah dengan Hati Tenang</span>
          </motion.h1>

          {/* Deskripsi */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {KONTAK.nama} mendampingi perjalanan ibadah umrah & haji Anda dengan
            pelayanan profesional, pembimbing berpengalaman, dan fasilitas
            terbaik — dari keberangkatan hingga kepulangan.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a
              href={waLink('Assalamualaikum, saya ingin konsultasi paket umrah Ebitour')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-sand-200 px-5 py-3 text-sm font-bold text-brand-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white sm:px-6 sm:py-3.5"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              Konsultasi via WhatsApp
            </a>
            <a
              href="/paket-umrah"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20 sm:px-6 sm:py-3.5"
            >
              Lihat Paket Umrah
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Statistik kecil */}
          <motion.dl
            variants={fadeUp}
            className="mt-10 grid max-w-xl grid-cols-2 gap-5 border-t border-white/15 pt-6 sm:grid-cols-4"
          >
            {[
              { angka: '2.500+', label: 'Jamaah' },
              { angka: '10+', label: 'Tahun' },
              { angka: '48+', label: 'Keberangkatan' },
              { angka: '5.0', label: 'Rating' },
            ].map((s) => (
              <div key={s.label}>
                <dt className="text-xl font-extrabold text-white sm:text-2xl">
                  {s.angka}
                </dt>
                <dd className="mt-0.5 text-[11px] text-white/60 sm:text-xs">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ===== KARTU MELAYANG (kanan) ===== */}
        <motion.div
          variants={fadeUp}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          {/* Kartu utama — melayang naik-turun */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-6"
          >
            {/* Label */}
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sand-200/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-sand-200">
                <Icon name="calendar" className="h-3.5 w-3.5" />
                Keberangkatan Berikutnya
              </span>
              <span className="rounded-full bg-green-400/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-green-300">
                Kuota Terbatas
              </span>
            </div>

            {/* Nama + jadwal */}
            <h3 className="mt-4 text-lg font-bold text-white sm:text-xl">
              {PAKET_FLOAT.nama}
            </h3>
            <p className="mt-1 text-sm text-white/70">
              {PAKET_FLOAT.jadwal} • {PAKET_FLOAT.durasi}
            </p>

            {/* Harga */}
            <div className="mt-4 flex items-baseline gap-2">
              <p className="text-2xl font-extrabold text-sand-200 sm:text-3xl">
                {PAKET_FLOAT.harga > 0 ? formatRupiah(PAKET_FLOAT.harga) : 'Hubungi Admin'}
              </p>
              <span className="text-xs text-white/60">/orang</span>
            </div>

            {/* Info singkat */}
            <ul className="mt-4 space-y-2 border-t border-white/15 pt-4">
              {[
                { ikon: 'plane' as const, teks: `${PAKET_FLOAT.maskapai}` },
                { ikon: 'hotel' as const, teks: `${PAKET_FLOAT.hotel}` },
                { ikon: 'check' as const, teks: 'Visa + Perlengkapan Ihram' },
              ].map((row) => (
                <li key={row.teks} className="flex items-start gap-2.5 text-sm text-white/85">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-sand-200">
                    <Icon name={row.ikon} className="h-3.5 w-3.5" />
                  </span>
                  <span className="line-clamp-2">{row.teks}</span>
                </li>
              ))}
            </ul>

            {/* CTA kartu */}
            <a
              href={waLink(`Assalamualaikum, saya tertarik dengan ${PAKET_FLOAT.nama} (${formatRupiah(PAKET_FLOAT.harga)})`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sand-200 px-4 py-2.5 text-sm font-bold text-brand-900 transition-colors hover:bg-white"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              Daftar Sekarang
            </a>
          </motion.div>

          {/* Chip kecil — rating, melayang dengan delay berbeda */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -left-2 bottom-10 flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 shadow-xl backdrop-blur-xl sm:-left-6"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
              <Icon name="star" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">5.0</p>
              <p className="text-[10px] text-white/60">Rating Jamaah</p>
            </div>
          </motion.div>

          {/* Chip kecil — jamaah, kanan atas */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -right-2 -top-4 flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 shadow-xl backdrop-blur-xl sm:-right-4"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-200/20 text-sand-200">
              <Icon name="users" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">2.500+</p>
              <p className="text-[10px] text-white/60">Jamaah Berangkat</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
