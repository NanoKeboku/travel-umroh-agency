/**
 * Halaman Admin — login + dashboard
 * Route: /admin — DI LUAR Layout (tanpa navbar/footer).
 * Keputusan terikat (PERENCANAAN-ADMIN 2026-08-04):
 *   - auth = env ADMIN_PASSWORD, tanpa tabel user
 *   - token admin di sessionStorage
 *   - tanpa link admin di footer — akses langsung /admin
 *   - tanpa fitur hapus — hanya ubah status
 *
 * Dashboard: statistik (4 kartu) + filter status + tabel pendaftaran
 * + dropdown ubah status per baris + toast feedback.
 */
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import Icon from '../components/ui/Icon'
import {
  loginAdmin,
  simpanTokenAdmin,
  hapusTokenAdmin,
  ambilTokenAdmin,
  listPendaftaranAdmin,
  updateStatusPendaftaran,
  type PendaftaranAdmin,
  type StatusPendaftaran,
} from '../api/adminApi'

const INPUT_CLS =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none'

const FILTERS = ['semua', 'baru', 'dihubungi', 'terkonfirmasi', 'batal'] as const
type Filter = (typeof FILTERS)[number]

/** Label + warna badge per status (sesuai PERENCANAAN-ADMIN §7) */
const STATUS_UI: Record<StatusPendaftaran, { label: string; cls: string }> = {
  baru: { label: 'Baru', cls: 'bg-blue-100 text-blue-700' },
  dihubungi: { label: 'Dihubungi', cls: 'bg-amber-100 text-amber-700' },
  terkonfirmasi: { label: 'Terkonfirmasi', cls: 'bg-green-100 text-green-700' },
  batal: { label: 'Batal', cls: 'bg-red-100 text-red-700' },
}

/** '081234567890' → '6281234567890' untuk link wa.me */
function normalizeWa(num: string): string {
  const digits = num.replace(/\D/g, '')
  return digits.startsWith('0') ? `62${digits.slice(1)}` : digits
}

const formatTanggal = (iso: string) => {
  const d = new Date(iso.includes('T') ? iso : iso.replace(' ', 'T') + 'Z')
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
}

