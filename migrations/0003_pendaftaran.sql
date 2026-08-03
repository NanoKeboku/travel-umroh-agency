-- Migration 0003: tabel pendaftaran jamaah
-- Menyimpan form pendaftaran dari halaman /pendaftaran.
CREATE TABLE IF NOT EXISTS pendaftaran (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  paket_id    TEXT NOT NULL,
  paket_nama  TEXT NOT NULL,
  tanggal     TEXT NOT NULL,
  nama        TEXT NOT NULL,
  whatsapp    TEXT NOT NULL,
  alamat      TEXT,
  jumlah_pax  INTEGER NOT NULL DEFAULT 1,
  perkiraan_harga INTEGER,
  status      TEXT NOT NULL DEFAULT 'baru',  -- baru | dihubungi | terkonfirmasi | batal
  created_at  TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_pendaftaran_status ON pendaftaran (status);
CREATE INDEX IF NOT EXISTS idx_pendaftaran_created ON pendaftaran (created_at);
