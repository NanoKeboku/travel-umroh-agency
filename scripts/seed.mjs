/**
 * Seed generator — membaca src/data/paket.ts dan menghasilkan
 * migrations/0002_seed.sql untuk database D1.
 *
 * Jalankan: node --experimental-strip-types scripts/seed.mjs
 * (Node 22+; paket.ts di-import langsung sebagai single source of truth)
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { PAKET_UMRAH, PAKET_HAJI } from '../src/data/paket.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'migrations', '0002_seed.sql')

/** escape string SQL (single-quote digandakan) */
const s = (v) => `'${String(v ?? '').replace(/'/g, "''")}'`
/** JSON string aman utk kolom TEXT */
const j = (v) => (v == null ? 'NULL' : s(JSON.stringify(v)))
const n = (v) => (v == null ? 'NULL' : String(v))

const lines = [
  '-- Migration 0002: seed data paket umrah & haji (dari src/data/paket.ts)',
  '-- Dihasilkan oleh: node --experimental-strip-types scripts/seed.mjs',
  '',
  'INSERT INTO paket (id, jenis, kategori, nama, harga, harga_quad, harga_triple, harga_double, dp_per_pax, durasi, durasi_list, jadwal, maskapai, hotel, bandara, fasilitas, persyaratan, itinerary, penerbangan, sk, brosur_url, gambar) VALUES',
]

const semua = [...PAKET_UMRAH, ...PAKET_HAJI]
const rows = semua.map((p) => {
  const vals = [
    s(p.id),
    s(p.jenis),
    s(p.kategori),
    s(p.nama),
    n(p.harga),
    n(p.hargaQuad),
    n(p.hargaTriple),
    n(p.hargaDouble),
    n(p.dpPerPax),
    s(p.durasi),
    j(p.durasiList),
    s(p.jadwal),
    s(p.maskapai),
    s(p.hotel),
    j(p.bandara),
    j(p.fasilitas),
    j(p.persyaratan),
    j(p.itinerary),
    j(p.penerbangan),
    j(p.sk),
    p.brosurUrl ? s(p.brosurUrl) : 'NULL',
    s(p.gambar),
  ]
  return `  (${vals.join(', ')})`
})
lines.push(rows.join(',\n') + ';')
lines.push('')

// Jadwal + tambahan pesawat
lines.push('-- Jadwal keberangkatan per paket')
for (const p of semua) {
  for (const k of p.keberangkatan ?? []) {
    lines.push(
      `INSERT INTO jadwal (paket_id, tanggal, sisa_kuota, harga_quad, harga_triple, harga_double) VALUES (${s(p.id)}, ${s(k.tanggal)}, ${n(k.sisaKuota)}, ${n(k.hargaQuad)}, ${n(k.hargaTriple)}, ${n(k.hargaDouble)});`,
    )
  }
}
lines.push('')
lines.push('-- Tambahan tiket pesawat domestik per paket')
for (const p of semua) {
  for (const t of p.tambahanPesawat ?? []) {
    lines.push(
      `INSERT INTO tambahan_pesawat (paket_id, label, harga) VALUES (${s(p.id)}, ${s(t.label)}, ${n(t.harga)});`,
    )
  }
}
lines.push('')

writeFileSync(OUT, lines.join('\n'), 'utf8')
console.log(`OK — seed tertulis: ${OUT} (${semua.length} paket)`)
