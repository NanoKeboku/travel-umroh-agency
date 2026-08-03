/**
 * Data paket umrah & haji
 * CATATAN: data DUMMY — ganti dengan data asli Ebitour.
 * Gambar sementara pakai link Wikimedia Commons (ganti dengan foto asli nanti).
 *
 * Struktur mengikuti DOKUMEN-INTERNAL:
 * - Paket (produk) → keberangkatan (jadwal: tanggal + kuota + harga per kamar)
 * - durasiList / bandara / tambahanPesawat = pilihan yang tersedia di tiket
 */

export interface JadwalUmrah {
  tanggal: string
  sisaKuota: number
  hargaQuad?: number
  hargaTriple?: number
  hargaDouble?: number
}

export interface TambahanPesawat {
  label: string
  harga: number
}

export interface PenerbanganLeg {
  kode: string
  tanggal: string
  pergi: string // contoh: "09:00 CGK"
  tiba: string // contoh: "14:35 MED"
}

export interface PenerbanganInfo {
  keberangkatan: PenerbanganLeg[]
  kepulangan: PenerbanganLeg[]
}

export interface ItineraryHari {
  hari: number
  rute: string
  deskripsi: string
}

export interface Paket {
  id: string
  jenis: 'umrah' | 'haji'
  kategori: string // jenis paket: 'Hemat' | 'Reguler' | 'Premium' | 'VIP' | 'Furoda'
  nama: string
  harga: number
  hargaQuad?: number // per pax kamar Quad (4 orang)
  hargaTriple?: number // per pax kamar Triple (3 orang)
  hargaDouble?: number // per pax kamar Double (2 orang)
  dpPerPax?: number // uang muka per pax
  durasi: string // contoh: "9 Hari"
  durasiList?: string[] // pilihan program hari yang tersedia
  jadwal: string // bulan jadwal utama (contoh: "Desember 2026")
  maskapai: string
  hotel: string
  bandara?: string[] // pilihan bandara keberangkatan
  keberangkatan?: JadwalUmrah[] // daftar jadwal + kuota + harga per kamar
  tambahanPesawat?: TambahanPesawat[] // add-on tiket pesawat domestik
  fasilitas: string[]
  persyaratan: string[]
  itinerary?: ItineraryHari[]
  penerbangan?: PenerbanganInfo
  sk?: string[] // syarat & ketentuan
  brosurUrl?: string // path PDF di public/brosur/
  gambar: string
}

/* ============================================================
   Data bersama (dummy)
   ============================================================ */

/** Pilihan bandara keberangkatan (dummy) */
const BANDARA = ['Soekarno-Hatta (CGK)', 'Kertajati (KJT)', 'Juanda (SUB)']

/** Pilihan tambahan tiket pesawat domestik (dummy) */
const TAMBAHAN_PESAWAT: TambahanPesawat[] = [
  { label: 'Tanpa Tiket Domestik', harga: 0 },
  { label: 'Lion Air — Solo (SOC) PP', harga: 1500000 },
  { label: 'Citilink — Semarang (SRG) PP', harga: 1400000 },
  { label: 'Batik Air — Yogyakarta (YIA) PP', harga: 1800000 },
]

/** Syarat & ketentuan umum (dummy — sesuaikan dengan legal Ebitour) */
const SK_UMUM = [
  'Pembatalan H-20 sebelum keberangkatan dikenakan penalti Rp 25.000.000',
  'Penjadwalan ulang hanya dapat dilakukan H-30 dengan biaya tambahan Rp 4.000.000',
  'Aturan Nusuk: 1 paspor = 1 bed/ranjang (tidak berlaku sharing bed)',
  'Ketentuan pengembalian dana dapat berubah sewaktu-waktu',
  'Program & jadwal dapat berubah mengikuti regulasi pemerintah',
  'Harga belum termasuk paspor, vaksin, dan pengeluaran pribadi',
]

