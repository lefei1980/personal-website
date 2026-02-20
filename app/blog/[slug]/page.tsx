import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Mock blog posts data (will be replaced with real Markdown in Phase 3)
const mockPosts: Record<string, { title: string; date: string; content: string }> = {
  'getting-started-with-nextjs': {
    title: 'Getting Started with Next.js 14',
    date: '2024-02-15',
    content: `
# Getting Started with Next.js 14

Next.js 14 introduces powerful new features that make building modern web applications easier than ever.

## App Router

The App Router is the new paradigm for building Next.js applications. It uses React Server Components by default and provides a more intuitive file-based routing system.

## Server Components

Server Components allow you to render components on the server, reducing the amount of JavaScript sent to the client and improving performance.

## Key Features

- **Improved Performance**: Faster page loads and better Core Web Vitals
- **Better Developer Experience**: Improved error handling and debugging
- **Enhanced Routing**: Nested layouts, loading states, and error boundaries

This is a sample blog post. In Phase 3, we'll integrate real Markdown rendering!
    `,
  },
  'building-with-typescript': {
    title: 'Why TypeScript Makes You a Better Developer',
    date: '2024-02-10',
    content: `
# Why TypeScript Makes You a Better Developer

TypeScript has become the de facto standard for building large-scale JavaScript applications.

## Benefits of Type Safety

Type safety catches errors at compile time rather than runtime, saving countless hours of debugging.

## Better IDE Support

With TypeScript, your IDE can provide better autocomplete, refactoring tools, and inline documentation.

This is a sample blog post. Real content coming in Phase 3!
    `,
  },
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = mockPosts[params.slug]

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.content.substring(0, 155),
  }
}

export default function BlogPost({ params }: Props) {
  const post = mockPosts[params.slug]

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
          <time className="text-sm text-text-light">{post.date}</time>
          <h1 className="text-4xl md:text-5xl font-bold text-text mt-2 mb-4">
            {post.title}
          </h1>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-text-light whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>

      {/* Divider */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-text-light text-center">
          Note: This is a placeholder. In Phase 3, we'll add proper Markdown
          rendering with syntax highlighting!
        </p>
      </div>
    </div>
  )
}

// Generate static params for all posts
export async function generateStaticParams() {
  return Object.keys(mockPosts).map(slug => ({
    slug,
  }))
}
