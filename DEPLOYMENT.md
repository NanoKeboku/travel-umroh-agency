# Deployment & Database — Travel Umrah Ebitour

## Arsitektur

```
GitHub (NanoKeboku/travel-umroh-agency)
  │  push ke main
  ▼
GitHub Actions (auto)
  ├─ deploy.yml       → build + lint + deploy → Cloudflare Pages
  └─ migrate-d1.yml   → wrangler d1 migrations apply (jika migrations/ berubah)
                          │
                          ▼
              Cloudflare Pages (https://travel-umroh-agency.pages.dev)
              ├─ static SPA (React build dari dist/)
              └─ Pages Functions (functions/api/*) → API /api/paket, /api/jadwal, /api/promo
                          │
                          ▼
              Cloudflare D1 (ebitour-db, region APAC)
              ├─ paket (5 paket seed)
              ├─ jadwal (keberangkatan per paket)
              ├─ tambahan_pesawat (add-on tiket domestik)
              └─ promo (kosong, siap diisi)
```

## URL Penting

- Website: https://travel-umroh-agency.pages.dev
- API list paket: https://travel-umroh-agency.pages.dev/api/paket
- API detail: https://travel-umroh-agency.pages.dev/api/paket/umrah-hemat
- API jadwal: https://travel-umroh-agency.pages.dev/api/jadwal?paket=umrah-hemat
- API promo: https://travel-umroh-agency.pages.dev/api/promo

## Setup GitHub Actions (sekali saja)

Secrets yang dibutuhkan di repo (Settings → Secrets and variables → Actions):

| Secret | Nilai | Status |
|---|---|---|
| `CLOUDFLARE_ACCOUNT_ID` | `363bcd0b8c951e3a1876c65fc087f4eb` | ✅ sudah di-set |
| `CLOUDFLARE_API_TOKEN` | (buat di bawah) | ⏳ BELUM |

### Membuat Cloudflare API Token

1. Login ke https://dash.cloudflare.com
2. Klik avatar kanan atas → **My Profile** → **API Tokens**
3. **Create Token** → pilih template **"Edit Cloudflare Workers"**
4. Sesuaikan izin (permission):
   - Account · Cloudflare Pages · **Edit**
   - Account · D1 · **Edit**
   - Account · Workers Scripts · **Edit**
   - User · Memberships · **Read**
5. **Continue to summary** → **Create Token**
6. Salin token (hanya tampil sekali!) → simpan aman

### Set token ke GitHub

```bash
gh secret set CLOUDFLARE_API_TOKEN
# paste token saat diminta
```

Setelah token terpasang, setiap push ke `main` otomatis:
1. Lint + build
2. Deploy ke Cloudflare Pages
3. Jika ada file baru di `migrations/` → migrasi D1 dijalankan

## Deploy Manual (tanpa GitHub Actions)

```bash
npm run build
npx wrangler pages deploy dist --project-name travel-umroh-agency   # deploy frontend+API
npx wrangler d1 migrations apply ebitour-db --remote                # migrasi DB
```

## Update Data Paket (seed)

Data sumber tetap `src/data/paket.ts` (single source of truth).

```bash
# 1. ubah data di src/data/paket.ts
# 2. regenerate migrasi seed
node --experimental-strip-types scripts/seed.mjs
# 3. terapkan ke DB lokal & remote
npx wrangler d1 migrations apply ebitour-db --local
npx wrangler d1 migrations apply ebitour-db --remote
```

> Catatan: migrasi seed bersifat INSERT. Untuk mengubah data yang sudah ada,
> tambah migrasi baru (0003_update.sql) atau hapus isi tabel dulu.

## Local Development dengan API

```bash
# terminal 1 — vite (frontend)
npm run dev

# terminal 2 — wrangler (API + D1 lokal)
npx wrangler pages dev --port 8788
```

Cek API lokal: http://localhost:8788/api/paket