/** Persyaratan peserta (dummy) */
const SYARAT_UMUM = [
  'Paspor asli berlaku minimal 8 bulan & nama minimal 2 kata',
  'Scan e-KTP yang masih berlaku',
  'Scan kartu keluarga',
  'Pas foto 4x6, berwarna, background putih (80% wajah, 20% badan)',
  'Buku kuning vaksin Meningitis (E-ICV) & Polio (E-IPV)',
  'DP Rp 15.000.000 per pax',
  'Pelunasan maksimal 2 minggu sebelum keberangkatan',
  'Semua dokumen diserahkan maksimal H-20',
  'Jamaah risiko tinggi wajib didampingi keluarga saat berangkat',
]

/* ============================================================
   Paket Umrah
   ============================================================ */

export const PAKET_UMRAH: Paket[] = [
  {
    id: 'umrah-hemat',
    jenis: 'umrah',
    kategori: 'Hemat',
    nama: 'Paket Umrah Hemat',
    harga: 32500000,
    hargaQuad: 30500000,
    hargaTriple: 31500000,
    hargaDouble: 32500000,
    dpPerPax: 15000000,
    durasi: '9 Hari',
    durasiList: ['9 Hari', '12 Hari'],
    jadwal: 'November 2026',
    maskapai: 'Lion Air',
    hotel: 'Makkah: 500m Haram • Madinah: 400m Nabawi',
    bandara: BANDARA,
    keberangkatan: [
      { tanggal: '5 November 2026', sisaKuota: 8, hargaQuad: 30500000, hargaTriple: 31500000, hargaDouble: 32500000 },
      { tanggal: '19 November 2026', sisaKuota: 15, hargaQuad: 30500000, hargaTriple: 31500000, hargaDouble: 32500000 },
      { tanggal: '3 Desember 2026', sisaKuota: 4, hargaQuad: 30500000, hargaTriple: 31500000, hargaDouble: 32500000 },
    ],
    tambahanPesawat: TAMBAHAN_PESAWAT,
    fasilitas: [
      'Tiket pesawat PP',
      'Visa umrah',
      'Hotel bintang 4',
      'Konsumsi 3x sehari',
      'Transportasi bus AC',
      'Manasik & bimbingan ibadah',
      'Muthawif & tour leader berpengalaman',
      'Headset panduan umroh & ziarah',
      'Perlengkapan: koper, tas paspor, kain ihrom/mukena',
      'Air zamzam 5 liter',
      'Asuransi perjalanan',
      'Bimbingan ibadah 24 jam',
    ],
    persyaratan: SYARAT_UMUM,
    itinerary: [
      { hari: 1, rute: 'JAKARTA – MADINAH', deskripsi: 'Berkumpul di bandara, boarding & penerbangan menuju Madinah. Setibanya di Madinah: imigrasi, bagasi, check-in hotel, lalu memperbanyak ibadah di Masjid Nabawi.' },
      { hari: 2, rute: 'MADINAH', deskripsi: 'Orientasi Masjid Nabawi, kunjungan Raudhah, makam Nabi Muhammad SAW, makam Abu Bakar RA & Umar bin Khattab RA, dan Pemakaman Baqi.' },
      { hari: 3, rute: 'MADINAH', deskripsi: 'Ziarah kota Madinah: Masjid Quba, Kebun Kurma, Jabal Uhud, Masjid Qiblatain, dan Parit Khandak.' },
      { hari: 4, rute: 'MADINAH – MAKKAH', deskripsi: 'Check-out hotel, menuju stasiun Kereta Cepat Haramain, perjalanan ke Makkah (±2,5 jam) sambil mengambil miqot. Check-in hotel lalu melaksanakan umrah (thawaf, sai, tahallul).' },
      { hari: 5, rute: 'MAKKAH', deskripsi: 'Shalat Jumat & memperbanyak ibadah di Masjidil Haram.' },
      { hari: 6, rute: 'MAKKAH', deskripsi: 'Ziarah tempat bersejarah: Jabal Tsur, Jabal Rahmah, Arafah, Muzdalifah, Mina, Miqot Ji\'ranah, dan Jabal Nur (bagi yang menghendaki umrah tambahan).' },
      { hari: 7, rute: 'MAKKAH', deskripsi: 'Ibadah bebas di Masjidil Haram.' },
      { hari: 8, rute: 'MAKKAH – JEDDAH – JAKARTA', deskripsi: 'Thawaf wada, check-out hotel, city tour Jeddah (Masjid Qisas & Corniche Centre), lalu penerbangan kembali ke tanah air.' },
      { hari: 9, rute: 'JAKARTA', deskripsi: 'Tiba di Jakarta. Rangkaian ibadah umrah selesai — semoga menjadi umrah yang mabrur.' },
    ],
    penerbangan: {
      keberangkatan: [{ kode: 'JT 056', tanggal: '5 November 2026', pergi: '09:00 CGK', tiba: '14:35 MED' }],
      kepulangan: [{ kode: 'JT 057', tanggal: '13 November 2026', pergi: '16:00 MED', tiba: '22:30 CGK' }],
    },
    sk: SK_UMUM,
    gambar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kaaba%2C_Makkah3.jpg/960px-Kaaba%2C_Makkah3.jpg',
  },
  {
    id: 'umrah-reguler',
    jenis: 'umrah',
    kategori: 'Reguler',
    nama: 'Paket Umrah Reguler',
    harga: 38500000,
    hargaQuad: 36500000,
    hargaTriple: 37500000,
    hargaDouble: 38500000,
    dpPerPax: 15000000,
    durasi: '12 Hari',
    durasiList: ['12 Hari', '9 Hari'],
    jadwal: 'Desember 2026',
    maskapai: 'Garuda Indonesia',
    hotel: 'Makkah: 300m Haram • Madinah: 250m Nabawi',
    bandara: BANDARA,
    keberangkatan: [
      { tanggal: '10 Desember 2026', sisaKuota: 12, hargaQuad: 36500000, hargaTriple: 37500000, hargaDouble: 38500000 },
      { tanggal: '24 Desember 2026', sisaKuota: 6, hargaQuad: 36500000, hargaTriple: 37500000, hargaDouble: 38500000 },
      { tanggal: '7 Januari 2027', sisaKuota: 20, hargaQuad: 36500000, hargaTriple: 37500000, hargaDouble: 38500000 },
    ],
    tambahanPesawat: TAMBAHAN_PESAWAT,
    fasilitas: [
      'Tiket pesawat PP',
      'Visa umrah',
      'Hotel bintang 5',
      'Konsumsi 3x sehari',
      'Transportasi bus AC',
      'Manasik & bimbingan ibadah',
      'Perlengkapan ihram premium',
      'Ziarah lengkap Makkah, Madinah & Jeddah',
      'Muthawif hafidz Qur\'an & tour leader lulusan luar negeri',
      'Kereta cepat Haramain',
      'Air zamzam 5 liter',
      'Asuransi perjalanan & layanan kesehatan',
    ],
    persyaratan: SYARAT_UMUM,
    itinerary: [
      { hari: 1, rute: 'JAKARTA – MADINAH', deskripsi: 'Berkumpul di bandara, penerbangan Garuda Indonesia menuju Madinah, check-in hotel & ibadah di Masjid Nabawi.' },
      { hari: 2, rute: 'MADINAH', deskripsi: 'Raudhah, makam Nabi SAW, makam Abu Bakar RA & Umar RA, Pemakaman Baqi.' },
      { hari: 3, rute: 'MADINAH', deskripsi: 'Ziarah: Masjid Quba, Kebun Kurma, Jabal Uhud, Masjid Qiblatain, Parit Khandak.' },
      { hari: 4, rute: 'MADINAH', deskripsi: 'Ibadah bebas di Masjid Nabawi & belanja oleh-oleh Madinah.' },
      { hari: 5, rute: 'MADINAH – MAKKAH', deskripsi: 'Kereta cepat Haramain menuju Makkah, miqot di dalam kereta, check-in hotel, melaksanakan umrah (thawaf, sai, tahallul).' },
      { hari: 6, rute: 'MAKKAH', deskripsi: 'Ibadah di Masjidil Haram.' },
      { hari: 7, rute: 'MAKKAH', deskripsi: 'Ziarah: Arafah, Muzdalifah, Mina, Miqot Ji\'ranah.' },
      { hari: 8, rute: 'MAKKAH', deskripsi: 'Ibadah bebas & shalat berjamaah di Masjidil Haram.' },
      { hari: 9, rute: 'MAKKAH', deskripsi: 'City tour Thaif (opsional) & ziarah Jabal Rahmah.' },
      { hari: 10, rute: 'MAKKAH', deskripsi: 'Thawaf sunnah & memperbanyak ibadah.' },
      { hari: 11, rute: 'MAKKAH – JEDDAH – JAKARTA', deskripsi: 'Thawaf wada, city tour Jeddah, penerbangan kembali ke tanah air.' },
      { hari: 12, rute: 'JAKARTA', deskripsi: 'Tiba di Jakarta. Semoga umrah mabrur dan kembali dengan penuh berkah.' },
    ],
    penerbangan: {
      keberangkatan: [{ kode: 'GA 968', tanggal: '10 Desember 2026', pergi: '09:00 CGK', tiba: '14:35 MED' }],
      kepulangan: [{ kode: 'GA 983', tanggal: '21 Desember 2026', pergi: '21:55 JED', tiba: '11:40 CGK (+1)' }],
    },
    sk: SK_UMUM,
    gambar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Supplicating_Pilgrim_at_Masjid_Al_Haram._Mecca%2C_Saudi_Arabia.jpg/960px-Supplicating_Pilgrim_at_Masjid_Al_Haram._Mecca%2C_Saudi_Arabia.jpg',
  },
  {
    id: 'umrah-premium',
    jenis: 'umrah',
    kategori: 'Premium',
    nama: 'Paket Umrah Premium',
    harga: 45500000,
    hargaQuad: 43500000,
    hargaTriple: 44500000,
    hargaDouble: 45500000,
    dpPerPax: 15000000,
    durasi: '15 Hari',
    durasiList: ['15 Hari', '12 Hari'],
    jadwal: 'Januari 2027',
    maskapai: 'Garuda Indonesia / Saudia',
    hotel: 'Makkah: 100m Haram (view Ka\'bah) • Madinah: 150m Nabawi',
    bandara: BANDARA,
    keberangkatan: [
      { tanggal: '14 Januari 2027', sisaKuota: 5, hargaQuad: 43500000, hargaTriple: 44500000, hargaDouble: 45500000 },
      { tanggal: '28 Januari 2027', sisaKuota: 10, hargaQuad: 43500000, hargaTriple: 44500000, hargaDouble: 45500000 },
      { tanggal: '11 Februari 2027', sisaKuota: 3, hargaQuad: 43500000, hargaTriple: 44500000, hargaDouble: 45500000 },
    ],
    tambahanPesawat: TAMBAHAN_PESAWAT,
    fasilitas: [
      'Tiket pesawat PP maskapai terbaik',
      'Visa umrah',
      'Hotel bintang 5 dekat Haram (view Ka\'bah)',
      'Konsumsi 3x sehari (prasmanan)',
      'Ziarah lengkap Makkah, Madinah, Thaif & Jeddah',
      'Pembimbing berpengalaman',
      'Perlengkapan ihram premium',
      'Kereta cepat Haramain',
      'Lounge bandara',
      'Air zamzam 5 liter',
      'Asuransi perjalanan & layanan kesehatan',
      'Bimbingan ibadah 24 jam',
    ],
    persyaratan: SYARAT_UMUM,
    itinerary: [
      { hari: 1, rute: 'JAKARTA – MADINAH', deskripsi: 'Berkumpul di bandara, penerbangan menuju Madinah, check-in hotel bintang 5 dekat Masjid Nabawi.' },
      { hari: 2, rute: 'MADINAH', deskripsi: 'Raudhah & ziarah makam-makam sahabat di kompleks Masjid Nabawi.' },
      { hari: 3, rute: 'MADINAH', deskripsi: 'Ziarah: Masjid Quba, Kebun Kurma, Jabal Uhud, Masjid Qiblatain, Parit Khandak.' },
      { hari: 4, rute: 'MADINAH – MAKKAH', deskripsi: 'Kereta cepat Haramain menuju Makkah, miqot di kereta, check-in hotel view Ka\'bah, melaksanakan umrah (thawaf, sai, tahallul).' },
      { hari: 5, rute: 'MAKKAH', deskripsi: 'Ibadah & shalat berjamaah di Masjidil Haram.' },
      { hari: 6, rute: 'MAKKAH', deskripsi: 'Ziarah: Arafah, Muzdalifah, Mina, Jabal Rahmah.' },
      { hari: 7, rute: 'MAKKAH', deskripsi: 'Ziarah: Jabal Nur & Miqot Ji\'ranah (umrah tambahan bagi yang berkenan).' },
      { hari: 8, rute: 'MAKKAH', deskripsi: 'City tour Thaif — kebun mawar & udara sejuk pegunungan.' },
      { hari: 9, rute: 'MAKKAH', deskripsi: 'Ibadah bebas di Masjidil Haram.' },
      { hari: 10, rute: 'MAKKAH', deskripsi: 'Ziarah: Jabal Tsur & museum sejarah.' },
      { hari: 11, rute: 'MAKKAH', deskripsi: 'Thawaf sunnah & belanja oleh-oleh di sekitar Haram.' },
      { hari: 12, rute: 'MAKKAH', deskripsi: 'Ibadah bebas & persiapan kepulangan.' },
      { hari: 13, rute: 'MAKKAH – MADINAH', deskripsi: 'Kembali ke Madinah untuk ziarah lanjutan & ibadah di Masjid Nabawi.' },
      { hari: 14, rute: 'MADINAH – JEDDAH – JAKARTA', deskripsi: 'Thawaf & ziarah pamitan, city tour Jeddah, penerbangan kembali ke tanah air.' },
      { hari: 15, rute: 'JAKARTA', deskripsi: 'Tiba di Jakarta. Semoga menjadi tamu Allah yang kembali dengan umrah mabrur.' },
    ],
    penerbangan: {
      keberangkatan: [{ kode: 'GA 968', tanggal: '14 Januari 2027', pergi: '09:00 CGK', tiba: '14:35 MED' }],
      kepulangan: [
        { kode: 'SV 890', tanggal: '28 Januari 2027', pergi: '19:25 JED', tiba: '02:15 MCT' },
        { kode: 'GA 849', tanggal: '29 Januari 2027', pergi: '18:00 MCT', tiba: '01:50 CGK (+1)' },
      ],
    },
    sk: SK_UMUM,
    gambar:
      'https://upload.wikimedia.org/wikipedia/commons/1/10/Kaaba_at_night.jpg',
  },
]

