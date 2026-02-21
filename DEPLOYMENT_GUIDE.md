# Cloudflare Pages Deployment Guide

This guide walks you through deploying your personal website to Cloudflare Pages with automated CI/CD.

---

## Prerequisites

- ✅ GitHub repository: `lefei1980/personal-website`
- ✅ Static site built with Next.js (configured for `output: 'export'`)
- ✅ GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- ⏳ Cloudflare account (free tier is sufficient)

---

## Step 1: Create Cloudflare Account

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up for a free account
3. Verify your email address
4. Complete account setup

**Note**: Free tier includes:
- Unlimited bandwidth
- Unlimited requests
- 500 builds per month
- Perfect for personal websites!

---

## Step 2: Create Cloudflare Pages Project

1. **Login to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com

2. **Navigate to Pages**
   - Click "Workers & Pages" in left sidebar
   - Click "Create application"
   - Choose "Pages" tab
   - Click "Connect to Git"

3. **Connect GitHub Account**
   - Click "Connect GitHub"
   - Authorize Cloudflare Pages to access your GitHub account
   - Select "Only select repositories"
   - Choose `lefei1980/personal-website`
   - Click "Install & Authorize"

4. **Configure Build Settings**
   - **Project name**: `personal-website` (or your preferred name)
   - **Production branch**: `master`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (leave as default)

5. **Environment Variables** (if needed)
   - For now, none required
   - Can add later if needed (API keys, etc.)

