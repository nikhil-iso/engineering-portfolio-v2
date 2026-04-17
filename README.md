# Nikhil Patel Engineering Portfolio

Frontend code for a personal electrical engineering portfolio built with React, TypeScript, Vite, and Tailwind CSS.

## Prerequisites

- Node.js 20+
- npm

## Local development

1. Clone the repository.
2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the project root if one is not already present.
4. Add the required environment variables:
5. Start the development server:

```sh
npm run dev
```

The Vite dev server will print the local URL.

## Available scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build in `dist/`.
- `npm run build:dev` creates a development-mode build.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint.
- `npm run test` runs the test suite once with Vitest.
- `npm run test:watch` runs Vitest in watch mode.

## Tech stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Supabase

## Deployment

Build the site with:

```sh
npm run build
```

Deploy the contents of `dist/` to your hosting provider.

Because this is a single-page application using client-side routing, production hosting must rewrite unknown routes to `index.html`.
