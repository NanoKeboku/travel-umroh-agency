-- Migration 0005: tabel chat_leads — calon jamaah yang tertangkap dari chatbot
-- Ketika bot tidak bisa menjawab / user ingin daftar, bot mengumpulkan nama + WA,
-- disimpan di sini, lalu admin dapat notifikasi via Fonnte.
CREATE TABLE IF NOT EXISTS chat_leads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  nama        TEXT NOT NULL,
  whatsapp    TEXT NOT NULL,
  pesan       TEXT,                          -- konteks pesan user terakhir
  status      TEXT NOT NULL DEFAULT 'baru',  -- baru | dihubungi | terkonfirmasi | batal
  created_at  TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_chat_leads_created ON chat_leads (created_at);
CREATE INDEX IF NOT EXISTS idx_chat_leads_status ON chat_leads (status);
