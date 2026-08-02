/**
 * FloatingWhatsApp — tombol WhatsApp mengambang (kanan bawah)
 * Nomor dari src/data/kontak.ts
 */
import { motion } from 'framer-motion'
import Icon from '../ui/Icon'
import { waLink } from '../../utils/format'

function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink('Assalamualaikum, saya ingin bertanya tentang paket Ebitour')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30"
    >
      <Icon name="whatsapp" className="h-7 w-7" />
      {/* Pulsa halus */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-green-500/60" />
    </motion.a>
  )
}

export default FloatingWhatsApp
