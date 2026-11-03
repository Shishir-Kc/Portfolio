# shishirkhatri.com.np

Personal portfolio of Shishir Khatri. Built with React, Vite, TypeScript and Tailwind CSS.

## Development

```bash
pnpm install
pnpm dev       # start the dev server
pnpm build     # type-check and build to ./out
pnpm preview   # serve the production build locally
pnpm lint
```

## Structure

- `index.html`: page shell, SEO meta tags and JSON-LD
- `src/main.tsx`: React entry point
- `src/App.tsx`: root component
- `src/lib/data/`: projects, experience and blog post types

## Deploy

Deployed on Cloudflare Pages. Build command `pnpm build`, output directory `out`.
