/**
 * Data Asatidzah Pembimbing — 16 orang (DUMMY)
 * Pembimbing Umrah & Haji Khusus.
 * Foto placeholder pakai randomuser.me portraits (bisa di-hotlink).
 * Ganti dengan foto asli para pembimbing Ebitour nanti.
 */
export interface Asatidzah {
  id: string
  nama: string
  peran: string
  foto: string
}

export const ASATIDZAH: Asatidzah[] = [
  { id: 'a1', nama: 'KH. Ahmad Fauzi, Lc.', peran: 'Pembimbing Ibadah Umrah', foto: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 'a2', nama: 'Ust. Dr. H. Abdullah Ramadhan, M.A.', peran: 'Muthawif & Pembimbing Manasik', foto: 'https://randomuser.me/api/portraits/men/41.jpg' },
  { id: 'a3', nama: 'Ust. H. Muhammad Shiddiq, S.Pd.I.', peran: 'Pembimbing Umrah', foto: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { id: 'a4', nama: 'Ust. H. Abdul Hakim, Lc.', peran: 'Muthawif Haji Khusus', foto: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: 'a5', nama: 'Ust. H. Syamsul Hadi, M.Pd.', peran: 'Pembimbing Manasik', foto: 'https://randomuser.me/api/portraits/men/68.jpg' },
  { id: 'a6', nama: 'Ust. H. Nur Kholis, S.H.I.', peran: 'Pembimbing Haji Khusus', foto: 'https://randomuser.me/api/portraits/men/75.jpg' },
  { id: 'a7', nama: 'Ust. H. Hasan Basri, Lc.', peran: 'Muthawif & Tour Leader', foto: 'https://randomuser.me/api/portraits/men/14.jpg' },
  { id: 'a8', nama: 'Ust. H. Zainal Abidin, S.Ag.', peran: 'Pembimbing Ibadah', foto: 'https://randomuser.me/api/portraits/men/85.jpg' },
  { id: 'a9', nama: 'Ust. H. Ridwan Hamzah, Lc.', peran: 'Pembimbing Haji Khusus', foto: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { id: 'a10', nama: 'Ust. H. Fadlan Nur Rahman, M.Ag.', peran: 'Muthawif', foto: 'https://randomuser.me/api/portraits/men/26.jpg' },
  { id: 'a11', nama: 'Ust. H. Saiful Anwar, S.Th.I.', peran: 'Pembimbing Manasik', foto: 'https://randomuser.me/api/portraits/men/29.jpg' },
  { id: 'a12', nama: 'Ust. H. Imron Rosyadi, Lc.', peran: 'Muthawif', foto: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { id: 'a13', nama: 'Ustazah Hj. Siti Maryam, S.Ag.', peran: 'Pembimbing Jamaah Wanita', foto: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 'a14', nama: 'Ustazah Hj. Fatimah Azzahra, S.Pd.', peran: 'Pembimbing Wanita Umrah', foto: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { id: 'a15', nama: 'Ustazah Hj. Aisyah Nurul, M.Pd.', peran: 'Pembimbing Wanita Haji', foto: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 'a16', nama: 'Ustazah Hj. Khadijah Zahra, Lc.', peran: 'Muthawifah & Pembimbing', foto: 'https://randomuser.me/api/portraits/women/65.jpg' },
]
