/**
 * API: submit pendaftaran jamaah
 * Route:
 *   POST /api/pendaftaran       → simpan pendaftaran ke D1 + notifikasi WA
 *   GET  /api/pendaftaran       → (admin) daftar pendaftaran
 *
 * Body POST (JSON):
 *   {
 *     "paketId": "umrah-hemat",
 *     "paketNama": "Paket Umrah Hemat",
 *     "tanggal": "5 November 2026",
 *     "nama": "Budi",
 *     "whatsapp": "081234567890",
 *     "alamat": "Purworejo",
 *     "jumlahPax": 2,
 *     "perkiraanHarga": 30500000
 *   }
 *
 * Notifikasi WhatsApp via Fonnte dikirim ke nomor admin
 * (env FONTTE_ADMIN_WHATSAPP). Jika FONTTE_API_TOKEN tidak diset,
 * pendaftaran tetap tersimpan (notifikasi dilewati).
 */
interface Env {
  ebitour_db: D1Database
  FONTTE_API_TOKEN?: string
  FONTTE_ADMIN_WHATSAPP?: string
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

/** Kirim notifikasi WhatsApp via Fonnte API */
async function kirimNotifikasiFonnte(
  env: Env,
  data: {
    nama: string
    whatsapp: string
    paketNama: string
    tanggal: string
    jumlahPax: number
  },
): Promise<{ ok: boolean; detail?: string }> {
  const token = env.FONTTE_API_TOKEN
  const admin = env.FONTTE_ADMIN_WHATSAPP
  if (!token || !admin) {
    return { ok: false, detail: 'Fonnte belum dikonfigurasi (FONTTE_API_TOKEN / FONTTE_ADMIN_WHATSAPP)' }
  }

  const pesan = [
    '🕌 *PENDAFTARAN BARU — Ebitour*',
    '',
    `Nama: ${data.nama}`,
    `WhatsApp: ${data.whatsapp}`,
    `Paket: ${data.paketNama}`,
    `Tanggal: ${data.tanggal}`,
    `Jumlah: ${data.jumlahPax} pax`,
    '',
    'Segera konfirmasi kuota ke calon jamaah.',
  ].join('\n')

  const res = await fetch('https://api.fonnte.com/send', {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      target: admin,
      message: pesan,
      countryCode: '62',
    }),
  })

  const body = (await res.json().catch(() => null)) as { status?: string; detail?: string } | null
  return { ok: res.ok, detail: body?.status ?? body?.detail ?? String(res.status) }
}

export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ error: 'Body harus JSON valid' }, 400)
  }

  // ---- Validasi ----
  const paketId = String(body.paketId ?? '').trim()
  const paketNama = String(body.paketNama ?? '').trim()
  const tanggal = String(body.tanggal ?? '').trim()
  const nama = String(body.nama ?? '').trim()
  const whatsapp = String(body.whatsapp ?? '').trim()
  const alamat = String(body.alamat ?? '').trim()
  const jumlahPax = Number(body.jumlahPax ?? 1)
  const perkiraanHarga = body.perkiraanHarga != null ? Number(body.perkiraanHarga) : null

  if (!paketId || !paketNama || !tanggal || !nama || !whatsapp) {
    return json({ error: 'Field wajib: paketId, paketNama, tanggal, nama, whatsapp' }, 400)
  }
  if (!/^[0-9+\-\s]{8,15}$/.test(whatsapp)) {
    return json({ error: 'Nomor WhatsApp tidak valid' }, 400)
  }
  if (!Number.isFinite(jumlahPax) || jumlahPax < 1 || jumlahPax > 99) {
    return json({ error: 'Jumlah pax harus 1–99' }, 400)
  }

  // ---- Simpan ke D1 ----
  const result = await env.ebitour_db
    .prepare(
      `INSERT INTO pendaftaran (paket_id, paket_nama, tanggal, nama, whatsapp, alamat, jumlah_pax, perkiraan_harga)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(paketId, paketNama, tanggal, nama, whatsapp, alamat || null, jumlahPax, perkiraanHarga)
    .run()

  // ---- Notifikasi Fonnte (opsional — tidak menggagalkan simpan) ----
  const notif = await kirimNotifikasiFonnte(env, {
    nama,
    whatsapp,
    paketNama,
    tanggal,
    jumlahPax,
  })

  return json(
    {
      success: true,
      id: result.meta.last_row_id,
      notifikasi: notif,
    },
    201,
  )
}

/** GET — daftar pendaftaran (dipakai admin; tanpa proteksi untuk fase ini) */
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.ebitour_db
    .prepare('SELECT * FROM pendaftaran ORDER BY created_at DESC LIMIT 100')
    .all()
  return json(results)
}
