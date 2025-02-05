# Codebase Overview

This document provides an overview of the project structure and the core architecture components.

## Directory Structure

- **.env & .env.example**: Environment configuration files holding sensitive credentials and connection strings.

- **.git/**: Git repository information for version control.

- **.github/**: Contains GitHub-specific configurations such as workflows, issue templates, and pull request guidelines.

- **app/**: The main Next.js application directory. It contains the file-based routing, pages, and application layouts. This is where the client-side and server-side rendering logic lives.

- **components/**: Contains reusable React components used throughout the application.

- **hooks/**: Custom React hooks that encapsulate common logic and state management for reuse across components.

- **blocks/**: Likely contains larger, composite UI blocks or sections that combine multiple components to form feature-rich parts of the UI.

- **lib/**: Contains backend logic, utilities, and service modules. For instance, the database schema and migration files are found under lib/db as referenced by the drizzle configuration.

- **public/**: Static assets such as images, fonts, and icons that are served directly.

- **Configuration & Build Files**:
  - **tailwind.config.ts**: Configuration file for Tailwind CSS, controlling styling and design tokens.
  - **postcss.config.mjs**: Configures PostCSS for processing styles.
  - **tsconfig.json**: TypeScript configuration, ensuring proper type-checking and compilation.
  - **next.config.ts**: Next.js specific configuration for routing, webpack, and other custom settings.
  - **.eslintrc.json**: ESLint configuration for maintaining code quality and consistency.
  - **drizzle.config.ts**: Configuration for Drizzle ORM used for database schema management and migrations.

- **Other Files**:
  - **package.json & pnpm-lock.yaml**: Manage project dependencies and scripts.
  - **biome.jsonc**: Likely used for Biome configuration (a tool for linting/formatting or project setup).
  - **LICENSE**: The legal license for the project.
  - **README.md**: An overall overview of the project.

## Architecture Overview

The project is built as a modern web application utilizing Next.js and TypeScript. Below is an overview of its core architectural components:

### Frontend

- **Next.js App Directory (`app/`)**: Utilizes Next.js's file-based routing system for organizing pages and layouts, enabling both server-side and client-side rendering.

- **UI Components (`components/` & `blocks/`)**: Contains reusable UI elements and larger page sections, enabling consistent styling and functionality across the app.

- **Custom Hooks (`hooks/`)**: Encapsulates stateful logic and API calls, promoting reusability and maintainability of React state management.

### Backend & Services

- **Business Logic & Utilities (`lib/`)**: Houses non-UI logic such as service utilities, helper functions, and database interactions. Notably, the `lib/db` directory contains the database schema and migration files, as configured by Drizzle ORM in `drizzle.config.ts`.

- **Middleware (`middleware.ts`)**: Implements server-side request handling, authentication, or other cross-cutting functionalities using Next.js middleware.

### Styling & Build Tools

- **Tailwind CSS and PostCSS**: Styling is managed through Tailwind CSS (configured via `tailwind.config.ts`) and processed by PostCSS (`postcss.config.mjs`), ensuring a modern, utility-first approach to styling.

- **TypeScript & ESLint**: The project is built with TypeScript for type safety, while ESLint (configured via `.eslintrc.json`) enforces coding standards and best practices.

### Deployment & Environment

- **Environment Management**: Environment-specific configurations and secret keys are managed via `.env` files, which are critical for connecting to external services and databases (e.g., PostgreSQL as referenced in `drizzle.config.ts`).

- **Version Control & CI/CD**: The presence of Git and the `.github` directory indicates integration with GitHub for version control and automated workflows, which may include tests, linters, and deployment pipelines (especially for platforms like Vercel).

## Summary

The core components of the application include:

1. **Application Core**: Managed under the `app/` folder, offering seamless routing and rendering using Next.js.

2. **UI Layer**: Composed of `components/`, `blocks/`, and `hooks/`, which create a modular and maintainable front-end interface.

3. **Backend Services**: Housed within the `lib/` directory, handling database interactions, business logic, and external service integrations.

4. **Configuration and Tools**: A comprehensive set of configurations (TypeScript, Tailwind, PostCSS, ESLint, etc.) that ensure a high-quality, scalable codebase.

This overview should provide a clear understanding of the codebase structure and the architectural decisions underlying the project. 