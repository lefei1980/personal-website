import { ReactNode } from 'react'
import Link from 'next/link'

interface CardProps {
  children: ReactNode
  href?: string
  className?: string
  hover?: boolean
}

export default function Card({
  children,
  href,
  className = '',
  hover = true,
}: CardProps) {
  const baseStyles =
    'border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-200 bg-white dark:bg-gray-800'
  const hoverStyles = hover
    ? 'hover:border-primary hover:shadow-lg transform hover:-translate-y-1'
    : ''
  const combinedStyles = `${baseStyles} ${hoverStyles} ${className}`

  if (href) {
    return (
      <Link href={href} className={`block group ${combinedStyles}`}>
        {children}
      </Link>
    )
  }

  return <div className={combinedStyles}>{children}</div>
}
