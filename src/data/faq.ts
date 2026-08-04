/**
 * Data FAQ — pertanyaan yang sering diajukan (knowledge base chatbot + halaman FAQ)
 * Kategori: Pendaftaran | Visa & Dokumen | Harga & Pembayaran | Keberangkatan | Umum
 * DRAFT konten — review/edit oleh pemilik (DOKUMEN-INTERNAL: PERENCANAAN-CHATBOT).
 */
export interface FaqItem {
  id: string
  pertanyaan: string
  jawaban: string
  kategori?: string // contoh: "Pendaftaran", "Visa", "Pembayaran"
}

export const FAQ: FaqItem[] = [
  // ===== Pendaftaran =====
  {
    id: 'f1',
    pertanyaan: 'Bagaimana cara mendaftar paket umrah/haji?',
    jawaban:
      'Cukup isi form pendaftaran di halaman Pendaftaran (klik tombol "Daftar Sekarang"), atau hubungi admin kami via WhatsApp di 0821-3582-0366. Setelah data diterima, admin akan menghubungi Anda untuk konfirmasi kuota dan proses selanjutnya.',
    kategori: 'Pendaftaran',
  },
  {
    id: 'f2',
    pertanyaan: 'Berapa lama proses pendaftaran sampai lunas?',
    jawaban:
      'Setelah mengirim formulir, admin akan menghubungi Anda dalam 1x24 jam untuk konfirmasi. Pelunasan biasanya dilakukan maksimal H-30 sebelum keberangkatan, namun bisa diatur lebih awal sesuai kesepakatan.',
    kategori: 'Pendaftaran',
  },
  {
    id: 'f3',
    pertanyaan: 'Apakah ada batas usia untuk mendaftar?',
    jawaban:
      'Umumnya peserta berusia minimal 17 tahun dan maksimal 80 tahun (kebijakan maskapai & visa). Peserta di atas 70 tahun perlu surat keterangan sehat dari dokter. Untuk kondisi khusus, silakan konsultasikan dengan admin.',
    kategori: 'Pendaftaran',
  },
  {
    id: 'f4',
    pertanyaan: 'Apakah bisa mendaftar tanpa paspor?',
    jawaban:
      'Bisa — Anda tetap dapat mengisi form pendaftaran terlebih dahulu. Paspor diperlukan saat pengurusan visa, dan admin akan membantu prosesnya. Pastikan paspor masih berlaku minimal 8 bulan sebelum keberangkatan.',
    kategori: 'Pendaftaran',
  },

  // ===== Visa & Dokumen =====
  {
    id: 'f5',
    pertanyaan: 'Apa saja dokumen yang diperlukan?',
    jawaban:
      'Dokumen utama: paspor (berlaku min. 8 bulan), foto berwarna latar putih (ukuran visa), KTP, buku nikah (jika berangkat berdua suami-istri), dan akta lahir untuk anak. Tim kami akan memberikan checklist lengkap setelah pendaftaran.',
    kategori: 'Visa & Dokumen',
  },
  {
    id: 'f6',
    pertanyaan: 'Apakah visa umrah diurus oleh travel?',
    jawaban:
      'Ya, visa umrah diurus sepenuhnya oleh Ebitour melalui sistem Nusuk/operator resmi. Anda hanya perlu melengkapi dokumen, sisanya kami yang proses. Biaya visa sudah termasuk dalam paket.',
    kategori: 'Visa & Dokumen',
  },
  {
    id: 'f7',
    pertanyaan: 'Apakah perlu vaksin meningitis?',
    jawaban:
      'Ya, vaksin meningitis (Meningococcal ACWY) wajib bagi jamaah umrah dan haji, minimal 10 hari sebelum keberangkatan, dan dibuktikan dengan sertifikat vaksinasi internasional (buku kuning).',
    kategori: 'Visa & Dokumen',
  },
  {
    id: 'f8',
    pertanyaan: 'Bagaimana jika dokumen tidak lengkap?',
    jawaban:
      'Tim admin akan mendampingi Anda melengkapi dokumen. Jika ada kendala (misal paspor habis masa berlaku), kami sarankan segera mengurusnya karena pengurusan visa membutuhkan waktu.',
    kategori: 'Visa & Dokumen',
  },

  // ===== Harga & Pembayaran =====
  {
    id: 'f9',
    pertanyaan: 'Berapa harga paket umrah?',
    jawaban:
      'Harga paket umrah kami mulai dari Rp30,5 juta/pax (kamar Quad). Harga tergantung paket (Hemat/Reguler/Premium) dan pilihan kamar (Quad/Triple/Double). Lihat detail di halaman Paket Umrah, atau tanyakan di chat ini — kami bantu pilihkan sesuai budget Anda.',
    kategori: 'Harga & Pembayaran',
  },
  {
    id: 'f10',
    pertanyaan: 'Berapa DP / uang muka yang harus dibayar?',
    jawaban:
      'DP umumnya sekitar Rp15 juta (atau sesuai ketentuan paket) untuk mengunci kuota & tanggal keberangkatan. Sisanya dicicil hingga pelunasan sebelum keberangkatan. Skema cicilan fleksibel — konsultasikan dengan admin.',
    kategori: 'Harga & Pembayaran',
  },
  {
    id: 'f11',
    pertanyaan: 'Apakah harga bisa dicicil?',
    jawaban:
      'Bisa. Setelah DP, sisa biaya dapat dicicil dengan jadwal yang disepakati (misal per bulan). Semakin awal mendaftar, semakin ringan cicilannya. Silakan tanya admin untuk simulasi cicilan.',
    kategori: 'Harga & Pembayaran',
  },
  {
    id: 'f12',
    pertanyaan: 'Metode pembayaran apa saja yang tersedia?',
    jawaban:
      'Pembayaran melalui transfer bank atas nama resmi Ebitour (rekening akan diberikan admin setelah pendaftaran), atau tunai di kantor. Selalu konfirmasi ke admin setelah transfer.',
    kategori: 'Harga & Pembayaran',
  },
  {
    id: 'f13',
    pertanyaan: 'Apa saja yang sudah termasuk dalam harga paket?',
    jawaban:
      'Tiket pesawat PP, visa, akomodasi hotel (sesuai pilihan kamar), makan selama di Tanah Suci, transportasi lokal, bimbingan ibadah oleh muthawif, serta perlengkapan jamaah. Rincian lengkap ada di halaman detail paket (menu Fasilitas).',
    kategori: 'Harga & Pembayaran',
  },

  // ===== Keberangkatan =====
  {
    id: 'f14',
    pertanyaan: 'Kapan jadwal keberangkatan berikutnya?',
    jawaban:
      'Jadwal keberangkatan rutin tiap bulan (lihat halaman Paket Umrah/Haji untuk tanggal & sisa kuota). Keberangkatan umrah saat ini tersedia mulai November 2026, haji reguler April 2027. Sisa kursi terbatas — segera daftar untuk mengunci tanggal.',
    kategori: 'Keberangkatan',
  },
  {
    id: 'f15',
    pertanyaan: 'Dari bandara mana keberangkatan?',
    jawaban:
      'Keberangkatan utama dari Soekarno-Hatta (CGK), dengan opsi Kertajati (KJT) dan Juanda (SUB). Untuk jamaah di luar kota, tersedia tambahan tiket domestik (Solo, Semarang, Yogyakarta) dengan biaya tambahan sesuai pilihan.',
    kategori: 'Keberangkatan',
  },
  {
    id: 'f16',
    pertanyaan: 'Berapa lama durasi perjalanan umrah?',
    jawaban:
      'Program umrah kami tersedia 9 hari dan 12 hari. Program 12 hari memberi waktu lebih lama di Madinah dan Makkah. Anda bisa memilih sesuai kenyamanan dan budget.',
    kategori: 'Keberangkatan',
  },
  {
    id: 'f17',
    pertanyaan: 'Berapa batas bagasi?',
    jawaban:
      'Umumnya 30 kg check-in + 7 kg kabin sesuai maskapai. Bawalah perlengkapan ihram, obat pribadi, dan dokumen penting. Daftar perlengkapan lengkap dibagikan saat manasik.',
    kategori: 'Keberangkatan',
  },

  // ===== Umum =====
  {
    id: 'f18',
    pertanyaan: 'Apakah ada bimbingan manasik sebelum berangkat?',
    jawaban:
      'Ya. Kami mengadakan manasik (bimbingan ibadah) sebelum keberangkatan, mencakup tata cara umrah, doa-doa, dan informasi perjalanan. Manasik bisa diikuti di kantor atau secara online.',
    kategori: 'Umum',
  },
  {
    id: 'f19',
    pertanyaan: 'Apakah ada pendamping/pembimbing selama di Tanah Suci?',
    jawaban:
      'Setiap rombongan didampingi muthawif/pembimbing berpengalaman yang mendampingi ibadah dan mengurus kebutuhan jamaah selama di Makkah & Madinah.',
    kategori: 'Umum',
  },
  {
    id: 'f20',
    pertanyaan: 'Bagaimana kebijakan pembatalan?',
    jawaban:
      'Pembatalan dikenakan biaya sesuai tahap (makin dekat keberangkatan, makin besar). Untuk jadwal, DP, dan kebijakan reschedule, silakan baca Syarat & Ketentuan di halaman paket atau tanyakan ke admin.',
    kategori: 'Umum',
  },
]
