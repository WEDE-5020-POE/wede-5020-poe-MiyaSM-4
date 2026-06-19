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

- ## 📝 Changelog

### Part 3 Enhancements (Current Submission)
*Detailed record of new features, JavaScript integration, and SEO optimizations implemented for Part 3.*

**JavaScript & Interactivity:**
*   **AJAX Form Submission:** Implemented asynchronous form submission for both `enquiry.html` and `contact.html` using the Fetch API. Forms now submit without page reloads, providing a smoother user experience.
*   **Client-Side Validation:** Added comprehensive JavaScript validation for form inputs, including email format checking, phone number length verification (minimum 10 digits), and required field checks.
*   **Error Handling:** Implemented a user-friendly notification system that displays success and error messages dynamically when forms are submitted.
*   **Interactive Slideshow:** Built a fully functional, auto-playing image slideshow on the home page with manual navigation arrows and clickable dots.
*   **Lightbox Gallery:** Added a dynamic lightbox feature allowing users to click on service images to view them in a full-screen overlay.
*   **FAQ Accordion:** Implemented an interactive FAQ section on the contact page with smooth expand/collapse animations and accessibility (`aria-expanded`) attributes.
*   **Service Search Filter:** Added a real-time search bar on the Services page to filter hairstyles by name or price.
*   **Mobile Navigation:** Created a responsive hamburger menu toggle for seamless navigation on mobile devices.

**Search Engine Optimization (SEO):**
*   **On-Page SEO:** Added comprehensive `<meta>` tags (description, keywords, author) and Open Graph tags for social media sharing to all HTML pages.
*   **Schema Markup:** Implemented JSON-LD structured data for Local Business (HairSalon) to improve local search visibility and Google Maps integration.
*   **Image Optimization:** Ensured all images have descriptive `alt` text for better accessibility and image search rankings.
*   **Semantic HTML:** Refined heading hierarchy (H1, H2, H3) and semantic structure across all pages.

**Design & User Experience (UX):**
*   **Conversion Optimization:** Added urgency banners ("Only 3 slots left today!") and pulsing "Book Now" buttons to reduce the "empty chair" problem and encourage immediate bookings.
*   **Visual Polish:** Enhanced the color palette, added a sticky header, and implemented smooth hover animations on service cards and buttons.
*   **Map Fix:** Replaced the broken API-dependent map with a free, responsive Google Maps Embed `<iframe>` wrapped in a custom `.map-container` class.

---

### Part 2 Fixes & Feedback Edits
*Corrections and improvements made based on lecturer feedback from the Part 2 submission (Score: 89/100).*

*   **CSS Syntax Corrections:** Fixed invalid CSS syntax, including changing `min-height: height 100vh` to `min-height: 100vh`, correcting `max-width: 1200%` to `1200px`, and fixing case-sensitivity issues like `width: Auto` to `width: auto`.
*   **Code Cleanup:** Consolidated duplicate CSS selectors (e.g., `main`, `section`, `.form-row`) to prevent conflicting styles and improve code readability.
*   **Form Styling:** Fixed the booking form background so it blends correctly with the page layout and is easily readable.
*   **Navigation Fixes:** Corrected navigation link classes (changed `class=" current Page"` to `class="current-page"`) to ensure the active page indicator works properly.
*   **Responsive Adjustments:** Improved media queries to ensure the layout doesn't break on smaller mobile screens.

## Fixed

- Invalid nested `<a>` tags across all pages (e.g., `<a class="current"><a href="...">` → corrected to single valid link structure)
- Critical CSS syntax error: `max-width: 1200%` corrected to `max-width: 1200px` in header styling
- Broken/unclosed HTML elements and inconsistent casing (`<Header>`/`< Footer>`/`<Section>` → `<header>`/`<footer>`/`<section>`) for W3C validation compliance
- Missing closing braces and overlapping media query rules that broke responsive form/grid layouts on smaller viewports
- Incorrect `enquiry.html` references updated to `booking.html` for consistent internal routing and user experience
- Removed concatenated page blocks and ensured each HTML file contains only its respective content, header, and footer

## Semantic Versioning

Format: MAJOR.MINOR.PATCH  
Example: 2.1.3

- MAJOR → Breaking changes (1.0.0 → 2.0.0)  
- MINOR → New features (1.0.0 → 1.1.0)  
- PATCH → Bug fixes / small improvements (1.0.0 → 1.0.1)
