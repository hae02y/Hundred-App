# Agent Guide for HundredApp

## Project Snapshot
- Framework: Next.js 15 (App Router)
- Language: TypeScript (strict)
- Styling: TailwindCSS 4
- Package manager: pnpm
- State: React hooks, optional zustand

## Common Commands
All commands are run from repository root.

### Install
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

### Production build + run
```bash
pnpm build
pnpm start
```

### Lint
```bash
pnpm lint
```

## Tests
- No test runner is configured yet.
- There are no `test` scripts in `package.json`.
- If tests are added later, update this file with the exact command.

### Running a single test (when tests exist)
- Not available in current setup.
- Recommend adding a runner (e.g., Vitest or Jest) before documenting per-test commands.

## Code Structure
- `app/`: Next.js App Router routes and layouts.
- `src/components/`: Reusable React components.
- `src/config/apps/`: JSON config per app key.
- `src/hooks/`: Custom hooks (e.g., cooldown).
- `src/lib/`: Utilities and loaders.
- `src/types/`: TypeScript types and shared interfaces.

## TypeScript & React Conventions
- `strict` mode is enabled in `tsconfig.json`.
- Prefer explicit typing for props and utility functions.
- Use functional components and hooks.
- Use `use client` only in client components.
- Async server components are allowed in `app/`.
- Avoid `any` unless absolutely necessary.

## Imports
- Prefer path alias `@/` for `src/` imports.
- Keep React/Next imports first, then third-party, then local.
- Use type-only imports with `import type` when possible.
- JSON config imports live in `src/lib/app-config-loader.ts`.

## Formatting
- Codebase uses single quotes in TS/TSX.
- Semicolons are present and should be preserved.
- Keep JSX props multi-line when long.
- Align with existing Tailwind class string formatting.
- There is no Prettier config; follow existing style.

## Naming
- Components: `PascalCase` file and component names.
- Hooks: `useSomething`.
- Types/interfaces: `PascalCase`.
- Variables and functions: `camelCase`.
- JSON config files: `kebab-case` app keys.

## Error Handling
- Prefer early returns for guard conditions.
- Use `try/catch` around async fetches.
- Log errors with context (`console.error`) and show a user-friendly fallback.
- In server components, use `notFound()` for missing data.

## Data & Config
- Each app is defined by a JSON file under `src/config/apps/`.
- New apps must be registered in `src/lib/app-config-loader.ts`.
- App configs are typed by `src/types/app-config.ts`.

## API Routes
- Located under `app/api/`.
- Expect JSON payloads and return JSON responses.
- Validate inputs and return appropriate status codes.

## Styling & UI
- TailwindCSS is the primary styling system.
- Keep responsive utility classes consistent (`md:`, `lg:` etc.).
- Prefer composable components instead of inline duplication.

## SEO & Metadata
- Metadata is generated in route files like `app/[appKey]/page.tsx`.
- JSON-LD helpers live under `src/lib/seo`.
- Preserve canonical URLs and Open Graph metadata patterns.

## Linting Rules
- ESLint extends `next/core-web-vitals`.
- `react/no-unescaped-entities` is disabled.
- Run `pnpm lint` before large changes.

## Agent Notes
- Do not edit files in `node_modules/`.
- Keep changes focused and aligned with existing patterns.
- Avoid adding new tooling without explicit request.

## Cursor / Copilot Rules
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` found.
- If these files are added later, update this guide accordingly.
