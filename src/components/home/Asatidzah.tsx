/**
 * Asatidzah — section Pembimbing Umrah & Haji Khusus (Beranda)
 * Background: foto Masjid Nabawi (Wikimedia) + overlay gelap.
 * Carousel paged: tiap slide berisi 6 kartu, grid 4 kolom ke bawah
 * (mobile 2 kolom, sm 3 kolom). 16 orang → 3 slide (6-6-4).
 * Ditempatkan di atas section Testimoni.
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, viewportOnce } from './anim'
import { ASATIDZAH } from '../../data/asatidzah'

const BG_NABAWI =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Al-Masjid_an_Nabawi.jpg/960px-Al-Masjid_an_Nabawi.jpg'

/** Jumlah kartu per slide */
const PER_SLIDE = 6

/** Pecah data jadi halaman-halaman berisi 6 kartu */
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function Asatidzah() {
  const pages = chunk(ASATIDZAH, PER_SLIDE) // 3 slide: 6-6-4
  const [page, setPage] = useState(0)
  const total = pages.length

  const prev = () => setPage((p) => Math.max(0, p - 1))
  const next = () => setPage((p) => Math.min(total - 1, p + 1))
  const canPrev = page > 0
  const canNext = page < total - 1

  return (
    <section className="relative overflow-hidden bg-brand-950 py-16 sm:py-20 lg:py-24">
      {/* Background foto + overlay */}
      <div className="absolute inset-0">
        <img
          src={BG_NABAWI}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-950/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/60 via-transparent to-brand-950/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            variant="dark"
            eyebrow="Asatidzah Pembimbing"
            title="Pembimbing Umrah & Haji Khusus"
            description="Dibimbing langsung oleh para asatidzah hafidz Qur'an dan muthawif berpengalaman, siap membimbing setiap rangkaian ibadah Anda di Tanah Suci."
          />
        </motion.div>

        {/* Carousel — tiap slide 6 kartu */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10"
        >
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${page * 100}%)` }}
              >
                {pages.map((pg, i) => (
                  <div key={i} className="w-full shrink-0 px-2.5">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                      {pg.map((a) => (
                        <div
                          key={a.id}
                          className="rounded-2xl bg-white/95 p-5 text-center shadow-lg ring-1 ring-white/20 backdrop-blur transition-transform duration-300 hover:-translate-y-1"
                        >
                          <img
                            src={a.foto}
                            alt={a.nama}
                            loading="lazy"
                            className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-brand-100"
                          />
                          <h3 className="mt-4 text-sm font-bold leading-snug text-brand-900">
                            {a.nama}
                          </h3>
                          <p className="mt-1 text-xs font-medium text-brand-600">{a.peran}</p>
                        </div>
                      ))}
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

          {/* Dots — jumlah slide (3) */}
          <div className="mt-6 flex justify-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === page ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
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
