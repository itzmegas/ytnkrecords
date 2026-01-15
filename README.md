# ytnkrecords

Astro 5.x project built with TypeScript, Tailwind CSS, and Biome for linting.

## Features

- Static site generation with Astro 5.x
- TypeScript for type safety
- Tailwind CSS for styling
- Biome for linting and formatting
- Islands Architecture for optimal performance

## Getting Started

### Prerequisites

- Node.js >= 18.x
- pnpm (recommended)

### Installation

```bash
git clone https://github.com/yourusername/ytnkrecords.git
cd ytnkrecords
pnpm install
```

### Development

```bash
pnpm dev
```

Start the development server at `http://localhost:4321`

### Build

```bash
pnpm build
```

Generate production build to `./dist/`

### Preview

```bash
pnpm preview
```

Preview the production build locally

### Linting

```bash
pnpm lint        # Run linter
pnpm lint:fix    # Run linter with auto-fix
```

## Project Structure

```
src/
├── assets/          # Static assets (images, SVGs)
├── components/      # Reusable Astro components
├── layouts/         # Page layouts
├── pages/           # Route definitions (file-based routing)
└── content/         # Content collections (future)
```

## Tech Stack

- **Framework:** Astro 5.16.9
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Linting:** Biome 2.3.7
- **Format:** ES Modules

## Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `pnpm dev`      | Start development server |
| `pnpm build`    | Production build         |
| `pnpm preview`  | Preview production build |
| `pnpm lint`     | Run Biome linter         |
| `pnpm lint:fix` | Auto-fix linting issues  |

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License
