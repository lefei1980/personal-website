# CMS and GitHub Workflow Guide

## How CMS and GitHub Work Together

### Overview
Your website uses **both** CMS and GitHub as content sources. They work on the same files without conflict.

```
┌─────────────────────────────────────────────────────┐
│                Your Content Files                    │
│  /content/blog/*.md                                  │
│  /content/about/*.md                                 │
│  /content/travel/*.json                              │
│  /public/images/travel/*/                            │
└──────────────┬──────────────────────┬───────────────┘
               │                      │
        Edit via CMS          Edit via GitHub
               │                      │
               ↓                      ↓
      ┌────────────────┐    ┌─────────────────┐
      │ Decap CMS      │    │ Code Editor     │
      │ /admin         │    │ or GitHub.com   │
      └────────────────┘    └─────────────────┘
```

---

## Two Modes: Local vs Production

### Local Backend Mode (Current Setup)
**Status**: `local_backend: true` in config.yml

**How it works:**
- CMS writes files directly to your filesystem
- **No Git commits** are created by CMS
- You review changes and commit manually
- Perfect for development and testing

**Workflow:**
1. Edit content via CMS at `localhost:3000/admin`
2. CMS saves files to `/content/` directories
3. Review changes with `git status`
4. Commit when ready: `git add . && git commit`
5. Push to GitHub

---

### GitHub OAuth Mode (Production)
**Status**: Not yet configured (requires OAuth setup)

**How it works:**
- CMS authenticates via GitHub
- Every save creates a Git commit automatically
- Commits are pushed to your repository
- Triggers automatic rebuild and deployment

**Workflow:**
1. Edit content via CMS at `yourdomain.com/admin`
2. Click "Save" → CMS commits to GitHub
3. GitHub Actions triggers build
4. Cloudflare Pages deploys updated site
5. Changes live in ~2-5 minutes

**Setup required:**
- Create GitHub OAuth App (see PHASE4_SETUP.md)
- Configure OAuth credentials
- Disable local backend: `local_backend: false`

---

## When to Use CMS vs GitHub

### ✅ Use CMS For:

**Blog Posts:**
- Creating new posts
- Editing existing posts
- Managing drafts
- Adding tags and metadata
- Quick typo fixes

**About Page:**
- Updating bio content
- Changing profile photo
- Updating resume

**Travel Locations:**
- Adding new location metadata
- Setting coordinates for map pins
- Updating descriptions
- Marking location type (home/tourism)

**Why CMS?**
- User-friendly interface
- Live preview for Markdown
- No need to know file format
- Great for non-technical users
- Mobile-friendly (in production)

---

### ✅ Use GitHub/File System For:

**Travel Photos:**
- Batch uploading many photos
- Organizing photo folders
- Renaming/deleting images
- Managing large files

**Code Changes:**
- Updating components
- Modifying styling
- Configuration changes
- Adding features

**Bulk Operations:**
- Moving/renaming multiple files
- Reorganizing content structure
- Large-scale refactoring

**Why GitHub?**
- Better for batch operations
- Full Git history and diffs
- IDE tools (search, replace)
- Faster for many files
- Better for large images

---

## Travel Gallery Workflow (Updated)

### Recommended Process

**For new locations:**

1. **Upload photos via GitHub:**
   ```bash
   # Create folder for location
   mkdir -p public/images/travel/paris

   # Upload photos (via drag-drop in GitHub UI or command line)
   # Photos will be at: public/images/travel/paris/*.jpg
   ```

2. **Create location metadata via CMS:**
   - Go to `/admin` → "Travel Galleries" → "New Travel Gallery"
   - Fill in:
     - **Location Name**: e.g., "Paris, France"
     - **Type**: Tourism or Home
     - **Country**: e.g., "France"
     - **Coordinates**: Find on Google Maps (right-click → copy coordinates)
     - **Date/Year**:
       - Home: Year you lived there
       - Tourism: Leave empty or add visit date
     - **Description**: Optional notes
     - **Photo Folder Name**: `paris` (matches folder name)
   - Click **Publish**

3. **CMS creates:** `/content/travel/paris.json`

4. **Your map displays the location** with photos from the folder

### Important Notes

- **Photos uploaded via CMS** go to `/public/images/uploads/` (one at a time)
- **Photos uploaded via GitHub** go to `/public/images/travel/[location]/` (batch upload)
- **Use GitHub for photos** - much faster for multiple images
- **Use CMS for metadata** - easier to set coordinates and details

