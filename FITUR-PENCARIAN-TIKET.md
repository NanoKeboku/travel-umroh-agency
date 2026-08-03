# Fitur Pencarian Tiket Umroh — Catatan Pengembangan

**Travel Umrah Ebitour Purworejo**

Dokumen ini mencatat kebutuhan teknis fitur pencarian tiket/paket umroh
(ambil tanggal keberangkatan, cari promo, cari jenis paket, dsb) sebagai
acuan pengembangan fase 2 dan seterusnya.

---

## 0. Insight Utama (Jangan Dilewatkan)

> **"Pencarian tanggal keberangkatan" itu bukan filter PAKET, tapi filter JADWAL.**

Satu paket umroh punya banyak jadwal (berangkat tiap bulan, harga beda-beda).
Karena itu struktur data WAJIB memisahkan 2 entitas ber-relasi:

- **Paket** = produk tetap (nama, jenis, fasilitas, hotel, itinerary)
- **Jadwal** = satu keberangkatan spesifik (tanggal, harga, sisa kuota)

Jangan pernah menggabungkan keduanya dalam satu entitas, nanti susah
dikembangkan (harga beda per tanggal, promo per jadwal, kuota per jadwal).

---

## 1. Struktur Data

### Tabel PAKET

| Field | Keterangan |
|---|---|
| id, nama, slug | identitas paket |
| jenis | reguler / vip / furoda / khusus / hemat |
| durasi_hari | 9 / 12 / 14 dst |
| hotel_mekkah | nama + bintang |
| hotel_madinah | nama + bintang |
| maskapai | maskapai default |
| fasilitas | list |
| itinerary | list per hari |
| foto / galeri | gambar |
| deskripsi & highlight | teks promosi |

### Tabel JADWAL (relasi `hasMany` Paket) — KUNCI PENCARIAN

| Field | Keterangan |
|---|---|
| paket_id | foreign key ke Paket |
| tanggal_berangkat | tanggal keberangkatan |
| harga | harga per jamaah (base) |
| harga_quad / harga_triple / harga_double | varian harga per jenis kamar (lihat 3b) |
| sisa_kuota | jumlah kursi tersisa |
| maskapai & jam terbang | bisa beda per jadwal |

### Tabel PROMO

| Field | Keterangan |
|---|---|
| nama promo | misal "Early Bird Ramadan" |
| tipe | potongan tetap / persen / early-bird |
| periode berlaku | mulai - selesai |
| kuota_promo | batas kursi |
| syarat | misal daftar 3 bulan sebelum berangkat |

Relasi: Paket `1--N` Jadwal, Paket/Promo relasi banyak-ke-banyak
(atau Promo per jadwal, tergantung model bisnisnya).

---

## 2. API / Backend (Fase 2: Cloudflare Workers + D1)

D1 = SQLite, cocok untuk relasi di atas. Endpoint yang dibutuhkan:

```
GET /api/paket
    filter : jenis, durasi, budget min-max, bintang hotel, maskapai
    sort   : harga termurah, tanggal terdekat, populer
    pagination

GET /api/paket?bulan=2026-09
    → join JADWAL, tampilkan paket yang PUNYA jadwal di bulan itu
    (ini fitur "pilih bulan keberangkatan")

GET /api/jadwal?paket=<slug>
    → daftar semua tanggal berangkat + harga + sisa kuota paket itu
    (untuk tabel di halaman detail)

GET /api/promo
    → hanya promo yang statusnya AKTIF hari ini

GET /api/paket/<slug>
    → detail paket lengkap + jadwalnya
```

**Aturan penting:** harga promo dihitung di SERVER (backend), jangan
hardcode di frontend. Biar konsisten di semua tempat (listing, detail,
kartu promo).

---

## 3. Frontend (Bisa Disiapkan SEJAK Fase 1, Statis, Tanpa Backend)

### a. Widget Pencarian di Beranda
- Dropdown bulan keberangkatan (sumber: data jadwal)
- Pilihan jenis paket
- Tombol "Cari" → navigasi ke halaman hasil
- Bisa dibangun sekarang dengan data dummy, tanpa API.

### b. Halaman Daftar Paket (Listing)
- Kartu paket: foto, nama, jenis, durasi, harga, badge promo
- Filter sidebar: jenis, range harga, bulan, bintang hotel, "hanya promo"
- Sorting + pagination
- Harga promo tampil dicoret + harga baru

### c. Halaman Detail Paket
- Galeri, fasilitas, hotel, itinerary
- **Tabel jadwal**: tanggal, maskapai, harga, sisa kuota
- Tombol "Pesan" per jadwal

### d. Indikator Kuota
- "Sisa 5 kursi", "Hampir penuh" — efek FOMO standar agen umroh, effort kecil.

### e. Empty State
- "Tidak ada jadwal di bulan Juni" + saran bulan lain.
- Jangan sampai user mentok tanpa arahan.

---

## 3b. Halaman Detail Paket — Blueprint dari Referensi (Hisar Global Indonesia)

Dari halaman detail kompetitor (Hisar Global Indonesia), ini urutan blok
konten yang terbukti dipakai di industri. Urutan = rekomendasi implementasi.

### Alur klik
```
Listing / hasil pencarian
  → klik kartu tiket → halaman detail paket
  → tombol "Daftar Sekarang" / "Pesan Sekarang"
  → form lead capture → kirim ke admin (WhatsApp/Fonnte)
```

### 1. Header Program
- Rating program (mis. ⭐⭐⭐⭐⭐)
- Judul: `[TANGGAL BERANGKAT] - [NAMA PROGRAM] [DURASI HARI]`
  contoh: "23 SEPTEMBER 2026 - UMROH SUPER HEMAT 9 HARI"
