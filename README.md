Singh Saab — Luxury Restaurant Website

Overview
- Premium, contemporary fine-dining website with a golden palette and 3D accents.
- Built with React + Vite, Tailwind CSS, Framer Motion, and React Three Fiber.
- Backend-ready with FastAPI + Mongo for reservations, events, and testimonials.

Getting Started
1) Install & run (automatically handled in this environment)
- npm install
- npm run dev

Design Tokens
- Gold: #C4973A
- Deep Gold: #A07B2A
- Dark: #0F0F10 / #0B0B0B
- Cream: #F7F3E9
- Glass overlay: rgba(255,255,255,0.06)

3D & Performance
- Low-poly placeholders used for initial hero model (public/models/dish.glb).
- Lazy loaded via Suspense; consider DRACO-compressed GLTFs for production.
- Mobile fallback: hero keeps parallax lighting and reduces polygon count.

Accessibility
- Semantic sections, alt text, keyboard-focus styles.
- Color contrast tested on dark backgrounds.

CMS Data
- Basic menu JSON at public/menu.json; migrate to DB/API when ready.

Deployment
- Build: npm run build
- Preview: npm run preview

Backend (FastAPI)
- Add real endpoints for reservations, events and testimonials in backend/main.py.
- Mongo helpers available (database.py). Define/extend schemas.py if you need new collections.

Pitch Deck (5 slides)
1) Brand & Concept — Singh Saab: Where Tradition Meets Elegance
2) Audience & Positioning — Fine-dining guests, private events, corporate dining
3) Experience — 3D hero, curated menu, reservations, gallery, testimonials
4) Operations — Availability checks, CMS-ready menu, performance & accessibility
5) Launch Plan — Content shoot, menu data entry, SEO, paid launch + PR

