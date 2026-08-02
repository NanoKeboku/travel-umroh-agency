# BELAJAR REACT — Panduan dari Project Travel Umrah Ebitour

> Dokumen ini menjelaskan konsep pengembangan React **berdasarkan project yang sudah dibuat**
> di folder ini (`travel-umroh-agency`). Tujuannya: paham *kenapa* dan *bagaimana*,
> bukan sekadar tahu perintahnya. Bacalah sambil buka file-file yang disebut di setiap bagian.

---

## 0. Peta Besar (Big Picture)

Website React itu cara kerjanya beda dari website biasa:

```
WEBSITE BIASA (HTML statis / PHP)          WEBSITE REACT (SPA)
----------------------------------         ----------------------------------
Server mengirim HTML lengkap               Server hanya mengirim 1 HTML kosong
→ browser menampilkan langsung             → browser jalankan file JS (bundle)
                                            → JS yang membangun seluruh tampilan
```

Konsekuensinya:
- **Browser hanya menerima satu file HTML** (`index.html`) yang isinya hampir kosong — cuma ada `<div id="root">`.
- **React yang membangun isinya** lewat JavaScript. Semua halaman (Beranda, Paket, Galeri, dll.) sebenarnya satu aplikasi yang di-render ulang tanpa memuat ulang halaman (inilah *Single Page Application* / SPA).
- Karena itu ada **routing di sisi client** (React Router) — bukan `website.com/paket.php`, tapi route `/paket-umrah` yang di-handle JavaScript.

---

## 1. Apa itu React?

React adalah **library JavaScript untuk membangun antarmuka (UI)**. Konsep intinya:

1. **Komponen (Component)** — UI dipecah menjadi fungsi-fungsi kecil yang bisa dipakai ulang. Contoh di project ini: `Navbar`, `Footer`, `Button`, `Card`, `Home`, `About`, dst.
2. **JSX** — syntax mirip HTML yang ditulis di dalam JavaScript. Lihat `src/pages/Home.tsx`:
   ```tsx
   function Home() {
     return (
       <section className="...">
         <h1>Beranda</h1>
       </section>
     )
   }
   ```
   Fungsi ini *return* tampilan. Itulah komponen.
3. **Declarative** — Anda bilang "tampilkan ini kalau kondisinya ini", React yang urus cara meng-update layar.
4. **Props & State** — cara komponen menerima data (props) dan menyimpan data yang berubah (state).

**Kenapa React dipakai di project ini?** (dari PROJECT-GOALS-SCOPE.md) — memakai React/TypeScript/Tailwind sesuai spesifikasi, ekosistem besar, performa bagus, dan mudah dikembangkan ke fase ERP nanti (admin panel, dashboard).

---

## 2. Tahapan Setup Project (yang sudah kita lakukan)

Urutan ini bukan asal — setiap langkah punya alasan:

### Langkah 1: Buat `package.json` (manifest project)
Berisi nama project, versi, dan **scripts** (perintah yang sering dipakai):
```json
"scripts": {
  "dev": "vite",            // jalankan dev server
  "build": "tsc -b && vite build",  // cek type + build produksi
  "preview": "vite preview", // lihat hasil build
  "lint": "tsc --noEmit"     // cek TypeScript tanpa build
}
```

### Langkah 2: Install dependencies (runtime)
```bash
npm install react react-dom react-router-dom
```
Ini **kode yang dijalankan aplikasi** saat production.

### Langkah 3: Install devDependencies (alat bantu developer)
```bash
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom tailwindcss @tailwindcss/vite
```
Ini **alat untuk membangun & mengembangkan**, tidak ikut terkirim ke production (ukuran bundle tetap kecil).

### Langkah 4: Konfigurasi
- `vite.config.ts` — daftarkan plugin React + Tailwind (lihat bagian 6).
- `tsconfig*.json` — konfigurasi TypeScript (aturan strict, dll.).
- `index.html` — satu-satunya HTML; berisi `<div id="root">` + meta SEO + script `main.tsx`.

### Langkah 5: Buat struktur folder (lihat bagian 7)

### Langkah 6: Buat halaman & routing (stub dulu, lalu isi)

