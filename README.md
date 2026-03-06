# Quizzio

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Project Structure

```
app/
├── assets/        # Static assets (CSS, images, fonts)
│   └── css/
│       └── main.css      # Main stylesheet with Tailwind imports
├── components/    # Reusable Vue components
├── layouts/       # Layout components
│   ├── default.vue
│   └── error.vue
├── pages/         # Route pages (auto-generated routes)
│   └── index.vue
├── plugins/       # Nuxt plugins
│   └── init.ts    # App initialization plugin
├── store/         # Pinia stores
│   └── exampleStore.ts
├── app.vue        # Root component
└── error.vue      # Error handling component

public/           # Static files served as-is (favicon, etc.)
server/           # Server-side code and API routes
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure as needed:

```bash
# Cache settings (optional)
# VITE_CACHE_ENABLED=true
```

### ESLint

Format and lint your code:

```bash

# Fix linting
npm run lint:fix
```
