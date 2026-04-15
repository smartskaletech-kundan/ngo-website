# Design Brief — Anumaya Sansthan NGO Website (Enhanced)

## Aesthetic & Tone
Premium NGO aesthetic: refined, trustworthy, emotionally grounded. Glassmorphism navbar, organic wave dividers, soft shadows, rounded cards (16px). Public pages are emotionally rich (testimonials, impact stories). Admin panel adopts dashboard discipline with sidebar navigation and muted card hierarchy.

## Color Palette (OKLCH)
| Role | Hex | OKLCH | Usage |
|------|-----|------|-------|
| Primary | #2E7D32 | 0.46 0.14 145 | CTAs, nav highlights, accent elements |
| Secondary | #A5D6A7 | 0.84 0.09 145 | Section backgrounds, soft accents |
| Accent | #6D4C41 | 0.41 0.07 45 | Earth tones, secondary CTAs |
| Background | #F9F6F0 | 0.98 0.008 90 | Page background (soft cream) |
| Foreground | #1A1A1A | 0.13 0.01 30 | Text (dark) |

## Typography
| Usage | Font | Weight | Size |
|-------|------|--------|------|
| Headings | Playfair Display | 700 | 2.5rem–3.5rem |
| Body | DM Sans | 400–500 | 1rem–1.125rem |
| Hindi | Noto Sans Devanagari | 500–600 | 1rem–1.25rem |
| Mono | Courier New | 400 | 0.875rem |

## Structural Zones
| Zone | Background | Treatment | Detail |
|------|-----------|-----------|--------|
| Navbar (public) | rgba(255,255,255,0.85) | Glassmorphism blur(12px), sticky | 1px border bottom |
| Hero | #2E7D32 gradient overlay | Full-width, 100vh, wave divider bottom | Text shadow, dual CTA |
| Content section | #F9F6F0 (cream) | Card-based grid, wave dividers between | Soft shadow box-shadow: 0 4px 24px rgba(0,0,0,0.08) |
| Footer | Forest Green (#1B5E20) | Dark footer, white text | 4-column + newsletter |
| Admin sidebar | #F5F5F5 (muted) | Fixed left, border-right, nav items | Active state: filled bg + left border green |
| Admin main | #FAFAFA | Light, clean data tables | Muted headers, subtle borders |

## Component Patterns
- **Card**: 16px border-radius, white bg, box-shadow-card, hover lift (+4px), fade-in-up animation
- **CTA Button**: Primary green (Forest Green), white text, 12px padding, full-width on mobile, scale(1.02) on hover
- **Image Gallery**: Masonry grid (3 cols desktop, 2 tablet, 1 mobile), category filter tabs, lightbox on click, lazy loading
- **Blog/Event Card**: Image top, category badge, title (Playfair), excerpt (DM Sans), date, author tag
- **Success Story**: Testimonial card with avatar circle, 5-star rating, quote italic, name + location
- **Admin Nav Item**: Hover bg-muted, active: bg-muted + left border-primary (3px), font-weight-600
- **Upload Zone**: Dashed border, drag-over state (green border + primary bg opacity), file icon center

## Motion & Animation
- Fade-in-up: 0.6s ease-out on scroll (cards, counters)
- Card hover: transform translateY(-4px) + shadow lift, 0.3s ease
- Count-up: 0.8s ease-out for impact numbers
- Slide-in-right: 0.4s ease-out for admin sidebar interactions
- Pulse-subtle: 2s ease-in-out infinite on loading states

## Spacing & Rhythm
- Container: max-width 1400px, padding 2rem
- Gap between sections: 4rem (sm: 2rem)
- Card padding: 1.5rem–2rem
- Component spacing: 1rem–1.5rem within cards

## Content Sections (Public Pages)
1. **Homepage**: Hero → Impact counters → About preview → Key initiatives → Featured project → Testimonials → Trust signals → CTA band → Success stories carousel → Blog preview → Footer
2. **Blog**: Filter by category, masonry grid, read full article view
3. **Events**: Upcoming + past events, calendar integration, register CTA
4. **Media**: Photo gallery with category filters, video embeds, press mentions
5. **Impact**: Animated counters, annual report PDFs, fund utilization chart, registration details

## Admin Pages
- **/admin/dashboard**: Overview cards, latest uploads, quick actions
- **/admin/gallery**: Image management, bulk upload, category tags, edit/delete
- **/admin/blog**: Post list, WYSIWYG editor, publish/draft status, SEO meta
- **/admin/events**: Event form (date, location, description), attendee list
- **/admin/stories**: Success story management, photo uploads

## Constraints & Guardrails
- No Inter/Roboto fonts — Playfair Display + DM Sans exclusively
- No purple gradients — use green, brown, cream only
- No flat card designs — always apply soft shadow + hover lift
- No Bootstrap defaults — custom utilities in index.css
- Mobile-first responsive design (sm: 576px, md: 768px, lg: 1024px)
- Reduced motion support: @media (prefers-reduced-motion: reduce)
- Accessibility: alt text on all images, aria-labels on buttons, labeled form fields

## Signature Details
- Wave SVG dividers between sections (light green, organic curve)
- Leaf/nature SVG accents in section headers
- Circular avatar crops (50% border-radius)
- Gradient overlays on hero images (135deg, Forest Green 85% + Earth Brown 60%)
- Micro-interactions on CTAs (scale, glow on hover)
- Newsletter input pill design (rounded-full, green border on focus)
