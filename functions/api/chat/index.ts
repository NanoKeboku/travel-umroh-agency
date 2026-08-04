/**
 * API chatbot — rule-based intent engine
 * Route:
 *   POST /api/chat      → jawab pesan user (intent + D1 live)
 *   POST /api/chat/lead → (lihat lead.ts) simpan lead + notif admin
 *
 * Tanpa LLM — skor kata kunci per intent, jawaban dari D1 (paket/jadwal/promo)
 * dan FAQ statis. Deterministik, gratis, instan.
 */
import type { Env } from './lib'
import { json, formatRp } from './lib'

/* ============================================================
   Intent engine (rule-based)
   ============================================================ */

type IntentId =
  | 'salam'
  | 'harga'
  | 'jadwal'
  | 'paket'
  | 'syarat'
  | 'pembayaran'
  | 'pendaftaran'
  | 'promo'
  | 'kontak'
  | 'terimakasih'
  | 'fallback'

/** Urutan penting: intent dengan kata kunci lebih spesifik dulu */
const INTENTS: { id: IntentId; kata: string[] }[] = [
  { id: 'salam', kata: ['assalamualaikum', 'assalamu alaikum', 'halo', 'hai', 'hi', 'selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam', 'pagi', 'siang', 'sore'] },
  { id: 'terimakasih', kata: ['makasih', 'terima kasih', 'terimakasih', 'syukron', 'thanks', 'thank you'] },
  { id: 'pendaftaran', kata: ['daftar', 'mendaftar', 'daftarkan', 'form pendaftaran', 'cara daftar'] },
  { id: 'promo', kata: ['promo', 'diskon', 'potongan', 'gratis', 'bonus', 'early bird'] },
  { id: 'pembayaran', kata: ['bayar', 'transfer', 'cicil', 'angsuran', 'dp', 'uang muka', 'lunas', 'pembayaran', 'metode'] },
  { id: 'syarat', kata: ['syarat', 'visa', 'paspor', 'vaksin', 'dokumen', 'kesehatan', 'buku kuning', 'foto'] },
  { id: 'kontak', kata: ['kontak', 'admin', 'wa', 'whatsapp', 'telepon', 'telp', 'alamat', 'lokasi', 'kantor', 'email', 'hubungi'] },
  { id: 'jadwal', kata: ['jadwal', 'tanggal', 'berangkat', 'kuota', 'kursi', 'kapan', 'keberangkatan', 'tersedia'] },
  { id: 'harga', kata: ['harga', 'biaya', 'berapa', 'budget', 'murah', 'tarif', 'nilai'] },
  { id: 'paket', kata: ['paket', 'umrah', 'haji', 'rekomendasi', 'pilihan', 'program', 'jenis'] },
]

function deteksiIntent(pesan: string): IntentId {
  const text = pesan.toLowerCase()
  let best: IntentId = 'fallback'
  let bestSkor = 0
  for (const intent of INTENTS) {
    let skor = 0
    for (const k of intent.kata) {
      if (text.includes(k)) skor += 1
    }
    if (skor > bestSkor) {
      bestSkor = skor
      best = intent.id
    }
  }
  return best
}

/* ============================================================
   Pembuat jawaban
   ============================================================ */

interface Jawaban {
  reply: string
  suggestions?: string[]
  leadPrompt?: boolean
}

const CHIP_UMUM = ['Harga Paket', 'Jadwal Berangkat', 'Syarat & Visa', 'Kontak Admin']

async function jawabHarga(env: Env): Promise<Jawaban> {
  const { results } = await env.ebitour_db
    .prepare(
      'SELECT nama, jenis, harga_quad, harga_triple, harga_double, dp_per_pax FROM paket ORDER BY harga_quad ASC LIMIT 5',
    )
    .all<{ nama: string; jenis: string; harga_quad: number | null; harga_triple: number | null; harga_double: number | null; dp_per_pax: number | null }>()

  if (!results.length) {
    return { reply: 'Maaf, data paket belum tersedia. Silakan hubungi admin via WhatsApp ya.', suggestions: CHIP_UMUM }
  }

  const baris = results.map((p) => {
    const mulai = formatRp(p.harga_quad ?? p.harga_triple ?? p.harga_double)
    const dp = formatRp(p.dp_per_pax)
    return `• ${p.nama} — mulai ${mulai}/pax${dp ? ` (DP ${dp})` : ''}`
  })

  return {
    reply: `Berikut paket kami saat ini:\n${baris.join('\n')}\n\nHarga per pax sesuai kamar (Quad/Triple/Double). Mau saya carikan yang sesuai budget Anda?`,
    suggestions: ['Budget di bawah 40jt', 'Jadwal Berangkat', 'Detail Paket', 'Kontak Admin'],
  }
}

