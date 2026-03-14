// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import process from 'node:process'

export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/a11y',
    '@nuxthub/core',
  ],

  imports: {
    dirs: [
      // support deep nested composables
      'composables/**',
    ],
  },
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      // apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '',
      debugEnabled: process.env.NUXT_PUBLIC_DEBUG_ENABLED === 'true',
    },
  },

  sourcemap: process.env.NODE_ENV === 'development',

  experimental: {
    defaults: {
      nuxtLink: {
        prefetchedClass: 'link--prefetched',
      },
    },
    asyncContext: true,
    appManifest: false,
    buildCache: false, // Build Cache
    typedPages: true,
    headNext: true,
    // inlineRouteRules: true,
    sharedPrerenderData: true,
    cookieStore: true,
    browserDevtoolsTiming: process.env.NODE_ENV === 'development',
    lazyHydration: true, // This feature intelligently determines when to hydrate lazy components based on visibility, idle time, or other triggers, improving performance by deferring hydration of components until they're needed.
    purgeCachedData: true, // Nuxt will automatically purge cached data from `useAsyncData` and `nuxtApp.static.data`. This helps prevent memory leaks and ensures fresh data is loaded when needed, but it is possible to disable it.
    typescriptPlugin: true,
  },

  compatibilityDate: '2025-07-15',

  nitro: {
    experimental: {
      websocket: true,
      tasks: true,
    },
    // compressPublicAssets: true,
    routeRules: {
      '/game/*': { ssr: false },
      '/quiz/*': { ssr: false },
      // "/_nuxt/**": { headers: { "cache-control": "max-age=31536000" } }, // Set generated files cache to 1 year
    },
  },

  hub: {
    db: 'postgresql',
  },

  vite: {
    optimizeDeps: {
      include: [],
    },
    plugins: [
      // Cast as any until Tailwindcss is updated to use Vite 6
      tailwindcss() as any,
      {
        apply: 'build',
        name: 'vite-plugin-ignore-sourcemap-warnings',
        configResolved (config: any) {
          const originalOnWarn = config.build.rollupOptions.onwarn
          config.build.rollupOptions.onwarn = (warning: any, warn: any) => {
            if (
              warning.code === 'SOURCEMAP_BROKEN' &&
              warning.plugin === '@tailwindcss/vite:generate:build'
            ) {
              return
            }
            if (
              warning.code === 'PLUGIN_WARNING' &&
              warning.plugin === 'vite:reporter'
            ) {
              return
            }

            if (originalOnWarn) {
              originalOnWarn(warning, warn)
            } else {
              warn(warning)
            }
          }
        },
      },
    ],
    $client: {
      build: {
        rollupOptions: {
          output: {
            entryFileNames: '_nuxt/[name].[hash].js',
            chunkFileNames: '_nuxt/[name].[hash].js',
          },
        },
      },
    },
  },

  typescript: {
    typeCheck: 'build', // Type checking will only occur during the build process, improving development speed while still ensuring type safety in production builds.
    strict: process.env.NODE_ENV === 'development', // Enable strict mode only in development for better developer experience, while allowing more flexibility in production builds.
    shim: true, // Enable shims to allow TypeScript to understand non-TypeScript files, improving compatibility with various assets and libraries.
    hoist: ['vue-router'],
  },

  hooks: {
    'build:before': () => {
      console.time('Nuxt Build Time')
    },
    'build:done': () => {
      console.timeEnd('Nuxt Build Time')
    },
  },

  fonts: {
    families: [
      {
        name: 'Geist',
        provider: 'google',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    ],
  },

  image: {},
})
