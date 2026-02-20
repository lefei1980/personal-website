import type { Metadata } from 'next'
import { Container, Section, Heading, Card } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | Personal Website',
  description: 'Thoughts on development, tutorials, and personal experiences',
}

// Mock blog posts data (will be replaced with real Markdown in Phase 3)
const mockPosts = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 14',
    excerpt:
      'Learn how to build modern web applications with Next.js App Router, Server Components, and more.',
    date: '2024-02-15',
    readTime: '5 min read',
  },
  {
    slug: 'building-with-typescript',
    title: 'Why TypeScript Makes You a Better Developer',
    excerpt:
      'Exploring the benefits of type safety and how TypeScript improves code quality and developer experience.',
    date: '2024-02-10',
    readTime: '8 min read',
  },
  {
    slug: 'tailwind-css-tips',
    title: 'Tailwind CSS Tips and Tricks',
    excerpt:
      'Practical tips for getting the most out of Tailwind CSS in your projects.',
    date: '2024-02-05',
    readTime: '6 min read',
  },
  {
    slug: 'react-best-practices',
    title: 'React Best Practices in 2024',
    excerpt:
      'Modern patterns and practices for building scalable React applications.',
    date: '2024-01-28',
    readTime: '10 min read',
  },
]

export default function Blog() {
  return (
    <Container size="md">
      <Section>
        {/* Header */}
        <div className="mb-12">
          <Heading level="h1" className="mb-4">
            Blog
          </Heading>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Thoughts on development, tutorials, and lessons learned
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-6">
          {mockPosts.map(post => (
            <Card key={post.slug} href={`/blog/${post.slug}`}>
              <div className="flex justify-between items-start mb-3">
                <time className="text-sm text-gray-600 dark:text-gray-400">{post.date}</time>
                <span className="text-sm text-gray-600 dark:text-gray-400">{post.readTime}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{post.excerpt}</p>
              <span className="text-primary font-medium group-hover:underline inline-flex items-center">
                Read more
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Card>
          ))}
        </div>

        {/* No posts message (for when blog is empty) */}
        {mockPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </Section>
    </Container>
  )
}
