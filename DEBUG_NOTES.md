# Debug Notes & Learnings

A collection of solutions, tips, and learnings encountered during development.

---

## Setup Issues

### Issue: create-next-app conflicts with existing files
**Problem**: Running `create-next-app` in a directory with existing files (project-blueprint.txt, .claude/) causes an error.

**Solution**: Initialize Next.js manually instead:
```bash
npm init -y
npm install next react react-dom typescript @types/react @types/node @types/react-dom
# Then create config files manually
```

**Lesson**: Manual setup gives more control and avoids conflicts in existing directories.

---

### Issue: Tailwind CSS v4 PostCSS plugin error
**Problem**: When installing `tailwindcss` without version constraint, npm installs v4 which has breaking changes. Error message:
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
The PostCSS plugin has moved to a separate package...
```

**Solution**: Use stable Tailwind CSS v3 instead:
```bash
npm uninstall tailwindcss
npm install -D tailwindcss@^3.4.0
```

**Why**: Tailwind v4 is still in beta/early release and requires `@tailwindcss/postcss` package. V3 is production-ready and stable.

**Lesson**: Always specify major versions for CSS frameworks to avoid breaking changes.

---

## Next.js Configuration

### Static Export for Cloudflare Pages
**Important**: Must configure `next.config.js` for static export since Cloudflare Pages doesn't support Next.js server features.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig
```

**Note**: This disables:
- Server-side rendering (SSR)
- API routes
- Image optimization (use `unoptimized: true`)

**Workaround**: Use Cloudflare Workers or Pages Functions if server features needed later.

---

## TypeScript Tips

### Path Aliases
Set up path aliases in `tsconfig.json` to avoid relative import hell:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"]
    }
  }
}
```

---

## Tailwind CSS

### Custom Colors in Config
Add custom colors to match design system:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Blue accent
        secondary: '#f8fafc', // Soft gray
        text: '#111827', // Dark gray
      },
    },
  },
}
```

---

## Git & GitHub

### Git Workflow Reminder
- Always wait for user approval before pushing to GitHub
- Commit at the end of each completed phase
- Use descriptive commit messages

---

## Decap CMS

### GitHub OAuth Setup
**To be documented when implemented**

---

## Cloudflare Pages

### Build Configuration
**To be documented when implemented**

---

## Performance

### Image Optimization for Static Sites
**To be documented when implemented**

---

## Markdown Processing

### Phase 3: Content Infrastructure Setup

**Dependencies Installed**:
```bash
npm install gray-matter remark remark-html remark-gfm highlight.js
npm install -D @tailwindcss/typography
```

**Libraries Used**:
- `gray-matter` - Parse frontmatter (YAML metadata in Markdown files)
- `remark` - Markdown processor
- `remark-html` - Convert Markdown to HTML
- `remark-gfm` - GitHub-flavored Markdown (tables, task lists, strikethrough)
- `highlight.js` - Syntax highlighting for code blocks
- `@tailwindcss/typography` - Beautiful prose styling with `prose` classes

**File Structure**:
```
/content/blog/          # Markdown blog posts
  post-slug.md          # Each post is a .md file named by slug
/lib/markdown.ts        # Content parsing utilities
```

**Frontmatter Format**:
```markdown
---
title: "Post Title"
date: "2026-02-20"
description: "Brief description for listing and SEO"
tags: ["tag1", "tag2"]
---

# Post content starts here...
```

**Key Functions** (`lib/markdown.ts`):
- `getAllPosts()` - Get all posts sorted by date (newest first)
- `getPostBySlug(slug)` - Get single post with HTML content
- `markdownToHtml(markdown)` - Convert Markdown string to HTML

**Usage in Pages**:
```tsx
// Blog listing page
const posts = getAllPosts()

// Blog detail page
const post = await getPostBySlug(params.slug)
```

**Styling Blog Content**:
```tsx
// Use Tailwind prose for automatic Markdown styling
<div className="prose prose-lg dark:prose-invert max-w-none">
  <div dangerouslySetInnerHTML={{ __html: post.content }} />
</div>
```

**Syntax Highlighting**:
- Using GitHub Dark theme: `import 'highlight.js/styles/github-dark.css'`
- Works automatically for code blocks with language specified:
  ````markdown
  ```tsx
  const MyComponent = () => <div>Hello</div>
  ```
  ````

**Tips**:
- Use unique slugs (filename without .md becomes the URL slug)
- Date format: ISO 8601 (YYYY-MM-DD) for proper sorting
- Description shows in blog listing cards
- Tags are optional but recommended for categorization

---

## Common Errors

### Error: [To be populated as errors occur]
**Problem**:
**Solution**:
**Prevention**:

---

## Travel Photos Management

### Auto-Detection System (Phase 2.5)

**Problem**: Originally required manual maintenance of `photoCount` field and sequential numbering (1.jpg, 2.jpg, etc.)

**Solution**: Build-time manifest generation
- Script scans `/public/images/travel/` folders
- Auto-detects all image files (supports .jpg, .jpeg, .png, .gif, .webp)
- Supports any filename (no numbering required)
- Generates `/public/travel-photos-manifest.json`

**Usage**:
```bash
npm run generate-manifest  # Manually generate manifest
npm run dev                 # Auto-generates before dev server
npm run build               # Auto-generates before production build
```

**Adding new photos**:
1. Add images to `/public/images/travel/[location-folder]/`
   - Use any filenames: `sunset.jpg`, `IMG_1234.jpg`, etc.
   - Supports multiple formats
2. Run `npm run dev` or `npm run build`
3. Manifest auto-updates ✅
4. No JSON editing needed ✅

**Location JSON** (simplified):
```json
{
  "id": "paris",
  "name": "Paris",
  "folder": "paris"
  // No photoCount needed!
}
```

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run ESLint
npm run format           # Format with Prettier

# Git
git status               # Check status
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push origin main     # Push to GitHub (WAIT FOR APPROVAL)

# Troubleshooting
rm -rf node_modules package-lock.json && npm install  # Fresh install
rm -rf .next             # Clear Next.js cache
```

---

## Resources

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS Docs: https://tailwindcss.com/docs
- TypeScript Handbook: https://www.typescriptlang.org/docs
- Decap CMS Docs: https://decapcms.org/docs
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages

---

## Notes
- Update this file whenever you solve a non-trivial problem
- Include both the problem and solution for future reference
- Add prevention tips where applicable
