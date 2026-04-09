# Mariliam Website Setup Instructions

## 📧 Contact Form Setup with Web3Forms

Your contact form is configured to use **Web3Forms** - a free, secure form handling service perfect for Cloudflare Pages.

### Step 1: Get Your Free Web3Forms Access Key

1. Go to **https://web3forms.com**
2. Click **"Create Access Key"**
3. Enter **Andria.White2019@gmail.com** as the email address
4. Click **"Create Access Key"**
5. You'll receive an email with your access key

### Step 2: Verify Access Key (Already Configured)

✅ Your Web3Forms access key is already configured in `contact.html` (line 70):
   ```html
   <input type="hidden" name="access_key" value="8fbf89a2-8c43-41dc-a92a-d97c156637c2">
   ```

If you need to change it later, update this line with your new access key.

### Step 3: Verify Redirect URL (Already Configured)

✅ The redirect URL is already set to your deployed domain in `contact.html` (line 73):
   ```html
   <input type="hidden" name="redirect" value="https://mariliam.co/thank-you.html">
   ```

If you change domains later, update `https://mariliam.co` to your new domain

That's it! Your contact form will now send emails directly to Andria's inbox.

---

## 🚀 Deploy to Cloudflare Pages

### Method 1: Using Git (Recommended)

1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial website setup"
   ```

2. **Push to GitHub**:
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push your code

3. **Connect to Cloudflare Pages**:
   - Log into Cloudflare dashboard
   - Go to **Pages** → **Create a project**
   - Connect your GitHub repository
   - Deploy!

### Method 2: Direct Upload

1. Go to Cloudflare Pages dashboard
2. Click **"Upload assets"**
3. Drag and drop all your HTML/CSS files
4. Deploy!

---

## 📝 Form Features Included

✅ **Spam Protection** - Honeypot field to block bots
✅ **Custom Subject Line** - All emails have clear subject
✅ **Thank You Page** - Professional confirmation after submission
✅ **Email Notifications** - Instant delivery to inbox
✅ **No Monthly Fees** - Completely free with Web3Forms

---

## 🎨 Website Files Overview

- `index.html` - Homepage with stats and value propositions
- `about.html` - Andria's bio, credentials, and career highlights
- `expertise.html` - Therapeutic areas and global experience
- `services.html` - Detailed service offerings
- `contact.html` - Contact form and information
- `thank-you.html` - Confirmation page after form submission
- `style.css` - All styling and design
- `images/headshot.png` - Andria's professional photo

---

## 🔧 Customization Tips

### Update Contact Information
If email changes, update in:
- `contact.html` (footer - andria@mariliam.co)
- All HTML files (footer contact email)

### Change Color Scheme
All colors are in `style.css`. Main brand colors:
- Primary Blue: `#2563eb`
- Dark Blue: `#1a365d`
- Light Blue: `#f0f9ff`

### Add Custom Domain
Your site is deployed at **https://mariliam.co**

If you want to add additional custom domains in Cloudflare Pages:
1. Go to your Pages project
2. Click **"Custom domains"**
3. Add your domain (e.g., www.mariliam.co)
4. Update DNS records as instructed

---

## ❓ Troubleshooting

**Form not sending emails?**
- Double-check your Web3Forms access key is correct
- Check spam folder
- Verify email address in Web3Forms dashboard

**Styling looks broken?**
- Make sure `style.css` is in the same directory as HTML files
- Clear browser cache

**Thank you page not working?**
- Update the redirect URL after deploying
- Or remove the redirect line to use Web3Forms default confirmation

---

## 📞 Need Help?

If you run into any issues, Web3Forms has excellent documentation at:
https://docs.web3forms.com

For Cloudflare Pages support:
https://developers.cloudflare.com/pages/
