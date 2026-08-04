/**
 * Helper bersama untuk fungsi chatbot (dipakai index.ts & lead.ts).
 * File ini bukan route — hanya modul yang di-import.
 */
export interface Env {
  ebitour_db: D1Database
  FONTTE_API_TOKEN?: string
  FONTTE_ADMIN_WHATSAPP?: string
}

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

export const formatRp = (n: number | null | undefined) =>
  n != null && n > 0 ? `Rp${n.toLocaleString('id-ID')}` : null

/** Kirim notifikasi WhatsApp via Fonnte (sama seperti pendaftaran.ts) */
export async function kirimNotifikasiFonnte(
  env: Env,
  judul: string,
  baris: string[],
): Promise<{ ok: boolean; detail?: string }> {
  const token = env.FONTTE_API_TOKEN
  const admin = env.FONTTE_ADMIN_WHATSAPP
  if (!token || !admin) {
    return { ok: false, detail: 'Fonnte belum dikonfigurasi (FONTTE_API_TOKEN / FONTTE_ADMIN_WHATSAPP)' }
  }

  const message = [judul, '', ...baris.filter((l) => l !== '')].join('\n')

  const targetNormal = admin.startsWith('0') ? `62${admin.slice(1)}` : admin
  const payload: Record<string, unknown> = { target: targetNormal, message }
  if (admin.startsWith('0')) payload.countryCode = '62'

  const res = await fetch('https://api.fonnte.com/send', {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const body = (await res.json().catch(() => null)) as {
    status?: unknown
    detail?: string
  } | null

  if (body && body.status === true) return { ok: true, detail: 'terkirim' }
  return {
    ok: false,
    detail:
      (body && typeof body.detail === 'string' && body.detail) ||
      JSON.stringify(body ?? {}) ||
      `HTTP ${res.status}`,
  }
}
