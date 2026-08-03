/**
 * GaleriPreview — cuplikan dokumentasi keberangkatan (social proof)
 * Grid: 2 kolom mobile → 4 desktop. Gambar sementara dari Wikimedia Commons.
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
    <section className="bg-brand-900 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            variant="dark"
            title="Bukti Nyata Perjalanan Jamaah Kami"
            description="Foto dan video keberangkatan jamaah Ebitour — social proof yang bisa Anda lihat langsung."
          />
        </motion.div>

        {/* Grid: 2 kolom mobile, 4 desktop */}
        <motion.div
          variants={staggerContainer}
          initial={false}
          className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-4"
        >
          {foto.map((g) => (
            <motion.div
              key={g.id}
              variants={fadeIn}
              className="group relative overflow-hidden rounded-xl shadow-lg sm:rounded-2xl"
            >
              <div className="aspect-[3/4]">
                <img
                  src={g.url}
                  alt={g.judul}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Overlay — caption selalu terlihat (mobile & desktop) */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-2.5">
                <span className="w-fit rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white backdrop-blur sm:text-[10px]">
                  {g.kategori}
                </span>
                <p className="mt-1.5 line-clamp-2 text-xs font-semibold text-white sm:text-sm">
                  {g.judul}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeIn}
          initial={false}
          className="mt-8 text-center sm:mt-10"
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
