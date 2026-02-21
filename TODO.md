# Current Phase: Phase 5 - CI/CD & Deployment

**Goal**: Set up automated deployment pipeline to Cloudflare Pages with GitHub Actions.

**Status**: PENDING
**Next**: Cloudflare Pages setup and GitHub Actions configuration

---

## Tasks

### ✅ Completed Phases (0-4)
- [x] Project setup and configuration (Phase 0)
- [x] All core pages created (Phase 1)
- [x] Navigation and Footer components (Phase 1)
- [x] UI component library (Phase 2)
- [x] Light/Dark theme toggle (Phase 2)
- [x] Interactive travel map with EXIF photo dates (Phase 2.5)
- [x] Markdown content infrastructure with syntax highlighting (Phase 3)
- [x] **Decap CMS Integration (Phase 4)** ✅

---

## 📋 Phase 4 Summary (COMPLETED ✅)

### What Was Built
- ✅ **Admin panel** at `/admin` with Decap CMS
- ✅ **Local backend mode** for development testing
- ✅ **4 content collections**: Blog, About, Travel Galleries, Apps/Projects
- ✅ **Unified location system** - CMS controls both map pins and photo folders
- ✅ **Dynamic content loading** - Bio, resume, and travel locations from CMS
- ✅ **Year range fields** for home locations (Start Year / End Year)

### Key Features
- **Blog Posts**: Title, date, description, tags, featured image, draft mode, Markdown editor
- **About Page**: Bio and Resume sections with Markdown content
- **Travel Galleries**: Location metadata with coordinates, type (home/tourism), year ranges, photo folder references
- **Apps/Projects**: Project showcase with URLs, tech stack, status tracking

### Issues Fixed During Phase 4
1. ✅ Footer headings invisible in dark mode → Added theme-aware colors
2. ✅ Code blocks barely visible in dark mode → Solid backgrounds with borders
3. ✅ Admin 404 error → Created Next.js route with iframe to static CMS
4. ✅ CMS config not loading → Fixed config.yml path and iframe setup
5. ✅ Bio changes not appearing → Made About page read from CMS dynamically
6. ✅ Resume not updating → Added resume content loading
7. ✅ Travel gallery broken workflow → Unified to read from individual CMS JSON files
8. ✅ Photo folders hardcoded → Now generated from same CMS data as map
9. ✅ Map pins open gallery immediately → Added info popup first, then "View Photos" button
10. ✅ Wrong data display in popups → Fixed to use correct CMS fields (startYear/endYear)
11. ✅ Date fields not saving → Changed from datetime to number widget for year inputs
12. ✅ Photo folder cards not clickable → Added click handlers

### Files Created/Modified
**Created**:
- `public/admin/index.html` - Original static CMS entry
- `public/admin-cms.html` - Static CMS with config link
- `public/config.yml` - CMS configuration (master copy)
- `public/admin/config.yml` - CMS configuration (synced copy)
- `app/admin/page.tsx` - Admin route (iframes static CMS)
- `app/admin/layout.tsx` - Admin layout
- `components/AboutClient.tsx` - Client component for travel map and photo folders
- `content/apps/.gitkeep` - Apps directory marker
- Various documentation files (PHASE4_*.md, CMS_WORKFLOW_GUIDE.md, etc.)

**Modified**:
- `lib/markdown.ts` - Added getBio(), getResume(), getTravelLocations()
- `lib/types.ts` - Updated TravelLocation interface (coordinates, startYear, endYear)
- `app/about/page.tsx` - Loads bio, resume, travel data from CMS
- `components/Navigation.tsx` - Added Admin link
- `components/Footer.tsx` - Fixed dark mode colors
- `components/TravelMap.tsx` - Accepts locations as props instead of fetching
- `components/MapView.tsx` - Fixed popup behavior and data display
- `app/globals.css` - Enhanced code block styling
- `package.json` - Added decap-cms-app dependency

### Testing Results
- ✅ Bio editing via CMS works
- ✅ Resume editing via CMS works
- ✅ Travel gallery creation works (map pins + photo folders)
- ✅ Year range inputs work properly
- ✅ Map pin popups show correct info
- ✅ Photo folders clickable and open gallery
- ✅ Dark mode styling fixed
- ✅ All builds pass
- ✅ **USER APPROVED** - Phase 4 complete

---

## 🔄 Phase 5: CI/CD & Deployment (NEXT)

### Tasks Overview
- [ ] Create Cloudflare account
- [ ] Create new Cloudflare Pages project
- [ ] Connect GitHub repository to Cloudflare Pages
- [ ] Configure build settings:
  - Build command: `npm run build`
  - Output directory: `out`
  - Node version: 18+
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Configure GitHub Actions workflow:
  - Trigger on push to `master`
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
- [ ] Site deploys automatically on push to `master`
- [ ] Build passes all checks (TypeScript, lint, build)
- [ ] Site accessible at Cloudflare Pages URL
- [ ] Preview deployments work for PRs
- [ ] Full CMS → GitHub → Deploy workflow functional

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

## Notes

### Phase 4 Learnings
- CMS workflow: Upload photos via GitHub → Create location metadata via CMS
- Single source of truth: `/content/travel/*.json` controls both map and folder grid
- Number widgets more reliable than datetime for year inputs
- Separate concerns: Server components for data fetching, client components for interactivity
- Always test dark mode alongside light mode

### For Phase 5
- Branch strategy: Main branch (`master`) for production
- CMS will need GitHub OAuth for production (currently using local backend)
- Consider adding environment variables for API keys if needed
- Test deployment thoroughly before making site public

---

## GitHub OAuth Setup (Optional - After Phase 5)

Once site is deployed, you can enable production CMS access:

1. Create GitHub OAuth App at https://github.com/settings/developers
2. Configure OAuth credentials in Cloudflare (or use Netlify Identity)
3. Update `public/config.yml`: Set `local_backend: false`
4. Test CMS login on live site
5. Verify auto-commits work

**For now**: Local backend mode is sufficient for development

---

**Current Status**: Phase 4 complete ✅ | Phase 5 ready to begin
