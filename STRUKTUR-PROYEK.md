# STRUKTUR PROYEK — Travel Umrah Ebitour Purworejo

Dokumen ini menjelaskan struktur folder & file yang sudah disiapkan (tahap instalasi).
Belum ada implementasi halaman — tinggal diisi pada tahap pengembangan.

## Tech Stack

| Bagian | Teknologi | Versi |
|---|---|---|
| Frontend | React + TypeScript + Vite | React 19 / TS 7 / Vite 8 |
| Styling | Tailwind CSS | v4 (via @tailwindcss/vite) |
| Routing | React Router | v7 |
| Deployment (rencana) | Cloudflare Pages | — |

## Struktur Folder

```
travel-umroh-agency/
├── asset/
│   └── referensi/              # Aset referensi desain (screenshot, dll)
├── public/                     # File statis — di-serve apa adanya
│   ├── favicon.svg             # Ikon website (placeholder)
│   ├── brosur/                 # Brosur PDF (untuk fitur Download Brosur)
│   └── images/
│       ├── hero/               # Gambar hero section
│       ├── galeri/             # Foto galeri kegiatan
│       └── dokumentasi/        # Dokumentasi keberangkatan
├── src/
│   ├── main.tsx                # Entry point React
│   ├── App.tsx                 # Komponen akar (placeholder)
│   ├── index.css               # Tailwind v4 + design tokens (palet brand)
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, FloatingWhatsApp, dll.
│   │   └── ui/                 # Komponen kecil: Button, Card, Badge, dll.
│   ├── pages/                  # Satu file per halaman (lihat daftar di bawah)
│   ├── data/                   # Data statis: paket, testimoni, artikel, FAQ
│   ├── hooks/                  # Custom hooks React
│   ├── utils/                  # Fungsi bantu (format rupiah, WhatsApp link, dll.)
│   └── assets/
│       ├── images/             # Gambar yang di-import via bundler
│       └── icons/              # Ikon (SVG)
├── index.html                  # HTML entry (SEO meta sudah diisi)
├── vite.config.ts              # Konfigurasi Vite (+ plugin Tailwind)
├── tsconfig*.json              # Konfigurasi TypeScript
├── package.json
├── .gitignore
├── RINGKASAN-PROYEK.md         # Ringkasan proyek (fase 1, scope statis)
├── PROJECT-GOALS-SCOPE.md      # Tujuan, scope, teknologi, deliverables
└── STYLE-REFERENCE.md          # Referensi gaya desain (broka.com.my)
```

## Halaman yang Akan Dibuat (sesuai PROJECT-GOALS-SCOPE)

Semua halaman akan ditaruh di `src/pages/`:

| Halaman | Route (rencana) | File |
|---|---|---|
| Beranda | `/` | `Home.tsx` |
| Tentang Kami | `/tentang` | `About.tsx` |
| Paket Umrah | `/paket-umrah` | `PaketUmrah.tsx` |
| Paket Haji | `/paket-haji` | `PaketHaji.tsx` |
| Pembimbing | `/pembimbing` | `Pembimbing.tsx` |
| Muthawif | `/muthawif` | `Muthawif.tsx` |
| Dokumentasi | `/dokumentasi` | `Dokumentasi.tsx` |
| Galeri | `/galeri` | `Galeri.tsx` |
| Testimoni | `/testimoni` | `Testimoni.tsx` |
| Artikel (Blog) | `/artikel` | `Artikel.tsx` |
| FAQ | `/faq` | `FAQ.tsx` |
| Kontak | `/kontak` | `Kontak.tsx` |
| Lokasi | `/lokasi` | `Lokasi.tsx` |
| Form Pendaftaran | `/pendaftaran` | `Pendaftaran.tsx` |

## Komponen Layout (rencana) — `src/components/layout/`

- `Navbar.tsx` — navigasi sticky
- `Footer.tsx` — footer multi-kolom + bottom bar
- `FloatingWhatsApp.tsx` — tombol WhatsApp mengambang
- `Layout.tsx` — pembungkus halaman (Navbar + Outlet + Footer)

## Data Statis (rencana) — `src/data/`

- `paket.ts` — daftar paket umrah/haji
- `testimoni.ts` — testimoni jamaah
- `artikel.ts` — artikel/blog
- `faq.ts` — pertanyaan umum
- `kontak.ts` — nomor WhatsApp, alamat, sosmed, koordinat Maps
- `galeri.ts` — daftar foto/video

## Perintah

```bash
npm install        # install dependencies
npm run dev        # dev server (http://localhost:5173)
npm run build      # build produksi ke dist/
npm run preview    # preview hasil build
npm run lint       # cek TypeScript
```

## Catatan Tahap Instalasi

- [x] package.json + dependencies (React 19, Router 7, Tailwind 4, Vite 8, TS 7)
- [x] Konfigurasi Vite + TypeScript + Tailwind (design tokens di `src/index.css`)
- [x] Struktur folder & placeholder halaman
- [x] SEO dasar di `index.html` (lang=id, description, title)
- [x] favicon placeholder
- [x] Git repo diinisialisasi (branch `main`)
- [x] Build produksi terverifikasi (npm run build sukses)

## Tahap Berikutnya (belum dikerjakan)

- [ ] Setup routing (React Router) di `App.tsx`
- [ ] Implementasi komponen layout (Navbar, Footer, FloatingWhatsApp)
- [ ] Implementasi halaman per halaman
- [ ] Data statis (paket, testimoni, artikel, FAQ)
- [ ] Optimasi SEO lanjutan & metadata per halaman
- [ ] Deploy ke Cloudflare Pages
