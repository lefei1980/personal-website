# Personal Website - Claude Code Reference

## Project Overview
A personal portfolio website combining professional presentation with casual personal content. Built with a static-first architecture using Next.js, Decap CMS, and deployed on Cloudflare Pages with full CI/CD automation.

**Final Deliverable**: Live website at `<username>.pages.dev` (or custom domain)

## Quick Start (New Session Protocol)
1. **Always read these files first**:
   - `CLAUDE.md` (this file) - Project context
   - `TODO.md` - Current phase tasks
   - `DEBUG_NOTES.md` - Known issues and solutions

2. **Before any Git push**: Wait for user review and approval

3. **Phase completion workflow**:
   - Commit completed phase code
   - Update `TODO.md` with next phase tasks from `PLAN.md`
   - Update progress in this file

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│              Cloudflare CDN (Global)                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│         Static Next.js Site (SSG Export)                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Pages:                                            │   │
│  │  - Landing (/)                                    │   │
│  │  - About (/about)                                 │   │
│  │  - Blog (/blog, /blog/[slug])                     │   │
│  │  - Apps (/apps)                                   │   │
│  │  - Admin (/admin) - Decap CMS                     │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│        Content (Markdown Files in Git)                   │
│  /content/blog/*.md                                      │
│  /content/about/bio.md                                   │
│  /content/travel/*/                                      │
│  /public/images/                                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│           GitHub Repository (Single Source of Truth)     │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Push to main → GitHub Actions → Build → Deploy │    │
│  └─────────────────────────────────────────────────┘    │
└────────────────────┬────────────────────────────────────┘
                     ↑
                     │
┌────────────────────┴────────────────────────────────────┐
│         Decap CMS Admin (Git-based CMS)                  │
│  - GitHub OAuth authentication                           │
│  - Content editing interface                             │
│  - Auto-commits to repository                            │
│  - Triggers rebuild on save                              │
└─────────────────────────────────────────────────────────┘
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router, Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown**: gray-matter, remark, rehype

### Content Management
- **CMS**: Decap CMS (formerly Netlify CMS)
- **Authentication**: GitHub OAuth
- **Storage**: Git-based (no database)

### Deployment
- **Hosting**: Cloudflare Pages (free tier)
- **CI/CD**: GitHub Actions
- **Version Control**: GitHub

