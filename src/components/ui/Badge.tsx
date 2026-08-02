/**
 * Badge — label kecil (kategori, status, dll.)
 * Status: KERANGKA — siap diisi (variant warna, dll.)
 */
import type { HTMLAttributes, ReactNode } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

function Badge({ children, className = '', ...rest }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700 ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}

export default Badge
