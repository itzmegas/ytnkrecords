# Implementation Plan - Ytnk Records

## Goal Description

Create a modern, psychedelic-themed website for "Ytnk Records", a psytrance electronic music label. The site will showcase artists and releases with links to streaming platforms and social networks. It will be high-performance, built with Astro, and feature a distinct visual identity.

## User Review Required

> [!IMPORTANT]
>
> - Confirm the specific "psychedelic" color palette and font choices. I will propose a "Dark/Neon" theme initially.
> - Confirm the fields required for Artists (e.g., booking email, bio, genres) and Releases (e.g., BPM, Key, Release Date).

## Proposed Architecture

### Tech Stack

- **Framework**: Astro 5 (Static Site Generation + Server Side Rendering where needed)
- **Styling**: Tailwind CSS
- **Interactivity**: React 19 (Islands Architecture)
- **Data**: Astro Content Collections (Markdown/JSON/Yaml) for easier management of Artists and Releases.

### Content Structure

We will use **Content Collections** to manage data, avoiding hardcoded HTML.

1.  **Artists Collection** (`src/content/artists/`)

    - `name`: string
    - `slug`: string (id)
    - `bio`: text
    - `image`: image
    - `socials`: object (facebook, instagram, soundcloud, spotify, etc.)

2.  **Releases Collection** (`src/content/releases/`)
    - `title`: string
    - `artist`: reference to artist
    - `cover`: image
    - `date`: date
    - `links`: object (beatport, bandcamp, spotify, youtube)
    - `type`: enum (Single, EP, Album)

### Proposed Pages

1.  **Home (`/`)**:
    - Hero Section: Immersive video or animated background (GSAP later).
    - Latest Releases: Grid view of cover art.
    - Featured Artists: Horizontal scroll or grid.
    - Newsletter/Contact CTA.
2.  **Artists (`/artists`)**:
    - Grid of artist cards.
3.  **Releases (`/releases`)**:
    - Grid of releases, filterable by type or artist.
4.  **Contact (`/contact`)**:
    - Demo submission form info.
    - Booking contact.

## Design Concept "Psychedelic Modern"

- **Colors**: Deep dark backgrounds (#0a0a0a), Neon Accents (Purple, Cyan, Magenta).
- **Typography**: Clean sans-serif for body (Inter/Outfit), Display font for headers with "glitch" or "wave" effects.
- **Effects**: Glassmorphism on cards, subtle gradients, noise textures.

## Verification Plan

### Automated Tests

- Build check: `npm run build`
- Lint check: `npm run lint`

### Manual Verification

- Visual inspection of the "Psychedelic" vibe.
- Responsiveness on Mobile/Desktop.
- Navigation flow check.