6. **Advanced Settings**
   - **Node.js version**: Click "Add variable"
     - Variable name: `NODE_VERSION`
     - Value: `18`
   - **Framework preset**: None (or select "Next.js" but we're using custom config)

7. **Save and Deploy**
   - Click "Save and Deploy"
   - First build will start automatically
   - Wait 2-5 minutes for initial deployment

---

## Step 3: Verify Deployment

1. **Check Build Status**
   - You'll be redirected to the project dashboard
   - Watch the build logs in real-time
   - Green checkmark = successful deployment ✅

2. **Visit Your Site**
   - Cloudflare will provide a URL: `https://personal-website-xxx.pages.dev`
   - Click the URL to open your live site
   - Test all pages: `/`, `/about`, `/blog`, `/apps`, `/admin`

3. **Common Issues**
   - ❌ Build fails → Check build logs for errors
   - ❌ 404 errors → Verify `out` directory is correct
   - ❌ Missing assets → Check `public/` folder structure

---

## Step 4: Configure GitHub Actions (Optional but Recommended)

GitHub Actions workflow is already created (`.github/workflows/deploy.yml`). It runs on every push to `master` and:
- ✅ Runs TypeScript type checking
- ✅ Runs ESLint
- ✅ Builds the static site
- ✅ Uploads build artifacts

**What it does:**
- Validates code quality before deployment
- Catches errors early (before Cloudflare builds)
- Provides build artifacts for debugging

**Already configured** - No action needed! It will run automatically on your next push.

---

## Step 5: Test Full CI/CD Workflow

1. **Make a Test Change**
   - Edit a file locally (e.g., update a blog post via CMS or change text in a component)
   - Commit the change: `git add . && git commit -m "Test: verify deployment workflow"`

2. **Push to GitHub**
   - `git push origin master`

3. **Watch Automated Build**
   - **GitHub Actions**: Go to https://github.com/lefei1980/personal-website/actions
     - Watch the "Deploy to Cloudflare Pages" workflow run
     - Should complete in ~2-3 minutes
   - **Cloudflare Pages**: Go to Cloudflare dashboard
     - New deployment will trigger automatically
     - Should complete in ~2-3 minutes

4. **Verify Changes Live**
   - Visit your `*.pages.dev` URL
   - Verify your test change appears
   - ✅ Full workflow successful!

---

## Step 6: Configure Preview Deployments

Cloudflare Pages automatically creates preview deployments for:
- **Pull Requests**: Each PR gets a unique preview URL
- **Non-production branches**: Test features before merging

**How to use:**
1. Create a new branch: `git checkout -b feature/new-feature`
2. Make changes and push: `git push origin feature/new-feature`
3. Create PR on GitHub
4. Cloudflare automatically deploys preview
5. Comment on PR will include preview URL
6. Test changes before merging to `master`

**Already configured** - No setup needed!

---

## Step 7: Custom Domain (Optional)

To use your own domain instead of `*.pages.dev`:

1. **In Cloudflare Pages Dashboard**
   - Go to your project → "Custom domains"
   - Click "Set up a custom domain"

2. **Add Domain**
   - Enter your domain (e.g., `yourname.com`)
   - Follow DNS setup instructions
   - If domain is already on Cloudflare: Automatic setup
   - If domain is external: Add CNAME record

3. **Wait for DNS Propagation**
   - Usually takes 5-30 minutes
   - Sometimes up to 24 hours

4. **Enable HTTPS**
   - Cloudflare provides free SSL certificate
   - Automatic after DNS setup
   - Force HTTPS redirect is automatic

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Developer (You)                         │
│                                                           │
│  1. Edit content via CMS or code                         │
│  2. Commit changes                                       │
│  3. Push to GitHub                                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                 GitHub Repository                        │
│                                                           │
│  - Stores source code                                    │
│  - Triggers workflows                                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│              GitHub Actions (CI)                         │
│                                                           │
│  - Type checking                                         │
│  - Linting                                               │
│  - Build verification                                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│           Cloudflare Pages (Build & Deploy)              │
│                                                           │
│  - Detects push to master                                │
│  - Runs npm run build                                    │
│  - Deploys /out directory                                │
│  - Assigns production URL                                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│            Cloudflare CDN (Global Edge)                  │
│                                                           │
│  - Serves static files worldwide                         │
│  - < 50ms latency globally                               │
│  - Automatic HTTPS                                       │
│  - DDoS protection                                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                   End Users                              │
│                                                           │
│  Visit: https://personal-website-xxx.pages.dev           │
└─────────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Build Fails on Cloudflare

**Check:**
1. Build logs in Cloudflare dashboard
2. Ensure `NODE_VERSION=18` is set
3. Verify `package.json` scripts are correct
4. Test build locally: `npm run build`

**Common fixes:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### 404 Errors After Deployment

**Issue**: Next.js App Router pages show 404

**Solution**: Ensure `next.config.js` has:
```javascript
output: 'export',
trailingSlash: false,
```

**Check**: `out/` directory contains HTML files for all routes

### Admin Panel Not Working

**Issue**: `/admin` returns 404 or blank page

**Possible causes:**
1. `public/admin/` files not deployed
2. Decap CMS config missing
3. Need to set up GitHub OAuth (for production CMS access)

**Solution**: See `CMS_WORKFLOW_GUIDE.md` for GitHub OAuth setup

### Images Not Loading

**Issue**: Images show broken links

**Check:**
1. Images are in `public/` directory
2. Image paths start with `/` (absolute paths)
3. `next.config.js` has `images: { unoptimized: true }`

---

## Next Steps After Deployment

### 1. Set Up GitHub OAuth for CMS (Production)

Currently using `local_backend` for development. For production CMS access:

1. Create GitHub OAuth App: https://github.com/settings/developers
2. Configure OAuth credentials
3. Update `public/config.yml` backend settings
4. Test CMS login on live site

See: `CMS_WORKFLOW_GUIDE.md` for detailed steps

### 2. Enable Analytics (Optional)

**Cloudflare Web Analytics** (free):
1. Go to Cloudflare dashboard → Analytics → Web Analytics
2. Add your site
3. Copy script tag
4. Add to `app/layout.tsx`

**Or use:**
- Vercel Analytics
- Google Analytics
- Plausible Analytics

### 3. Performance Optimization

Run Lighthouse audit:
1. Open Chrome DevTools
2. Go to "Lighthouse" tab
3. Run audit on production URL
4. Aim for 90+ in all categories

**Already optimized:**
- ✅ Static site (fast)
- ✅ Cloudflare CDN (global edge)
- ✅ Image optimization configured

### 4. SEO Improvements

1. Add sitemap.xml (Phase 7)
2. Add robots.txt (Phase 7)
3. Configure Open Graph tags
4. Submit to Google Search Console

---

## Environment Variables

Currently none required. If you add API integrations later:

**In Cloudflare Pages:**
1. Go to project → Settings → Environment variables
2. Add variables for:
   - `Production` environment (master branch)
   - `Preview` environment (PR branches)

**Example:**
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## Cost Breakdown

**Free Tier (Current Usage):**
- ✅ Cloudflare Pages: Free
- ✅ GitHub Actions: Free (2,000 minutes/month)
- ✅ GitHub Repository: Free
- ✅ Cloudflare CDN: Free
- ✅ SSL Certificate: Free

**Total Cost: $0/month** 🎉

**Paid Upgrades (Optional):**
- Custom domain: $10-15/year (domain registrar)
- Cloudflare Pro: $20/month (advanced features, not needed)

---

## Useful Links

- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **GitHub Repository**: https://github.com/lefei1980/personal-website
- **GitHub Actions**: https://github.com/lefei1980/personal-website/actions
- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages
- **Next.js Static Export**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

---

## Summary Checklist

### Initial Setup
- [ ] Create Cloudflare account
- [ ] Create Cloudflare Pages project
- [ ] Connect GitHub repository
- [ ] Configure build settings (npm run build, out/)
- [ ] Set NODE_VERSION=18
- [ ] Deploy and verify site is live

### Testing
- [ ] Visit live URL (*.pages.dev)
- [ ] Test all pages load correctly
- [ ] Test responsive design on mobile
- [ ] Make a test commit and verify auto-deployment
- [ ] Check GitHub Actions runs successfully

### Production Readiness
- [ ] Set up GitHub OAuth for CMS (optional, can do later)
- [ ] Configure custom domain (optional)
- [ ] Enable analytics (optional)
- [ ] Run Lighthouse audit
- [ ] Share with friends for external testing

---

**Status**: Ready to deploy! Follow Steps 1-5 above to get your site live.

**Questions?** Check `DEBUG_NOTES.md` or Cloudflare Pages documentation.
