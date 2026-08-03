/**
 * PaketUnggulan — pilihan paket di Beranda dengan filter tab Umrah/Haji
 * Menampilkan beberapa kartu ("menampilkan sedikit").
 * Klik kartu paket umrah → halaman tiket detail (/paket-umrah/:slug).
 * Tab Haji → kartu haji (mengarah ke halaman /paket-haji).
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'
import { staggerContainer, fadeUp, viewportOnce } from './anim'
import { PAKET_UMRAH, PAKET_HAJI } from '../../data/paket'
import type { Paket } from '../../data/paket'
import { formatRupiah, waLink } from '../../utils/format'

type Tab = 'umrah' | 'haji'

const TAB_CLS = {
  base: 'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
  aktif: 'bg-brand-600 text-white shadow',
  idle: 'text-gray-500 hover:text-brand-600',
}

function KartuPaket({ paket, tab }: { paket: Paket; tab: Tab }) {
  const isHaji = tab === 'haji'
  // Umrah → halaman tiket detail; Haji → halaman paket haji
  const target = isHaji ? '/paket-haji' : `/paket-umrah/${paket.id}`

  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-gray-100 transition-all hover:-translate-y-1.5 hover:shadow-xl"
    >
      {/* Gambar — klik → halaman tiket */}
      <Link to={target} className="relative block aspect-[16/10] overflow-hidden">
        <img
          src={paket.gambar}
          alt={paket.nama}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-800 shadow backdrop-blur">
          {paket.durasi}
        </span>
        <span className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-xs font-medium text-white/90">
          <Icon name="calendar" className="h-3.5 w-3.5" />
          {paket.jadwal}
        </span>
      </Link>

      {/* Konten */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link to={target} className="hover:underline">
          <h3 className="text-base font-bold text-brand-900 sm:text-lg">{paket.nama}</h3>
        </Link>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
          <Icon name="plane" className="h-3.5 w-3.5" />
          {paket.maskapai}
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <p className="text-xl font-extrabold text-brand-600 sm:text-2xl">
            {paket.harga > 0 ? formatRupiah(paket.harga) : 'Hubungi Admin'}
          </p>
          {paket.harga > 0 && <span className="text-xs text-gray-400">/orang</span>}
        </div>

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

        <div className="mt-5 flex flex-col gap-2">
          <Link
            to={target}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {isHaji ? 'Lihat Halaman Haji' : 'Lihat Tiket'}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
          <a
            href={waLink(`Assalamualaikum, saya tertarik dengan ${paket.nama} (${paket.harga > 0 ? formatRupiah(paket.harga) : 'hubungi admin'})`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-brand-300 hover:text-brand-600"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Tanya Paket Ini
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function PaketUnggulan() {
  const [tab, setTab] = useState<Tab>('umrah')
  const daftar = tab === 'umrah' ? PAKET_UMRAH.slice(0, 3) : PAKET_HAJI.slice(0, 3)
  const linkSemua = tab === 'umrah' ? '/paket-umrah' : '/paket-haji'
  const labelSemua = tab === 'umrah' ? 'Lihat Semua Paket Umrah' : 'Lihat Semua Paket Haji'

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
            eyebrow="Paket Kami"
            title="Pilihan Paket Terbaik Kami"
            description="Harga transparan, fasilitas jelas. Pilih paket yang sesuai kebutuhan Anda."
          />

          {/* Filter tab: Umrah / Haji */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full bg-white p-1 shadow-soft ring-1 ring-gray-100">
              {(['umrah', 'haji'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`${TAB_CLS.base} ${
                    tab === t ? TAB_CLS.aktif : TAB_CLS.idle
                  }`}
                >
                  {t === 'umrah' ? 'Paket Umrah' : 'Paket Haji'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid kartu — 1 kolom mobile, 2 tablet, 3 desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {daftar.map((paket) => (
            <KartuPaket key={paket.id} paket={paket} tab={tab} />
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
            to={linkSemua}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            {labelSemua}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </motion.p>
      </div>
    </section>
  )
}

export default PaketUnggulan
