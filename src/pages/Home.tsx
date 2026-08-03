/**
 * Halaman: Beranda
 * Route: /
 * Status: SELESAI (v1) — tersusun dari section-section di src/components/home/
 * Semua data masih placeholder — ganti dengan konten asli Ebitour.
 * Urutan: Hero → Tentang → Cari Tiket (search + card paket) → Keunggulan →
 *         Galeri → Testimoni → CTA.
 */
import Hero from '../components/home/Hero'
import TentangRingkasan from '../components/home/TentangRingkasan'
import PencarianTiket from '../components/home/PencarianTiket'
import Keunggulan from '../components/home/Keunggulan'
import GaleriPreview from '../components/home/GaleriPreview'
import Asatidzah from '../components/home/Asatidzah'
import TestimoniSlider from '../components/home/TestimoniSlider'
import CtaBanner from '../components/home/CtaBanner'

function Home() {
  return (
    <>
      <Hero />
      <TentangRingkasan />
      <PencarianTiket />
      <Keunggulan />
      <GaleriPreview />
      <Asatidzah />
      <TestimoniSlider />
      <CtaBanner />
    </>
  )
}

export default Home
