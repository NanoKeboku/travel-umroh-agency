/**
 * API: jadwal keberangkatan per paket
 * Route: GET /api/jadwal?paket=<slug>
 *   → daftar tanggal berangkat + sisa kuota + harga per kamar
 *
 * Catatan (FITUR-PENCARIAN-TIKET.md): "tanggal berangkat" adalah filter
 * JADWAL, bukan filter paket — endpoint ini sumber data widget pencarian.
 */
interface Env {
  ebitour_db: D1Database
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  const url = new URL(request.url)
  const paketId = url.searchParams.get('paket')

  if (!paketId) {
    // Tanpa paket: semua jadwal (untuk widget bulan di beranda)
    const { results } = await env.ebitour_db
      .prepare(
        'SELECT j.*, p.nama AS paket_nama, p.jenis AS paket_jenis FROM jadwal j JOIN paket p ON p.id = j.paket_id ORDER BY j.tanggal LIMIT 100',
      )
      .all()
    return json(results)
  }

  const { results } = await env.ebitour_db
    .prepare(
      'SELECT tanggal, sisa_kuota, harga_quad, harga_triple, harga_double FROM jadwal WHERE paket_id = ? ORDER BY tanggal',
    )
    .bind(paketId)
    .all()

  return json(results)
}
