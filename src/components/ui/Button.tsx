/**
 * Button — tombol reusable
 * Status: KERANGKA — siap diisi (variant: primary/outline/ghost, size, loading, dll.)
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

function Button({ children, className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={`rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
