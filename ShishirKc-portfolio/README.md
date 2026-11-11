# shishirkhatri.com.np

Personal portfolio of Shishir Khatri. Built with React, Vite, TypeScript and Tailwind CSS.

## Development

Uses [Bun](https://bun.sh) as the package manager and script runner.

```bash
bun install
bun dev        # start the dev server
bun run build  # type-check and build to ./out
bun preview    # serve the production build locally
bun lint
node scripts/refresh-github.mjs   # refresh the real GitHub numbers (commit ridge, counts, push dates)
```

## Structure

- `index.html`: page shell, SEO meta tags and JSON-LD
- `src/main.tsx`: React entry point
- `src/App.tsx`: root component
- `src/lib/data/`: projects, experience, blog post types, and `github.json` (generated, real public GitHub data)
- `src/components/Hero.tsx`: layered parallax hero (scroll + mouse)
- `src/components/Journey.tsx`: everything after the hero (what I do, the commit ridge, right now, the odds, the close), driven by the vendored scrollcraft engine in `src/scrollcraft/` (unmodified)
- `src/components/CommitRidge.tsx`: the mountain ridge drawn from real weekly GitHub contributions (`src/lib/data/github.json`)
- `src/assets/`: images used in components (`import photo from "@/assets/photo.jpg"`)
- `src/assets/hero/`: the hero's parallax layers as WebP
  - `mountain-photo.webp` / `mountain-peaks.webp`: sky + mountain, and the mountain alone (sky cut away), on the
    same 1536×1024 canvas. Generated with ChatGPT.
  - `foothills.webp`: the near forested ridges on a transparent background. Generated with ChatGPT.
  - `summit.webp`: the person on the rock
- `public/`: files served at a fixed URL as-is (favicon, social share image)

## Deploy

Deployed on Cloudflare Pages. Build command `bun run build`, output directory `out`.
