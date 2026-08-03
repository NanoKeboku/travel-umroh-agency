# STYLE REFERENCE — Travel Umrah Ebitour Purworejo

> **UPDATE (Agustus 2026):** warna brand project diubah dari hijau olive → **biru langit (sky blue)**
> atas permintaan klien. Palet `brand` di `src/index.css` kini memakai skala sky Tailwind
> (#0EA5E9 s/d #082F49). Sand/krem tetap sebagai warna netral pendamping.

> Referensi gaya desain yang diambil dari website **broka.com.my** (screenshot: `asset/referensi/screencapture-broka-my-2026-08-02-12_04_44.png`).
> Yang ditiru adalah **gaya visual** (warna, font, layout, nuansa), bukan konten/bisnisnya (broka adalah jasa drone — konten kita tetap travel umrah).

---

## 1. Kesimpulan Gaya

**Modern, minimalis, earthy-islamic.** Dominasi background putih & abu sangat terang, dengan warna **hijau zaitun tua (dark olive green)** sebagai warna brand untuk hero & footer, aksen **sage/olive muda** dan **krem/sand** untuk detail. Banyak white space, tipografi bersih (Inter), kartu dengan sudut membulat lembut dan shadow halus. Kesan: profesional, tenang, terpercaya — sangat cocok dengan nuansa perjalanan ibadah.

---

## 2. Palet Warna

### 2.1 Warna Primer (dari pixel screenshot)

| Nama | Hex | RGB | Penggunaan |
|---|---|---|---|
| **Olive Dark (Brand)** | `#262F23` | (38,47,35) | Hero text, teks utama di area gelap, ikon |
| **Olive Deep** | `#3F4322` | (63,67,34) | Gradasi hero, aksen gelap |
| **Olive** | `#5D6433` | (93,100,51) | Warna utama hero background |
| **Olive Mid** | `#747E51` | (116,126,81) | Aksen sekunder, border dekoratif |
| **Sage** | `#96A087` | (150,160,135) | Ikon, detail, badge outline |
| **Sand / Krem** | `#DED6CA` | (222,214,202) | Background section aksen, separator |
| **Putih** | `#FFFFFF` | (255,255,255) | Background utama, kartu |
| **Abu Terang** | `#F9FAFB` | (249,250,251) | Background section selang-seling |
| **Footer Olive** | `#2F3C21` | (47,60,33) | Footer background |

### 2.2 Warna Sekunder (dari codebase broka — Tailwind/JS)

| Nama | Hex | Penggunaan |
|---|---|---|
| **Teal Brand** | `#0D7668` | Aksen interaktif (link hover, tombol outline, focus ring) |
| Teal-600 | `#0D9488` | Hover state |
| Teal-700 | `#0F766E` | Hover state tombol |
| Abu teks | `#9CA3AF`, `#6B7280` | Teks sekunder/muted |
| Teks gelap | `#111827`, `#1F2937` | Heading |

> **Catatan:** landing page broka yang di-screenshot memakai palet hijau zaitun di atas, sedangkan `#0D7668` (teal) dipakai di bagian admin/UI lain. Untuk Ebitour, rekomendasi: **pakai palet hijau zaitun sebagai warna brand utama** (lebih islami & elegan), teal `#0D7668` sebagai aksen interaktif opsional.

### 2.3 Skema Penggunaan (rekomendasi untuk Ebitour)

```
Background utama  : #FFFFFF / #F9FAFB (selang-seling antar section)
Hero             : gradasi #262F23 → #5D6433 (olive gelap) + teks putih
Footer           : #2F3C21 (olive sangat gelap) + teks putih/sage
Heading          : #262F23 (olive dark)
Teks body        : #4B5563 / #6B7280
Aksen/CTA utama  : #5D6433 (olive) atau #0D7668 (teal)
Aksen soft       : #96A087 (sage), #DED6CA (sand)
```

---

## 3. Tipografi

| Properti | Nilai |
|---|---|
| Font utama | **Inter** (dari `--font-sans: "Inter", ui-sans-serif, system-ui, ...`) |
| Fallback | `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto` |
| Bobot dipakai | `font-medium`, `font-semibold`, `font-bold` |
| Letter spacing | `tracking-wide`, `tracking-wider` (untuk label/eyebrow) |
| Line height | `1.5` (default), heading lebih rapat |

### Skala ukuran yang umum (Tailwind)

```
Eyebrow / label : text-xs sm — uppercase, tracking-wider, warna sage/olive
Heading section : text-3xl sm — font-semibold/bold, warna olive dark
Subheading      : text-lg — font-medium, abu
Body            : text-sm/base — font-normal, #4B5563
```

---

## 4. Layout & Struktur Halaman

Dari analisis screenshot (1920×10526 px, 8 section mayor):

```
┌─────────────────────────────────────┐
│ NAVBAR  (y 0–130)  putih, sticky    │  logo kiri + menu kanan
├─────────────────────────────────────┤
│ HERO  (y 385–1035, ~650px)          │  background olive gelap,
│   gradasi #626B2E→#5C672C           │  headline besar putih,
│   + CTA                              │
├─────────────────────────────────────┤
│ SECTION A (y 1035–1745) putih       │  foto/gambar + teks (about)
├─────────────────────────────────────┤
│ SECTION B (y 1770–2210) putih/abu   │  angka statistik / fitur
├─────────────────────────────────────┤
│ SECTION C (y 2210–2720) abu         │  layanan / keunggulan
├─────────────────────────────────────┤
│ SECTION D (y 2745–3415) sand/krem   │  kartu paket / layanan
│   bg #E8E9E6                        │  (grid kartu)
├─────────────────────────────────────┤
│ SECTION E (y 3455–4040) krem+gelap  │  galeri / dokumentasi
├─────────────────────────────────────┤
│ SECTION F (y 4175–4990) putih       │  testimoni / blog
├─────────────────────────────────────┤
│ SECTION G (y 4990–5370) abu gelap   │  CTA / quote besar
├─────────────────────────────────────┤
│ SECTION H (y 5370–7140) putih/abu   │  blog / FAQ / fitur
├─────────────────────────────────────┤
│ SECTION I (y 7890–9270) putih       │  kontak / form
├─────────────────────────────────────┤
│ FOOTER (y 9270–9920, ~650px)        │  bg olive gelap #6D764D,
│   + bottom bar putih                │  multi kolom
└─────────────────────────────────────┘
```

### Pola layout yang dipakai broka (untuk ditiru)

1. **Section selang-seling**: putih → abu terang `#F9FAFB` → putih, kadang diselingi section sand/krem untuk variasi.
2. **Hero full-width** dengan background gelap solid/gradasi, konten rata kiri atau tengah.
3. **Konten di-center** dengan max-width (container ~1200px), banyak white space.
4. **Grid kartu 3 kolom** di area layanan/paket, kartu putih dengan shadow halus.
5. **Footer gelap** multi-kolom (tentang, link, kontak, medsos) + bottom bar copyright.
6. Foto/gambar ditampilkan dalam frame dengan sudut membulat (`rounded-xl/2xl`).

---

## 5. Komponen & Detail Styling

| Komponen | Gaya |
|---|---|
| **Kartu** | bg putih, `rounded-xl`/`rounded-2xl`, `shadow-sm` s/d `shadow-md`, hover naik + `shadow-lg` |
| **Tombol CTA** | solid olive/teal, `rounded-lg`/`rounded-full`, hover gelap (teal-700) |
| **Tombol outline** | border olive/teal, teks olive/teal, hover bg transparan-teal |
| **Badge/label** | `rounded-full`, bg sage/olive transparan (opacity 10–20%), teks olive |
| **Navbar** | putih, border bawah tipis `#E5E7EB`, logo kiri, menu kanan, sticky |
| **Eyebrow section** | teks kecil uppercase, `tracking-wider`, warna olive/sage |
| **Hero image** | full-bleed dengan overlay gradasi gelap (`from-black/60`, `via-black/30`) |
| **Input form** | border `#E5E7EB`, focus ring olive/teal (`focus:ring-#0D7668`), `rounded-md/lg` |
| **Section spacing** | padding vertikal besar (py-16 s/d py-24) |
| **Shadow palette** | `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl` |

---

## 6. Prinsip Desain yang Dipegang

1. **White space dulu** — jangan penuhi setiap pixel; beri ruang antar section & elemen.
2. **Satu warna gelap, banyak terang** — olive hanya untuk hero/footer/aksen, sisanya putih/abu.
3. **Tipografi jadi pahlawan** — Inter dengan bobot semibold untuk heading, tracking-wide untuk label.
4. **Kartu konsisten** — satu radius, satu skala shadow, spacing seragam.
5. **Foto selalu dalam frame membulat** — tidak ada gambar kotak tajam.
6. **CTA jelas** — 1 tombol utama per section, warna olive/teal solid.

---

## 7. Implementasi — Tailwind Config (untuk project React + Tailwind)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#F5F7F2',   // hijau muda sekali (bg soft)
          100: '#E8EBDF',
          200: '#D0D6C0',
          300: '#A9B394',
          400: '#96A087',  // sage
          500: '#747E51',  // olive mid
          600: '#5D6433',  // olive (primary)
          700: '#3F4322',  // olive deep
          800: '#2F3C21',  // footer
          900: '#262F23',  // olive dark (heading/hero)
        },
        sand: {
          100: '#F5F1EA',
          200: '#DED6CA',  // sand/krem
          300: '#CCBAA1',
        },
        teal: {  // aksen interaktif opsional
          brand: '#0D7668',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',      // rounded-2xl untuk kartu
      },
      boxShadow: {
        soft: '0 4px 24px rgba(38, 47, 35, 0.08)',
      },
    },
  },
}
```

```css
/* index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

body { @apply bg-white text-gray-600 font-sans antialiased; }
h1, h2, h3, h4 { @apply text-brand-900 font-semibold; }
```

---

## 8. Catatan

- Screenshot diambil 2026-08-02, resolusi 1920px (desktop). Perlu cek juga tampilan mobile broka untuk pola responsive.
- Konten website broka (jasa drone, pricing, dashboard) **tidak dipakai** — hanya gaya visualnya.
- **Palet asli broka (olive) TIDAK dipakai lagi** — diganti biru langit (sky blue) atas permintaan klien. Palet aktif ada di `src/index.css` (`@theme`).
- Jika ingin, palet bisa disesuaikan sedikit agar lebih "islami" (misal tambah aksen emas `#C9A96E` untuk detail premium) — rekomendasi opsional.

## 9. Referensi Website Resmi Ebitour (www.ebitour.com)

> Dicatat dari website resmi klien: https://www.ebitour.com/en (dibangun dengan Odoo).

**Palet resmi Ebitour (ungu + emas):**

| Warna | Hex | Penggunaan |
|---|---|---|
| Ungu sangat gelap (plum) | `#1A1423` | Teks utama, dark section |
| Ungu | `#714B67`, `#875A7B` | Aksen ungu |
| Emas (utama) | `#FAB803`, `#FBBF1C` | CTA, aksen, highlight |
| Krem background | `#F5F4F0` | Background |
| Teal | `#017E84` | Aksen sekunder |

**Identitas resmi:**
- Nama: EBITOUR Tours & Travels — penyelenggara Ibadah Umroh
- Pedoman: **"Setia & Amanah, melayani dengan sepenuh hati para Tamu Allah SWT"**
- Konten: paket umroh/haji, maskapai, Kemenag

**Keputusan desain project kita:** website resmi klien berpalet ungu+emas, tetapi klien meminta warna brand project **biru langit** (sky blue). Palet ungu+emas di atas tetap dicatat sebagai identitas resmi perusahaan untuk referensi (misal untuk logo, brosur, atau penyesuaian di masa depan).
