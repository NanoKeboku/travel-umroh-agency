/**
 * Card — wadah kartu
 * Status: KERANGKA — siap diisi (variant, hover effect, padding, dll.)
 */
import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-soft ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Card
