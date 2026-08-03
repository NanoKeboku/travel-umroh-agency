/**
 * API client — submit pendaftaran ke backend.
 * POST /api/pendaftaran → simpan ke D1 + notifikasi WA admin (Fonnte).
 */
export interface PendaftaranPayload {
  paketId: string
  paketNama: string
  tanggal: string
  nama: string
  whatsapp: string
  alamat?: string
  jumlahPax: number
  perkiraanHarga?: number
}

export interface PendaftaranResult {
  success: boolean
  id?: number
  notifikasi?: { ok: boolean; detail?: string }
  error?: string
}

/** Kirim pendaftaran ke API. Lempar error jika respons bukan 2xx. */
export async function submitPendaftaran(
  payload: PendaftaranPayload,
): Promise<PendaftaranResult> {
  const res = await fetch('/api/pendaftaran', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = (await res.json().catch(() => null)) as PendaftaranResult | null
  if (!res.ok) {
    throw new Error(data?.error ?? `Gagal menyimpan (${res.status})`)
  }
  return data ?? { success: true }
}
