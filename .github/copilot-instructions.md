# Copilot Instructions for Last Typist Standing

## Overview

This document provides essential guidelines for AI coding agents to effectively navigate and contribute to the Last Typist Standing codebase. Understanding the architecture, workflows, and conventions is crucial for productivity.

## Architecture

- **Project Structure**: The project follows Nuxt best practices, organized into directories such as `app/`, `server/`, and `shared/`. Key directories include:
  - `app/components/`: Reusable Vue components.
  - `app/pages/`: Auto-routed pages based on file structure.
  - `app/stores/`: Pinia store modules for state management.
  - `server/routes/api/`: API routes for backend communication.

- **Component Hierarchy**: Components are structured hierarchically, with pages using layouts and components for UI.

- **Data Flow**: Data is fetched using composables and managed through Pinia stores, ensuring a clear flow of information across components.

## Developer Workflows

- **Setup**: Follow the instructions in [QUICKSTART.md](./QUICKSTART.md) for initial setup. Key commands include:

  ```bash
  npm install
  npm run dev
  ```

- **Building and Testing**: Use the following commands to ensure code quality before pushing:

  ```bash
  npm run lint:fix  # Fix formatting & linting
  npm run typecheck # Validate TypeScript
  npm run build     # Ensure build works
  ```

- **Debugging**: Refer to [DEVELOPMENT.md](./DEVELOPMENT.md#debugging) for debugging tips and common issues.

## Project-Specific Conventions

- **Type Safety**: All new files should use TypeScript with strict mode enabled. Avoid `any` types and use proper interfaces.
- **Styling**: Utilize TailwindCSS for styling. Custom CSS should be avoided unless necessary.

## Integration Points

- **API Communication**: API routes are defined in `server/routes/api/`. Use composables for data fetching, ensuring a consistent approach across components.
- **State Management**: Use Pinia for global state management, with stores defined in `app/stores/`.

## Conclusion

This document serves as a guide for AI agents to understand the Last Typist Standing codebase. For further details, refer to the respective documentation files linked throughout this document.
