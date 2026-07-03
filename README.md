# Gyanjyot Institute — Static Website

Official site for Gyanjyot Institute, Ahmedabad (est. 1995), specialising in IIT JEE preparation.

## Structure

```
gyanjoat/
├── index.html          — Full static site (1048 lines)
├── css/style.css       — Design system + layout (2350 lines)
├── js/script.js        — Vanilla JS (sticky nav, tabs, filter, form validation)
└── images/             — 7 placeholder assets (hero, students, classroom)
```

## Features

- Semantic HTML, skip-to-content, ARIA landmarks, JSON-LD structured data
- Mobile-first responsive (burger menu, stacked grids on small screens)
- CSS custom properties for brand consistency
- Zero dependencies — no frameworks, no build step

## Usage

Open `gyanjoat/index.html` in any browser. Deploy to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Customisation

- Edit CSS variables in `:root` within `css/style.css` (brand colours, fonts, spacing)
- Replace placeholder images in `gyanjoat/images/` (referenced as `images/*.png` from HTML)
- Update contact info, social links, and structured data in `index.html`
