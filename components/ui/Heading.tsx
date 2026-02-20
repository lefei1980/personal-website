import { ReactNode } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps {
  level?: HeadingLevel
  children: ReactNode
  className?: string
}

const styles = {
  h1: 'text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100',
  h2: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100',
  h3: 'text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100',
  h4: 'text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100',
  h5: 'text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100',
  h6: 'text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100',
}

export default function Heading({
  level = 'h2',
  children,
  className = '',
}: HeadingProps) {
  const Tag = level
  return <Tag className={`${styles[level]} ${className}`}>{children}</Tag>
}
