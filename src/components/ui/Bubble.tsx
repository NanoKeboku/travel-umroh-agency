import type { HTMLAttributes, ReactNode } from "react";

interface BubbleProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode
}

function Bubble({ children, className = '', ...rest }: BubbleProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full py-1 text-xs font-medium text-brand-700 ${className}`} {...rest}
        >
            {children}
        </span>
    )
}

export default Bubble