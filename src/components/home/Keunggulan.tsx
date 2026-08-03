/**
 * Keunggulan — alasan memilih Ebitour
 * Layout asimetris: kartu horizontal (ikon inline kiri) 2 kolom,
 * kartu terakhir diberi aksen — bukan 4 kartu ikon-atas yang seragam.
 */
import { motion } from 'framer-motion'
import Icon from '../ui/Icon'
import type { IconName } from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'
import { staggerContainer, fadeUp, viewportOnce } from './anim'

const KEUNGGULAN: { ikon: IconName; judul: string; desc: string }[] = [
  {
    ikon: 'shield',
    judul: 'Legal & Terpercaya',
    desc: 'Perusahaan resmi dengan dokumen lengkap, visa dan administrasi diurus tuntas.',
  },
  {
    ikon: 'users',
    judul: 'Pembimbing Berpengalaman',
    desc: 'Didampingi pembimbing dan muthawif yang sabar serta memahami kebutuhan jamaah.',
  },
  {
    ikon: 'hotel',
    judul: 'Fasilitas Sesuai Janji',
    desc: 'Hotel strategis, maskapai nyaman, dan konsumsi terjaga sesuai paket yang dipilih.',
  },
  {
    ikon: 'heart',
    judul: 'Pelayanan Penuh Ikhlas',
    desc: 'Kami melayani seperti keluarga sendiri — dari manasik hingga kepulangan.',
  },
]

function Keunggulan() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            title="Perjalanan Ibadah yang Tenang & Bermakna"
            description="Kepercayaan calon jamaah adalah prioritas kami."
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial={false}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {KEUNGGULAN.map((k, i) => (
            <motion.div
              key={k.judul}
              variants={fadeUp}
              className={`group flex items-start gap-4 rounded-2xl border p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg ${
                i === KEUNGGULAN.length - 1
                  ? 'border-brand-100 bg-brand-50'
                  : 'border-gray-100 bg-white hover:border-brand-200'
              }`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <Icon name={k.ikon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-base font-bold text-brand-900">{k.judul}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{k.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Keunggulan
