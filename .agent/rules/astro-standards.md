---
trigger: always_on
glob: "**/*.{astro,tsx,ts,jsx,js}"
description: "Specific standards for Astro.build architecture, Islands Model, and React integration."
---

# WORKSPACE RULES: ASTRO.BUILD PROJECT

## 1. ARCHITECTURE: THE ISLANDS MODEL

- **Astro Components:** Use `.astro` for static UI, layouts, and SEO.
- **React Components:** Only for high interactivity. Place them in `src/components/react/`.
- **Hydration:** Always use `client:*` directives (e.g., `client:load`, `client:visible`) when importing React components.
- **Content:** Use Astro Content Collections for Markdown/Data. Define Zod schemas in `src/content/config.ts`.

## 2. PROJECT WORKFLOW

1. **Schema:** Define Content Collection/Zod schemas first.
2. **Layout:** Scaffold the `.astro` page and layout.
3. **Islands:** Build React components only if needed for state/interactivity.
4. **Optimization:** Use `astro:assets` for all images.

## 3. TESTING (ASTRO SPECIFIC)

- Use **Vitest** for unit tests in `src/components/react/`.
- Use **Playwright** or **Astro's built-in testing tools** for E2E validation of pages.