/* ============================================================
   Paket Haji — sama seperti umrah: harga per kamar, jadwal,
   itinerary, penerbangan, S&K (data dummy, sesuaikan asli)
   ============================================================ */

export const PAKET_HAJI: Paket[] = [
  {
    id: 'haji-reguler',
    jenis: 'haji',
    kategori: 'Haji Reguler',
    nama: 'Haji Reguler',
    harga: 98500000,
    hargaQuad: 95500000,
    hargaTriple: 96500000,
    hargaDouble: 98500000,
    dpPerPax: 25000000,
    durasi: '40 Hari',
    durasiList: ['40 Hari'],
    jadwal: 'April 2027',
    maskapai: 'Garuda Indonesia / Saudia',
    hotel: 'Makkah: 400m Haram • Madinah: 300m Nabawi',
    bandara: BANDARA,
    keberangkatan: [
      { tanggal: '10 April 2027', sisaKuota: 45, hargaQuad: 95500000, hargaTriple: 96500000, hargaDouble: 98500000 },
      { tanggal: '24 April 2027', sisaKuota: 30, hargaQuad: 95500000, hargaTriple: 96500000, hargaDouble: 98500000 },
    ],
    tambahanPesawat: TAMBAHAN_PESAWAT,
    fasilitas: [
      'Tiket pesawat PP',
      'Visa & biaya penyelenggaraan ibadah haji',
      'Hotel Makkah & Madinah',
      'Konsumsi 3x sehari',
      'Transportasi bus AC',
      'Manasik haji lengkap',
      'Pembimbing & petugas haji',
      'Perlengkapan ihram',
      'Air zamzam 5 liter',
      'Asuransi perjalanan',
      'Bimbingan ibadah 24 jam',
      'Sertifikat haji',
    ],
    persyaratan: SYARAT_UMUM,
    itinerary: [
      { hari: 1, rute: 'JAKARTA – JEDDAH', deskripsi: 'Berkumpul di bandara, penerbangan menuju Jeddah, kemudian menuju Madinah dengan bus armada haji.' },
      { hari: 2, rute: 'MADINAH', deskripsi: 'Check-in hotel di Madinah, ibadah di Masjid Nabawi, dan ziarah Raudhah.' },
      { hari: 3, rute: 'MADINAH', deskripsi: 'Ziarah: Masjid Quba, Kebun Kurma, Jabal Uhud, Masjid Qiblatain, Parit Khandak.' },
      { hari: 4, rute: 'MADINAH', deskripsi: 'Ibadah bebas & persiapan menuju Makkah.' },
      { hari: 5, rute: 'MADINAH – MAKKAH', deskripsi: 'Perjalanan menuju Makkah, check-in hotel, umrah (thawaf, sai, tahallul).' },
      { hari: 6, rute: 'MAKKAH', deskripsi: 'Ibadah di Masjidil Haram & ziarah sekitar Makkah.' },
      { hari: 7, rute: 'MAKKAH', deskripsi: 'Shalat jumat & ibadah di Masjidil Haram.' },
      { hari: 8, rute: 'MAKKAH', deskripsi: 'Ibadah bebas & persiapan menuju Mina (Tarwiyah).' },
      { hari: 9, rute: 'MINA', deskripsi: 'Berangkat ke Mina, melaksanakan wukuf di Arafah keesokan harinya.' },
      { hari: 10, rute: 'ARAFAH – MUZDALIFAH', deskripsi: 'Wukuf di Arafah, mabit di Muzdalifah, melontar jumrah Aqabah, tahallul awal.' },
      { hari: 11, rute: 'MINA', deskripsi: 'Melontar jumrah ula, wustha, dan aqabah (hari tasyrik pertama).' },
      { hari: 12, rute: 'MINA – MAKKAH', deskripsi: 'Tasyrik kedua, kembali ke Makkah, thawaf ifadah & sai.' },
      { hari: 13, rute: 'MAKKAH', deskripsi: 'Thawaf wada, persiapan kepulangan.' },
      { hari: 14, rute: 'MAKKAH – JEDDAH – JAKARTA', deskripsi: 'Perjalanan ke bandara Jeddah, penerbangan kembali ke tanah air.' },
      { hari: 15, rute: 'JAKARTA', deskripsi: 'Tiba di Jakarta. Semoga menjadi haji yang mabrur.' },
    ],
    penerbangan: {
      keberangkatan: [{ kode: 'GA 900', tanggal: '10 April 2027', pergi: '08:00 CGK', tiba: '13:30 JED' }],
      kepulangan: [{ kode: 'GA 901', tanggal: '19 Mei 2027', pergi: '18:00 JED', tiba: '01:30 CGK (+1)' }],
    },
    sk: SK_UMUM,
    gambar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/The_Kaaba_during_Hajj_-_edited.jpg/960px-The_Kaaba_during_Hajj_-_edited.jpg',
  },
  {
    id: 'haji-plus',
    jenis: 'haji',
    kategori: 'Haji Plus',
    nama: 'Haji Plus (Khusus)',
    harga: 185000000,
    hargaQuad: 179000000,
    hargaTriple: 182000000,
    hargaDouble: 185000000,
    dpPerPax: 50000000,
    durasi: '25 Hari',
    durasiList: ['25 Hari'],
    jadwal: 'Mei 2027',
    maskapai: 'Garuda Indonesia',
    hotel: 'Makkah: 150m Haram • Madinah: 200m Nabawi',
    bandara: BANDARA,
    keberangkatan: [
      { tanggal: '8 Mei 2027', sisaKuota: 10, hargaQuad: 179000000, hargaTriple: 182000000, hargaDouble: 185000000 },
      { tanggal: '22 Mei 2027', sisaKuota: 15, hargaQuad: 179000000, hargaTriple: 182000000, hargaDouble: 185000000 },
    ],
    tambahanPesawat: TAMBAHAN_PESAWAT,
    fasilitas: [
      'Tiket pesawat PP maskapai terbaik',
      'Hotel dekat Masjidil Haram & Nabawi',
      'Konsumsi 3x sehari (prasmanan)',
      'Transportasi bus AC',
      'Manasik & bimbingan intensif',
      'Petugas pendamping khusus',
      'Perlengkapan ihram premium',
      'Air zamzam 5 liter',
      'Asuransi perjalanan',
      'Lounge bandara',
    ],
    persyaratan: SYARAT_UMUM,
    itinerary: [
      { hari: 1, rute: 'JAKARTA – MADINAH', deskripsi: 'Penerbangan langsung menuju Madinah, check-in hotel dekat Masjid Nabawi.' },
      { hari: 2, rute: 'MADINAH', deskripsi: 'Ziarah Raudhah & kompleks Masjid Nabawi.' },
      { hari: 3, rute: 'MADINAH', deskripsi: 'Ziarah: Masjid Quba, Jabal Uhud, Masjid Qiblatain.' },
      { hari: 4, rute: 'MADINAH – MAKKAH', deskripsi: 'Perjalanan ke Makkah, check-in hotel dekat Haram, umrah (thawaf, sai, tahallul).' },
      { hari: 5, rute: 'MAKKAH', deskripsi: 'Ibadah di Masjidil Haram.' },
      { hari: 6, rute: 'MAKKAH', deskripsi: 'Ziarah: Arafah, Muzdalifah, Mina, Jabal Tsur.' },
      { hari: 7, rute: 'MAKKAH', deskripsi: 'Ibadah bebas di Masjidil Haram.' },
      { hari: 8, rute: 'MAKKAH – MINA', deskripsi: 'Berangkat ke Mina, persiapan wukuf.' },
      { hari: 9, rute: 'ARAFAH', deskripsi: 'Wukuf di Arafah, mabit Muzdalifah, jumrah & tahallul awal.' },
      { hari: 10, rute: 'MINA', deskripsi: 'Melontar jumrah hari tasyrik.' },
      { hari: 11, rute: 'MINA – MAKKAH', deskripsi: 'Kembali ke Makkah, thawaf ifadah & sai.' },
      { hari: 12, rute: 'MAKKAH', deskripsi: 'Ibadah & ziarah lanjutan, persiapan kepulangan.' },
      { hari: 13, rute: 'MAKKAH – JEDDAH – JAKARTA', deskripsi: 'Thawaf wada, city tour Jeddah, penerbangan kembali.' },
      { hari: 14, rute: 'JAKARTA', deskripsi: 'Tiba di Jakarta. Semoga haji mabrur.' },
    ],
    penerbangan: {
      keberangkatan: [{ kode: 'GA 968', tanggal: '8 Mei 2027', pergi: '09:00 CGK', tiba: '14:35 MED' }],
      kepulangan: [{ kode: 'GA 983', tanggal: '1 Juni 2027', pergi: '21:55 JED', tiba: '11:40 CGK (+1)' }],
    },
    sk: SK_UMUM,
    gambar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Al-Masjid_an_Nabawi.jpg/960px-Al-Masjid_an_Nabawi.jpg',
  },
]
