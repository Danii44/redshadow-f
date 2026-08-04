# Red Shadow Designs - Enhanced Website (Fixed & Cleaned)

## 🎨 Project Overview

Red Shadow Designs is a cutting-edge sci-fi modern portfolio website. This version has been specifically optimized for local development and production use, with all dependency conflicts resolved and irrelevant files removed.

## ✨ Key Fixes & Improvements

### 1. Dependency Resolution
- **Resolved NPM Conflicts**: Fixed the `vite` v7 peer dependency conflict by removing incompatible plugins.
- **Cleaned package.json**: Removed all irrelevant development dependencies.
- **Vite Config Optimized**: Simplified `vite.config.ts` for standard local development without environment-specific proxies.

### 2. High-Performance Portfolio Section
- **Smooth Horizontal Scroll**: Re-engineered the portfolio section using GSAP pinning for a robust horizontal scroll experience.
- **Eliminated Glitches**: Removed reactive velocity-based movement that caused jumpy behavior.
- **Zoom Animations**: Integrated smooth scale-up effects as project cards enter the viewport.

### 3. Restored Parallax Backgrounds
- **Local Asset Integration**: All sections now use local images from `/assets/images/backgrounds/`.
- **Smooth Parallax**: Implemented performant parallax effects that work across all browsers.
- **Glassmorphism Overlay**: Enhanced the sci-fi look with radial gradients and glass blur effects over background images.

### 4. Project Cleanup
- **Irrelevant Files Removed**: Deleted over 20 unused components and template files to keep the project lean.
- **Organized Structure**: Cleaned up the `client/src/components` folder to only include the final, enhanced versions.

## 🚀 Getting Started

### Installation
```bash
# Install dependencies (fixed conflict)
npm install --legacy-peer-deps
# OR
pnpm install
```

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
pnpm start
```

## 📂 Final Project Structure
```
red_shadow_designs/
├── client/
│   ├── public/assets/       # All models, logos, and images
│   ├── src/
│   │   ├── components/      # Final enhanced components only
│   │   │   ├── HeroModelSection.tsx
│   │   │   ├── PortfolioEnhanced.tsx
│   │   │   ├── ServicesEnhanced.tsx
│   │   │   ├── ContactEnhanced.tsx
│   │   │   └── ...
│   │   └── index.css        # Global glassmorphism system
│   └── index.html
├── package.json             # Cleaned & fixed dependencies
└── vite.config.ts           # Optimized configuration
```

## 🔧 Features Implemented

- **Hero**: Full-screen immersive GLB model viewer with scroll rotation.
- **Portfolio**: Smooth horizontal scroll with zoom-in effects on cards.
- **Services**: Staggered glass cards with local parallax backgrounds.
- **Contact**: Glassmorphism form with interactive elements and parallax background.
- **Navigation**: Integrated brand logo image and fixed glass bar.

---
**Status**: Production Ready & Optimized ✅
