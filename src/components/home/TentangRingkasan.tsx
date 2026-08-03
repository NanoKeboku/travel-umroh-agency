/**
 * Tentang (Ringkasan) — preview profil perusahaan di Beranda
 * Gaya: dua kolom — teks kiri, panel visual kanan (placeholder gambar)
 */
import { motion } from 'framer-motion'
import Icon from '../ui/Icon'
import { staggerContainer, fadeUp, fadeIn } from './anim'

function TentangRingkasan() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial={false}
          className='grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16'
        >
          {/* ===== KONTEN KIRI: Eyebrow & Judul ===== */}
          <motion.div variants={fadeUp}>
            <p className="text-sm font-bold uppercase tracking-wider text-sky-600">
              Tentang Kami
            </p>
            <h2 className="mt-3 text-3xl leading-tight text-brand-950 sm:text-4xl">
              Perjalanan Ibadah yang Terpercaya & Berpengalaman
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-4 lg:mt-10">
            <motion.p variants={fadeUp} className="mt-4 lg:mt-10">
              Travel Umrah Ebitour Purworejo adalah penyedia layanan perjalanan
              ibadah umrah dan haji yang telah mendampingi ribuan jamaah dari
              Purworejo dan sekitarnya.
            </motion.p>
          </motion.div>
        </motion.div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          {/* Teks */}
          <motion.div
            variants={staggerContainer}
            initial={false}
            className="space-y-5"
          >
            <motion.p variants={fadeUp} className="leading-relaxed text-gray-500">
              Kami berkomitmen menghadirkan pengalaman ibadah yang tenang dan
              bermakna — didukung pembimbing berpengalaman, hotel strategis,
              transportasi nyaman, serta pendampingan penuh sejak manasik
              hingga kepulangan.
            </motion.p>

            {/* Poin keunggulan singkat */}
            <motion.ul variants={fadeUp} className="space-y-3 pt-2">
              {[
                'Legal & resmi — dokumen dan visa diurus tuntas',
                'Pembimbing & muthawif berpengalaman',
                'Fasilitas hotel sesuai perjanjian, harga transparan',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="pt-2">
              <a
                href="/tentang"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
              >
                Selengkapnya tentang kami
                <Icon name="arrowRight" className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Panel visual — foto Masjidil Haram (Wikimedia Commons) */}
          <motion.div
            variants={fadeIn}
            initial={false}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kaaba%2C_Makkah3.jpg/960px-Kaaba%2C_Makkah3.jpg"
                alt="Masjidil Haram & Kabah"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            {/* Kartu melayang — di dalam panel di mobile, melayang keluar di sm+ */}
            <div className="absolute -bottom-5 left-3 rounded-xl bg-white p-3 shadow-lg ring-1 ring-gray-100 sm:-left-6 sm:bottom-6 sm:p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <Icon name="users" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xl font-extrabold text-brand-900">2.500+</p>
                  <p className="text-xs text-gray-500">Jamaah Terlayani</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TentangRingkasan
