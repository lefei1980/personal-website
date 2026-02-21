import type { Metadata } from 'next'
import { Container, Section, Heading, Card } from '@/components/ui'
import Link from 'next/link'
import { getAllPosts } from '@/lib/markdown'

export const metadata: Metadata = {
  title: 'Blog | Personal Website',
  description: 'Thoughts on development, tutorials, and personal experiences',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function estimateReadTime(description: string): string {
  // Rough estimate: 200 words per minute
  const wordCount = description.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / 50)) // Using description as proxy
  return `${minutes} min read`
}

export default function Blog() {
  const posts = getAllPosts()

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
          {posts.map(post => (
            <Card key={post.slug} href={`/blog/${post.slug}`}>
              <div className="flex justify-between items-start mb-3">
                <time className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(post.date)}
                </time>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {estimateReadTime(post.description)}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {post.description}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
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
        {posts.length === 0 && (
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
