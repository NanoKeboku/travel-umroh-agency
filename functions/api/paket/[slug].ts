/**
 * API: detail satu paket
 * Route: GET /api/paket/:slug
 *   → detail lengkap + jadwal keberangkatan + tambahan pesawat
 */
import { rowToPaket } from '../paket'

interface Env {
  ebitour_db: D1Database
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  const slug = (params as Record<string, string>).slug

  const paketRow = await env.ebitour_db
    .prepare('SELECT * FROM paket WHERE id = ?')
    .bind(slug)
    .first()
  if (!paketRow) return json({ error: 'Paket tidak ditemukan' }, 404)

  const jadwal = await env.ebitour_db
    .prepare(
      'SELECT tanggal, sisa_kuota, harga_quad, harga_triple, harga_double FROM jadwal WHERE paket_id = ? ORDER BY tanggal',
    )
    .bind(slug)
    .all()

  const tambahan = await env.ebitour_db
    .prepare('SELECT label, harga FROM tambahan_pesawat WHERE paket_id = ? ORDER BY harga')
    .bind(slug)
    .all()

  const paket = rowToPaket(paketRow)
  paket.keberangkatan = (jadwal.results as Record<string, unknown>[]).map((r) => ({
    tanggal: r.tanggal,
    sisaKuota: r.sisa_kuota,
    hargaQuad: r.harga_quad,
    hargaTriple: r.harga_triple,
    hargaDouble: r.harga_double,
  }))
  paket.tambahanPesawat = (tambahan.results as Record<string, unknown>[]).map((r) => ({
    label: r.label,
    harga: r.harga,
  }))
  return json(paket)
}
