/**
 * Asatidzah — section Pembimbing Umrah & Haji Khusus (Beranda)
 * SATU carousel: 8 orang, kartu besar, tinggi section ±523px.
 * Background: foto Masjid Nabawi (Wikimedia) + overlay gelap.
 * Responsive per view: 1 (mobile) → 2 (sm) → 3 (lg) → 4 (xl).
 * Ditempatkan di atas section Testimoni.
 */
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp } from './anim'
import { ASATIDZAH } from '../../data/asatidzah'

/** Jumlah kartu terlihat per ukuran layar */
function cardsPerView(): number {
  if (typeof window === 'undefined') return 4
  const w = window.innerWidth
  if (w < 640) return 1
  if (w < 1024) return 2
  if (w < 1280) return 3
  return 4
}

function Asatidzah() {
  const [perView, setPerView] = useState(4)
  const [index, setIndex] = useState(0)

  const total = ASATIDZAH.length // 8
  const maxIndex = Math.max(0, total - perView)

  useEffect(() => {
    function onResize() {
      setPerView(cardsPerView())
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1))
  const canPrev = index > 0
  const canNext = index < maxIndex

  return (
    <section className="relative h-[523px] overflow-hidden bg-white/90">
      {/* Background foto + overlay */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial={false}>
          <SectionHeading
            title="Pembimbing Umrah & Haji Khusus"
          />
        </motion.div>

        {/* SATU carousel */}
        <motion.div variants={fadeUp} initial={false} className="mt-6">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
              >
                {ASATIDZAH.map((a) => (
                  <div
                    key={a.id}
                    className="shrink-0 px-2.5"
                    style={{ width: `${100 / perView}%` }}
                  >
                    <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-white/95 px-5 py-7 text-center shadow-lg ring-1 ring-white/20 backdrop-blur transition-shadow duration-300 hover:shadow-xl">
                      <img
                        src={a.foto}
                        alt={a.nama}
                        loading="lazy"
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-brand-100"
                      />
                      <h3 className="mt-4 text-sm leading-snug text-brand-900">
                        {a.nama}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-brand-600">{a.peran}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol prev/next */}
            <button
              type="button"
              onClick={prev}
              disabled={!canPrev}
              aria-label="Sebelumnya"
              className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-700 shadow-lg transition-colors hover:bg-brand-50 disabled:opacity-40 disabled:hover:bg-white sm:-left-4"
            >
              <Icon name="chevronLeft" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              aria-label="Berikutnya"
              className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-700 shadow-lg transition-colors hover:bg-brand-50 disabled:opacity-40 disabled:hover:bg-white sm:-right-4"
            >
              <Icon name="chevronRight" className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-5 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-[width,background-color] ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Asatidzah
