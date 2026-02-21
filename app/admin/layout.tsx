import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Manager',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div suppressHydrationWarning>
      {children}
    </div>
  )
}
