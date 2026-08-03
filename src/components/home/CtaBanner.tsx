/**
 * CtaBanner — ajakan mendaftar / hubungi admin
 * Gaya: panel gradasi olive dengan CTA WhatsApp + telepon
 */
import { motion } from 'framer-motion'
import Icon from '../ui/Icon'
import { staggerContainer, fadeUp } from './anim'
import { KONTAK } from '../../data/kontak'
import { waLink } from '../../utils/format'

function CtaBanner() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial={false}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 px-6 py-14 text-center shadow-xl sm:px-12"
        >
          <motion.p
            variants={fadeUp}
            className="relative text-2xl text-white sm:text-4xl"
          >
            Siap Menunaikan Ibadah Umrah?
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="relative mx-auto mt-4 max-w-xl text-white/80"
          >
            Konsultasikan rencana perjalanan ibadah Anda bersama admin kami.
            Insya Allah kami bantu dari persiapan hingga kepulangan.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="relative mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={waLink('Assalamualaikum, saya ingin mendaftar paket umrah Ebitour')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-brand-800 shadow-lg transition-colors hover:bg-brand-50"
            >
              <Icon name="whatsapp" className="h-5 w-5 text-green-600" />
              Daftar via WhatsApp
            </a>
            <a
              href={`tel:${KONTAK.telepon}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <Icon name="phone" className="h-4 w-4" />
              {KONTAK.telepon}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CtaBanner
