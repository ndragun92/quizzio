# 🤖 AGENT.md — Nuxt 4 Project Guidelines

## Project Overview
This is a **Nuxt 4** application using:
- Vue 3 (Composition API)
- TypeScript
- Nitro server
- Vite

The goal is to generate **clean, maintainable, and scalable code**.

---

## General Rules
- Always use **TypeScript**
- Prefer **Composition API** (`setup` syntax)
- Follow Nuxt 4 file-based conventions
- Write concise, readable, and well-structured code
- Avoid unnecessary complexity
- Do not introduce deprecated Nuxt 3 APIs

---

## Coding Style
- Use `const` and `let` (never `var`)
- Use arrow functions where appropriate
- Prefer async/await over promises
- Use meaningful variable and function names
- Keep components small and focused
- One responsibility per file

---

## Vue & Nuxt Conventions
- Use `<script setup lang="ts">`
- Use auto-imported composables (`useFetch`, `useAsyncData`, `useRoute`, etc.)
- Prefer `defineProps` and `defineEmits`
- Use `definePageMeta` for page metadata
- Use `useRuntimeConfig` for environment variables

---

## State Management
- Prefer Nuxt composables over external state libraries
- If using Pinia:
  - Use setup stores
  - Keep stores modular
  - Avoid bloated stores

---

## API & Server Routes
- Use Nitro server routes (`/server/api`)
- Keep handlers simple and typed
- Validate inputs
- Handle errors gracefully

---

## File & Folder Structure
/components
/pages
/layouts
/composables
/server/api
/plugins
/assets
/public

Do not place logic randomly outside these directories.

---

## Performance
- Avoid unnecessary watchers
- Use `computed` instead of methods where possible
- Lazy load heavy components
- Use `defineAsyncComponent` when needed

---

## Security
- Never expose secrets in client-side code
- Always use `runtimeConfig` for environment variables
- Sanitize and validate server inputs

---

## Documentation
- Add comments only when logic is non-obvious
- Prefer self-documenting code
- Keep README and AGENT.md in sync

---

## Copilot Behavior Instructions
When generating code, Copilot should:
1. Follow Nuxt 4 best practices
2. Use TypeScript
3. Respect this project structure
4. Avoid deprecated APIs
5. Prefer composables and reusable utilities
6. Do not invent libraries unless requested
7. Ask for clarification if requirements are ambiguous

---

## Forbidden
- Options API
- JavaScript without TypeScript
- Inline business logic in templates
- Hardcoded secrets
- Deprecated Nuxt 3 patterns
