-- Migration 0004: perluas tabel pendaftaran untuk form tiket pemesanan
-- Form tiket (PesanPaketForm di PaketDetail) menyimpan detail pilihan user:
-- kamar (key hargaQuad/hargaTriple/hargaDouble), bandara, program hari,
-- tambahan tiket domestik, total harga, plus detail_json (audit trail).
ALTER TABLE pendaftaran ADD COLUMN kamar_type TEXT;
ALTER TABLE pendaftaran ADD COLUMN bandara TEXT;
ALTER TABLE pendaftaran ADD COLUMN program_hari TEXT;
ALTER TABLE pendaftaran ADD COLUMN tambahan_domestik TEXT;
ALTER TABLE pendaftaran ADD COLUMN tambahan_harga INTEGER;
ALTER TABLE pendaftaran ADD COLUMN total_harga INTEGER;
ALTER TABLE pendaftaran ADD COLUMN detail_json TEXT;
