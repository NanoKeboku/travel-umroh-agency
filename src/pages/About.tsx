/**
 * Halaman: Tentang Kami
 * Route: /tentang
 * Konten: profil perusahaan, sejarah, visi misi, nilai layanan,
 * statistik, tim pembimbing, legalitas, CTA.
 * Data DUMMY — ganti dengan data asli Ebitour (foto dari Wikimedia Commons,
 * avatar tim placeholder ui-avatars).
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from '../components/ui/Icon'
import type { IconName } from '../components/ui/Icon'
import { staggerContainer, fadeUp, fadeIn } from '../components/home/anim'
import { waLink } from '../utils/format'

const GAMBAR_KABAH =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kaaba%2C_Makkah3.jpg/960px-Kaaba%2C_Makkah3.jpg'
const GAMBAR_NABAWI =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Al-Masjid_an_Nabawi.jpg/960px-Al-Masjid_an_Nabawi.jpg'
const GAMBAR_HARAM =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Supplicating_Pilgrim_at_Masjid_Al_Haram._Mecca%2C_Saudi_Arabia.jpg/960px-Supplicating_Pilgrim_at_Masjid_Al_Haram._Mecca%2C_Saudi_Arabia.jpg'

const NILAI: { ikon: IconName; judul: string; desc: string }[] = [
  {
    ikon: 'shield',
    judul: 'Amanah',
    desc: 'Mengelola biaya jamaah dengan transparan dan penuh tanggung jawab.',
  },
  {
    ikon: 'heart',
    judul: 'Ikhlas',
    desc: 'Melayani dengan niat ibadah, bukan sekadar transaksi bisnis.',
  },
  {
    ikon: 'star',
    judul: 'Profesional',
    desc: 'Standar layanan tinggi, didukung tim berpengalaman dan legalitas resmi.',
  },
  {
    ikon: 'users',
    judul: 'Melayani',
    desc: 'Pendampingan penuh sejak manasik, keberangkatan, hingga kepulangan.',
  },
]

const STATISTIK = [
  { angka: '10+', label: 'Tahun Pengalaman' },
  { angka: '2.500+', label: 'Jamaah Terlayani' },
  { angka: '120+', label: 'Keberangkatan' },
  { angka: '98%', label: 'Kepuasan Jamaah' },
]

const TIM = [
  {
    nama: 'H. Ahmad Fauzi, Lc.',
    peran: 'Pimpinan & Muthawif',
    avatar: 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=0C4A6E&color=fff&size=128',
  },
  {
    nama: 'Ustadz Abdullah Ramadhan',
    peran: 'Pembimbing Ibadah',
    avatar: 'https://ui-avatars.com/api/?name=Abdullah+Ramadhan&background=0284C7&color=fff&size=128',
  },
  {
    nama: 'Hj. Siti Nurhaliza, S.Ag.',
    peran: 'Pembimbing Jamaah Wanita',
    avatar: 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=5D6433&color=fff&size=128',
  },
]

const LEGALITAS = [
  'PIHK (Penyelenggara Ibadah Haji Khusus)',
  'Terdaftar & diawasi Kementerian Agama RI',
  'Anggota ASITA (Asosiasi Travel Indonesia)',
  'Terdaftar di Kementerian Hukum & HAM RI',
]

function About() {
  return (
    <>
      {/* ===== Header halaman ===== */}
      <section className="bg-brand-950 py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-3xl text-white sm:text-4xl">
            Travel Umrah Ebitour Purworejo
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
            Mitra perjalanan ibadah umrah & haji yang amanah, berpengalaman,
            dan berkomitmen menghantarkan jamaah dengan penuh ketenangan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* ===== Profil Perusahaan ===== */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeIn}
            initial={false}
            className="relative"
          >
            <img
              src={GAMBAR_KABAH}
              alt="Masjidil Haram & Kabah"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
            />
            <div className="absolute -bottom-5 left-4 rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-100">
              <p className="text-2xl font-extrabold text-brand-700">Sejak 2015</p>
              <p className="text-xs text-gray-500">Melayani Jamaah Indonesia</p>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={false}
          >
            <motion.h2 variants={fadeUp} className="mt-3 font-display text-3xl text-brand-950 sm:text-4xl">
              Berangkat dengan Tenang, Ibadah dengan Khusyuk
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 leading-relaxed text-gray-500">
              Travel Umrah Ebitour Purworejo berdiri sejak tahun 2015 di
              Purworejo, Jawa Tengah. Kami hadir untuk membantu masyarakat
              Purworejo dan sekitarnya menunaikan ibadah umrah dan haji dengan
              nyaman, aman, dan sesuai tuntunan syariat.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 leading-relaxed text-gray-500">
              Dengan dukungan tim pembimbing yang hafal Al-Qur’an, muthawif
              berpengalaman, serta jaringan hotel dan maskapai terpercaya,
              kami telah mengantarkan ribuan jamaah ke Tanah Suci — dari
              persiapan manasik, pengurusan visa dan paspor, hingga pendampingan
              penuh selama di Makkah dan Madinah.
            </motion.p>
            <motion.ul variants={fadeUp} className="mt-6 space-y-3">
              {[
                'Legalitas resmi & diawasi Kementerian Agama RI',
                'Pembimbing hafidz Qur\'an & muthawif berpengalaman',
                'Hotel strategis dekat Masjidil Haram & Nabawi',
                'Pendampingan 24 jam di Makkah & Madinah',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* ===== Visi & Misi ===== */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial={false}
            className="rounded-2xl bg-white p-8 shadow-soft ring-1 ring-gray-100"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <Icon name="star" className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-xl font-bold text-brand-900">Visi</h3>
            <p className="mt-2 leading-relaxed text-gray-500">
              Menjadi penyelenggara perjalanan ibadah umrah dan haji yang
              terpercaya, amanah, dan menjadi pilihan utama masyarakat
              Purworejo dan sekitarnya.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial={false}
            className="rounded-2xl bg-white p-8 shadow-soft ring-1 ring-gray-100"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <Icon name="check" className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-xl font-bold text-brand-900">Misi</h3>
            <ul className="mt-3 space-y-2.5 text-gray-500">
              {[
                'Memberikan pelayanan ibadah terbaik dengan standar profesional',
                'Menjaga transparansi biaya dan kualitas fasilitas sesuai perjanjian',
                'Membimbing jamaah agar dapat beribadah dengan khusyuk dan sesuai tuntunan',
                'Menjalin kemitraan dengan maskapai, hotel, dan layanan terpercaya',
                'Menjadi mitra ibadah yang amanah bagi keluarga Indonesia',
              ].map((m) => (
                <li key={m} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {m}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ===== Nilai Layanan ===== */}
        <div className="mt-20">
          <motion.div
            variants={fadeUp}
            initial={false}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mt-3 text-3xl font-extrabold text-brand-950">
              Prinsip yang Menjadi Pegangan
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={false}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {NILAI.map((n) => (
              <motion.div
                key={n.judul}
                variants={fadeUp}
                className="group rounded-2xl bg-white p-6 text-center shadow-soft ring-1 ring-gray-100 transition hover:shadow-lg"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={n.ikon} className="h-7 w-7" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-brand-900">{n.judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{n.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ===== Statistik ===== */}
        <motion.div
          variants={staggerContainer}
          initial={false}
          className="mt-20 grid grid-cols-2 gap-5 rounded-2xl bg-brand-950 p-8 sm:p-10 lg:grid-cols-4"
        >
          {STATISTIK.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <p className="text-3xl font-extrabold text-white sm:text-4xl">{s.angka}</p>
              <p className="mt-2 text-sm text-brand-200">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== Tim & Pembimbing ===== */}
        <div className="mt-20">
          <motion.div
            variants={fadeUp}
            initial={false}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mt-3 text-3xl font-extrabold text-brand-950">
              Pembimbing yang Mendampingi Anda
            </h2>
            <p className="mt-3 text-gray-500">
              Didampingi pembimbing berpengalaman yang siap membimbing setiap
              rangkaian ibadah Anda di Tanah Suci.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={false}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {TIM.map((t) => (
              <motion.div
                key={t.nama}
                variants={fadeUp}
                className="rounded-2xl bg-white p-6 text-center shadow-soft ring-1 ring-gray-100"
              >
                <img
                  src={t.avatar}
                  alt={t.nama}
                  loading="lazy"
                  className="mx-auto h-20 w-20 rounded-full ring-4 ring-brand-100"
                />
                <h3 className="mt-4 text-base font-bold text-brand-900">{t.nama}</h3>
                <p className="mt-1 text-sm text-brand-600">{t.peran}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ===== Legalitas ===== */}
        <motion.div
          variants={fadeUp}
          initial={false}
          className="mt-20 rounded-2xl bg-sand-100 p-8 sm:p-10"
        >
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-2xl font-extrabold text-brand-950">Legalitas & Kepercayaan</h2>
              <p className="mt-2 text-sm text-gray-500">
                Perusahaan terdaftar resmi dan diawasi, sehingga perjalanan
                ibadah Anda terlindungi dan terjamin.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {LEGALITAS.map((l) => (
                <li
                  key={l}
                  className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-soft"
                >
                  <Icon name="shield" className="h-5 w-5 shrink-0 text-brand-600" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ===== Galeri singkat ===== */}
        <div className="mt-20 grid gap-5 sm:grid-cols-3">
          {[
            { src: GAMBAR_KABAH, alt: 'Masjidil Haram' },
            { src: GAMBAR_NABAWI, alt: 'Masjid Nabawi' },
            { src: GAMBAR_HARAM, alt: 'Jamaah beribadah' },
          ].map((g, i) => (
            <motion.img
              key={g.alt}
              variants={fadeIn}
              initial={false}
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className={`aspect-[4/3] w-full rounded-2xl object-cover shadow-soft ${
                i === 1 ? 'sm:-translate-y-3' : ''
              }`}
            />
          ))}
        </div>

        {/* ===== CTA ===== */}
        <motion.div
          variants={fadeUp}
          initial={false}
          className="mt-20 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-10 text-center sm:p-14"
        >
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Siap Berangkat ke Tanah Suci?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Konsultasikan rencana umrah atau haji Anda bersama tim kami.
            Kami siap membantu dari manasik hingga kepulangan.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={waLink('Assalamualaikum, saya ingin konsultasi tentang paket umrah/haji Ebitour')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              Konsultasi Gratis
            </a>
            <Link
              to="/paket-umrah"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Lihat Paket Umrah
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default About