---

## 3. Package & Perannya (kenali, jangan hanya install)

| Package | Kategori | Fungsinya | Dipakai di |
|---|---|---|---|
| `react` | runtime | Library inti: komponen, JSX, hooks | semua file `.tsx` |
| `react-dom` | runtime | Menempelkan React ke DOM browser (`createRoot`) | `src/main.tsx` |
| `react-router-dom` | runtime | Routing SPA: `BrowserRouter`, `Routes`, `Route`, `NavLink`, `Outlet` | `src/App.tsx`, `Navbar.tsx`, `Layout.tsx` |
| `vite` | dev | Dev server + bundler (menggabung semua file jadi bundle) | `npm run dev/build` |
| `@vitejs/plugin-react` | dev | Plugin agar Vite paham JSX & Fast Refresh (HMR) | `vite.config.ts` |
| `typescript` | dev | Type checking — mendeteksi error tipe data sebelum jalan | `npm run lint` |
| `@types/react`, `@types/react-dom` | dev | Definisi tipe untuk React (biar TypeScript kenal React) | — |
| `tailwindcss` | dev | Framework CSS utility-first | semua class `bg-*`, `text-*`, dll. |
| `@tailwindcss/vite` | dev | Plugin Tailwind v4 untuk Vite | `vite.config.ts` |

**Penting — beda runtime vs dev:**
- `dependencies` (runtime) → ikut ter-bundle ke production.
- `devDependencies` (dev) → hanya untuk membangun. Vite & Tailwind "menghilang" setelah build; hasil akhirnya cuma HTML + CSS + JS.

---

## 4. Alur Eksekusi Aplikasi (dari klik URL sampai tampil)

```
Browser buka https://.../
        │
        ▼
index.html  ──►  <div id="root">  (kosong)  +  <script src="/src/main.tsx">
        │
        ▼
main.tsx   ──►  import './index.css'          (memuat CSS Tailwind)
                 createRoot(...).render(<App/>) (menempelkan React ke #root)
        │
        ▼
App.tsx    ──►  BrowserRouter + Routes
                 /            → Home
                 /paket-umrah → PaketUmrah
                 ... 15 route
        │
        ▼
Layout.tsx ──►  Navbar + <Outlet/> + Footer + FloatingWhatsApp
        │        (Outlet = tempat halaman sesuai route)
        ▼
Halaman    ──►  Home / PaketUmrah / Galeri / ... dirender
```

Buka 4 file ini urut — itu "jalan hidup" aplikasi:
1. `index.html` → 2. `src/main.tsx` → 3. `src/App.tsx` → 4. `src/components/layout/Layout.tsx`

---

## 5. Konsep React Inti (dengan contoh dari project)

### a. Komponen = fungsi yang return JSX
Semua file di `src/pages/` dan `src/components/` adalah komponen. `Home.tsx`:
```tsx
function Home() {
  return <section>...</section>   // return tampilan = komponen
}
export default Home               // biar bisa di-import App.tsx
```

### b. JSX — HTML di dalam JavaScript
- Class pakai `className` (bukan `class`).
- Bisa sisipkan ekspresi JavaScript dalam `{ }` — lihat `Footer.tsx`: `© {new Date().getFullYear()}`.
- Atribut `style`/event diberi nama camelCase: `onClick`, `onSubmit`.

### c. Props — data masuk ke komponen
Lihat `src/components/ui/Button.tsx`:
```tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}
function Button({ children, className = '', ...rest }: ButtonProps) { ... }
```
Komponen `Button` menerima props (seperti atribut HTML), lalu dipakai berulang:
```tsx
<Button>Daftar Sekarang</Button>
<Button className="bg-teal-brand">Chat WhatsApp</Button>
```
Inilah **reusability** — tulis sekali, pakai banyak tempat.

### d. State & Hooks — data yang berubah
- `useState` — menyimpan data yang berubah (misal: buka/tutup menu mobile, isi form).
- `useEffect` — menjalankan efek samping. Contoh nyata di `src/hooks/useScrollToTop.ts`:
  ```ts
  function useScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
      window.scrollTo(0, 0)   // setiap route berubah, gulir ke atas
    }, [pathname])            // dependency array: jalankan ulang saat pathname berubah
  }
  ```
