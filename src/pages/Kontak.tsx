/**
 * Halaman: Kontak
 * Route: /kontak
 * Info kontak dari src/data/kontak.ts (placeholder — ganti data asli Ebitour).
 * Form kontak → membuka WhatsApp dengan pesan terisi (tanpa backend).
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import Icon from '../components/ui/Icon'
import type { IconName } from '../components/ui/Icon'
import { staggerContainer, fadeUp } from '../components/home/anim'
import { KONTAK } from '../data/kontak'
import { waLink } from '../utils/format'

const INFO_KONTAK: { ikon: IconName; judul: string; nilai: string; sub: string }[] = [
  {
    ikon: 'mapPin',
    judul: 'Alamat Kantor',
    nilai: KONTAK.alamat,
    sub: 'Kunjungi kami di jam kerja',
  },
  {
    ikon: 'phone',
    judul: 'Telepon',
    nilai: KONTAK.telepon,
    sub: 'Senin–Sabtu, 08.00–16.00 WIB',
  },
  {
    ikon: 'whatsapp',
    judul: 'WhatsApp',
    nilai: KONTAK.whatsapp,
    sub: 'Respons cepat di jam kerja',
  },
  {
    ikon: 'mail',
    judul: 'Email',
    nilai: KONTAK.email,
    sub: 'Balasan maksimal 1×24 jam',
  },
]

const INPUT_CLS =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none'

function Kontak() {
  const [nama, setNama] = useState('')
  const [telepon, setTelepon] = useState('')
  const [pesan, setPesan] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const teks = [
      'Assalamualaikum, saya ingin bertanya tentang Ebitour.',
      '',
      `Nama: ${nama || '-'}`,
      `No. WhatsApp: ${telepon || '-'}`,
      `Pesan: ${pesan || '-'}`,
    ].join('\n')
    window.open(waLink(teks), '_blank', 'noopener,noreferrer')
  }

  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    KONTAK.alamat,
  )}&output=embed`

  return (
    <>
      {/* Header */}
      <section className="bg-brand-950 py-14 text-center sm:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-3xl text-white sm:text-4xl">Hubungi Kami</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Konsultasikan rencana umrah & haji Anda. Tim kami siap membantu
            dari manasik hingga kepulangan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* Kartu info kontak */}
        <motion.div
          variants={staggerContainer}
          initial={false}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {INFO_KONTAK.map((k) => (
            <motion.div
              key={k.judul}
              variants={fadeUp}
              className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-soft"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <Icon name={k.ikon} className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-brand-900">{k.judul}</h2>
                <p className="mt-1 break-words text-sm text-gray-600">{k.nilai}</p>
                <p className="mt-1 text-xs text-gray-400">{k.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Form + Peta */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Form kontak → WhatsApp */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-2xl text-brand-900">Kirim Pesan</h2>
            <p className="mt-2 text-sm text-gray-500">
              Isi formulir di bawah, pesan akan langsung terkirim ke WhatsApp
              admin kami.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-gray-600">
                  Nama Lengkap
                </span>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama Anda"
                  className={INPUT_CLS}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-gray-600">
                  No. WhatsApp
                </span>
                <input
                  type="tel"
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className={INPUT_CLS}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-gray-600">
                  Pesan
                </span>
                <textarea
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  placeholder="Tulis pertanyaan / rencana keberangkatan Anda…"
                  rows={5}
                  className={INPUT_CLS}
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                Kirim via WhatsApp
              </button>
              <p className="text-center text-xs text-gray-400">
                KERANGKA — notifikasi ke admin via Fonnte menyusul fase 2
              </p>
            </form>
          </div>

          {/* Peta */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft">
            <div className="min-h-[320px] flex-1">
              <iframe
                title="Lokasi Kantor Ebitour"
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[320px] w-full border-0"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-5">
              <div>
                <p className="text-sm font-semibold text-brand-900">Lokasi Kantor</p>
                <p className="text-sm text-gray-500">{KONTAK.alamat}</p>
              </div>
              <a
                href={KONTAK.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50"
              >
                Buka di Google Maps
                <Icon name="arrowRight" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* CTA WhatsApp langsung */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-800 to-brand-600 p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl text-white sm:text-3xl">
            Lebih Nyaman Chat Langsung?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/80">
            Admin kami siap melayani pertanyaan Anda via WhatsApp — lebih cepat
            dan mudah.
          </p>
          <a
            href={waLink('Assalamualaikum, saya ingin bertanya tentang paket umrah/haji Ebitour')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-brand-800 shadow-lg transition-colors hover:bg-brand-50"
          >
            <Icon name="whatsapp" className="h-5 w-5 text-green-600" />
            Chat WhatsApp Sekarang
          </a>
        </div>
      </section>
    </>
  )
}

export default Kontak
