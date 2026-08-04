/**
 * API client — admin panel.
 * - POST  /api/admin/login               → verifikasi password admin
 * - GET   /api/admin/pendaftaran         → daftar pendaftaran (filter status)
 * - PATCH /api/admin/pendaftaran/:id     → ubah status
 *
 * Request selain login wajib header X-Admin-Token (token = password admin).
 * Token disimpan di sessionStorage (hilang saat tab ditutup).
 */
export interface AdminLoginResult {
  success: boolean
  error?: string
}

export interface PendaftaranAdmin {
  id: number
  paket_id: string
  paket_nama: string
  tanggal: string
  nama: string
  whatsapp: string
  alamat: string | null
  jumlah_pax: number
  perkiraan_harga: number | null
  status: 'baru' | 'dihubungi' | 'terkonfirmasi' | 'batal'
  created_at: string
  // Field detail form tiket
  kamar_type: string | null
  bandara: string | null
  program_hari: string | null
  tambahan_domestik: string | null
  tambahan_harga: number | null
  total_harga: number | null
  detail_json: string | null
}

export const STATUS_PENDAFTARAN = ['baru', 'dihubungi', 'terkonfirmasi', 'batal'] as const
export type StatusPendaftaran = (typeof STATUS_PENDAFTARAN)[number]

/** Simpan token admin di sessionStorage (hilang saat tab ditutup). */
const TOKEN_KEY = 'ebitour-admin-token'

export function simpanTokenAdmin(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function ambilTokenAdmin(): string | null {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function hapusTokenAdmin() {
  sessionStorage.removeItem(TOKEN_KEY)
}

/** Login admin. Lempar error jika password salah / gagal. */
export async function loginAdmin(password: string): Promise<AdminLoginResult> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  const data = (await res.json().catch(() => null)) as AdminLoginResult | null
  if (!res.ok) {
    throw new Error(data?.error ?? `Login gagal (${res.status})`)
  }
  return data ?? { success: true }
}

/** Ambil daftar pendaftaran (admin). Lempar error jika gagal. */
export async function listPendaftaranAdmin(
  status?: StatusPendaftaran | 'semua',
): Promise<PendaftaranAdmin[]> {
  const token = ambilTokenAdmin()
  const query = status && status !== 'semua' ? `?status=${status}` : ''
  const res = await fetch(`/api/admin/pendaftaran${query}`, {
    headers: { 'X-Admin-Token': token ?? '' },
  })
  const data = (await res.json().catch(() => null)) as PendaftaranAdmin[] | { error: string } | null
  if (!res.ok) {
    throw new Error((data as { error?: string })?.error ?? `Gagal ambil data (${res.status})`)
  }
  return (data as PendaftaranAdmin[]) ?? []
}

/** Ubah status pendaftaran (admin). Lempar error jika gagal. */
export async function updateStatusPendaftaran(
  id: number,
  status: StatusPendaftaran,
): Promise<void> {
  const token = ambilTokenAdmin()
  const res = await fetch(`/api/admin/pendaftaran/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Token': token ?? '',
    },
    body: JSON.stringify({ status }),
  })
  const data = (await res.json().catch(() => null)) as { error?: string } | null
  if (!res.ok) {
    throw new Error(data?.error ?? `Gagal ubah status (${res.status})`)
  }
}
