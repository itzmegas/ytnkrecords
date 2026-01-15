# Brainstorming Session: Ytnk Records

## 1. User Intent & Vision

**Goal**: Create a high-impact, psychedelic-themed website for an electronic music label (Psytrance).
**Vibe**: Modern, psychedelic, dynamic, "premium".
**Key Entities**:

- **Artists**: The talent roster. Needs strong visual representation.
- **Releases**: The music catalog. Needs links to all platforms.
- **Contact**: Recruitment and booking.

## 2. Core Features & "Wow" Factors

- **Visuals**:
  - _Idea_: Use WebGL or heavy CSS animations for a "trippy" background that reacts to scroll or mouse movement.
  - _Idea_: "Glitch" effects on text and images on hover.
  - _Idea_: Continuous audio player (persistent across navigation)? (Need to consider technical complexity vs user annoyance).
- **Navigation**:
  - _Idea_: Non-standard navigation? Maybe a circular menu or floating elements? (Keep usability in mind).
  - _Standard_: Clear top/side bar but with stylized transitions.

## 3. Architecture Refinement (Astro + React)

- **Why Astro?**: Perfect for content-heavy sites (Artists/Releases). fast initial load.
- **Why React?**: Needed for the "player" if we have one, or complex interactive filters for releases.
- **Data**: Content Collections are definitely the way to go.
  - `artists/*.md`
  - `releases/*.md`

## 4. Content Strategy

- **Artists**:
  - Need high-res photos.
  - Social links are critical.
  - Link to their latest release on the label.
- **Releases**:
  - Cover art is the hero.
  - "Listen Now" buttons must be prominent.
  - Release date for "Upcoming" vs "Out Now".

## 5. Next Steps

1.  Define the exact schema for Artists and Releases (Fields: BPM, Genre, etc.).
2.  Create the file structure.
3.  Set up Tailwind with a "Psytrance" theme (Neon colors, Dark mode default).
