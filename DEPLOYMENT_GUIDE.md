# Afrivibe Website - Vercel Deployment Guide

## Quick Summary

Your website is a **static site** (HTML/CSS/JavaScript), making deployment to Vercel very straightforward. No server setup required!

---

## LOCAL SETUP (Before Deployment)

### 1. Initialize Git Repository

```bash
cd /home/gabriel/Files/afrivibe
git init
git add .
git commit -m "Initial commit: Afrivibe website"
```

### 2. Create .gitignore File

Create a `.gitignore` file to exclude unnecessary files:

```
# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.code-workspace

# Dependencies (if added in future)
node_modules/
package-lock.json
yarn.lock

# Environment files
.env
.env.local

# Build files (if added in future)
dist/
build/
out/
```

### 3. Verify Project Structure

Ensure all files are in place:

- `Homepage.html` (main entry point - served as index)
- `About.html`, `contact.html`, `team.html`, `collections.html`
- All CSS files (index.css, navbar.css, footer.css, etc.)
- `script.js`
- `Assets/` folder with all images
- `vercel.json` ✅ (already configured)

### 4. Rename Homepage.html to index.html (IMPORTANT)

```bash
mv Homepage.html index.html
```

Then update all internal links in your HTML files:

- Change `href="./Homepage.html"` → `href="./"`
- Keep other file links unchanged

---

## VERCEL SETUP (Online)

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose "Continue with GitHub" (recommended for easy deployment)
4. Authorize Vercel to access your GitHub account

### Step 2: Push Code to GitHub

```bash
# Create new GitHub repository at github.com/new

# Add remote to your local repo
git remote add origin https://github.com/YOUR_USERNAME/afrivibe.git

# Rename main branch (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Project**
3. Paste your GitHub repo URL: `https://github.com/YOUR_USERNAME/afrivibe.git`
4. Click **Continue**
5. Project will be automatically detected as static site
6. Keep default settings (no build step needed)
7. Click **Deploy**

### Step 4: Configure Custom Domain (Optional)

After deployment:

1. Go to your Vercel project settings
2. Click **Domains**
3. Add your custom domain (e.g., afrivibe.com)
4. Follow DNS configuration instructions

---

## VERCEL CONFIGURATION (vercel.json)

Your `vercel.json` includes:

✅ **Clean URLs**: `/About` instead of `/About.html`  
✅ **No trailing slashes**: `/About` not `/About/`  
✅ **Rewrites**: Handles navigation without .html extensions  
✅ **Caching headers**:

- Static assets (images, CSS, JS): Cached for 1 year
- HTML files: Cached for 1 hour (allows updates)

---

## IMPORTANT CHANGES BEFORE DEPLOYMENT

### 1. Update All Navigation Links

Replace all instances of:

```html
<!-- OLD -->
<a href="./Homepage.html">Home</a>

<!-- NEW -->
<a href="./">Home</a>
```

### 2. Verify Asset Paths

All Asset paths should work as-is:

```html
<img src="./Assets/logo-nav.svg" />
<!-- These will work correctly on Vercel -->
```

### 3. Check Social Media Links

Ensure external links are correct:

- Twitter, Instagram, LinkedIn URLs

---

## DEPLOYMENT CHECKLIST

Before you deploy, verify:

- [ ] Git repository initialized and connected to GitHub
- [ ] All files pushed to GitHub main branch
- [ ] `index.html` is the main entry point (not `Homepage.html`)
- [ ] All navigation links updated (no `.html` extensions)
- [ ] `vercel.json` is configured (already done)
- [ ] `.gitignore` created (optional but recommended)
- [ ] All image paths verified (`Assets/` folder uploaded)
- [ ] `script.js` and all CSS files included
- [ ] Tested locally: Open `index.html` in browser, test all links

---

## POST-DEPLOYMENT TESTING

After deployment, verify:

1. **Home Page**: `https://your-domain.vercel.app/`
2. **Collections**: `https://your-domain.vercel.app/collections`
3. **About**: `https://your-domain.vercel.app/About`
4. **Team**: `https://your-domain.vercel.app/team`
5. **Contact**: `https://your-domain.vercel.app/contact`
6. **Interactive Features**:
   - Featured carousel scrolls smoothly
   - Testimonial carousel works
   - Collections filters/sorting functions
   - Image hover animations
7. **Images**: All load correctly
8. **Marquee text**: Scrolls smoothly

---

## TROUBLESHOOTING

### Issue: Pages return 404

**Solution**: Ensure `vercel.json` is configured with rewrites (already done)

### Issue: Links show .html extensions

**Solution**: Update links to remove `.html` extension

### Issue: Images not loading

**Solution**: Verify `Assets/` folder is included in Git, use relative paths `./Assets/`

### Issue: CSS/JS not loading

**Solution**: Verify files are in root directory, check `vercel.json` cache headers

### Issue: Need to redeploy after changes

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
# Vercel automatically redeploys
```

---

## ENVIRONMENT VARIABLES (If Needed Later)

If you need environment variables (analytics, API keys, etc.):

1. Go to Vercel Project Settings
2. Click **Environment Variables**
3. Add your variables
4. Mark as production/preview/development as needed

---

## CONTINUOUS DEPLOYMENT

With GitHub + Vercel setup:

- Every `git push` to main branch automatically deploys
- Each deployment creates a unique preview URL
- Production updates live immediately

---

## NEXT STEPS

1. **Local Setup** (Today):
   - Rename `Homepage.html` → `index.html`
   - Update navigation links
   - Initialize Git + create `.gitignore`
   - Test locally

2. **GitHub Setup** (Today):
   - Create GitHub repository
   - Push all code to main branch

3. **Vercel Deployment** (Today):
   - Import project from GitHub
   - Verify deployment
   - Test all pages and features

4. **Custom Domain** (Optional):
   - Add domain in Vercel settings
   - Update DNS records

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Static Site Hosting**: https://vercel.com/docs/concepts/deployments/static-exports
- **Custom Domains**: https://vercel.com/docs/concepts/projects/domains

---

**Estimated Setup Time**: 15-20 minutes  
**Deployment Time**: 1-2 minutes  
**Monthly Cost**: FREE (unless you need advanced features)

Good luck! 🚀