---

## Will CMS Overwrite GitHub Changes?

### Short Answer: No conflicts if you follow best practices

### How Git Handles Changes

**Scenario 1: Edit different files**
- ✅ No conflict
- Both changes coexist happily

**Scenario 2: Edit same file, different times**
- ✅ No conflict
- Later edit overwrites earlier (normal)

**Scenario 3: Edit same file simultaneously**
- ⚠️ Possible conflict
- Git will ask you to merge
- Avoid by: don't edit same file in both places at once

**Scenario 4: CMS commit while you have local changes**
- ⚠️ Pull before pushing
- Standard Git workflow: `git pull` then `git push`

### Best Practices

1. **Pick your tool per file:**
   - Blog posts → CMS
   - Code → GitHub
   - Photos → GitHub
   - Location metadata → CMS

2. **Don't edit the same file in both places:**
   - If editing a blog post in CMS, don't edit it in GitHub
   - Finish one edit before starting another

3. **In local mode:**
   - CMS changes are just local file edits
   - Review with `git status` before committing
   - No surprises

4. **In production mode:**
   - CMS commits immediately
   - Pull before making manual edits: `git pull`
   - Push your changes: `git push`

---

## Field Visibility Question: Date for Home vs Tourism

### Current Behavior
The "Date/Year" field shows for **both** home and tourism locations.

### Why?
Decap CMS (free version) doesn't support conditional field visibility. The field appears regardless of "Type" selection.

### How to Use It

**For Home Locations:**
- ✅ **Fill in the date** (year you lived there)
- Used to calculate year range displayed on map
- Example: "2015-2020" if you lived in Beijing from 2015-2020

**For Tourism Locations:**
- ⏭️ **Leave empty** or optionally add visit date
- Not required for tourism pins
- Only fill if you want to track when you visited

### Workaround Options

If you want true conditional fields:

1. **Separate collections** (not recommended):
   - "Home Locations" collection
   - "Tourism Locations" collection
   - More complex to maintain

2. **Use hints** (current approach):
   - Keep one field with clear instructions
   - User knows when to fill vs skip

3. **Upgrade to Decap CMS Pro** (overkill for this):
   - Supports conditional logic
   - Paid feature

**Recommendation:** Keep current setup. The hint text clarifies usage, and it's simpler to maintain one collection.

---

## Quick Reference

### CMS Access
- **Local:** `http://localhost:3000/admin`
- **Production:** `https://yourdomain.com/admin`

### File Locations
- **Blog posts:** `/content/blog/*.md`
- **About page:** `/content/about/*.md`
- **Travel metadata:** `/content/travel/*.json`
- **Travel photos:** `/public/images/travel/[location]/*.jpg`
- **CMS uploads:** `/public/images/uploads/`

### Commands

**Local testing:**
```bash
npx decap-server    # Terminal 1 (local backend proxy)
npm run dev         # Terminal 2 (dev server)
```

**Check CMS changes:**
```bash
git status          # See what CMS modified
git diff            # See exact changes
```

**Commit CMS changes:**
```bash
git add .
git commit -m "Update content via CMS"
git push
```

---

## Summary

| Task | Tool | Why |
|------|------|-----|
| Write blog post | CMS | Easy editor, preview |
| Upload 20 photos | GitHub | Batch upload faster |
| Update bio | CMS | Quick edit, no file format knowledge |
| Add location pin | CMS | Easy coordinate picker |
| Change theme color | GitHub | Code change |
| Fix typo in post | Either | Both work fine |
| Create new component | GitHub | Requires coding |
| Schedule post | CMS | Has publish date field |

**Golden Rule:** Use the tool that makes your life easier for the specific task. Both work on the same files, no conflicts if you avoid editing the same file in both places at once.

---

## What Changed in Config

**Before:**
- Individual photo uploads via CMS
- Unclear date field purpose

**After:**
- "Photo Folder Name" field → points to GitHub-uploaded folders
- Clear hints for home vs tourism date usage
- Simplified workflow: photos via GitHub, metadata via CMS

**Updated fields:**
- ✏️ Type: Added hint about home vs tourism
- ✏️ Coordinates: Added hint about Google Maps
- ✏️ Date/Year: Clarified usage for each type
- ➕ Photo Folder Name: New field for folder reference
- ➖ Photos list: Removed (use GitHub instead)

---

**Need help?** See PHASE4_SETUP.md for CMS setup details.
