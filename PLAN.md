# Personal Website - Implementation Plan

## Overview
Phased implementation plan for building a personal portfolio website with blog, apps showcase, and admin CMS. Each phase builds upon the previous, with clear deliverables and acceptance criteria.

---

## Phase 0: Project Setup & Prerequisites
**Duration**: 1-2 days
**Status**: IN PROGRESS
**Deliverable**: Development environment ready

### Tasks
- [x] Set up GitHub repository
- [x] Initialize Git locally
- [x] Create documentation files (CLAUDE.md, PLAN.md, TODO.md, DEBUG_NOTES.md)
- [ ] Initialize Next.js project with TypeScript
- [ ] Install Tailwind CSS and dependencies
- [ ] Configure ESLint and Prettier
- [ ] Set up folder structure per blueprint
- [ ] Configure `next.config.js` for static export
- [ ] Configure TypeScript (`tsconfig.json`)
- [ ] Create initial `.gitignore`
- [ ] Create initial README.md
- [ ] Test local dev server runs

### Acceptance Criteria
- `npm run dev` starts development server successfully
- TypeScript compilation works
- Tailwind CSS is functional
- Project structure matches blueprint
- All config files are in place

### 🧪 User Testing Checkpoint
- [ ] Run `npm run dev` and verify server starts
- [ ] Open http://localhost:3000 in browser
- [ ] Verify basic Next.js page loads (even if just default)
- [ ] Check console for errors
- [ ] **USER REVIEW**: Confirm setup works before proceeding to Phase 1

---

## Phase 1: Core Pages & Routing
**Duration**: 3-5 days
**Status**: PENDING
**Deliverable**: Basic navigable static site

### Tasks
- [ ] Create app router structure
- [ ] Build landing page (`app/page.tsx`)
  - Hero section
  - Brief introduction
  - Call-to-action links
- [ ] Build About page (`app/about/page.tsx`)
  - Bio section placeholder
  - Resume display section
  - Travel photo gallery placeholder
- [ ] Build Blog listing page (`app/blog/page.tsx`)
  - Grid/list layout
  - Post cards (empty initially)
- [ ] Build Blog detail page (`app/blog/[slug]/page.tsx`)
  - Dynamic route setup
  - Markdown rendering placeholder
- [ ] Build Apps showcase page (`app/apps/page.tsx`)
  - Card layout for external apps
- [ ] Create root layout (`app/layout.tsx`)
  - HTML structure
  - Font configuration
  - Metadata
- [ ] Build Navigation component
  - Responsive menu
  - Active link states
- [ ] Build Footer component
  - Links
  - Copyright
- [ ] Add basic responsive design
- [ ] Test all routes navigate correctly

### Acceptance Criteria
- All pages accessible via navigation
- Responsive on mobile, tablet, desktop
- No console errors
- Clean URLs (e.g., `/about`, `/blog`)
- Basic styling in place

### 🧪 User Testing Checkpoint
- [ ] Navigate to all pages: `/`, `/about`, `/blog`, `/apps`
- [ ] Test navigation links work
- [ ] Test responsive design (resize browser window)
- [ ] Check mobile view (Chrome DevTools mobile emulation)
- [ ] Verify no broken links or console errors
- [ ] **USER REVIEW**: Approve layout and navigation flow before Phase 2

---

## Phase 2: Styling & UI Polish
**Duration**: 2-3 days
**Status**: IN PROGRESS
**Deliverable**: Professional, polished UI with reusable components

