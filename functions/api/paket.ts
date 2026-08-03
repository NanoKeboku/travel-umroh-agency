/**
 * API: daftar paket
 * Route: GET /api/paket
 *   ?jenis=umrah|haji          → filter jenis
 *   ?kategori=Hemat            → filter kategori
 *   ?bulan=November 2026       → filter bulan (join jadwal)
 *   ?limit=3                   → batas jumlah (default 50)
 *
 * Detail per slug ada di functions/api/paket/[slug].ts
 * Binding D1: ebitour_db (lihat wrangler.jsonc)
 */
interface Env {
  ebitour_db: D1Database
}

/** Parse JSON kolom TEXT dengan fallback aman */
function jsonOr<T>(v: string | null, fallback: T): T {
  if (!v) return fallback
  try {
    return JSON.parse(v) as T
  } catch {
    return fallback
  }
}

/** Konversi baris paket DB → objek API (camelCase, JSON di-parse) */
export function rowToPaket(row: Record<string, unknown>) {
  return {
    id: row.id,
    jenis: row.jenis,
    kategori: row.kategori,
    nama: row.nama,
    harga: row.harga,
    hargaQuad: row.harga_quad,
    hargaTriple: row.harga_triple,
    hargaDouble: row.harga_double,
    dpPerPax: row.dp_per_pax,
    durasi: row.durasi,
    durasiList: jsonOr<string[]>(row.durasi_list as string, []),
    jadwal: row.jadwal,
    maskapai: row.maskapai,
    hotel: row.hotel,
    bandara: jsonOr<string[]>(row.bandara as string, []),
    fasilitas: jsonOr<string[]>(row.fasilitas as string, []),
    persyaratan: jsonOr<string[]>(row.persyaratan as string, []),
    itinerary: jsonOr(row.itinerary as string, []),
    penerbangan: jsonOr(row.penerbangan as string, null),
    sk: jsonOr<string[]>(row.sk as string, []),
    brosurUrl: row.brosur_url,
    gambar: row.gambar,
  }
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  const url = new URL(request.url)
  const jenis = url.searchParams.get('jenis')
  const kategori = url.searchParams.get('kategori')
  const bulan = url.searchParams.get('bulan')
  const limit = Number(url.searchParams.get('limit') ?? '50')

  const conds: string[] = []
  const binds: unknown[] = []

  if (jenis) {
    conds.push('p.jenis = ?')
    binds.push(jenis)
  }
  if (kategori) {
    conds.push('p.kategori = ?')
    binds.push(kategori)
  }
  if (bulan) {
    // Filter bulan: paket yang punya jadwal di bulan tsb, atau jadwal utama cocok
    conds.push('(j.tanggal LIKE ? OR p.jadwal LIKE ?)')
    binds.push(`%${bulan}%`, `%${bulan}%`)
  }

  let query = 'SELECT DISTINCT p.* FROM paket p LEFT JOIN jadwal j ON j.paket_id = p.id'
  if (conds.length > 0) query += ' WHERE ' + conds.join(' AND ')
  query += ' ORDER BY p.harga ASC LIMIT ?'

  const { results } = await env.ebitour_db
    .prepare(query)
    .bind(...binds, limit)
    .all()

  return json((results as Record<string, unknown>[]).map(rowToPaket))
}
