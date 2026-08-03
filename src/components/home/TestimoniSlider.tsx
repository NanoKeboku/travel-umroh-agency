/**
 * TestimoniSlider — slider testimoni jamaah
 * Animasi: Framer Motion AnimatePresence (fade + slide saat ganti slide)
 * Data dari src/data/testimoni.ts (placeholder — ganti dengan asli)
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'
import { staggerContainer, fadeUp, viewportOnce } from './anim'
import { TESTIMONI } from '../../data/testimoni'

function TestimoniSlider() {
  const [index, setIndex] = useState(0)
  const total = TESTIMONI.length
  const t = TESTIMONI[index]

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  return (
    <section className="bg-sand-100 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            align="left"
            title="Kata Mereka yang Telah Berangkat"
            description="Pengalaman nyata jamaah Ebitour dalam perjalanan ibadahnya."
          />
        </motion.div>

        {/* Slider */}
        <motion.div
          variants={fadeUp}
          initial={false}
          className="relative mt-12"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-soft ring-1 ring-gray-100 sm:p-10">
            {/* Ikon quote */}
            <span className="absolute right-6 top-6 text-brand-100">
              <Icon name="quote" className="h-16 w-16" />
            </span>

            <AnimatePresence mode="wait">
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative"
              >
                {/* Rating bintang — pakai brand (token), bukan amber luar palet */}
                <div className="flex gap-1 text-brand-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      className={`h-5 w-5 ${i < t.rating ? '' : 'opacity-25'}`}
                    />
                  ))}
                </div>

                <blockquote className="mt-4 text-lg leading-relaxed text-gray-700 sm:text-xl">
                  “{t.isi}”
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-base font-bold text-white">
                    {t.nama.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-brand-900">{t.nama}</p>
                    <p className="text-sm text-gray-500">
                      {t.asal}
                      {t.paket ? ` • ${t.paket}` : ''}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Tombol prev/next + indikator */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Testimoni sebelumnya"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-brand-300 hover:text-brand-600"
            >
              <Icon name="chevronLeft" className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {TESTIMONI.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Testimoni ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-[width,background-color] ${
                    i === index ? 'w-6 bg-brand-600' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Testimoni berikutnya"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-brand-300 hover:text-brand-600"
            >
              <Icon name="chevronRight" className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimoniSlider
