/**
 * API admin — ubah status pendaftaran
 * Route:
 *   PATCH /api/admin/pendaftaran/:id   → ubah status (baru|dihubungi|terkonfirmasi|batal)
 *
 * Body (JSON): { "status": "terkonfirmasi" }
 * → 200 { success: true }
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

const VALID_STATUS = ['baru', 'dihubungi', 'terkonfirmasi', 'batal']

export const onRequestPatch: PagesFunction<Env> = async ({ env, request, params }) => {
  const id = Number(params.id)

  if (!Number.isInteger(id) || id < 1) {
    return json({ error: 'ID tidak valid' }, 400)
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ error: 'Body harus JSON valid' }, 400)
  }

  const status = String(body.status ?? '').trim()
  if (!VALID_STATUS.includes(status)) {
    return json({ error: `Status tidak valid. Gunakan: ${VALID_STATUS.join(', ')}` }, 400)
  }

  // Cek pendaftaran ada
  const existing = await env.ebitour_db
    .prepare('SELECT id FROM pendaftaran WHERE id = ?')
    .bind(id)
    .first()
  if (!existing) {
    return json({ error: 'Pendaftaran tidak ditemukan' }, 404)
  }

  await env.ebitour_db
    .prepare('UPDATE pendaftaran SET status = ? WHERE id = ?')
    .bind(status, id)
    .run()

  return json({ success: true })
}