async function jawabJadwal(env: Env): Promise<Jawaban> {
  const { results } = await env.ebitour_db
    .prepare(
      `SELECT j.tanggal, j.sisa_kuota, p.nama
       FROM jadwal j JOIN paket p ON p.id = j.paket_id
       WHERE j.sisa_kuota > 0
       ORDER BY j.id ASC LIMIT 5`,
    )
    .all<{ tanggal: string; sisa_kuota: number; nama: string }>()

  if (!results.length) {
    return { reply: 'Maaf, jadwal dengan kursi tersisa belum ada. Coba tanya lagi nanti atau hubungi admin.', suggestions: CHIP_UMUM }
  }

  const baris = results.map((j) => `• ${j.tanggal} — ${j.nama} (sisa ${j.sisa_kuota} kursi)`)

  return {
    reply: `Jadwal keberangkatan dengan kursi tersisa:\n${baris.join('\n')}\n\nKursi terbatas — segera daftar untuk mengunci tanggal ya.`,
    suggestions: ['Harga Paket', 'Cara Daftar', 'Kontak Admin'],
  }
}

async function jawabPromo(env: Env): Promise<Jawaban> {
  const { results } = await env.ebitour_db
    .prepare(
      `SELECT pr.nama, pr.tipe, pr.nilai, pr.kuota, p.nama AS paket
       FROM promo pr LEFT JOIN paket p ON p.id = pr.paket_id
       WHERE pr.aktif = 1 ORDER BY pr.id DESC LIMIT 3`,
    )
    .all<{ nama: string; tipe: string; nilai: number; kuota: number | null; paket: string | null }>()

  if (!results.length) {
    return { reply: 'Saat ini belum ada promo aktif. Tapi tenang — daftar lebih awal biasanya dapat harga terbaik. 😊', suggestions: CHIP_UMUM }
  }

  const baris = results.map((pr) => {
    const nilai = pr.tipe === 'persen' ? `${pr.nilai}%` : formatRp(pr.nilai)
    return `• ${pr.nama}${pr.paket ? ` (${pr.paket})` : ''} — potongan ${nilai}${pr.kuota ? `, kuota ${pr.kuota}` : ''}`
  })

  return {
    reply: `Promo yang sedang berjalan:\n${baris.join('\n')}\n\nPromo berlaku sampai kuota habis — jangan sampai kehabisan ya!`,
    suggestions: ['Harga Paket', 'Jadwal Berangkat', 'Kontak Admin'],
  }
}

function jawabSyarat(pesan: string): Jawaban {
  if (pesan.toLowerCase().includes('vaksin')) {
    return {
      reply: 'Vaksin meningitis (Meningococcal ACWY) wajib bagi jamaah umrah/haji, minimal 10 hari sebelum keberangkatan, dengan sertifikat vaksinasi internasional (buku kuning). Vaksin lain: COVID-19 (sesuai ketentuan berlaku).',
      suggestions: ['Dokumen lain', 'Cara Daftar', 'Kontak Admin'],
    }
  }
  if (pesan.toLowerCase().includes('paspor')) {
    return {
      reply: 'Paspor wajib berlaku minimal 8 bulan sebelum keberangkatan. Belum punya paspor? Tetap bisa daftar — tim kami bantu proses pengurusannya.',
      suggestions: ['Syarat lain', 'Vaksin', 'Kontak Admin'],
    }
  }
  return {
    reply: 'Dokumen utama untuk umrah/haji:\n• Paspor (berlaku min. 8 bulan)\n• Foto berwarna latar putih (ukuran visa)\n• KTP\n• Buku nikah (suami-istri)\n• Akta lahir (anak)\n• Vaksin meningitis (buku kuning)\n\nChecklist lengkap dibagikan setelah pendaftaran.',
    suggestions: ['Vaksin', 'Paspor', 'Cara Daftar', 'Kontak Admin'],
  }
}

function jawabPembayaran(pesan: string): Jawaban {
  if (pesan.toLowerCase().includes('cicil')) {
    return {
      reply: 'Bisa dicicil! Setelah DP, sisa biaya dibayar bertahap sesuai kesepakatan (misal per bulan). Semakin awal daftar, semakin ringan cicilannya. Admin akan bantu simulasi cicilan Anda.',
      suggestions: ['Berapa DP?', 'Metode bayar', 'Harga Paket', 'Kontak Admin'],
    }
  }
  if (pesan.toLowerCase().includes('dp') || pesan.toLowerCase().includes('uang muka')) {
    return {
      reply: 'DP umumnya sekitar Rp15 juta untuk mengunci kuota & tanggal. Sisanya dicicil hingga pelunasan sebelum keberangkatan. Besaran DP tergantung paket yang dipilih.',
      suggestions: ['Cicilan', 'Metode bayar', 'Kontak Admin'],
    }
  }
  return {
    reply: 'Pembayaran via transfer bank atas nama resmi Ebitour (rekening diberikan admin setelah daftar) atau tunai di kantor. Selalu konfirmasi ke admin setelah transfer ya.',
    suggestions: ['Berapa DP?', 'Cicilan', 'Kontak Admin'],
  }
}

