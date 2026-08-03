/**
 * API client — lapisan akses ke backend Cloudflare Pages Functions.
 *
 * Base URL relatif ('/api/...'):
 *  - Dev  : Vite proxy meneruskan /api ke wrangler pages dev
 *           (lihat vite.config.ts → server.proxy)
 *  - Prod : langsung ke Pages Functions di domain yang sama.
 *
 * Semua fungsi mengembalikan Promise — dipakai oleh hooks di
 * src/hooks/usePaket.ts. Detail endpoint: lihat BELAJAR-API.md.
 */
import type { Paket, JadwalUmrah } from '../data/paket'

/** Wrapper fetch: lempar error jika respons bukan 2xx */
async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(path)
  if (!res.ok) {
    throw new Error(`API ${res.status} — ${path}`)
  }
  return res.json() as Promise<T>
}

/** GET /api/paket — daftar paket (dengan filter opsional) */
export function fetchPaketList(params?: Record<string, string>): Promise<Paket[]> {
  const qs = params ? new URLSearchParams(params).toString() : ''
  return apiFetch<Paket[]>(`/api/paket${qs ? `?${qs}` : ''}`)
}

/** GET /api/paket/:slug — detail satu paket + jadwal + tambahan pesawat */
export function fetchPaketDetail(slug: string): Promise<Paket> {
  return apiFetch<Paket>(`/api/paket/${encodeURIComponent(slug)}`)
}

/** GET /api/jadwal — semua jadwal (untuk opsi bulan di widget pencarian) */
export interface JadwalApi extends JadwalUmrah {
  paket_id: string
  paket_nama: string
  paket_jenis: 'umrah' | 'haji'
}

export function fetchJadwalSemua(): Promise<JadwalApi[]> {
  return apiFetch<JadwalApi[]>('/api/jadwal')
}
