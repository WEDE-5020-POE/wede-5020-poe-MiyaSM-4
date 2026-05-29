# CHANGELOG

All notable changes to this project will be documented in this file.

This project follows Semantic Versioning.

# 📝 Changelog

All notable changes to this project are documented below following semantic versioning guidelines.

---

## [1.0.0] - 2026-05-29
### Added
- **Services Page Architecture:** Built out a premium layout using modern glassmorphism components (`backdrop-filter: blur()`), translucent borders, and a responsive grid container (`.services-container`).
- **Interactive Component Toggles:** Implemented native HTML5 `<details>` and `<summary>` dropdown blocks for inline multi-angle style showcases without cluttering user viewports.
- **Micro-Animations:** Configured custom CSS `@keyframes slideDown` animations for smooth gallery transitions and interactive hover states on all `.btn-book` elements.
- **Split Flexbox Component:** Developed a flexible `.split-section` utility module to gracefully arrange high-end feature content side-by-side with vertical alignment.
- **Dynamic Team Grid Module:** Programmed a fluid card grid system driven by `repeat(auto-fit, minmax(220px, 1fr))` to display employee profiles natively across viewports.
- **Profile Card Assets:** Added translucent layout foundations, circular image clips, profile images, and gold accent borders (`#d4af37`) highlighting active styling operators.
- **Two-Column Contact Matrix:** Created a structural CSS Grid component organizing operational metadata blocks on the left alongside functional entry forms on the right.
- **Advanced Layout Hygiene:** Standardized input box heights, focus rings, border-radii, and applied trailing sibling space control filters (`:last-child { margin-bottom: 0; }`).
- **Media Queries:** Deployed responsive break-caps forcing column collapsing down to simple standard linear stacks below $900\text{px}$ and $600\text{px}$ breakpoints.

### Changed
- **Services Refactoring:** Migrated generic markup blocks (`<article>`) into a dynamic card grid interface module (`.service-card`).
- **Tiered Pricing Arrays:** Structuralized flat string service descriptions into detailed tiered lists sorting variations by length (Short, Medium, Long, Normal).
- **Core Branding Scheme:** Applied high-contrast styling layers across the structural header element utilizing a sharp gold background gradient backed by crisp black text.
- **About Component Realignment:** Upgraded page containers into explicit semantic boundaries (`.story-section`, `.split-section`, `.team-section`), floating the main identity image directly to the left panel.
- **Data Display Cleanliness:** Transformed long textual descriptions containing messy line breaks into highly scannable bullet configurations.

### Fixed
- **Media Query Breakpoints:** Fixed a missing closing bracket layout bug that was crashing column grids across secondary responsive breakpoints.
- **File System Refactoring:** Traced and rectified broken case-sensitive asset paths and bad file extension strings (e.g., `.PNGg`).
- **CSS Code Cleanup:** Purged redundant declaration rows and compressed duplicate property rule targets.

---

## [0.1.0] - 2026-04-20
### Added
- **Core Directory Blueprint:** Built the base system hierarchy including designated assets folders (`/img`, `/css`).
- **Semantic HTML Scaffolding:** Drafted clean structural markup loops across all 5 core index profiles (`index.html`, `about.html`, `services.html`, `enquiry.html`, `contact.html`).
- **Repository Metadata:** Initialized structural documentation sheets including standard `README.md` and basic tracking roots inside `changelog.md`.

### Fixed
- **Style Link Hierarchy:** Fixed an absolute path structural tracking bug that initially prevented stylesheets from loading across root document profiles.
Example: 2.1.3

- MAJOR → Breaking changes (1.0.0 → 2.0.0)  
- MINOR → New features (1.0.0 → 1.1.0)  
- PATCH → Bug fixes / small improvements (1.0.0 → 1.0.1)
