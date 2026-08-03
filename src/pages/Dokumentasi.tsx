/**
 * Halaman: Dokumentasi
 * Route: /dokumentasi
 * Diisi dari src/data/galeri.ts — foto yang sama dengan cuplikan Beranda,
 * dikelompokkan per kategori dengan deskripsi lengkap.
 * Foto sementara Wikimedia Commons — ganti dengan foto asli Ebitour.
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from '../components/ui/Icon'
import { staggerContainer, fadeUp } from '../components/home/anim'
import { GALERI } from '../data/galeri'
import type { GaleriItem } from '../data/galeri'
import { waLink } from '../utils/format'

/** Format tanggal ISO → "10 Nov 2025" */
function formatTanggal(t?: string): string {
  if (!t) return ''
  const d = new Date(t)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function Dokumentasi() {
  const foto = GALERI.filter((g) => g.tipe === 'foto')
  const kategori = Array.from(new Set(foto.map((f) => f.kategori)))

  return (
    <>
      {/* Header */}
      <section className="bg-brand-950 py-14 text-center sm:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl text-white sm:text-4xl">Dokumentasi</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Bukti nyata perjalanan jamaah Ebitour — dari manasik, keberangkatan,
            hingga ibadah di Tanah Suci.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* Statistik ringkas */}
        <motion.div
          variants={staggerContainer}
          initial={false}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { angka: String(foto.length), label: 'Foto Dokumentasi' },
            { angka: String(kategori.length), label: 'Kategori Kegiatan' },
            { angka: '2025', label: 'Tahun Keberangkatan' },
            { angka: '2.500+', label: 'Jamaah Terlayani' },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="rounded-2xl bg-sand-100 p-5 text-center"
            >
              <p className="text-2xl font-extrabold text-brand-700 sm:text-3xl">{s.angka}</p>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Per kategori */}
        <div className="mt-14 space-y-14">
          {kategori.map((k) => {
            const items = foto.filter((f) => f.kategori === k)
            return (
              <section key={k}>
                <div className="flex items-end justify-between gap-4">
                  <h2 className="text-2xl text-brand-900 sm:text-3xl">{k}</h2>
                  <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                    {items.length} foto
                  </span>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial={false}
                  className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {items.map((item: GaleriItem) => (
                    <motion.figure
                      key={item.id}
                      variants={fadeUp}
                      className="group overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-gray-100 transition hover:shadow-lg"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.judul}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        {item.tanggal && (
                          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-800 backdrop-blur">
                            <Icon name="calendar" className="h-3 w-3" />
                            {formatTanggal(item.tanggal)}
                          </span>
                        )}
                      </div>
                      <figcaption className="p-5">
                        <h3 className="text-base text-brand-900">{item.judul}</h3>
                        {item.deskripsi && (
                          <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                            {item.deskripsi}
                          </p>
                        )}
                      </figcaption>
                    </motion.figure>
                  ))}
                </motion.div>
              </section>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-brand-800 to-brand-600 p-8 text-center sm:p-10">
          <h2 className="text-2xl text-white sm:text-3xl">
            Ingin Melihat Dokumentasi Lainnya?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/80">
            Kami memiliki banyak dokumentasi perjalanan. Hubungi kami untuk
            melihat foto & video keberangkatan terbaru.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={waLink('Assalamualaikum, saya ingin melihat dokumentasi perjalanan Ebitour')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-brand-800 shadow-lg transition-colors hover:bg-brand-50"
            >
              <Icon name="whatsapp" className="h-5 w-5 text-green-600" />
              Minta Dokumentasi via WhatsApp
            </a>
            <Link
              to="/paket-umrah"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Lihat Paket Umrah
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dokumentasi
