/**
 * API admin — daftar pendaftaran
 * Route:
 *   GET /api/admin/pendaftaran            → daftar (terbaru dulu, max 100)
 *   GET /api/admin/pendaftaran?status=X   → filter status (baru|dihubungi|terkonfirmasi|batal)
 *
 * Dilindungi middleware _middleware.ts (header X-Admin-Token).
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
  const status = url.searchParams.get('status')?.trim() ?? ''

  const VALID_STATUS = ['baru', 'dihubungi', 'terkonfirmasi', 'batal']
  if (status && !VALID_STATUS.includes(status)) {
    return json({ error: `Status tidak valid: ${status}` }, 400)
  }

  if (status) {
    const { results } = await env.ebitour_db
      .prepare(
        'SELECT * FROM pendaftaran WHERE status = ? ORDER BY created_at DESC LIMIT 100',
      )
      .bind(status)
      .all()
    return json(results)
  }

  const { results } = await env.ebitour_db
    .prepare('SELECT * FROM pendaftaran ORDER BY created_at DESC LIMIT 100')
    .all()
  return json(results)
}