function Admin() {
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'mengirim' | 'gagal' | 'masuk'>('idle')
  const [error, setError] = useState('')

  // Dashboard state
  const [data, setData] = useState<PendaftaranAdmin[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>('semua')
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ kind: 'ok' | 'err'; msg: string } | null>(null)

  const sudahLogin = status === 'masuk' || ambilTokenAdmin() !== null

  // Ambil data saat filter berubah
  useEffect(() => {
    if (!sudahLogin) return
    let aktif = true
    setLoading(true)
    listPendaftaranAdmin(filter)
      .then((rows) => {
        if (aktif) setData(rows)
      })
      .catch((e) => {
        if (aktif) {
          setToast({ kind: 'err', msg: e instanceof Error ? e.message : 'Gagal ambil data' })
          setData([])
        }
      })
      .finally(() => {
        if (aktif) setLoading(false)
      })
    return () => {
      aktif = false
    }
  }, [sudahLogin, filter])

  // Statistik ringkas dihitung dari data terfilter (fase ini cukup dari list)
  const stats = useMemo(() => {
    const hitung = (s: StatusPendaftaran) => data.filter((d) => d.status === s).length
    return {
      total: data.length,
      baru: hitung('baru'),
      dihubungi: hitung('dihubungi'),
      terkonfirmasi: hitung('terkonfirmasi'),
      batal: hitung('batal'),
    }
  }, [data])

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setStatus('mengirim')
    setError('')
    try {
      await loginAdmin(password)
      simpanTokenAdmin(password)
      setStatus('masuk')
    } catch (err) {
      setStatus('gagal')
      setError(err instanceof Error ? err.message : 'Login gagal')
    }
  }

  function handleLogout() {
    hapusTokenAdmin()
    setPassword('')
    setStatus('idle')
    setData([])
    setToast(null)
  }

  async function handleUbahStatus(id: number, value: string) {
    const statusBaru = value as StatusPendaftaran
    setUpdatingId(id)
    try {
      await updateStatusPendaftaran(id, statusBaru)
      // Update lokal tanpa refetch (lebih responsif)
      setData((prev) => prev.map((d) => (d.id === id ? { ...d, status: statusBaru } : d)))
      setToast({ kind: 'ok', msg: `Status #${id} → ${STATUS_UI[statusBaru].label}` })
    } catch (e) {
      setToast({ kind: 'err', msg: e instanceof Error ? e.message : 'Gagal ubah status' })
    } finally {
      setUpdatingId(null)
    }
  }

  /* ================= RENDER ================= */

  if (!sudahLogin) {
    return (
      <div className="flex min-h-screen flex-col bg-brand-950">
        <div className="flex flex-1 items-center justify-center px-4 py-12">
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100">
                <Icon name="kaaba" className="h-6 w-6 text-brand-600" />
              </span>
              <div>
                <h1 className="text-lg font-semibold text-brand-900">Admin Ebitour</h1>
                <p className="text-xs text-gray-400">Masuk untuk kelola pendaftaran</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-gray-600">
                  Password Admin
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoFocus
                  className={INPUT_CLS}
                />
              </label>

              {status === 'gagal' && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error || 'Password salah'}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'mengirim' || !password}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'mengirim' ? 'Memeriksa…' : 'Masuk'}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-400">
              Khusus admin Ebitour — akses tidak dipublikasikan.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100">
            <Icon name="kaaba" className="h-5 w-5 text-brand-600" />
          </span>
          <div>
            <h1 className="text-sm font-semibold text-brand-900">Admin Ebitour</h1>
            <p className="text-xs text-gray-400">Dashboard Pendaftaran</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-red-300 hover:text-red-600"
        >
          Logout
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Statistik */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-400">Total</p>
            <p className="mt-1 text-2xl font-bold text-brand-900">{stats.total}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs text-blue-500">Baru</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">{stats.baru}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs text-amber-500">Dihubungi</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">{stats.dihubungi}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs text-green-500">Terkonfirmasi</p>
            <p className="mt-1 text-2xl font-bold text-green-600">{stats.terkonfirmasi}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs text-red-500">Batal</p>
            <p className="mt-1 text-2xl font-bold text-red-600">{stats.batal}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-brand-50'
              }`}
            >
              {f === 'semua' ? 'Semua' : STATUS_UI[f].label}
            </button>
          ))}
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
              toast.kind === 'ok'
                ? 'border-green-200 bg-green-50 text-green-700'
                : 'border-red-200 bg-red-50 text-red-600'
            }`}
          >
            {toast.msg}
          </div>
        )}

        {/* Tabel */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-400">
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">WhatsApp</th>
                  <th className="px-4 py-3">Paket</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Pax</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-gray-50">
                      <td className="px-4 py-4" colSpan={8}>
                        <div className="h-4 w-full rounded bg-gray-100" />
                      </td>
                    </tr>
                  ))
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-gray-400">
                      Belum ada pendaftaran{filter !== 'semua' ? ` dengan status "${STATUS_UI[filter].label}"` : ''}.
                    </td>
                  </tr>
                ) : (
                  data.map((d, i) => (
                    <tr key={d.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50/50">
                      <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {d.nama}
                        {d.alamat && (
                          <span className="block text-xs font-normal text-gray-400">{d.alamat}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`https://wa.me/${normalizeWa(d.whatsapp)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-brand-600 hover:underline"
                        >
                          {d.whatsapp}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <span className="line-clamp-2">{d.paket_nama}</span>
                        {d.tanggal && (
                          <span className="block text-xs text-gray-400">Berangkat {d.tanggal}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{formatTanggal(d.created_at)}</td>
                      <td className="px-4 py-3 text-gray-600">{d.jumlah_pax} pax</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_UI[d.status].cls}`}
                        >
                          {STATUS_UI[d.status].label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={d.status}
                          disabled={updatingId === d.id}
                          onChange={(e) => handleUbahStatus(d.id, e.target.value)}
                          className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 focus:border-brand-500 focus:outline-none disabled:opacity-50"
                        >
                          {(Object.keys(STATUS_UI) as StatusPendaftaran[]).map((s) => (
                            <option key={s} value={s}>
                              {STATUS_UI[s].label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Admin