### Design System
- **Primary**: White background (#ffffff)
- **Secondary**: Soft gray (#f8fafc)
- **Accent**: Blue (#2563eb)
- **Text**: Dark gray (#111827)
- **Style**: Minimalist, professional, mobile-first

## Repository Structure

```
personal-website/
├── content/                 # Git-based content storage
│   ├── blog/               # Blog posts (Markdown)
│   ├── about/              # About page content
│   └── travel/             # Travel photo galleries
├── public/
│   └── images/             # Static images
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── about/
│   ├── blog/
│   ├── apps/
│   └── layout.tsx
├── components/             # Reusable components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                    # Utilities
│   └── markdown.ts        # Content parsing
├── admin/                  # Decap CMS config
│   └── config.yml
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD pipeline
├── CLAUDE.md              # This file
├── PLAN.md                # Detailed phased plan
├── TODO.md                # Current phase tasks
├── DEBUG_NOTES.md         # Debug tips and learnings
├── next.config.js         # Next.js config (static export)
├── tailwind.config.js     # Design system
└── tsconfig.json          # TypeScript config
```

## Key Architectural Decisions

1. **Static-First**: No backend server, everything pre-rendered
2. **Git as Database**: All content stored in repository
3. **Zero Server Maintenance**: Fully managed hosting
4. **Free-Tier Sustainable**: No ongoing costs
5. **CI/CD Automated**: Push to deploy
6. **Resume-Strength**: Modern, professional tech choices

## Development Workflow

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build static site
npm run export       # Export to /out directory
```

### ⚠️ IMPORTANT: Dev Server Management
**Before handing over to user for testing:**
1. **ALWAYS shut down any running dev servers** (`npm run dev`)
2. **Check for background processes** that might hold port 3000 or file locks
3. **Clear the `.next/dev/lock` file** if it exists
4. **Why**: Running servers prevent user from starting their own instance and can cause port conflicts or lock file errors

**To cleanly stop dev servers:**
```bash
# Find and kill the process
taskkill //PID <process_id> //F  # Windows
kill -9 <process_id>              # Mac/Linux

# Or use Ctrl+C if running in foreground
```

**Signs a server is still running:**
- Port 3000 in use error
- `.next/dev/lock` acquisition error
- "Another instance of next dev running" message

### Content Updates (via CMS)
1. Navigate to `/admin`
2. Authenticate with GitHub
3. Create/edit content
4. Save (auto-commits to repo)
5. GitHub Actions rebuilds site
6. Cloudflare Pages deploys

### Manual Content Updates
1. Edit files in `/content`
2. Commit to Git
3. Push to GitHub
4. Auto-deployment triggers

## File Usage Patterns

### CLAUDE.md (This File)
- **Purpose**: High-level project context and architecture
- **When to read**: At the start of every session
- **When to update**: When architecture changes or new patterns emerge

### PLAN.md
- **Purpose**: Complete phased implementation plan
- **When to read**: When planning work or reviewing overall progress
- **When to update**: Rarely (plan is relatively fixed)

### TODO.md
- **Purpose**: Current phase actionable subtasks
- **When to read**: At the start of every session, before each task
- **When to update**:
  - Mark tasks complete as you finish them
  - When phase completes: commit code, copy next phase from PLAN.md

### DEBUG_NOTES.md
- **Purpose**: Solutions to problems encountered
- **When to read**: When stuck on a similar issue
- **When to update**: Whenever you solve a non-trivial problem or learn something useful

## Testing Strategy

**Test Early, Test Often**: Each phase includes a user testing checkpoint before proceeding.

### Testing Checkpoints
1. **Phase 0**: Verify dev server runs and basic setup works
2. **Phase 1**: Test navigation, routing, and basic responsiveness
3. **Phase 2**: Review visual design and UI components
4. **Phase 3**: Test Markdown rendering with sample content
5. **Phase 4**: **CRITICAL** - Full end-to-end CMS workflow testing
6. **Phase 5**: **END-TO-END** - Production deployment and live site testing
7. **Phase 7**: **FINAL QA** - Cross-browser, mobile, Lighthouse, external feedback

### Testing Workflow
- At the end of each phase, run the testing checklist
- User must review and approve before proceeding to next phase
- Issues found during testing are fixed before moving forward
- This prevents building on faulty foundations

### Local Testing Commands
```bash
npm run dev          # Start dev server for manual testing
npm run build        # Test production build
npm run lint         # Check for code issues
npm run type-check   # Verify TypeScript types
```

## Git Workflow Rules

1. **Never auto-push**: Always wait for user review and approval
2. **Testing first**: Complete phase testing checkpoint before committing
3. **Commit strategy**: One commit per completed phase (after user approval)
4. **Branch strategy**: Main branch only (can add feature branches later)
5. **Commit messages**: Clear, descriptive (e.g., "Complete Phase 1: Core pages and routing")

## Current Project Status

- **Current Phase**: Phase 6 - Content Population
- **Completed Phases**: Phase 0 (Setup), Phase 1 (Core Pages), Phase 2 (UI Polish), Phase 2.5 (Travel Map), Phase 3 (Markdown), Phase 4 (CMS Integration), Phase 5 (CI/CD & Deployment)
- **Next Phase**: Phase 7 - Enhancements & Polish
- **Production Site**: https://personal-website-1mu.pages.dev

## Reference Links

- GitHub Repo: https://github.com/lefei1980/personal-website
- Design Inspiration:
  - https://leerob.io
  - https://antfu.me
  - https://vercel.com

## Notes
- Content will be added incrementally (infrastructure first)
- No strict deadline (evenings/weekends pace)
- Focus on clean architecture over speed
- Custom domain: Later (using free subdomain initially)
