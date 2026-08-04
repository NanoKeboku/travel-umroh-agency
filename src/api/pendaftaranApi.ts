/**
 * API client — submit pendaftaran ke backend.
 * POST /api/pendaftaran → simpan ke D1 + notifikasi WA admin (Fonnte).
 *
 * Mendukung dua bentuk:
 * 1. Form Pendaftaran (/pendaftaran) — field dasar.
 * 2. Form Tiket (PesanPaketForm) — field dasar + detail pilihan
 *    (kamarType, bandara, programHari, tambahanDomestik, totalHarga, detailJson).
 */
export interface PendaftaranPayload {
  paketId: string
  paketNama: string
  tanggal: string
  nama: string
  whatsapp: string
  alamat: string
  jumlahPax: number
  perkiraanHarga?: number
  // === Field detail form tiket (opsional) ===
  /** Rangkuman kamar, contoh: "hargaQuad=1;hargaTriple=2" */
  kamarType?: string
  bandara?: string
  programHari?: string
  tambahanDomestik?: string
  tambahanHarga?: number
  totalHarga?: number
  /** Rincian lengkap semua pilihan form (audit trail) */
  detailJson?: string
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
