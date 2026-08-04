/**
 * API chatbot — simpan lead dari percakapan
 * Route:
 *   POST /api/chat/lead   → simpan (nama + WA + pesan) ke chat_leads
 *                           + notif admin via Fonnte
 *
 * Body (JSON): { "nama": "Budi", "whatsapp": "081234567890", "pesan": "..." }
 * → 201 { success, id, reply, notifikasi }
 */
import type { Env } from './lib'
import { json, kirimNotifikasiFonnte } from './lib'

export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  let body: { nama?: string; whatsapp?: string; pesan?: string }
  try {
    body = (await request.json()) as { nama?: string; whatsapp?: string; pesan?: string }
  } catch {
    return json({ error: 'Body harus JSON valid' }, 400)
  }

  const nama = String(body.nama ?? '').trim()
  const whatsapp = String(body.whatsapp ?? '').trim()
  const pesan = String(body.pesan ?? '').trim()

  if (!nama || !whatsapp) {
    return json({ error: 'Field wajib: nama, whatsapp' }, 400)
  }
  if (!/^[0-9+\-\s]{8,15}$/.test(whatsapp)) {
    return json({ error: 'Nomor WhatsApp tidak valid' }, 400)
  }

  const result = await env.ebitour_db
    .prepare('INSERT INTO chat_leads (nama, whatsapp, pesan) VALUES (?, ?, ?)')
    .bind(nama, whatsapp, pesan || null)
    .run()

  const notif = await kirimNotifikasiFonnte(env, '💬 *LEAD BARU — Chat Website Ebitour*', [
    `Nama: ${nama}`,
    `WhatsApp: ${whatsapp}`,
    pesan ? `Pesan: ${pesan}` : '',
    '',
    'Segera hubungi calon jamaah ini.',
  ])

  return json(
    {
      success: true,
      id: result.meta.last_row_id,
      reply:
        'Terima kasih, data Anda sudah kami terima! ✅ Admin Ebitour akan menghubungi Anda via WhatsApp secepatnya. Semoga dimudahkan persiapannya. 🙏',
      notifikasi: notif,
    },
    201,
  )
}
