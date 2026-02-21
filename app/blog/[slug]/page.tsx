import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/markdown'

type Props = {
  params: Promise<{ slug: string }>
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  // Handle edge cases where slug might be undefined
  if (!slug) {
    return {
      title: 'Post Not Found',
    }
  }

  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.description,
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params

  // Handle edge cases where slug might be undefined
  if (!slug) {
    notFound()
  }

  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center text-primary hover:underline mb-8"
      >
        ← Back to Blog
      </Link>

      {/* Article Header */}
      <article>
        <header className="mb-8">
          <time className="text-sm text-gray-600 dark:text-gray-400">
            {formatDate(post.date)}
          </time>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mt-2 mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {post.description}
          </p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}
