/**
 * Halaman: Pendaftaran
 * Route: /pendaftaran
 * Form pendaftaran jamaah umrah/haji:
 *  - pilih paket (dari data) → otomatis muncul daftar tanggal keberangkatan
 *  - data diri jamaah (nama, WA, alamat, jumlah pax)
 *  - submit → buka WhatsApp dengan ringkasan pendaftaran terformat
 *  (Fase berikutnya: simpan ke D1 + notifikasi admin via Fonnte.)
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import Icon from '../components/ui/Icon'
import { PAKET_UMRAH, PAKET_HAJI } from '../data/paket'
import { waLink } from '../utils/format'
import { submitPendaftaran } from '../api/pendaftaranApi'

const SEMUA_PAKET = [...PAKET_UMRAH, ...PAKET_HAJI]

const INPUT_CLS =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none'

const LABEL_CLS = 'mb-1.5 block text-sm font-medium text-gray-600'

function Pendaftaran() {
  const [paketId, setPaketId] = useState('')
  const [tanggal, setTanggal] = useState('')
  const [nama, setNama] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [alamat, setAlamat] = useState('')
  const [jumlah, setJumlah] = useState(1)

  const paketDipilih = SEMUA_PAKET.find((p) => p.id === paketId)
  const jadwalPaket = paketDipilih?.keberangkatan ?? []
  const hargaMulai = paketDipilih ? (paketDipilih.hargaQuad ?? paketDipilih.harga) : 0

  const [status, setStatus] = useState<'idle' | 'mengirim' | 'sukses' | 'gagal'>('idle')

  function pilihPaket(id: string) {
    setPaketId(id)
    setTanggal('') // reset tanggal saat ganti paket
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!paketDipilih || !tanggal) return

    setStatus('mengirim')

    const payload = {
      paketId: paketDipilih.id,
      paketNama: paketDipilih.nama,
      tanggal,
      nama,
      whatsapp,
      alamat,
      jumlahPax: jumlah,
      perkiraanHarga: hargaMulai > 0 ? hargaMulai : undefined,
    }

    try {
      // 1) Simpan ke database via API
      const result = await submitPendaftaran(payload)

      // 2) Kalau notifikasi Fonnte belum dikonfigurasi, tetap buka WA
      //    supaya admin tetap dapat info (fallback manual).
      if (!result.notifikasi?.ok) {
        const teks = [
          'Assalamualaikum, saya ingin mendaftar paket Ebitour.',
          '',
          `Nama: ${nama || '-'}`,
          `No. WhatsApp: ${whatsapp || '-'}`,
          `Alamat: ${alamat || '-'}`,
          `Paket: ${paketDipilih?.nama ?? '-'}`,
          `Tanggal berangkat: ${tanggal || 'belum dipilih'}`,
          `Jumlah jamaah: ${jumlah} pax`,
          hargaMulai > 0 ? `Perkiraan harga mulai: Rp${hargaMulai.toLocaleString('id-ID')}/pax` : '',
        ]
          .filter(Boolean)
          .join('\n')
        window.open(waLink(teks), '_blank', 'noopener,noreferrer')
      }

      setStatus('sukses')
    } catch (err) {
      console.error('Pendaftaran gagal:', err)
      setStatus('gagal')
    }
  }

  return (
    <>
      {/* Header */}
      <section className="bg-brand-950 py-14 text-center sm:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl text-white sm:text-4xl">Form Pendaftaran</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Daftarkan rencana umrah atau haji Anda — tim kami akan menghubungi
            untuk konfirmasi kuota & proses selanjutnya.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft sm:p-8"
        >
          {/* Pilih paket */}
          <div>
            <h2 className="text-xl text-brand-900">Pilih Paket</h2>
            <p className="mt-1 text-sm text-gray-500">
              Pilih paket umrah atau haji yang diinginkan.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {SEMUA_PAKET.map((p) => {
                const aktif = p.id === paketId
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => pilihPaket(p.id)}
                    className={`rounded-xl border p-4 text-left transition ${
                      aktif
                        ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500'
                        : 'border-gray-200 bg-white hover:border-brand-300'
                    }`}
                  >
                    <p className="text-sm font-semibold text-brand-900">{p.nama}</p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {p.durasi} · {p.maskapai}
                    </p>
                    <p className="mt-1 text-xs font-medium text-brand-600">
                      {p.harga > 0
                        ? `Mulai Rp${(p.hargaQuad ?? p.harga).toLocaleString('id-ID')}/pax`
                        : 'Hubungi admin'}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tanggal keberangkatan */}
          {paketDipilih && (
            <div className="mt-6">
              <label className="block">
                <span className={LABEL_CLS}>Tanggal Keberangkatan</span>
                <select
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  required
                  className={INPUT_CLS}
                >
                  <option value="">— Pilih tanggal —</option>
                  {jadwalPaket.map((j) => (
                    <option key={j.tanggal} value={j.tanggal}>
                      {j.tanggal} · sisa {j.sisaKuota} kursi
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {/* Data diri */}
          <div className="mt-8">
            <h2 className="text-xl text-brand-900">Data Calon Jamaah</h2>
            <p className="mt-1 text-sm text-gray-500">
              Isi data pemohon utama (nanti bisa ditambah data jamaah lain).
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className={LABEL_CLS}>Nama Lengkap</span>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama sesuai paspor"
                  required
                  className={INPUT_CLS}
                />
              </label>

              <label className="block">
                <span className={LABEL_CLS}>No. WhatsApp</span>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  required
                  className={INPUT_CLS}
                />
              </label>

              <label className="block">
                <span className={LABEL_CLS}>Jumlah Jamaah</span>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={jumlah}
                  onChange={(e) => setJumlah(Number(e.target.value))}
                  className={INPUT_CLS}
                />
              </label>

              <label className="block sm:col-span-2">
                <span className={LABEL_CLS}>Alamat</span>
                <textarea
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Alamat lengkap (kota/kabupaten)"
                  rows={2}
                  className={INPUT_CLS}
                />
              </label>
            </div>
          </div>

          {/* Ringkasan */}
          {paketDipilih && (
            <div className="mt-6 rounded-xl bg-sand-100 p-4 text-sm">
              <p className="font-medium text-brand-900">Ringkasan Pendaftaran</p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>Paket: {paketDipilih.nama}</li>
                <li>Tanggal: {tanggal || 'belum dipilih'}</li>
                <li>Jumlah: {jumlah} pax</li>
                {hargaMulai > 0 && (
                  <li>Perkiraan harga mulai: Rp{hargaMulai.toLocaleString('id-ID')}/pax</li>
                )}
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={!paketDipilih || !tanggal || status === 'mengirim'}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
            {status === 'mengirim' ? 'Mengirim…' : 'Kirim Pendaftaran'}
          </button>

          {status === 'sukses' && (
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-center text-sm text-green-700">
              ✓ Pendaftaran berhasil dikirim! Admin kami akan segera menghubungi
              Anda untuk konfirmasi kuota.
            </div>
          )}
          {status === 'gagal' && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
              Pendaftaran gagal tersimpan. Silakan coba lagi, atau hubungi kami
              langsung via WhatsApp.
            </div>
          )}

          <p className="mt-3 text-center text-xs text-gray-400">
            Pendaftaran tersimpan di database & dikonfirmasi admin. Notifikasi
            WhatsApp otomatis dikirim jika Fonnte dikonfigurasi.
          </p>
        </form>
      </section>
    </>
  )
}

export default Pendaftaran
