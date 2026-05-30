CHANGELOG
All notable changes to this project will be documented in this file.

[2.0.0 - Part 2 Submission]
## Added
- External `css/styles.css` stylesheet linked to all 5 HTML pages
- Structured media queries at 1024px (tablet), 768px (mobile), and 480px (small mobile) for responsive breakpoints 
- `srcset` and `sizes` attributes to key images (slideshow, vision, services) to serve optimized resolutions based on viewport width 
- `:hover`, `:focus`, and `:active` pseudo-classes to buttons, navigation links, and form inputs for interactive accessibility 
- Proper `contact.html` page replacing duplicate services file, featuring CSS Grid split-layout, embedded Google Maps iframe, and accessible form structure
- Detailed README documentation with changelog, references, and submission checklist for lecturer review

## Changed
- Converted all fixed `px` typography, padding, and margin values to scalable `rem` units for consistent responsive scaling across devices 
- Consolidated duplicate `.form-row`, `.split-section`, `form`, and `contact-form` CSS rules to prevent cascading overwrites and ensure predictable rendering 
- Restructured navigation and footer HTML to use clean semantic `<ul>`/`<li>` layout with a single `.current` class for active page tracking
- Updated layout architecture to consistently use Flexbox (header, nav, split-section) and CSS Grid (team-grid, service-container, contact-container) for desktop structure (Rubric 2.4)
- Standardized project structure into 5 separate, validated HTML files: `index.html`, `about.html`, `services.html`, `booking.html`, `contact.html`

## Fixed

- Invalid nested `<a>` tags across all pages (e.g., `<a class="current"><a href="...">` → corrected to single valid link structure)
- Critical CSS syntax error: `max-width: 1200%` corrected to `max-width: 1200px` in header styling
- Broken/unclosed HTML elements and inconsistent casing (`<Header>`/`<FOoter>`/`<Section>` → `<header>`/`<footer>`/`<section>`) for W3C validation compliance
- Missing closing braces and overlapping media query rules that broke responsive form/grid layouts on smaller viewports
- Incorrect `enquiry.html` references updated to `booking.html` for consistent internal routing and user experience
- Removed concatenated page blocks and ensured each HTML file contains only its respective content, header, and footer

## Semantic Versioning

Format: MAJOR.MINOR.PATCH  
Example: 2.1.3

- MAJOR → Breaking changes (1.0.0 → 2.0.0)  
- MINOR → New features (1.0.0 → 1.1.0)  
- PATCH → Bug fixes / small improvements (1.0.0 → 1.0.1)