function jawabPendaftaran(): Jawaban {
  return {
    reply:
      'Mudah! Silakan klik tombol "Daftar Sekarang" di website atau isi form di halaman Pendaftaran. Pilih paket & tanggal, isi data diri, submit — admin kami akan menghubungi Anda untuk konfirmasi.\n\nAtau kalau mau, saya bisa catat nama & nomor WhatsApp Anda sekarang, admin langsung menghubungi. 😊',
    suggestions: ['Buka halaman Pendaftaran', 'Ya, catat data saya', 'Kontak Admin'],
    leadPrompt: true,
  }
}

function jawabKontak(): Jawaban {
  return {
    reply:
      'Kami bisa dihubungi melalui:\n• WhatsApp: 0821-3582-0366\n• Email: info@ebitour.com\n• Kantor: Jl. Contoh No. 00, Purworejo, Jawa Tengah\n\nAdmin siap membantu Anda.',
    suggestions: ['Harga Paket', 'Jadwal Berangkat', 'Cara Daftar'],
  }
}

function jawabFallback(): Jawaban {
  return {
    reply:
      'Maaf, saya belum paham pertanyaannya. 🙏 Boleh saya catat nama & nomor WhatsApp Anda? Nanti admin kami yang menghubungi langsung untuk membantu lebih detail.',
    suggestions: ['Harga Paket', 'Jadwal Berangkat', 'Syarat & Visa', 'Kontak Admin'],
    leadPrompt: true,
  }
}

/* ============================================================
   Handler utama chat (dengan rate limit sederhana)
   ============================================================ */

const hitCount = new Map<string, number[]>()
const LIMIT = 30
const JENDELA = 60_000

function bolehKirim(ip: string): boolean {
  const now = Date.now()
  const arr = (hitCount.get(ip) ?? []).filter((t) => now - t < JENDELA)
  if (arr.length >= LIMIT) {
    hitCount.set(ip, arr)
    return false
  }
  arr.push(now)
  hitCount.set(ip, arr)
  return true
}

export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  const ip = request.headers.get('CF-Connecting-IP') ?? 'local'
  if (!bolehKirim(ip)) {
    return json({ error: 'Terlalu banyak pesan. Coba lagi sebentar ya.' }, 429)
  }

  let body: { message?: string }
  try {
    body = (await request.json()) as { message?: string }
  } catch {
    return json({ error: 'Body harus JSON valid' }, 400)
  }

  const message = String(body.message ?? '').trim()
  if (!message) {
    return json({ error: 'Message wajib diisi' }, 400)
  }
  if (message.length > 500) {
    return json({ error: 'Pesan terlalu panjang (maks 500 karakter)' }, 400)
  }

  const intent = deteksiIntent(message)

  let jawaban: Jawaban
  switch (intent) {
    case 'salam':
      jawaban = {
        reply: 'Assalamualaikum! 👋 Admin Ebitour di sini. Ada yang bisa saya bantu? Silakan pilih di bawah atau ketik pertanyaan Anda.',
        suggestions: ['Harga Paket', 'Jadwal Berangkat', 'Syarat & Visa', 'Cara Daftar'],
      }
      break
    case 'harga':
    case 'paket':
      jawaban = await jawabHarga(env)
      break
    case 'jadwal':
      jawaban = await jawabJadwal(env)
      break
    case 'syarat':
      jawaban = jawabSyarat(message)
      break
    case 'pembayaran':
      jawaban = jawabPembayaran(message)
      break
    case 'pendaftaran':
      jawaban = jawabPendaftaran()
      break
    case 'promo':
      jawaban = await jawabPromo(env)
      break
    case 'kontak':
      jawaban = jawabKontak()
      break
    case 'terimakasih':
      jawaban = {
        reply: 'Sama-sama! 😊 Kalau ada pertanyaan lain, jangan ragu tanya ya. Semoga dimudahkan ibadahnya.',
        suggestions: CHIP_UMUM,
      }
      break
    default:
      jawaban = jawabFallback()
  }

  return json({ ...jawaban, intent })
}