### Tasks
- [ ] Configure Tailwind with custom design tokens
  - Colors: white, soft gray (#f8fafc), blue (#2563eb), dark gray (#111827)
  - Typography scale
  - Spacing scale
- [ ] Create reusable UI components:
  - `Button.tsx`
  - `Card.tsx`
  - `Container.tsx`
  - `Section.tsx`
  - Typography components
- [ ] Implement minimalist design system
- [ ] Add transitions and micro-animations
- [ ] Optimize responsive breakpoints
- [ ] Add dark mode toggle (optional)
- [ ] Create loading states
- [ ] Test cross-browser compatibility
- [ ] Accessibility audit (basic)

### Acceptance Criteria
- Matches design inspiration (leerob.io, antfu.me style)
- Consistent spacing and typography
- Smooth transitions
- Fully responsive
- No accessibility warnings

### 🧪 User Testing Checkpoint
- [ ] Review color scheme and typography
- [ ] Test UI components (buttons, cards, etc.)
- [ ] Check spacing and alignment on all pages
- [ ] Test dark/light mode if implemented
- [ ] Verify design feels professional and clean
- [ ] **USER REVIEW**: Approve visual design before proceeding to content

---

## Phase 2.5: Interactive Travel Map
**Duration**: 1-2 days
**Status**: PENDING
**Deliverable**: Interactive world map with photo galleries on About page

### Tasks
- [ ] Install map dependencies:
  - `react-leaflet` (React wrapper for Leaflet)
  - `leaflet` (map library)
  - Photo lightbox library
- [ ] Create TravelMap component (`components/TravelMap.tsx`)
  - World map with OpenStreetMap tiles
  - Custom markers for two pin types:
    - 🏠 Home/Residence (blue pins)
    - 🌍 Tourism (red/orange pins)
  - Hover tooltips showing location name
  - Click handlers to open photo gallery
- [ ] Create photo gallery/lightbox component
  - Location info header (name, date, description)
  - Photo grid with thumbnails
  - Full-screen lightbox viewer
  - Navigation (prev/next, keyboard arrows)
  - Mobile swipe support
  - Close on backdrop click
- [ ] Create location data structure (`/content/travel/locations.json`)
  - Location metadata (name, type, coordinates, date)
  - Photo folder references
  - Support ~30-50 locations
- [ ] Update About page to include map
  - Replace placeholder gallery with interactive map
  - Keep traditional folder gallery below map
  - Responsive layout (map height adjusts)
- [ ] Add sample location data (3-5 locations for testing)
  - Mix of home and tourism locations
  - Different countries
  - Test photos
- [ ] Optimize performance
  - Lazy load map library (only on About page)
  - Lazy load photos (only when gallery opened)
  - Image optimization with next/image
- [ ] Add CSS for map styling
  - Custom pin icons/colors
  - Map container styling
  - Gallery modal styling

### Acceptance Criteria
- [ ] World map displays correctly on About page
- [ ] Pins appear at correct coordinates
- [ ] Two distinct pin types visible (home vs tourism)
- [ ] Hover shows location name tooltip
- [ ] Click pin opens photo gallery modal
- [ ] Photos display correctly in lightbox
- [ ] Lightbox navigation works (prev/next/close)
- [ ] Both map and folder gallery lead to same photos
- [ ] Responsive on mobile and desktop
- [ ] No performance issues with 30-50 locations
- [ ] Images lazy load properly

### 🧪 User Testing Checkpoint
**Before proceeding to Phase 3, user must verify:**
- [ ] Map loads without errors
- [ ] Pins show in correct locations worldwide
- [ ] Pin types are distinguishable (different colors/icons)
- [ ] Tooltips appear on hover
- [ ] Click pin → gallery modal opens smoothly
- [ ] Photos load and display correctly
- [ ] Lightbox controls work (arrows, escape, click outside)
- [ ] Test on mobile device/emulator
- [ ] Page performance is acceptable
- [ ] **USER APPROVAL REQUIRED** to proceed to Phase 3

---

## Phase 3: Content Infrastructure
**Duration**: 2-3 days
**Status**: PENDING
**Deliverable**: Markdown-based content rendering

### Tasks
- [ ] Set up `/content` directory structure
  - `/content/blog/`
  - `/content/about/`
  - `/content/travel/`
- [ ] Install Markdown dependencies:
  - `gray-matter` (frontmatter)
  - `remark`, `remark-html`, `remark-gfm`
  - `rehype-highlight` (syntax highlighting)
- [ ] Create content parsing utilities (`lib/markdown.ts`)
  - `getAllPosts()`
  - `getPostBySlug()`
  - `markdownToHtml()`
- [ ] Implement blog post fetching in pages
- [ ] Add code syntax highlighting
- [ ] Support embedded images in Markdown
- [ ] Support embedded videos (YouTube embeds)
- [ ] Create 2-3 sample blog posts for testing
- [ ] Create sample About content
- [ ] Build image gallery component
- [ ] Test Markdown rendering edge cases

### Acceptance Criteria
- Markdown files render correctly as HTML
- Code blocks have syntax highlighting
- Images display properly
- Frontmatter parsed (title, date, description, etc.)
- Blog listing shows all posts with metadata

### 🧪 User Testing Checkpoint
- [ ] Create 2-3 sample blog posts with different content types
- [ ] Test blog listing page shows all posts
- [ ] Click into individual blog posts
- [ ] Verify Markdown renders correctly (headings, lists, code, images)
- [ ] Test code syntax highlighting
- [ ] Test embedded images and videos
- [ ] **USER REVIEW**: Approve content rendering before CMS integration

---

## Phase 4: Decap CMS Integration
**Duration**: 3-4 days
**Status**: PENDING
**Deliverable**: Working admin panel for content management

### Tasks
- [ ] Install `decap-cms-app` (or `netlify-cms-app`)
- [ ] Create `/public/admin/` directory
- [ ] Create `/public/admin/index.html` (CMS entry point)
- [ ] Configure `/public/admin/config.yml`:
  - Set backend to `github`
  - Define blog collection
  - Define about collection
  - Define travel gallery collection
  - Configure media folder (`/public/images`)
  - Configure public folder (`/public`)
- [ ] Create GitHub OAuth App:
  - Go to GitHub Settings → Developer Settings → OAuth Apps
  - Create new OAuth app
  - Set callback URL (will use Decap's auth service)
- [ ] Add OAuth credentials to CMS config
- [ ] Test admin login flow
- [ ] Test creating a new blog post via CMS
- [ ] Test editing existing content
- [ ] Test image upload
- [ ] Verify commits appear in GitHub
- [ ] Test auto-rebuild (locally, then in production)

### Acceptance Criteria
- `/admin` loads Decap CMS interface
- GitHub OAuth authentication works
- Can create/edit/delete blog posts
- Can upload images
- Changes commit to GitHub automatically
- Local site updates after content changes

### 🧪 User Testing Checkpoint - CRITICAL
- [ ] Navigate to `/admin` in browser
- [ ] Test GitHub OAuth login flow
- [ ] Create a new blog post via CMS interface
- [ ] Upload an image via CMS
- [ ] Edit an existing post
- [ ] Check GitHub repo for new commits
- [ ] Verify changes appear on site after rebuild
- [ ] Delete a test post
- [ ] **USER REVIEW**: Full end-to-end CMS workflow must work before deployment

---

## Phase 5: CI/CD & Deployment
**Duration**: 2-3 days
**Status**: PENDING
**Deliverable**: Automated deployment pipeline

### Tasks
- [ ] Create Cloudflare account
- [ ] Create new Cloudflare Pages project
- [ ] Connect GitHub repository to Cloudflare Pages
- [ ] Configure build settings:
  - Build command: `npm run build`
  - Output directory: `out`
  - Node version: 18+
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Configure GitHub Actions workflow:
  - Trigger on push to `main`
  - Run TypeScript type checking
  - Run linting
  - Run build
  - (Optional) Run Lighthouse CI
- [ ] Set up environment variables if needed
- [ ] Test deployment by pushing a change
- [ ] Verify site is live at `<username>.pages.dev`
- [ ] Configure preview deployments for PRs
- [ ] Document deployment process in README
- [ ] Test full workflow: CMS edit → Commit → Auto-deploy

### Acceptance Criteria
- Site deploys automatically on push to `main`
- Build passes all checks (TypeScript, lint, build)
- Site accessible at Cloudflare Pages URL
- Preview deployments work for PRs
- Full CMS → GitHub → Deploy workflow functional

### 🧪 User Testing Checkpoint - END-TO-END
- [ ] Visit live Cloudflare Pages URL
- [ ] Test all pages work in production
- [ ] Make a content change via CMS
- [ ] Wait for auto-deployment
- [ ] Verify change appears on live site
- [ ] Check build logs in Cloudflare dashboard
- [ ] Test on mobile device (real phone/tablet)
- [ ] Share URL with a friend/colleague for external testing
- [ ] **USER REVIEW**: Full production workflow must be functional

---

## Phase 6: Content Population
**Duration**: Ongoing
**Status**: PENDING
**Deliverable**: Site with real content

### Tasks
- [ ] Write About/bio content
- [ ] Upload resume (PDF or create embedded version)
- [ ] Organize and upload travel photos
  - Create folder structure
  - Optimize images
- [ ] Write 3-5 initial blog posts
- [ ] Add external app links and descriptions
- [ ] Create favicon and app icons
- [ ] Create social share images (Open Graph)
- [ ] Add author bio and photo
- [ ] Review all content for typos and formatting
- [ ] Test all content displays correctly

### Acceptance Criteria
- About page has complete bio
- Resume is viewable/downloadable
- Travel gallery has at least 2 collections
- Blog has at least 3 published posts
- Apps page lists external projects
- All images optimized and loading properly

---

## Phase 7: Enhancements & Polish
**Duration**: 2-3 days
**Status**: PENDING
**Deliverable**: Production-ready site with SEO and performance

### Tasks
- [ ] Add SEO optimizations:
  - Meta tags (title, description)
  - Open Graph tags (og:title, og:image, etc.)
  - Twitter Cards
  - JSON-LD structured data
- [ ] Generate sitemap.xml
- [ ] Create robots.txt
- [ ] Performance optimization:
  - Use `next/image` for all images
  - Implement lazy loading
  - Analyze bundle size
  - Remove unused dependencies
- [ ] Add analytics:
  - Google Analytics, Plausible, or Vercel Analytics
- [ ] (Optional) Add comment system:
  - Giscus (GitHub Discussions)
- [ ] (Optional) Add search functionality
- [ ] Create custom 404 page
- [ ] Add loading states for dynamic content
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness final check
- [ ] Accessibility audit (WCAG AA compliance)
- [ ] Lighthouse score optimization (aim for 90+ in all categories)

### Acceptance Criteria
- Lighthouse scores: Performance 90+, Accessibility 95+, Best Practices 90+, SEO 100
- All meta tags present and correct
- Sitemap accessible at `/sitemap.xml`
- Analytics tracking page views
- No console errors or warnings
- Works on all major browsers
- Mobile-friendly (passes Google Mobile-Friendly Test)

### 🧪 User Testing Checkpoint - FINAL QA
- [ ] Run Lighthouse audit (Chrome DevTools)
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on iOS and Android devices
- [ ] Share with 2-3 people for feedback
- [ ] Test all links (internal and external)
- [ ] Test form submissions if any
- [ ] Verify analytics is tracking
- [ ] Run Google Mobile-Friendly Test
- [ ] Check Open Graph preview (LinkedIn, Twitter)
- [ ] **USER REVIEW**: Final approval before launch

---

## Phase 8: Documentation & Handoff
**Duration**: 1-2 days
**Status**: PENDING
**Deliverable**: Complete documentation

### Tasks
- [ ] Update README.md:
  - Project overview
  - Features list
  - Tech stack
  - Local development setup
  - Deployment instructions
  - Content management guide
- [ ] Document architecture decisions (ADR style)
- [ ] Create troubleshooting guide
- [ ] Document custom domain setup process
- [ ] Write resume-ready project description
- [ ] Create demo screenshots/GIFs
- [ ] (Optional) Record demo video
- [ ] Add license (MIT recommended)
- [ ] Final code review and cleanup
- [ ] Remove TODO comments
- [ ] Remove console.logs

### Acceptance Criteria
- README is comprehensive and clear
- New developer can clone and run locally
- Deployment process is documented
- CMS usage is explained
- Code is clean and well-commented
- Ready to showcase on resume/portfolio

---

## Future Enhancements (Post-Launch)

### Optional Phase 9: Advanced Features
- [ ] Add custom domain
- [ ] Implement dark mode
- [ ] Add RSS feed for blog
- [ ] Add blog categories/tags
- [ ] Add blog search
- [ ] Add reading time estimates
- [ ] Add view counter (using Cloudflare Analytics API)
- [ ] Add newsletter signup (e.g., ConvertKit, Buttondown)
- [ ] Add contact form (using Cloudflare Workers or form service)
- [ ] Add MDX support for interactive blog posts
- [ ] Implement i18n (internationalization)
- [ ] Add automated testing (Jest, React Testing Library, Playwright)

---

## Dependencies Between Phases

```
Phase 0 (Setup)
    ↓
Phase 1 (Pages) ←→ Phase 2 (Styling) [Can partially overlap]
    ↓
Phase 3 (Content Infrastructure)
    ↓
Phase 4 (CMS)
    ↓
Phase 5 (CI/CD)
    ↓
Phase 6 (Content) ←→ Phase 7 (Polish) [Can overlap]
    ↓
Phase 8 (Documentation)
```

---

## Success Metrics

- **Technical**:
  - 100% TypeScript coverage
  - Lighthouse score 90+ in all categories
  - Zero console errors
  - Build time < 2 minutes

- **Functional**:
  - All pages load correctly
  - CMS workflow functional
  - Auto-deployment working
  - Mobile responsive

- **Business**:
  - Professional presentation
  - Resume-ready tech stack
  - Zero hosting costs
  - Easy to maintain

---

## Notes
- Focus on quality over speed
- Each phase should be fully functional before moving to next
- Commit at the end of each completed phase
- Update TODO.md when starting a new phase
- Document any deviations from this plan in DEBUG_NOTES.md