- Custom hook = fungsi yang memakai hook React, diawali `use` — inilah pola yang dipakai `Layout.tsx`.

### e. Routing
`App.tsx`:
```tsx
<BrowserRouter>
  <Routes>
    <Route element={<Layout />}>          {/* Layout membungkus semua */}
      <Route path="/" element={<Home />} />
      <Route path="/paket-umrah" element={<PaketUmrah />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</BrowserRouter>
```
- `Layout` punya `<Outlet/>` — tempat halaman "disuntikkan" sesuai route.
- `NavLink` di `Navbar.tsx` memberi class aktif otomatis (menu yang sedang dibuka diberi warna berbeda).

---

## 6. Tailwind CSS v4 — Cara Menggabungkannya

### Kenapa Tailwind?
Utility-first: styling langsung lewat class kecil (`bg-white`, `text-sm`, `rounded-2xl`) — tanpa menulis file CSS terpisah per komponen. Cepat, konsisten, dan "selalu ingat" style di HTML-nya.

### Integrasi di Vite (v4 — tanpa tailwind.config.js!)
`vite.config.ts`:
```ts
import tailwindcss from '@tailwindcss/vite'
plugins: [react(), tailwindcss()]
```

### Titik masuk: `src/index.css`
```css
@import "tailwindcss";          // 1 baris ini = seluruh framework Tailwind

@theme {                        // definisikan design tokens (palet brand)
  --font-sans: "Inter", ...;
  --color-brand-600: #5D6433;
  --color-sand-200: #DED6CA;
  --shadow-soft: 0 4px 24px rgba(38,47,35,0.08);
}
```
- Di Tailwind v4, **design token dideklarasikan sebagai CSS variables** di dalam `@theme`.
- Token `--color-brand-600` otomatis jadi class `bg-brand-600`, `text-brand-600`, `border-brand-600`.
- `--shadow-soft` otomatis jadi class `shadow-soft`.
- Inilah yang menggantikan `tailwind.config.js` versi v3 — lebih sederhana.

### Contoh pemakaian (dari `Navbar.tsx`):
```tsx
<header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
<NavLink className={({ isActive }) =>
  isActive ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600'} >
```
Class Tailwind: `sticky top-0`, `bg-white/90` (opacity), `hover:` (state), `text-brand-600` (token kita).

### Base style global (di `index.css`):
```css
body { @apply bg-white font-sans text-gray-600 antialiased; }
h1,h2,h3 { @apply font-semibold text-brand-900; }
```
`@apply` = pakai utility class di dalam CSS biasa. Jadi heading di mana pun otomatis berwarna brand.

---

## 7. Struktur Pengembangan (kenapa dibagi begini)

```
src/
├── main.tsx            # pintu masuk — render React ke #root
├── App.tsx             # routing — peta seluruh halaman
├── index.css           # Tailwind + design tokens
├── pages/              # 1 file = 1 halaman (Home, PaketUmrah, Galeri, ...)
│                        → HANYA mengatur komposisi, tidak berisi logika berat
├── components/
│   ├── layout/         # kerangka halaman: Navbar, Footer, Layout, FloatingWhatsApp
│   └── ui/             # komponen kecil reusable: Button, Card, Badge, SectionHeading
├── data/               # data statis (paket.ts, testimoni.ts, kontak.ts, ...)
│                        → fase 1 tanpa database, jadi data ditaruh di sini
├── hooks/              # custom hooks (useScrollToTop.ts)
├── utils/              # fungsi bantu (format.ts: formatRupiah, waLink)
└── assets/             # gambar & ikon yang di-import lewat bundler
public/                 # file statis: favicon, brosur/, images/
```

**Prinsip pemisahannya:**
- `pages/` = "halaman apa yang tampil" → komposisi.
- `components/` = "bagian UI yang dipakai ulang" → detail tampilan.
- `data/` = "data apa yang ditampilkan" → isi konten, terpisah dari tampilan.
- Kenapa dipisah? Saat nanti migrasi ke fase ERP (database), tinggal ganti sumber data di `data/` → API, tanpa menyentuh tampilan.

