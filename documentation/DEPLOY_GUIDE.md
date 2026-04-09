# Quick Cloudflare Pages Deployment Guide

## Method 1: GitHub Connection (Recommended - Auto-deploys on push)

### Step 1: Push to GitHub
1. Open **GitHub Desktop** (already installed on your system)
2. It should show your changes in the `mariliam` repository
3. Click **"Push origin"** to sync to GitHub

### Step 2: Connect to Cloudflare Pages
1. Go to **https://dash.cloudflare.com**
2. Log in to your Cloudflare account
3. Click **"Workers & Pages"** in the sidebar
4. Click **"Create application"** → **"Pages"** → **"Connect to Git"**
5. Authorize Cloudflare to access your GitHub account
6. Select the **`sharpandpearl/mariliam`** repository
7. Click **"Begin setup"**

### Step 3: Configure Build Settings
- **Project name**: `mariliam` (or whatever you prefer)
- **Production branch**: `main`
- **Build command**: Leave empty (static site)
- **Build output directory**: `/` (root)
- Click **"Save and Deploy"**

That's it! Your site will be live in ~1 minute at:
`https://mariliam.pages.dev`

---

## Method 2: Direct Upload (Quick test)

1. Go to **https://dash.cloudflare.com**
2. Click **"Workers & Pages"** → **"Create application"** → **"Pages"**
3. Click **"Upload assets"**
4. Drag and drop these files:
   - index.html
   - about.html
   - expertise.html
   - services.html
   - contact.html
   - thank-you.html
   - style.css
   - images/ folder (with headshot.png and og-image.png)
5. Click **"Deploy site"**

**Note:** Method 1 is better because it auto-deploys when you push changes to GitHub!

---

## After Deployment

### 1. Web3Forms Configuration
✅ Already configured with access key: `8fbf89a2-8c43-41dc-a92a-d97c156637c2`
- Forms send to: Andria.White2019@gmail.com
- See `SETUP_INSTRUCTIONS.md` for details

### 2. Add Custom Domain (Optional)
1. In Cloudflare Pages project, click **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Enter your domain (e.g., `mariliam.com`)
4. Follow DNS setup instructions
5. Update redirect URL in `contact.html`

### 3. Verify Contact Form Configuration
✅ Already configured! The redirect URL on line 73 in `contact.html` is set to:
```html
<input type="hidden" name="redirect" value="https://mariliam.co/thank-you.html">
```

If you deploy to a different domain, update this URL accordingly.

---

## Your Site Is Live At:
✅ **https://mariliam.co**

🎉 **Your professional website is live and ready!**
