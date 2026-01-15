# AGENTS.md

This document provides guidelines for agentic coding assistants working in this repository.

## Project Overview

This is an Astro 5.x project using TypeScript and Biome for linting/formatting. The project follows the Islands Architecture pattern - static Astro components by default, with React islands only for interactive elements.

## Build Commands

```bash
# Install dependencies
pnpm install

# Development server (localhost:4321)
pnpm dev

# Production build to ./dist/
pnpm build

# Preview production build locally
pnpm preview

# Run Biome linter with auto-fix
pnpm lint

# Run Biome linter + formatter with auto-fix
pnpm lint:fix

# Astro CLI commands
pnpm astro -- --help
```

## Code Style Guidelines

### Formatting (Biome)

- **Indentation:** Spaces (2)
- **Quotes:** Double quotes (`"`) for JavaScript/TypeScript
- **Line endings:** LF (Unix-style)
- **Files:** Use `.js`, `.ts`, `.tsx`, `.jsx`, `.astro` extensions appropriately
- Run `pnpm lint:fix` before committing to auto-format

### TypeScript

- Use strict TypeScript (extends `astro/tsconfigs/strict`)
- Avoid `any` - use `unknown` for truly unknown types
- Prefer interfaces over type aliases for object shapes
- Use `import type` for type-only imports
- Export types explicitly when used across modules
- Enable `noUncheckedIndexedAccess` for safer array/object access

### Imports

- Organize imports in this order: Astro imports, React imports, third-party, local
- Use Biome's auto-import organization (`pnpm lint:fix`)
- Prefer named exports over default exports
- Use absolute imports when available (configured in tsconfig.json)
- Group related imports with blank lines between groups

### Naming Conventions

- **Components:** PascalCase for Astro and React components (`Card.astro`, `Button.tsx`)
- **Files:** kebab-case for non-component files (`utils.ts`, `api-handler.ts`)
- **Variables/Constants:** camelCase
- **Types/Interfaces:** PascalCase
- **Boolean variables:** Prefix with `is`, `has`, `can`, `should` (`isLoading`, `hasError`)
- **Custom hooks:** Prefix with `use` (`useAuth`, `useLocalStorage`)
- **Props interfaces:** Suffix with `Props` (`ButtonProps`, `CardProps`)

### Astro Components

- Place `.astro` components in `src/components/`, `src/layouts/`, or `src/pages/`
- Use frontmatter `---` fences for TypeScript logic
- Include `lang="ts"` on `<script>` tags
- Use `astro:assets` for all images (`<Image />` component)
- Define Zod schemas in `src/content/config.ts` for content collections
- Props interfaces should be exported for reuse
- Use semantic HTML elements for accessibility
- Extract reusable UI patterns into separate components

### React Components (Islands)

- Place in `src/components/react/`
- Use `.tsx` extension
- Only create when state/interactivity is required
- Always use `client:*` directive when importing in Astro: `client:load`, `client:visible`, etc.
- Use functional components with TypeScript interfaces
- Prefer composition over prop drilling
- Create custom hooks in `src/hooks/` for shared logic

### Error Handling

- Use try/catch with typed errors
- Return `Result<T, E>` patterns or use throw for unrecoverable errors
- Log errors with context using `console.error`
- Never expose sensitive data in error messages

### Content Collections

- Define schemas using Zod in `src/content/config.ts`
- Use `getCollection()` for type-safe content access
- Reference types via `typeof collection` for inferred types

### Styling (Tailwind CSS)

- Use Tailwind utility classes for styling in `.astro` and React components
- Prefer utility classes over custom CSS - follow "utility-first" philosophy
- Use `@apply` directive sparingly, only for repetitive class combinations
- Create custom Tailwind utilities for project-specific design tokens
- Group related Tailwind classes (layout, spacing, typography, colors)
- Use `class` or `className` prop consistently (React: `className`, Astro: `class`)
- Responsive utilities: `md:`, `lg:` prefixes for breakpoints
- Use `dark:` variant for dark mode support when applicable

### Testing

- Unit tests: Vitest in `src/components/react/`
- E2E: Playwright or Astro's built-in testing
- Run single test: `vitest run <file>.test.ts` (after installing vitest)

## Architecture (Islands Model)

1. Define Content Collection schemas first
2. Build `.astro` layout/page structure
3. Create React islands only for interactive features
4. Use `astro:assets` for optimization
5. Keep static content in Astro, move dynamic to React

### Component Placement

- **Static UI:** `src/components/*.astro`
- **Layouts:** `src/layouts/*.astro`
- **Pages:** `src/pages/*.astro`
- **Interactive:** `src/components/react/*.tsx`
- **Custom hooks:** `src/hooks/*.ts`
- **Content:** `src/content/*/`
- **Assets:** `src/assets/*`

## Existing Rules

See `.agent/rules/astro-standards.md` for additional Astro-specific patterns.

## Development Workflow

1. Read existing `.astro` components to understand patterns
2. Check `.agent/rules/` for project-specific conventions
3. Run `pnpm lint:fix` before committing
4. Follow the Islands Model - default to static Astro, use React only when needed
5. Use `astro:assets` for all images, never raw `<img>` tags