---

## 8. Build & Menjalankan Aplikasi

### Mode Development (`npm run dev`)
```
vite --port 5199
→ VITE v8.2.0 ready → http://localhost:5199/
```
- **Dev server** menyajikan file langsung (tanpa build penuh) + **HMR** (Hot Module Replacement).
- Coba ubah `src/pages/Home.tsx` → simpan → browser langsung berubah **tanpa reload manual**. Itulah HMR.
- Cocok saat mengembangkan.

### Mode Production (`npm run build`)
Jalur dua tahap:
```
1. tsc -b        → TypeScript mengecek seluruh kode (error tipe data ketahuan di sini)
2. vite build    → bundler menggabung semua file menjadi output optimal
```
Hasilnya di folder `dist/`:
```
dist/index.html                   0.67 kB   ← HTML final
dist/assets/index-*.css          17.86 kB   ← CSS Tailwind (hanya class yang dipakai!)
dist/assets/index-*.js          238.37 kB   ← semua kode React jadi 1 file
```
- Nama file ber-hash (`index-CI7d6IM7.js`) = **cache busting** — setiap build baru hash berubah, browser tidak pakai versi lama.
- Tailwind otomatis membuang class yang tidak dipakai (tree-shaking CSS) → file kecil.
- Vite memakai **Rolldown** (bundler Rust) — build cepat.

### Preview hasil build (`npm run preview`)
Menjalankan `dist/` persis seperti production — untuk memastikan hasil build benar sebelum deploy.

### Deploy
`dist/` di-upload ke Cloudflare Pages (sesuai PROJECT-GOALS-SCOPE). Karena SPA, perlu konfigurasi *SPA fallback* (semua route → index.html), yang akan kita atur saat deploy.

---

## 9. Roadmap Tahapan Pengembangan (stub → selesai)

Project sekarang di tahap **kerangka (stub)**: routing + halaman kosong + data kosong.
Urutan yang disarankan untuk mengisi:

1. **Isi data dulu** (`src/data/*.ts`) — paket, testimoni, artikel, FAQ, kontak. Data adalah "bahan baku" tampilan.
2. **Lengkapi komponen UI** (`components/ui/`) — Button variant, Card hover, form input, dll.
3. **Lengkapi layout** — Navbar menu mobile, Footer konten asli, FloatingWhatsApp dengan nomor asli.
4. **Isi halaman satu per satu** — mulai dari `Home.tsx` (hero, paket unggulan, testimoni) karena ini etalase utama, lalu halaman lain.
5. **SEO & metadata** — title/description per halaman (belum ada library-nya, nanti ditambah).
6. **Download brosur** — taruh PDF di `public/brosur/`.
7. **Build & deploy** ke Cloudflare Pages.

Setiap selesai satu tahap → `git add -A && git commit && git push` (sesuai kesepakatan).

---

## 10. Cara Belajar Paling Efektif

1. **Baca alur dulu** (bagian 4) sampai paham index.html → main.tsx → App.tsx → Layout.
2. **Ubah sesuatu yang kecil** lalu lihat HMR bekerja. Misal ganti teks di `Home.tsx`, ganti warna di `index.css`.
3. **Tambahkan 1 halaman sendiri** sebagai latihan: buat file di `pages/`, daftarkan di `App.tsx`, tambahkan link di `Navbar.tsx`. (Ini latihan paling bagus — mencakup komponen, routing, dan navigasi.)
4. **Eksperimen dengan props**: ubah `Button.tsx` untuk menerima `variant="outline"`, lalu pakai di dua tempat berbeda.
5. **Baca error** — TypeScript & Vite memberi pesan error yang jelas. Error bukan musuh; itu petunjuk.
6. Kalau buntu, tanya — jelaskan apa yang dicoba, apa yang terjadi, dan apa error-nya.

---

## 11. Laravel vs React — Peta Padanan Lengkap

> Bagian ini untuk yang sudah kenal Laravel. Inti yang harus selalu diingat:
> **Laravel = server-side** (PHP jalan di server, kirim HTML jadi),
> **React = client-side** (JS jalan di browser, bangun HTML).
> Semua padanan di bawah harus dibaca dengan kerangka itu.

