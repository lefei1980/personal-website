# Phase 4: Decap CMS Setup Guide

## ✅ Completed Steps

### 1. Installation ✅
- [x] Installed `decap-cms-app` package
- [x] Created `/public/admin/` directory
- [x] Created `/public/admin/index.html` (CMS entry point)
- [x] Created `/public/admin/config.yml` (CMS configuration)
- [x] Created `/content/apps/` directory for app entries

### 2. Configuration ✅
The CMS has been configured with the following collections:

**Blog Posts** (`/content/blog/`)
- Title, date, description, tags
- Optional featured image
- Draft status support
- Markdown editor with preview

**About Page** (`/content/about/`)
- Bio section with intro and body
- Resume section (supports PDF upload)
- Profile photo support

**Travel Galleries** (`/content/travel/`)
- Location name, type (home/tourism), country
- Coordinates (lat/lng) for map display
- Visit date and description
- Photo galleries with captions

**Apps & Projects** (`/content/apps/`)
- Title, description, URLs (demo + GitHub)
- Tech stack list
- Status tracking (active/maintenance/archived)
- Screenshot and detailed markdown

---

## 🔧 Required: GitHub OAuth Setup

To enable authentication and allow Decap CMS to commit to your repository, you need to create a GitHub OAuth App.

### Step 1: Create GitHub OAuth App

1. Go to GitHub: https://github.com/settings/developers
2. Click **"OAuth Apps"** in the left sidebar
3. Click **"New OAuth App"**
4. Fill in the form:
   - **Application name**: `Personal Website CMS`
   - **Homepage URL**: `http://localhost:3000` (for local dev)
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
   - **Description**: (optional) `Content management for personal website`
5. Click **"Register application"**
6. You'll see your **Client ID** displayed
7. Click **"Generate a new client secret"** and save it (you won't see it again!)

### Step 2: Configure Netlify Identity (For Authentication)

Decap CMS uses Netlify's authentication proxy even if you're not hosting on Netlify. This is already configured in `/public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: lefei1980/personal-website
  branch: master
  base_url: https://api.netlify.com
  auth_endpoint: auth
```

**Note**: For local development, you can use Decap's test backend or local backend mode.

### Step 3: Local Development Authentication Options

#### Option A: Local Backend (Recommended for Development)

1. Edit `/public/admin/config.yml` and uncomment:
   ```yaml
   local_backend: true
   ```

2. Run the local proxy server:
   ```bash
   npx decap-server
   ```

3. In another terminal, run your dev server:
   ```bash
   npm run dev
   ```

4. Access the CMS at `http://localhost:3000/admin`
5. You can now create/edit content without GitHub OAuth

#### Option B: Use GitHub OAuth (For Production-like Testing)

1. Create a Netlify account (free): https://app.netlify.com/signup
2. Deploy your site to Netlify or use Netlify Identity standalone
3. In Netlify dashboard:
   - Go to **Site Settings → Access control → OAuth**
   - Add your GitHub OAuth credentials (Client ID and Secret)
4. Access the CMS at your deployed URL's `/admin`

---

## 🧪 Testing Checklist

### Local Testing (with local_backend)

- [ ] Navigate to `http://localhost:3000/admin`
- [ ] CMS interface loads without errors
- [ ] Click **"Login"** (no authentication required in local mode)
- [ ] Create a new blog post:
  - [ ] Fill in title, date, description
  - [ ] Add some tags
  - [ ] Write body content with Markdown
  - [ ] Click **"Save"** → Check file created in `/content/blog/`
- [ ] Edit an existing blog post
  - [ ] Modify content
  - [ ] Save → Check file updated
- [ ] Upload an image:
  - [ ] Use the image widget
  - [ ] Verify image saved to `/public/images/uploads/`
- [ ] Test the About page editor:
  - [ ] Edit bio content
  - [ ] Save → Check `/content/about/bio.md`
- [ ] Test creating a travel location:
  - [ ] Add location name, coordinates
  - [ ] Set type (home or tourism)
  - [ ] Save → Check `/content/travel/[slug].json`
- [ ] Test creating an app entry:
  - [ ] Add app details
  - [ ] Save → Check `/content/apps/[slug].md`

### Production Testing (with GitHub OAuth)

- [ ] Push changes to GitHub
- [ ] Deploy to Cloudflare Pages (or hosting platform)
- [ ] Navigate to `https://your-site.pages.dev/admin`
- [ ] Click **"Login with GitHub"**
- [ ] Authorize the OAuth app
- [ ] Create/edit content via CMS
- [ ] Check GitHub repository for new commits (authored by your GitHub account)
- [ ] Verify changes trigger automatic rebuild
- [ ] Confirm content appears on live site

---

## 📁 File Structure After Phase 4

```
personal-website/
├── public/
│   ├── admin/
│   │   ├── index.html          ← CMS entry point
│   │   └── config.yml          ← CMS configuration
│   └── images/
│       └── uploads/            ← CMS uploaded images
├── content/
│   ├── blog/                   ← Blog posts (existing)
│   ├── about/                  ← About page content (existing)
│   ├── travel/                 ← Travel locations (existing)
│   └── apps/                   ← App entries (NEW)
│       └── .gitkeep
├── package.json                ← Updated with decap-cms-app
└── PHASE4_SETUP.md            ← This file
```

---

## 🐛 Troubleshooting

### Issue: CMS loads but shows "Error loading config"
**Solution**: Check `/public/admin/config.yml` for YAML syntax errors. Use a YAML validator.

### Issue: "Cannot connect to backend"
**Solution**:
- For local dev: Make sure `local_backend: true` is enabled and `npx decap-server` is running
- For production: Verify GitHub OAuth credentials are correctly configured

### Issue: Images not uploading
**Solution**: Check that `media_folder` and `public_folder` paths are correct in `config.yml`

### Issue: Changes not appearing in Git
**Solution**:
- Local backend: Files are saved directly (no Git commits in local mode)
- Production: Check GitHub OAuth permissions and Netlify Identity setup

### Issue: "Failed to persist entry"
**Solution**: Verify file paths and permissions. Check browser console for detailed errors.

---

## 📝 Next Steps

1. **Complete Phase 4 Testing** (see checklist above)
2. **Update TODO.md** when all tasks are verified
3. **Phase 5**: Set up CI/CD and deployment to Cloudflare Pages
4. **Phase 6**: Populate with real content
5. **Phase 7**: SEO and performance optimization

---

## 🔗 Resources

- **Decap CMS Documentation**: https://decapcms.org/docs/intro/
- **Configuration Reference**: https://decapcms.org/docs/configuration-options/
- **GitHub Backend**: https://decapcms.org/docs/github-backend/
- **Widget Reference**: https://decapcms.org/docs/widgets/
- **GitHub OAuth Apps**: https://github.com/settings/developers

---

## ⚠️ Important Notes

1. **GitHub OAuth is required for production** - Local backend is only for development
2. **Always test locally first** with `local_backend: true` before configuring OAuth
3. **Media files** uploaded via CMS are stored in Git (consider file size limits)
4. **Editorial workflow** is disabled by default (can enable for draft/review/publish flow)
5. **Site URL** in config.yml should be updated after deployment

---

**Status**: Phase 4 setup complete. Ready for testing.
