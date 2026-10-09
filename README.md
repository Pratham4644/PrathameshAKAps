# Prathamesh Shinde — AI/ML Engineer Portfolio

A brutalist dark, high-performance portfolio crafted with **React** and **Vite**, designed specifically to showcase AI/ML, Deep Learning, Computer Vision, and LLM engineering expertise.

---

## ⚡ Tech Stack & Architecture

- **Frontend**: [React 18](https://react.dev/), [Vite 5](https://vitejs.dev/)
- **Styling**: Vanilla CSS design system with Dark Brutalist + Matrix Terminal theme
- **Typography**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Visuals**: Dynamic neural/matrix canvas animation, glassmorphic HUD badges, responsive card grids
- **Content**: Centralized data module in [`src/data/content.js`](file:///d:/port/PrathameshAKAps/src/data/content.js)

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
│   │   ├── Skills.jsx      # Tabbed interactive skills matrix (ML/DL, LLM, Backend)
│   │   ├── Projects.jsx    # Project cards with expandable architecture & metrics
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
