# GitHub OAuth Setup for Decap CMS

This guide walks you through enabling GitHub authentication for your CMS admin panel on the live site.

---

## Overview

Currently, your CMS uses `local_backend` (only works in development). For production, you need GitHub OAuth to:
- Login to `/admin` on your live site
- Edit content via the CMS interface
- Auto-commit changes to GitHub

**Solution**: Use Netlify's free OAuth gateway service (works even though you're on Cloudflare Pages)

---

## Step 1: Create GitHub OAuth Application

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/developers
   - Or: GitHub → Settings → Developer settings → OAuth Apps

2. **Click "New OAuth App"**

3. **Fill in the form:**

   ```
   Application name: Personal Website CMS

   Homepage URL: https://970fd91b.personal-website-1mu.pages.dev
   (Or your custom domain when you set it up)

   Application description: Decap CMS authentication for personal website
   (Optional)

   Authorization callback URL: https://api.netlify.com/auth/done
   (This is Netlify's OAuth service endpoint)
   ```

4. **Click "Register application"**

5. **Save your credentials:**
   - You'll see **Client ID** (looks like: `Ov23liAbcDef1234567`)
   - Click **"Generate a new client secret"**
   - Copy the **Client Secret** (looks like: `1234567890abcdef1234567890abcdef12345678`)

   ⚠️ **IMPORTANT**: Save both immediately - you can't view the secret again!

---

## Step 2: Add OAuth App to Netlify

Even though you're hosting on Cloudflare, Netlify provides a free OAuth gateway service.

1. **Create a Netlify Account** (if you don't have one)
   - Go to: https://app.netlify.com/signup
   - Sign up with GitHub (easiest)
   - Free tier is fine

2. **Add OAuth Provider**
   - Go to: https://app.netlify.com/account/applications
   - Scroll to **"OAuth applications"** section
   - Click **"New OAuth application"**

3. **Configure OAuth Provider:**
   ```
   Provider: GitHub
   Client ID: [Paste your GitHub OAuth App Client ID]
   Client Secret: [Paste your GitHub OAuth App Client Secret]
   ```

4. **Click "Install provider"**

---

## Step 3: Update CMS Configuration

Now update your CMS config to use GitHub OAuth in production.

**Edit `public/config.yml`:**

Find this section:
```yaml
backend:
  name: github
  repo: lefei1980/personal-website
  branch: master
  base_url: https://api.netlify.com
  auth_endpoint: auth

# Local backend for development (uncomment to use)
local_backend: true
```

**Change to:**
```yaml
backend:
  name: github
  repo: lefei1980/personal-website
  branch: master
  base_url: https://api.netlify.com
  auth_endpoint: auth

# Local backend for development only
# local_backend: true  # Disabled for production
```

**Also update the site URLs** (lines 22-23):
```yaml
site_url: https://970fd91b.personal-website-1mu.pages.dev
display_url: https://970fd91b.personal-website-1mu.pages.dev
```

---

## Step 4: Deploy Changes

1. **Commit and push the config change:**
   ```bash
   git add public/config.yml
   git commit -m "Enable GitHub OAuth for production CMS"
   git push origin master
   ```

2. **Wait for deployment** (~3-5 minutes)
   - Watch in Cloudflare Pages dashboard

---

## Step 5: Test the CMS Login

1. **Visit your admin panel:**
   ```
   https://970fd91b.personal-website-1mu.pages.dev/admin
   ```

2. **Click "Login with GitHub"**

3. **Authorize the app:**
   - GitHub will ask you to authorize the OAuth app
   - Click "Authorize [your-username]"

4. **You should see the CMS dashboard!** ✅
   - Collections: Blog Posts, About Page, Travel Galleries, Apps & Projects

---

## Step 6: Create Your First Post

Test the workflow:

1. **Click "Blog Posts" → "New Blog Post"**

2. **Fill in the form:**
   - Title: "Hello from the live CMS!"
   - Date: (today)
   - Description: "Testing the CMS workflow"
   - Body: "This post was created via the CMS admin panel."

3. **Click "Save"**
   - CMS commits to GitHub automatically
   - Cloudflare Pages auto-deploys
   - Changes appear on live site in ~3-5 minutes

4. **Visit your blog:**
   ```
   https://970fd91b.personal-website-1mu.pages.dev/blog
   ```
   - Your new post should appear!

---

## Troubleshooting

### Error: "Login failed" or blank page

**Check:**
1. Netlify OAuth provider is installed correctly
2. GitHub OAuth callback URL is exactly: `https://api.netlify.com/auth/done`
3. `local_backend: true` is commented out or removed

### Error: "Not Found" after GitHub auth

**Solution:**
- Clear browser cache
- Try incognito/private window
- Check CMS config is deployed (view source of `/admin`)

### Changes don't appear on site

**This is normal!**
- CMS commits to GitHub
- Cloudflare Pages needs to rebuild (~3-5 minutes)
- Check Cloudflare deployments tab for build status

### Still using local development?

For local development, **keep `local_backend: true` uncommented** in your local version:

```bash
# Use local CMS backend for development
npm run dev
# Visit http://localhost:3000/admin (no GitHub login needed)
```

---

## Development vs Production

| Environment | Config | Login Method |
|-------------|--------|--------------|
| **Local** (`npm run dev`) | `local_backend: true` | No login needed |
| **Production** (Cloudflare) | `local_backend: false` | GitHub OAuth |

**Tip**: Use environment-specific configs if needed, or just toggle `local_backend` when developing locally.

---

## Security Notes

✅ **Safe:**
- OAuth secrets are stored in Netlify (not in your code)
- CMS commits are signed with your GitHub identity
- Only you can login (your GitHub account)

⚠️ **Never commit:**
- Client Secret to your repository
- OAuth credentials in public files

✅ **Already secure:**
- Client ID is safe to be public
- OAuth flow is handled by Netlify/GitHub

---

## Next Steps

After OAuth is working:

1. ✅ **Test CMS workflow** (create/edit/delete content)
2. ✅ **Customize CMS fields** if needed (edit `config.yml`)
3. ✅ **Move to Phase 6**: Start adding real content!

---

## Alternative: Keep Using Local Editing

If GitHub OAuth seems too complex right now, you can skip it and:

1. Edit Markdown files locally in `/content/`
2. Commit and push to GitHub
3. Cloudflare auto-deploys

**CMS is optional** - the site works fine with local editing!

---

**Questions?** Check Decap CMS docs: https://decapcms.org/docs/authentication-backends/
# OAuth configured and tested
