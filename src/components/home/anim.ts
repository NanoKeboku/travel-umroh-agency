/**
 * Variants animasi bersama (Framer Motion) — dipakai semua section Home
 * Agar konsisten: fade-up + stagger container.
 */
import type { Variants } from 'framer-motion'

/** Container: anak-anaknya muncul bergantian (stagger) */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

/** Item: naik + memudar dari bawah */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/** Item: memudar + zoom halus (untuk kartu/galeri) */
export const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/** Default viewport untuk whileInView */
export const viewportOnce = { once: true, margin: '-80px' } as const
