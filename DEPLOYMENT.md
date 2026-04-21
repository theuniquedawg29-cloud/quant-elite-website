# 🚀 Deploy Quant-Elite Website to GitHub Pages

## 📋 Prerequisites
- Git installed (✅ Done)
- GitHub account (create one at https://github.com)

## 📝 Step-by-Step Deployment

### 1. Create GitHub Repository
1. Go to https://github.com and sign in
2. Click the "+" icon → "New repository"
3. Repository name: `quant-elite-website` (or your choice)
4. Make it **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### 2. Connect Local Repository to GitHub
Run these commands in your terminal:

```bash
# Add GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/quant-elite-website.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" sectionA
4. Under "Source", select "Deploy from a branch"
5. Select "main" branch and "/ (root)" folder
6. Click "Save"

### 4. Access Your Website
- Wait 2-3 minutes for deployment
- Your site will be available at: `https://YOUR_USERNAME.github.io/quant-elite-website/`
- Example: `https://santosh-techworks.github.io/quant-elite-website/`

## 🔄 Making Updates
When you make changes to your website:

```bash
# Add changes
git add .

# Commit changes
git commit -m "Updated website content"

# Push to GitHub (auto-deploys)
git push
```

## 🎯 Custom Domain (Optional)
To use a custom domain:
1. Go to repository Settings → Pages
2. Under "Custom domain", enter your domain
3. Configure DNS records with your domain provider
4. Add `CNAME` file to repository root with your domain

## 📊 GitHub Pages Features
- ✅ **Free hosting** (unlimited bandwidth)
- ✅ **HTTPS included**
- ✅ **Custom domains supported**
- ✅ **Automatic deployments**
- ✅ **Version control**
- ✅ **Fast global CDN**

---

## 📧 EmailJS Configuration (Fix Email Routing)
If you are still receiving emails at your old address, you must update your **EmailJS Template**:

1. Log in to [EmailJS Dashboard](https://dashboard.emailjs.com/).
2. Go to **Email Templates** and select `template_zoxrq4d`.
3. In the **Settings** tab (or the "To Email" field), change the value to: `{{to_email}}`.
4. This allows the `script.js` to dynamically tell EmailJS to send the mail to `theuniquedawg29@gmail.com`.
5. Click **Save**.

---

**Need help?** Check the [GitHub Pages documentation](https://docs.github.com/en/pages) or contact theuniquedawg29@gmail.com