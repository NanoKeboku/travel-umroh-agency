/**
 * Hooks data paket — jembatan antara UI dan API.
 *
 * Pola:
 *  - loading : true saat fetch berjalan (UI tampilkan skeleton)
 *  - data    : hasil dari API
 *  - error   : pesan error (atau null)
 *
 * FALLBACK: jika API gagal (offline / belum jalan), otomatis pakai
 * data statis dari src/data/paket.ts agar website tetap tampil.
 * Ini pola "graceful degradation" — bagus untuk dipelajari.
 */
import { useEffect, useState } from 'react'
import type { Paket } from '../data/paket'
import { PAKET_UMRAH, PAKET_HAJI } from '../data/paket'
import { fetchPaketList, fetchPaketDetail } from '../api/paketApi'

const SEMUA_STATIS: Paket[] = [...PAKET_UMRAH, ...PAKET_HAJI]

interface UsePaketResult<T> {
  data: T | null
  loading: boolean
  error: string | null
}

/** Ambil daftar paket dari API (fallback statis jika gagal) */
export function usePaketList(filters: Record<string, string> = {}): UsePaketResult<Paket[]> {
  const [data, setData] = useState<Paket[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // JSON.stringify agar effect jalan ulang hanya saat filter berubah
  const filterKey = JSON.stringify(filters)

  useEffect(() => {
    let aktif = true
    setLoading(true)

    fetchPaketList(filters)
      .then((d) => {
        if (aktif) {
          setData(d)
          setError(null)
        }
      })
      .catch((e: unknown) => {
        if (!aktif) return
        console.warn('API gagal — pakai data statis:', e)
        const fallback = filters.jenis === 'haji' ? PAKET_HAJI : PAKET_UMRAH
        setData(fallback)
        setError(null)
      })
      .finally(() => {
        if (aktif) setLoading(false)
      })

    return () => {
      aktif = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey])

  return { data, loading, error }
}

/** Ambil detail satu paket dari API (fallback statis jika gagal) */
export function usePaketDetail(slug?: string): UsePaketResult<Paket> {
  const [data, setData] = useState<Paket | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    let aktif = true
    setLoading(true)

    fetchPaketDetail(slug)
      .then((d) => {
        if (aktif) {
          setData(d)
          setError(null)
        }
      })
      .catch((e: unknown) => {
        if (!aktif) return
        console.warn('API detail gagal — pakai data statis:', e)
        const fallback = SEMUA_STATIS.find((p) => p.id === slug) ?? null
        setData(fallback)
        setError(null)
      })
      .finally(() => {
        if (aktif) setLoading(false)
      })

    return () => {
      aktif = false
    }
  }, [slug])

  return { data, loading, error }
}
