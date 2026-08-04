/**
 * Middleware admin — proteksi semua route /api/admin/*
 * - POST /api/admin/login  → BEBAS (tanpa token)
 * - selain itu            → wajib header `X-Admin-Token` = ADMIN_PASSWORD
 *
 * Cek dilakukan per-request; token tidak disimpan di server (stateless).
 */
interface Env {
  ADMIN_PASSWORD?: string
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  const url = new URL(request.url)

  // Login bebas akses — verifikasi password ada di login.ts
  if (url.pathname.endsWith('/login')) {
    return next()
  }

  const expected = env.ADMIN_PASSWORD
  const token = request.headers.get('X-Admin-Token')

  if (!expected) {
    return json({ error: 'ADMIN_PASSWORD belum dikonfigurasi di server' }, 500)
  }
  if (!token || token !== expected) {
    return json({ error: 'Unauthorized — token admin tidak valid' }, 401)
  }

  return next()
}
