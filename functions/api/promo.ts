/**
 * API: promo aktif
 * Route: GET /api/promo
 *   → hanya promo yang berlaku HARI INI (mulai <= today <= selesai) & aktif.
 *   Struktur tabel sudah siap; data promo diisi admin fase berikutnya.
 */
interface Env {
  ebitour_db: D1Database
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

  const { results } = await env.ebitour_db
    .prepare(
      `SELECT p.id, p.nama, p.tipe, p.nilai, p.mulai, p.selesai, p.kuota,
              pk.id AS paket_id, pk.nama AS paket_nama
       FROM promo p
       LEFT JOIN paket pk ON pk.id = p.paket_id
       WHERE p.aktif = 1 AND p.mulai <= ? AND p.selesai >= ?
       ORDER BY p.selesai ASC`,
    )
    .bind(today, today)
    .all()

  return json(results)
}