### 11.1 Tabel Padanan Cepat

| Laravel | React (project ini) |
|---|---|
| `routes/web.php` | `src/App.tsx` (peta route) |
| Controller | `src/pages/*.tsx` (satu file per halaman) |
| Blade view | JSX di komponen |
| Model (Eloquent) | TypeScript `interface` (definisi bentuk data) |
| Migration | `interface`/`type` di file data |
| Seeder (`db:seed`) | `src/data/*.ts` (data awal/statis) |
| Eloquent query (ambil data) | import data langsung / `.filter()` (fase ERP: `fetch` API) |
| Middleware group | `<Route element={<Layout />}>` (pembungkus) |
| Blade `@include`/`@extends` | komponen + props + `children` |
| `public/` folder | `public/` folder (file statis) |
| Aset via Vite (Laravel 9+) | `src/assets/` + `import` (otomatis hash) |
| `.env` + `env('KEY')` | `.env` + `import.meta.env.VITE_*` |
| Artisan command | npm scripts (`dev`/`build`/`lint`) |
| `Route::get('/paket/{id}')` | `path="/paket/:id"` + `useParams()` |
| Validasi (FormRequest) | controlled input + validasi client-side (nanti: zod) |
| Auth/session | fase 1: tidak ada; fase ERP: token |
| 404 (`fallback`) | `<Route path="*" element={<NotFound />} />` |
| Pagination | `.slice()` manual (fase 1) |

### 11.2 Routing — `web.php` vs `App.tsx`

```php
// LARAVEL — routes/web.php
Route::middleware('web')->group(function () {
    Route::get('/',            HomeController::class);
    Route::get('/paket-umrah', PaketUmrahController::class);
    Route::fallback(NotFoundController::class);
});
```

```tsx
// REACT — src/App.tsx
<Route element={<Layout />}>              // ← "middleware group"-nya
  <Route path="/" element={<Home />} />
  <Route path="/paket-umrah" element={<PaketUmrah />} />
  <Route path="*" element={<NotFound />} />
</Route>
```

Struktur nyaris identik. Bedanya: Laravel **server** yang mencocokkan URL → memanggil controller → render Blade → kirim HTML. React **browser** yang mencocokkan URL (lewat komponen `<Routes>`) → langsung render komponen — tanpa request baru ke server.

### 11.3 Controller → Halaman (`src/pages/`)

```php
// LARAVEL
class PaketController extends Controller {
    public function index() {
        $pakets = Paket::where('jenis', 'umrah')->get();
        return view('paket.index', ['pakets' => $pakets]);
    }
}
```

```tsx
// REACT — src/pages/PaketUmrah.tsx
function PaketUmrah() {
  // tidak ada $pakets dari controller — data datang dari import (lihat 11.6)
  return <section>...</section>
}
```

Di React, "controller" dan "view" **melebur jadi satu komponen**. Kenapa? Karena tidak ada siklus request → response. Komponen hanya menerima data (via import/props) lalu menampilkannya.

### 11.4 Model → TypeScript Interface

```php
// LARAVEL — app/Models/Paket.php
class Paket extends Model {
    protected $fillable = ['nama', 'harga', 'durasi'];
    public function fasilitas() { return $this->hasMany(Fasilitas::class); }
}
```

```ts
// REACT — src/data/paket.ts
export interface Paket {
  id: string
  jenis: 'umrah' | 'haji'
  nama: string
  harga: number
  fasilitas: string[]   // "relasi" sederhana: array
}
```

Model Laravel = struktur + query DB. Interface TypeScript = **definisi bentuk data** (kontrak). Gunanya: kalau kamu salah tulis field, TypeScript langsung protes saat `npm run lint` — error ketahuan sebelum dijalankan, bukan saat runtime. "Relasi" `hasMany` di fase statis cukup diwakili array (`fasilitas: string[]`).

### 11.5 Seeder → `src/data/*.ts`

```php
// LARAVEL — DatabaseSeeder.php
Paket::create(['nama' => 'Umrah Hemat', 'harga' => 35000000]);
```

