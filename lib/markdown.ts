import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

const postsDirectory = path.join(process.cwd(), 'content/blog')
const aboutDirectory = path.join(process.cwd(), 'content/about')
const travelDirectory = path.join(process.cwd(), 'content/travel')
const appsDirectory = path.join(process.cwd(), 'content/apps')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
  content: string
}

export interface BlogPostMetadata {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPostMetadata[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const { data } = matter(fileContents)

      // Combine the data with the slug
      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        tags: data.tags || [],
      }
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await markdownToHtml(content)

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      tags: data.tags || [],
      content: processedContent,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

/**
 * Convert markdown string to HTML with syntax highlighting
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(gfm) // GitHub-flavored Markdown
    .use(html) // Convert to HTML
    .process(markdown)

  return result.toString()
}

/**
 * Get bio content from content/about/bio.md
 */
export async function getBio(): Promise<{ title: string; intro: string; content: string; photo?: string } | null> {
  try {
    const fullPath = path.join(aboutDirectory, 'bio.md')

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await markdownToHtml(content)

    return {
      title: data.title || 'About Me',
      intro: data.intro || '',
      content: processedContent,
      photo: data.photo || undefined,
    }
  } catch (error) {
    console.error('Error reading bio:', error)
    return null
  }
}

/**
 * Get resume content from content/about/resume.md
 */
export async function getResume(): Promise<{ title: string; pdf?: string; content: string } | null> {
  try {
    const fullPath = path.join(aboutDirectory, 'resume.md')

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await markdownToHtml(content)

    return {
      title: data.title || 'Resume',
      pdf: data.pdf || undefined,
      content: processedContent,
    }
  } catch (error) {
    console.error('Error reading resume:', error)
    return null
  }
}

/**
 * Get all travel locations from content/travel/*.json
 */
export function getTravelLocations(): any[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(travelDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(travelDirectory)
    const locations = fileNames
      .filter(fileName => fileName.endsWith('.json'))
      .map(fileName => {
        const fullPath = path.join(travelDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const location = JSON.parse(fileContents)

        // Add slug from filename
        const slug = fileName.replace(/\.json$/, '')
        return { ...location, slug }
      })

    return locations
  } catch (error) {
    console.error('Error reading travel locations:', error)
    return []
  }
}

export interface App {
  slug: string
  title: string
  description: string
  url?: string
  github?: string
  tech?: string[]
  image?: string
  status?: 'active' | 'maintenance' | 'archived'
  content?: string
}

/**
 * Get all apps from content/apps/*.md
 */
export async function getAllApps(): Promise<App[]> {
  try {
    // Check if directory exists
    if (!fs.existsSync(appsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(appsDirectory)
    const allAppsData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async fileName => {
          const slug = fileName.replace(/\.md$/, '')
          const fullPath = path.join(appsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const { data, content } = matter(fileContents)

          // Convert markdown content to HTML
          const processedContent = await markdownToHtml(content)

          return {
            slug,
            title: data.title || slug,
            description: data.description || '',
            url: data.url,
            github: data.github,
            tech: data.tech || [],
            image: data.image,
            status: data.status || 'active',
            content: processedContent,
          }
        })
    )

    return allAppsData
  } catch (error) {
    console.error('Error reading apps:', error)
    return []
  }
}
