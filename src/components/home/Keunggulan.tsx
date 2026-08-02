/**
 * Keunggulan — alasan memilih Ebitour (grid 4 ikon)
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
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Kenapa Ebitour"
            title="Perjalanan Ibadah yang Tenang & Bermakna"
            description="Kepercayaan calon jamaah adalah prioritas kami."
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {KEUNGGULAN.map((k) => (
            <motion.div
              key={k.judul}
              variants={fadeUp}
              className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <Icon name={k.ikon} className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-base font-bold text-brand-900">{k.judul}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{k.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Keunggulan