```ts
// REACT — src/data/paket.ts
export const PAKET_UMRAH: Paket[] = [
  { id: 'umrah-1', nama: 'Umrah Hemat', harga: 35000000, ... },
]
```

Fase 1 tanpa database → "seeder"-nya ya file data statis ini. Saat fase ERP nanti, file ini tidak dihapus — halaman tinggal ganti sumber data dari import menjadi `fetch('/api/paket')`.

### 11.6 Ambil Data — Eloquent vs Import vs Fetch

```php
// LARAVEL — ambil dari DB
$pakets = Paket::where('jenis', 'umrah')->where('harga', '<', 50000000)->get();
```

```tsx
// REACT — FASE 1 (statis): import langsung, filter pakai JS
import { PAKET_UMRAH } from '../data/paket'

const murah = PAKET_UMRAH.filter(p => p.harga < 50000000)
```

```tsx
// REACT — FASE ERP (nanti): ambil dari API
const res = await fetch('/api/paket')
const pakets = await res.json()
```

Pola render-nya tetap sama: `.map()`:

```tsx
<div className="grid gap-6 md:grid-cols-3">
  {PAKET_UMRAH.map(paket => (
    <PaketCard key={paket.id} paket={paket} />
  ))}
</div>
```

### 11.7 Middleware → Layout & Route Guard

```php
// LARAVEL — middleware group: semua route di dalamnya kena cek auth dulu
Route::middleware(['auth'])->group(function () { ... });
```

```tsx
// REACT — layout route: semua halaman otomatis dapat Navbar + Footer
<Route element={<Layout />}>       {/* Layout punya <Outlet/> */}
  <Route path="/" element={<Home />} />
</Route>
```

Fase 1 tidak ada auth. Nanti fase ERP (admin panel), pola "guard"-nya jadi komponen pembungkus: `<ProtectedRoute>` yang cek token — kalau belum login, redirect ke halaman login. Sama konsepnya dengan middleware `auth`.

### 11.8 Blade → JSX

```blade
{{-- LARAVEL --}}
@extends('layout')
@section('content')
  @include('navbar')
  @if ($pakets->count() > 0)
    @foreach ($pakets as $paket)
      <p>{{ $paket->nama }}</p>
    @endforeach
  @endif
@endsection
```

```tsx
// REACT — komponen + JSX
<div>
  <Navbar />
  {PAKET_UMRAH.length > 0 && (
    PAKET_UMRAH.map(paket => <p key={paket.id}>{paket.nama}</p>)
  )}
</div>
```

| Blade | JSX |
|---|---|
| `@include('navbar')` | `<Navbar />` |
| `@extends('layout')` | `<Route element={<Layout />}>` + `<Outlet/>` |
| `@if (a) @endif` | `{a && ...}` |
| `@foreach ($x as $y)` | `{x.map(y => ...)}` |
| `{{ $var }}` | `{var}` |
| `@auth` / `@guest` | (fase ERP: `{isLogin ? ... : ...}`) |

Catatan: Blade pakai simbol `@`, JSX pakai kurung kurawal `{ }`. Dan di JSX, list wajib diberi `key` unik (di sini `key={paket.id}`) — itu cara React melacak tiap item.

### 11.9 Asset & Public Folder

**Laravel:** semua file di `public/` bisa diakses langsung via URL (`/img/logo.png`), plus aset versi Vite di `public/build/`.

**React (Vite): ada 2 cara, dan bedanya penting:**

```tsx
// 1) public/ — file ditaruh mentah, diakses via path root
//    public/brosur/brosur.pdf → <a href="/brosur/brosur.pdf">Download</a>
//    public/images/galeri/1.jpg → <img src="/images/galeri/1.jpg" />

// 2) src/assets/ — file di-import, diproses bundler
import logo from './assets/images/logo.svg'
<img src={logo} />
```

| | `public/` | `src/assets/` |
|---|---|---|
| Cara | taruh file, panggil `/nama` | `import` ke kode |
| Diproses bundler? | Tidak (mentah) | Ya (dikompres, di-hash) |
| Cache busting | Tidak | Ya (`logo-abc123.svg`) |
| Cocok untuk | brosur PDF, gambar galeri, favicon | logo, ikon yang dipakai komponen |

