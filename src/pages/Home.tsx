/**
 * Halaman: Beranda
 * Route: /
 * Status: SELESAI (v1) — tersusun dari section-section di src/components/home/
 * Semua data masih placeholder — ganti dengan konten asli Ebitour.
 */
import Hero from '../components/home/Hero'
import TentangRingkasan from '../components/home/TentangRingkasan'
import PencarianTiket from '../components/home/PencarianTiket'
import PaketUnggulan from '../components/home/PaketUnggulan'
import Keunggulan from '../components/home/Keunggulan'
import GaleriPreview from '../components/home/GaleriPreview'
import TestimoniSlider from '../components/home/TestimoniSlider'
import CtaBanner from '../components/home/CtaBanner'

function Home() {
  return (
    <>
      <Hero />
      <TentangRingkasan />
      <PencarianTiket />
      <PaketUnggulan />
      <Keunggulan />
      <GaleriPreview />
      <TestimoniSlider />
      <CtaBanner />
    </>
  )
}

export default Home
