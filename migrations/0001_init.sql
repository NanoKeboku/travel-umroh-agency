-- Migration 0001: skema awal — Paket, Jadwal, Tambahan Pesawat, Promo
-- Sesuai FITUR-PENCARIAN-TIKET.md: Paket 1--N Jadwal, Paket N--N Promo.

-- Tabel PAKET (produk tetap)
CREATE TABLE paket (
  id            TEXT PRIMARY KEY,             -- slug, mis. 'umrah-hemat'
  jenis         TEXT NOT NULL,                -- 'umrah' | 'haji'
  kategori      TEXT NOT NULL,                -- 'Hemat' | 'Reguler' | 'Premium' | ...
  nama          TEXT NOT NULL,
  harga         INTEGER NOT NULL,             -- harga base per pax
  harga_quad    INTEGER,                      -- per pax kamar Quad
  harga_triple  INTEGER,                      -- per pax kamar Triple
  harga_double  INTEGER,                      -- per pax kamar Double
  dp_per_pax    INTEGER,                      -- uang muka
  durasi        TEXT NOT NULL,                -- '9 Hari'
  durasi_list   TEXT,                         -- JSON array: ['9 Hari','12 Hari']
  jadwal        TEXT NOT NULL,                -- bulan utama, 'November 2026'
  maskapai      TEXT NOT NULL,
  hotel         TEXT NOT NULL,
  bandara       TEXT,                         -- JSON array
  fasilitas     TEXT NOT NULL,                -- JSON array
  persyaratan   TEXT NOT NULL,                -- JSON array
  itinerary     TEXT,                         -- JSON array [{hari,rute,deskripsi}]
  penerbangan   TEXT,                         -- JSON {keberangkatan:[],kepulangan:[]}
  sk            TEXT,                         -- JSON array (syarat & ketentuan)
  brosur_url    TEXT,
  gambar        TEXT NOT NULL,
  created_at    TEXT DEFAULT (datetime('now')),
  updated_at    TEXT DEFAULT (datetime('now'))
);

-- Tabel JADWAL (keberangkatan) — kunci pencarian tanggal
CREATE TABLE jadwal (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  paket_id      TEXT NOT NULL REFERENCES paket(id) ON DELETE CASCADE,
  tanggal       TEXT NOT NULL,                -- '5 November 2026'
  sisa_kuota    INTEGER NOT NULL DEFAULT 0,
  harga_quad    INTEGER,
  harga_triple  INTEGER,
  harga_double  INTEGER,
  UNIQUE (paket_id, tanggal)
);

-- Tabel TAMBAHAN_PESAWAT (add-on tiket domestik)
CREATE TABLE tambahan_pesawat (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  paket_id      TEXT NOT NULL REFERENCES paket(id) ON DELETE CASCADE,
  label         TEXT NOT NULL,
  harga         INTEGER NOT NULL DEFAULT 0
);

-- Tabel PROMO (fase berikutnya — struktur sudah siap)
CREATE TABLE promo (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  paket_id      TEXT REFERENCES paket(id) ON DELETE CASCADE,  -- NULL = global
  nama          TEXT NOT NULL,
  tipe          TEXT NOT NULL,                -- 'potongan' | 'persen' | 'early-bird'
  nilai         INTEGER NOT NULL,             -- nominal / persen
  mulai         TEXT NOT NULL,                -- '2026-08-01'
  selesai       TEXT NOT NULL,
  kuota         INTEGER,                      -- NULL = tanpa batas
  aktif         INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX idx_jadwal_paket ON jadwal (paket_id);
CREATE INDEX idx_jadwal_tanggal ON jadwal (tanggal);
CREATE INDEX idx_promo_paket ON promo (paket_id);
