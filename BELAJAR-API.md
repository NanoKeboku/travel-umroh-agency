# Belajar API — Travel Umrah Ebitour

Dokumen ini menjelaskan **cara API dibuat dan bekerja** di proyek ini, dari nol.
Ditujukan untuk dipelajari — bukan sekadar referensi. Baca berurutan.

---

## 1. Arsitektur Singkat

```
Browser (React)
    │  fetch('/api/paket')
    ▼
Cloudflare Pages (https://travel-umroh-agency.pages.dev)
    ├─ static files  → React app (hasil build)
    └─ Pages Functions (folder /functions)  ← API ada di sini
            │  env.ebitour_db
            ▼
Cloudflare D1 (database SQLite, "ebitour-db")
```

Kunci pemahaman: **Pages Functions = backend tanpa server** (serverless).
Kamu tidak perlu mengelola server — Cloudflare yang menjalankan kode kamu
di edge (dekat pengguna), dan setiap request dihitung per-panggilan.

---

## 2. Cara Routing Bekerja (PENTING!)

Pages Functions memakai **struktur folder** untuk menentukan URL.
Folder `functions/` di-root proyek:

```
functions/
└── api/
    ├── paket.ts          → GET /api/paket
    ├── paket/
    │   └── [slug].ts     → GET /api/paket/:slug   (parameter dinamis)
    ├── jadwal.ts         → GET /api/jadwal
    └── promo.ts          → GET /api/promo
```

Aturan:
- `functions/api/paket.ts` → route `/api/paket`
- `functions/api/paket/[slug].ts` → route `/api/paket/<apa saja>` — `[slug]` adalah **parameter dinamis**
- Tiap file mengekspor handler seperti `onRequestGet` (untuk GET) — Cloudflare memanggilnya saat request masuk

Kenapa paket list & detail dipisah jadi 2 file?
- `paket.ts` = daftar (tanpa `[slug]`) → `/api/paket` saja
- `[slug].ts` = detail → `/api/paket/umrah-hemat`
- Kalau digabung di satu file, perlu cek manual apakah ada `slug` — lebih ribet. Pisah file = routing otomatis.

---

## 3. Anatomi Satu Endpoint

Buka `functions/api/paket.ts`. Bagian paling penting:

```ts
interface Env {
  ebitour_db: D1Database   // binding database (didefinisikan di wrangler.jsonc)
}

export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  // 1. Baca query parameter dari URL
  const url = new URL(request.url)
  const jenis = url.searchParams.get('jenis')

  // 2. Bangun query SQL (dinamis sesuai filter)
  let query = 'SELECT DISTINCT p.* FROM paket p LEFT JOIN jadwal j ON j.paket_id = p.id'
  // ...tambah WHERE kalau ada filter...

  // 3. Eksekusi ke D1
  const { results } = await env.ebitour_db
    .prepare(query)      // siapkan statement
    .bind(...binds)      // isi placeholder '?' (aman dari SQL injection)
    .all()               // jalankan, ambil semua baris

  // 4. Kembalikan JSON
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  })
}
```

### Metode D1 yang dipakai (hapalkan 3 ini)

| Method | Fungsi | Contoh |
|---|---|---|
| `.all()` | Ambil **banyak** baris | daftar paket |
| `.first()` | Ambil **satu** baris (atau null) | detail paket |
| `.run()` | Jalankan **tanpa hasil** (INSERT/UPDATE) | (belum dipakai, untuk admin nanti) |

### Kenapa pakai `.bind()`?

```ts
// ❌ JANGAN — rawan SQL injection
db.prepare(`SELECT * FROM paket WHERE id = '${slug}'`).all()

// ✅ AMAN — nilai disisipkan via placeholder
db.prepare('SELECT * FROM paket WHERE id = ?').bind(slug).all()
```
D1 otomatis meng-escape nilai di `bind()`. **Selalu** pakai `?` + bind.

---

## 4. Mengapa Kolom JSON di Database?

Tabel `paket` punya kolom `fasilitas`, `itinerary`, `penerbangan` dst yang
isinya **array/objek** (mis. `["Tiket PP", "Visa", ...]`). SQLite tidak punya
tipe array, jadi disimpan sebagai **teks JSON**.

Di handler ada helper:

```ts
function jsonOr<T>(v: string | null, fallback: T): T {
  if (!v) return fallback
  try { return JSON.parse(v) } catch { return fallback }
}
```

Jadi saat mengirim respons, JSON di-parse balik jadi array asli.
Ini pola umum: **DB simpan JSON string → API parse → frontend terima array**.

---

## 5. Migrasi & Seed — Bagaimana Data Masuk DB

`migrations/` berisi file SQL yang dijalankan berurutan:

```
migrations/
├── 0001_init.sql    → CREATE TABLE (schema)
└── 0002_seed.sql    → INSERT data awal (5 paket + jadwal)
```

Cara menjalankan:
```bash
npx wrangler d1 migrations apply ebitour-db --local    # DB lokal (dev)
npx wrangler d1 migrations apply ebitour-db --remote   # DB produksi
```

### Seed = single source of truth

Data paket ditulis **sekali** di `src/data/paket.ts` (dipakai frontend statis).
Script `scripts/seed.mjs` membaca file itu dan **membuat otomatis**
`migrations/0002_seed.sql`:

```bash
npm run seed   # = node --experimental-strip-types scripts/seed.mjs
```

Jadi: ubah `paket.ts` → `npm run seed` → `npm run db:migrate` → DB ter-update.
Tidak perlu menulis SQL INSERT manual. (Node 22+ bisa langsung import file .ts)

---

## 6. Menjalankan API di Lokal

Butuh 2 terminal:

```bash
# Terminal 1 — API + D1 lokal (wrangler)
npx wrangler pages dev --port 8788

# Terminal 2 — frontend (vite)
npm run dev
```

### Trik: Vite Proxy

Frontend memanggil `/api/paket` (path relatif, tanpa domain). Di `vite.config.ts`:

```ts
server: {
  proxy: {
    '/api': 'http://localhost:8788',   // dev: teruskan ke wrangler
  },
}
```

Kenapa? Di **produksi**, `/api/...` langsung di-handle Pages Functions
(domain sama). Di **dev**, vite di port 5173 tidak punya `/api` — jadi
di-proxy ke wrangler di 8788. Kode frontend tidak berubah antara dev & prod.

---

## 7. Cara Frontend Mengambil Data

Frontend TIDAK menulis query SQL — hanya `fetch` ke URL API.

`src/api/paketApi.ts` — lapisan client:
```ts
export function fetchPaketList(params?: Record<string, string>): Promise<Paket[]> {
  const qs = params ? new URLSearchParams(params).toString() : ''
  return apiFetch(`/api/paket${qs ? `?${qs}` : ''}`)
}
```

`src/hooks/usePaket.ts` — hook React:
```ts
export function usePaketList(filters) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPaketList(filters)
      .then(setData)
      .catch(fallbackKeStatis)   // ← graceful degradation
      .finally(() => setLoading(false))
  }, [JSON.stringify(filters)])  // refetch hanya saat filter berubah

  return { data, loading }
}
```

Pola yang bisa dipelajari:
- **useState** untuk data/loading → UI render skeleton saat loading
- **useEffect** untuk fetch saat komponen mount / filter berubah
- **JSON.stringify(filters)** sebagai dependency → effect jalan ulang hanya jika isi filter beda
- **fallback ke data statis** jika API error → website tidak pernah "mati total"

Halaman yang memakai hook: `PaketUmrah.tsx`, `PaketHaji.tsx`,
`PaketDetail.tsx`, `PencarianTiket.tsx` (home).

---

## 8. Tes API dengan curl (contoh nyata)

```bash
# Semua paket
curl "https://travel-umroh-agency.pages.dev/api/paket"

# Detail satu paket
curl "https://travel-umroh-agency.pages.dev/api/paket/umrah-hemat"

# Filter jenis (haji)
curl "https://travel-umroh-agency.pages.dev/api/paket?jenis=haji"

# Filter bulan keberangkatan (join tabel jadwal)
curl "https://travel-umroh-agency.pages.dev/api/paket?bulan=November%202026"

# Jadwal satu paket
curl "https://travel-umroh-agency.pages.dev/api/jadwal?paket=umrah-premium"

# Promo aktif (masih kosong — wajar)
curl "https://travel-umroh-agency.pages.dev/api/promo"

# Paket tidak ada → 404
curl -i "https://travel-umroh-agency.pages.dev/api/paket/ngawur"
```

Tips: di Git Bash/Windows, spasi di URL pakai `%20` atau `--data-urlencode`.

---

## 9. Cara Menambah Endpoint Baru (praktik)

Contoh: buat endpoint `/api/kontak` yang baca tabel kontak.

1. **Buat file** `functions/api/kontak.ts`:
```ts
interface Env { ebitour_db: D1Database }

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const row = await env.ebitour_db.prepare('SELECT * FROM kontak LIMIT 1').first()
  return new Response(JSON.stringify(row ?? { error: 'Kontak belum diisi' }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
```
2. **Buat tabel** — tambah `migrations/0003_kontak.sql`, lalu `npm run db:migrate`
3. **Coba lokal** — `npx wrangler pages dev --port 8788` → `curl localhost:8788/api/kontak`
4. **Deploy** — `git push` (GitHub Actions otomatis deploy + migrasi)

---

## 10. Alur Deploy Otomatis (GitHub Actions)

`.github/workflows/`:
- `deploy.yml` — tiap push ke main: `npm ci` → `lint` → `build` → `wrangler pages deploy`
- `migrate-d1.yml` — jika file di `migrations/` berubah: `wrangler d1 migrations apply --remote`

Secrets yang dibutuhkan (Settings → Secrets → Actions):
- `CLOUDFLARE_ACCOUNT_ID` (sudah diset)
- `CLOUDFLARE_API_TOKEN` (sudah diset)

> Jangan pernah simpan token di kode! Hanya di GitHub Secrets.

---

## 11. Istilah Kunci (glosarium)

| Istilah | Arti |
|---|---|
| **Pages Functions** | Fitur Cloudflare Pages untuk API serverless — cukup taruh file di folder `functions/` |
| **D1** | Database SQLite milik Cloudflare — bisa diquery dari Functions |
| **Binding** | Cara memberi akses DB ke kode: `env.ebitour_db` (didefinisikan di `wrangler.jsonc`) |
| **Migration** | File SQL berurutan yang mengubah struktur/data DB secara terkelola |
| **Seed** | Data awal yang di-insert ke DB |
| **Serverless** | Kode jalan tanpa server sendiri — Cloudflare yang urus |
| **Edge** | Lokasi server Cloudflare terdekat dengan pengguna (respons cepat) |
| **Graceful degradation** | Sistem tetap berfungsi (dengan data cadangan) walau API error |

---

## 12. Cheatsheet Perintah

```bash
# API lokal
npx wrangler pages dev --port 8788

# Migrasi DB
npm run db:migrate          # remote (produksi)
npm run db:migrate:local    # lokal (dev)

# Regenerate seed dari paket.ts
npm run seed

# Deploy manual
npm run deploy

# Cek data di DB (query langsung)
npx wrangler d1 execute ebitour-db --remote --command "SELECT id, nama FROM paket"
```
