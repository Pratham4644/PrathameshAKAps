# Prathamesh Shinde — AI/ML Engineer Portfolio

A brutalist dark, high-performance portfolio crafted with **React** and **Vite**, designed specifically to showcase AI/ML, Deep Learning, Computer Vision, and LLM engineering expertise.

---

## ⚡ Tech Stack & Architecture

- **Frontend**: [React 18](https://react.dev/), [Vite 5](https://vitejs.dev/)
- **Styling**: Vanilla CSS design system with Dark Brutalist + Matrix Terminal theme
- **Typography**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Visuals**: Neural/matrix canvas animation, glassmorphic badges, responsive project cards
- **Content**: Centralized data module in [`src/data/content.js`](src/data/content.js)
- **Live site**: [https://pratham4644.github.io/PrathameshAKAps/](https://pratham4644.github.io/PrathameshAKAps/)

GitHub Actions builds and deploys `main` to GitHub Pages. In the repository's
**Settings → Pages**, set the build and deployment source to **GitHub Actions**.
The first deployment makes the live URL above available.

### Social preview image

`public/og.png` is a generated 1200 × 630 placeholder. Replace it with the
final branded portfolio preview (keep the same filename and dimensions) so
social cards show the finished artwork.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```
The optimized bundle will be generated in `dist/`.

---

## 📁 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Sticky terminal navigation with mobile drawer
│   │   ├── Hero.jsx        # Matrix rain canvas, live typing roles, quick CTAs
│   │   ├── About.jsx       # Bio, terminal code window, capability bars, education
│   │   ├── Skills.jsx      # Skills matrix
│   │   ├── Projects.jsx    # Filterable project cards and accessible detail dialog
│   │   ├── Experience.jsx  # ML training benchmark log (CSV style) & timeline
│   │   └── Contact.jsx     # Terminal contact card, quick copy & form
│   ├── data/
│   │   └── content.js      # Single source of truth for all projects, stats & info
│   ├── App.jsx             # Main application layout
│   ├── index.css           # Brutalist dark theme design system tokens & styles
│   └── main.jsx            # React root mount
├── index.html              # HTML shell with Google Fonts & SEO meta tags
└── vite.config.js          # Vite configuration
```

## Lighthouse checks

After the GitHub Pages deployment finishes, open the live URL in Chrome and
run **DevTools → Lighthouse → Mobile → Analyze page load**, selecting
Performance, Accessibility, and SEO. For repeatable local results, run
`npm run build`, serve `dist` over HTTP with `npm run preview`, then run the
same Lighthouse mobile audit against the preview URL. The targets are 85+
Performance and 95+ Accessibility and SEO; Lighthouse results vary by device,
network, and third-party font loading.
