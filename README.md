# Chhabila's Professional Portfolio Website 🚀

A modern, fast, and fully responsive personal portfolio website built with HTML5, Tailwind CSS, and Vanilla JavaScript. Tailored specifically for tech graduates and entry-level software engineers to showcase skills, projects, and credentials to recruiters.

---

## ✨ Features Included

- 🌓 **Dark & Light Mode**: Smooth theme toggling with automatic user/system preference detection and persistent storage in `localStorage`.
- ⌨️ **Typewriter Hero Effect**: Dynamic title animation showcasing multiple roles (e.g., Software Engineer, Full-Stack Developer).
- 🏷️ **Categorized Skills Grid**: Clean badge system for Languages, Frontend, Backend & Databases, and Tools/DevOps.
- 📂 **Project Showcase with Live Filters**: Filter projects by Full-Stack, Frontend, or Backend with links to GitHub repositories and live demos.
- ⏳ **Experience & Education Timeline**: Clean vertical milestone timeline for internships, degrees, coursework, and hackathon achievements.
- 📩 **Interactive Contact Form & Socials**: Functional contact form with feedback states, plus quick-connect cards for Email, LinkedIn, and GitHub.
- 📄 **Resume Download CTA**: Prominent button linking directly to your resume PDF.
- 📱 **100% Mobile Responsive**: Hamburger menu and responsive grid layout tested across mobile, tablet, and desktop screens.

---

## 🛠️ Quick Start & Local Preview

### Option 1: Direct in Browser
Simply double-click `index.html` to open it in your preferred browser (Chrome, Edge, Firefox, Brave).

### Option 2: Live Server (Recommended)
If you have Python installed or use VS Code:

```bash
# Using Python:
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## ✏️ How to Personalize This Portfolio

1. **Replace Your Personal Details in `index.html`**:
   - Change `Chhabila` to your full name if desired.
   - Update your email address in the `mailto:` links and contact cards.
   - Update your LinkedIn, GitHub, and LeetCode profile URLs.
   - Add your actual college/university name, GPA, and graduation year in the Timeline section.

2. **Add Your Resume**:
   - Place your real resume PDF file inside this folder and name it `Chhabila_Resume.pdf` (or update the filename in `index.html`).

3. **Customize Projects**:
   - Update project titles, descriptions, tech stack pills, and your actual GitHub repository URLs.

---

## 🌐 How to Deploy for Free

### 1. GitHub Pages (Zero Cost)
1. Initialize a git repository and push this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. On GitHub, go to your repository **Settings** → **Pages**.
3. Under **Branch**, select `main` and click **Save**.
4. Your website will be live at `https://<your-username>.github.io/<your-repo-name>/` in 1-2 minutes!

### 2. Vercel or Netlify
- Drag and drop this folder onto [Netlify Drop](https://app.netlify.com/drop) or import from GitHub into [Vercel](https://vercel.com) for instant deployment with a custom free `.vercel.app` or `.netlify.app` domain.
