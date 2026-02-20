import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  noPadding?: boolean
}

export default function Section({
  children,
  className = '',
  noPadding = false,
}: SectionProps) {
  const paddingStyles = noPadding ? '' : 'py-16'
  return <section className={`${paddingStyles} ${className}`}>{children}</section>
}
