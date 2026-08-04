/**
 * ChatWidget — tombol chat mengambang (kanan bawah) + panel chatbot
 * Menggantikan FloatingWhatsApp (keputusan 2026-08-04):
 * murni chat di dalam website; link WA tersedia di panel (opsi Kontak Admin).
 * Desain tombol mengikuti FAB WA lama (sky-blue, animasi spring + ping).
 */
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../ui/Icon'
import ChatPanel from './ChatPanel'

function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Panel chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 z-50 sm:right-6"
          >
            <ChatPanel />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol FAB */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Tutup chat' : 'Buka chat'}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-white shadow-xl shadow-sky-500/30 sm:right-6"
      >
        {!open && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-sky-500/60" />}
        <Icon name={open ? 'close' : 'chat'} className="h-7 w-7" />
      </motion.button>
    </>
  )
}

export default ChatWidget
