/**
 * Galeri Preview — cuplikan dokumentasi keberangkatan (social proof)
 * Data dari src/data/galeri.ts — placeholder, ganti dengan foto asli.
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'
import { staggerContainer, fadeIn, viewportOnce } from './anim'
import { GALERI } from '../../data/galeri'

function GaleriPreview() {
  // ambil 4 foto pertama untuk cuplikan
  const foto = GALERI.filter((g) => g.tipe === 'foto').slice(0, 4)

  return (
    <section className="bg-brand-900 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            variant="dark"
            eyebrow="Dokumentasi"
            title="Bukti Nyata Perjalanan Jamaah Kami"
            description="Foto dan video keberangkatan jamaah Ebitour — social proof yang bisa Anda lihat langsung."
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {foto.map((g) => (
            <motion.div
              key={g.id}
              variants={fadeIn}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              {/* Placeholder visual — ganti dengan <img src={g.url}> */}
              <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-brand-600 to-brand-800">
                <Icon name="kaaba" className="h-12 w-12 text-sand-200/70" />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                  {g.kategori}
                </span>
                <p className="mt-2 text-sm font-semibold text-white">{g.judul}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 text-center"
        >
          <Link
            to="/galeri"
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Lihat Semua Dokumentasi
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </motion.p>
      </div>
    </section>
  )
}

export default GaleriPreview
