# Personal Website

A personal portfolio website combining professional presentation with casual personal content. Built with Next.js, TypeScript, Tailwind CSS, and deployed on Cloudflare Pages.

## Features

- 🏠 Landing page with hero section
- 👤 About page with bio and resume
- 📝 Blog with Markdown support
- 🚀 Apps showcase
- 🔐 Admin CMS (Decap CMS)
- 🎨 Minimalist, professional design
- 📱 Fully responsive
- ⚡ Static-first architecture
- 🌐 100% free hosting

## Tech Stack

- **Framework**: Next.js 14+ (App Router, Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown + gray-matter
- **CMS**: Decap CMS (Git-based)
- **Hosting**: Cloudflare Pages
- **CI/CD**: GitHub Actions

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/lefei1980/personal-website.git
cd personal-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
npm run type-check # TypeScript type checking
```

## Project Structure

```
personal-website/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── apps/              # Apps showcase
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
├── lib/                   # Utilities and helpers
├── content/               # Markdown content
│   ├── blog/             # Blog posts
│   ├── about/            # About content
│   └── travel/           # Travel galleries
├── public/               # Static assets
│   └── images/           # Images
└── admin/                # Decap CMS config
```

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Project overview and architecture
- **[PLAN.md](./PLAN.md)** - Detailed implementation plan
- **[TODO.md](./TODO.md)** - Current phase tasks
- **[DEBUG_NOTES.md](./DEBUG_NOTES.md)** - Debug tips and solutions
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Step-by-step deployment instructions

## Deployment

The site is configured for automated deployment to Cloudflare Pages. See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for complete setup instructions.

**Quick Overview:**
1. Create Cloudflare Pages project (one-time setup)
2. Connect GitHub repository
3. Configure build settings: `npm run build` → `out/`
4. Push to `master` → GitHub Actions + Cloudflare auto-deploy
5. Live at `https://<project-name>.pages.dev`

**CI/CD Pipeline:**
- ✅ GitHub Actions: Type checking, linting, build verification
- ✅ Cloudflare Pages: Automatic deployment on push
- ✅ Preview deployments for PRs

## Content Management

Access the CMS at `/admin` after deployment. Authenticate with GitHub to create and edit content.

## License

MIT

## Links

- **GitHub**: https://github.com/lefei1980/personal-website
- **Design Inspiration**: [leerob.io](https://leerob.io), [antfu.me](https://antfu.me)

