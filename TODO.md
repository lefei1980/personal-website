# Current Phase: Phase 2.5 - Interactive Travel Map

**Goal**: Build an interactive world map with clickable location pins and photo galleries on the About page.

**Status**: IN PROGRESS
**Started**: 2026-02-20

---

## Tasks

### ✅ Completed (Phases 0-2)
- [x] Project setup and configuration (Phase 0)
- [x] All core pages created (Phase 1)
- [x] Navigation and Footer components (Phase 1)
- [x] UI component library (Phase 2)
- [x] Light/Dark theme toggle (Phase 2)
- [x] Git commit and push to GitHub ✅

### 🔄 Phase 2.5: In Progress

#### 1. Install Dependencies
- [ ] Install `react-leaflet` (React wrapper for Leaflet.js)
- [ ] Install `leaflet` (map library)
- [ ] Install photo lightbox library (or build custom)

#### 2. Create Location Data Structure
- [ ] Create `/content/travel/locations.json`
- [ ] Define location schema (name, type, coordinates, photos, etc.)
- [ ] Add 3-5 sample locations for testing
- [ ] Include both "home" and "tourism" pin types

#### 3. Build TravelMap Component
- [ ] Create `components/TravelMap.tsx`
- [ ] Initialize world map with OpenStreetMap tiles
- [ ] Add custom markers for two pin types:
  - 🏠 Home/Residence (blue pins)
  - 🌍 Tourism (red/orange pins)
- [ ] Add hover tooltips showing location name
- [ ] Add click handlers to open photo gallery
- [ ] Style map container (responsive height)
- [ ] Add dark mode support for map tiles

#### 4. Build Photo Gallery/Lightbox
- [ ] Create `components/PhotoGallery.tsx`
- [ ] Modal overlay with backdrop
- [ ] Location info header (name, date, description)
- [ ] Photo grid/carousel
- [ ] Full-screen lightbox viewer
- [ ] Navigation controls (prev/next arrows)
- [ ] Keyboard navigation (←/→ arrows, Escape)
- [ ] Mobile swipe support
- [ ] Close on backdrop click
- [ ] Dark mode styling

#### 5. Add Sample Travel Photos
- [ ] Create folder structure in `/public/images/travel/`
- [ ] Add sample photos for test locations
- [ ] Optimize image sizes

#### 6. Update About Page
- [ ] Import and add TravelMap component
- [ ] Replace placeholder travel gallery with map
- [ ] Keep folder-based gallery below map (dual access)
- [ ] Add loading state for map
- [ ] Ensure responsive layout

#### 7. Performance & Polish
- [ ] Lazy load map library (only on About page)
- [ ] Lazy load photos (only when gallery opened)
- [ ] Add loading spinners
- [ ] Test with 30-50 location markers
- [ ] Optimize for mobile devices
- [ ] Add error handling for failed image loads

---

## Acceptance Criteria
- [ ] World map displays correctly on About page
- [ ] Pins appear at correct geographic coordinates
- [ ] Two distinct pin types are visible (different colors/icons)
- [ ] Hover over pin shows location name tooltip
- [ ] Click pin opens photo gallery modal
- [ ] Photos display correctly in lightbox
- [ ] Lightbox navigation works (prev/next/close/keyboard)
- [ ] Both map and folder gallery lead to same photos
- [ ] Responsive on mobile and desktop
- [ ] Works in both light and dark themes
- [ ] No performance issues with multiple locations
- [ ] Images lazy load properly

---

## 🧪 User Testing Checkpoint
**Before proceeding to Phase 3, user must verify:**
- [ ] Map loads without errors
- [ ] Pins show in correct locations worldwide
- [ ] Pin types are distinguishable (different colors/icons)
- [ ] Tooltips appear on hover
- [ ] Click pin → gallery modal opens smoothly
- [ ] Photos load and display correctly
- [ ] Lightbox controls work (arrows, escape, click outside)
- [ ] Test on mobile device/emulator
- [ ] Test in both light and dark themes
- [ ] Page performance is acceptable
- [ ] **USER APPROVAL REQUIRED** to proceed to Phase 3

---

## Next Phase Preview
**Phase 3: Content Infrastructure** will add:
- Markdown file parsing with gray-matter
- Blog post rendering with syntax highlighting
- Real content from .md files
- Support for embedded images and videos
- Content utilities in `/lib`

---

## Notes
- Using Leaflet.js (free, open-source)
- OpenStreetMap tiles (free)
- ~30-50 locations supported (tested at scale)
- Photos stored in `/public/images/travel/[location]/`
- Location metadata in JSON format
- Client-side only (no backend needed)