CSS juga lewat bundler: `src/index.css` (Tailwind) → hasil akhir `dist/assets/index-xxx.css` — persis seperti `build/assets/app-xxx.css` di Laravel.

### 11.10 `.env` → `import.meta.env`

```php
// LARAVEL
$wa = env('WA_PHONE');          // dibaca di server, aman
```

```ts
// REACT — wajib prefix VITE_ agar terekspos ke client
// .env  →  VITE_WA_PHONE=6281234567890
const wa = import.meta.env.VITE_WA_PHONE
```

**PENTING:** semua kode JS React dikirim ke browser. Jadi **jangan pernah taruh rahasia** (DB password, API key server) di `.env` Vite — hanya untuk hal yang memang boleh dilihat publik (nomor WA, URL, kunci Google Maps). Fase 1 kita bahkan tidak butuh `.env` — cukup `src/data/kontak.ts`.

### 11.11 Artisan → npm scripts

| Laravel | React |
|---|---|
| `php artisan serve` | `npm run dev` |
| `composer install` | `npm install` |
| `php artisan migrate` | (tidak ada — ganti: ubah `interface`/type) |
| `php artisan db:seed` | (tidak ada — ganti: isi `src/data/*.ts`) |
| `php artisan route:list` | lihat `App.tsx` (peta route) |
| `php artisan view:cache` | `npm run build` |
| `php artisan config:cache` | — |

### 11.12 Route Param — `/paket/{id}` vs `/paket/:id`

```php
// LARAVEL
Route::get('/paket/{id}', [PaketController::class, 'show']);
// $id = request route
```

```tsx
// REACT — nanti saat bikin halaman detail paket
<Route path="/paket/:id" element={<DetailPaket />} />

// di komponen:
import { useParams } from 'react-router-dom'
function DetailPaket() {
  const { id } = useParams()   // ambil dari URL, mirip route param Laravel
  return <p>Paket ID: {id}</p>
}
```

### 11.13 Yang TIDAK Ada Padanannya (penting!)

1. **SEO per halaman** — SPA render di browser, jadi meta `title`/`description` per halaman perlu library tambahan (mis. react-helmet-async) atau pendekatan prerender. Masuk roadmap kita.
2. **CSRF token** — tidak ada form server-side; nanti API pakai token sendiri (JWT/Bearer).
3. **Session server** — tidak ada; auth fase ERP via token di `localStorage`.
4. **Keamanan di server** — semua logika jalan di browser pengguna, jadi "sumber kebenaran" & validasi final harus tetap di API/server nanti.

### 11.14 Satu Alur Data Lengkap (contoh nyata: tampilkan paket umrah)

```
LARAVEL:
1. Request /paket-umrah        → web.php → PaketController@index
2. $pakets = Paket::where('jenis','umrah')->get()   ← ambil dari DB
3. return view('paket.index', ['pakets' => $pakets])
4. Blade @foreach → HTML jadi → kirim ke browser

REACT (fase 1):
1. Browser load app → App.tsx lihat URL /paket-umrah → render <PaketUmrah/>
2. import { PAKET_UMRAH } from '../data/paket'        ← "seeder"
3. PAKET_UMRAH.filter(...) kalau perlu filter
4. PAKET_UMRAH.map(paket => <PaketCard/>) → JSX dirender di browser

REACT (fase ERP — nanti):
2'. const res = await fetch('/api/paket'); const pakets = await res.json()
    ← ganti import dengan request API, sisanya sama persis
```

Itulah kenapa arsitektur fase 1 ini bagus: **saat upgrade ke ERP, halaman tidak perlu ditulis ulang** — cukup ganti sumber data (import → fetch), karena tampilan (JSX) dan data sudah terpisah sejak awal.

## Referensi Resmi

- React: https://react.dev/learn
- Vite: https://vite.dev/guide/
- Tailwind v4: https://tailwindcss.com/docs
- React Router: https://reactrouter.com/
- TypeScript: https://www.typescriptlang.org/docs/
