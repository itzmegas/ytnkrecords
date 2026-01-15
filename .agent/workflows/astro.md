---
description: "workflow to work with astro.build"
---

## WORKFLOW: STARTING A NEW ASTRO FEATURE

1. **Schema Definition:** Define the data structure or Content Collection schema first.
2. **Astro Scaffolding:** Create the Page (`.astro`) and the Layout.
3. **Island Identification:** Identify which parts need React and create them in `src/components/react/`.
4. **Integration:** Import React components into the Astro page using the appropriate `client:` directive.
5. **Styles:** Apply Tailwind utility classes directly. Avoid scoped CSS unless strictly necessary.
6. **MPC** Use astrodocs MCP `search_astro_docs` to search into official docs