- CTA samping: **"Hubungi Kami"** → WA admin

### 2. Akomodasi Mekkah
- Nama hotel + bintang (mis. Razana Hotel ⭐⭐⭐⭐)
- Foto hotel
- Fitur: "24 Jam Shuttle Bus", "Sarapan, Makan Siang dan Makan Malam"

### 3. Akomodasi Madinah
- Nama hotel + bintang (mis. Maien Taiba ⭐⭐⭐⭐)
- Foto hotel
- Fitur: "50 Meter ke Masjid Nabawi", makan 3x sehari

### 4. Blurb Bimbingan
- "Dibimbing pemandu berpengalaman & profesional + headset panduan"
- "Tawaf minimal 3x termasuk Tawaf Wada"
- "Tim 24 jam di Mekkah & Madinah"

### 5. Form Lead Capture "Ambil Promo" ⭐ (penting)
- **Nama Lengkap**
- **Rencana Keberangkatan** (dropdown bulan)
- **WhatsApp Aktif** (nomor)
- Tombol submit → notifikasi ke admin (pakai Fonnte)
- Tujuan: minta potongan tambahan, admin yang follow-up
  (sesuai model bisnis: bukan transaksi online langsung)

### 6. Harga per Jenis Kamar
- Tabel: QUAD / TRIPLE / DOUBLE → Rp 29.5 Jt / Rp 29.9 Jt / Rp 30.9 Jt
- Label "Harga Mulai" = harga terendah (dipakai di kartu listing)

### 7. Deskripsi Program
- Judul lengkap program (mis. "UMROH SUPER HEMAT PROGRAM 9 HARI")
- 2-4 paragraf promosi naratif
- Tombol "Baca lebih banyak" (collapse)

### 8. Spesial Program (chips/badge fitur)
Umroh 3x Dibimbing · Manasik 3x · Perlengkapan Exclusive · Bus Terbaik ·
Full Pelayanan Handling · Tahajud & Ceramah · Kajian Islam · City Tour
Madinah/Mekkah/Thaif · Ziarah Kebun Kurma · DLL

### 9. Informasi Penerbangan (tabel)
Dua tabel: **Keberangkatan** & **Kepulangan**
- Kolom: Penerbangan (kode), Pergi (jam + bandara), Tiba (jam + bandara), Tanggal
- Contoh format rute:
  ```
  23 Sep 2026   WY 850   14:50 CGK → 19:30 MCT
                WY 673   19:30 MCT → 00:10 JED
  ```

### 10. Fasilitas Termasuk (list centang)
Maskapai · Hotel Mekkah & Madinah · Bagasi · Handling Bandara · Muthawwif
Hafidz Qur'an & Tour Leader · Pelayanan Kesehatan · Makan Fullboard 3x ·
Snack Exclusive · Transportasi & Akomodasi · Asuransi Perjalanan ·
Bimbingan 24 Jam · Air Zamzam 5 Liter · Sertifikat Umroh

### 11. Harga Belum Termasuk (list)
Transportasi di luar program · Keterlambatan pesawat (akibat jamaah) ·
Pembuatan/perubahan/perpanjangan paspor · Pengeluaran pribadi
(tipping, optional tour, kelebihan bagasi)

### 12. Disclaimer
> Note: Harga / Jadwal / Fasilitas sewaktu-waktu dapat berubah tanpa
> mengurangi nilai ibadah

### 13. Rencana Perjalanan (Itinerary)
- Timeline per hari + tombol "Print Perjalanan"
- (fase 1 cukup daftar hari; ekspor PDF bisa menyusul)

### 14. Perlengkapan Umroh Premium
- Foto/daftar perlengkapan yang dibawa jamaah (bagian ini juga dicatat
  sebagai konten aset yang perlu disiapkan)

### 15. CTA Penutup
- Tombol **"Daftar Sekarang"** → scroll/formulir → form lead capture

---

## 4. Alur Pemesanan (Booking)

Standar agen umroh Indonesia: **BUKAN bayar online di tahap awal.**

1. Pilih jadwal
2. Form: nama, no WhatsApp, jumlah jamaah
3. Kirim ke admin via WhatsApp → admin konfirmasi kuota & DP
4. Transfer manual

**Catatan:** Sudah ada akses Fonnte (dari proyek FlowOS) — form pemesanan
bisa kirim notifikasi WA ke admin pakai itu. Upgrade berikutnya: payment
gateway (Midtrans/Xendit) untuk DP online.

---

## 5. SEO & Performa

- URL filter-friendly: `/paket?bulan=2026-09&jenis=reguler`
- Schema.org `Product` + `Offer` → rich result di Google
- Halaman paket di-pre-render saat build (SSG) — **penting**: traffic
  umroh mayoritas dari Google, bukan dari pencarian di web sendiri
- Sitemap + canonical

---

## 6. Admin (Fase Lanjut)

- CRUD paket + jadwal + promo
- Kuota berkurang otomatis saat pemesanan
- Dashboard pemesanan masuk

---

## 7. Skala Bertahap untuk Proyek Ini

**Fase 1 (sekarang):** data paket cukup sebagai JSON/TS di repo. Listing
& detail di-generate dari data itu saat build. Filter & pencarian jalan
client-side — cukup selama jumlah paket < 100. Widget pencarian &
halaman listing bisa dibuat SEKARANG dengan data dummy, nanti tinggal
ganti sumber datanya ke API tanpa rombak UI.

**Fase 2:** pindah data ke D1 + Workers API, admin CRUD, kuota realtime.

---

*Dokumen ini bagian dari catatan pengembangan travel-umroh-agency.*
