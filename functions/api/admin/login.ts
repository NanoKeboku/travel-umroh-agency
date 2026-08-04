/**
 * API admin — login
 * Route:
 *   POST /api/admin/login   → verifikasi password admin (env ADMIN_PASSWORD)
 *
 * Body (JSON): { "password": "..." }
 * → 200 { success: true }   |   401 { error: "Password salah" }
 *
 * Password TIDAK pernah dikirim lewat URL, hanya body. Tidak ada sistem
 * user/role — satu admin, password dari env (bukan hardcoded).
 */
interface Env {
  ADMIN_PASSWORD?: string
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  const expected = env.ADMIN_PASSWORD

  if (!expected) {
    return json({ error: 'ADMIN_PASSWORD belum dikonfigurasi di server' }, 500)
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ error: 'Body harus JSON valid' }, 400)
  }

  const password = String(body.password ?? '')

  // compare constant-time tidak kritis di fase ini; cukup strict equality.
  if (password !== expected) {
    return json({ error: 'Password salah' }, 401)
  }

  return json({ success: true })
}
