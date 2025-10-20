# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router routes (`auth`, `protected`) and server components that read from Supabase; colocate route-specific UI under their route folder.
- `components/`: Reusable UI (shadcn/ui wrappers live in `components/ui`) and feature widgets such as `todo-input`, `todo-item`, and analytics blocks.
- `hooks/`: Custom React hooks like `use-toast` that encapsulate shared client behaviour; import them via the `@/hooks/*` alias defined in `tsconfig.json`.
- `lib/`: Client setup (`lib/supabase.ts`) and cross-cutting helpers; extend `lib/supabase` for row types or RPC helpers rather than creating ad-hoc clients.
- `public/`: Static assets served by Next.js. Database bootstrap lives in `setup-database.sql`; run it against a Supabase project before local testing. Manual browser checks are scripted in `test-add-button.js`.

## Build, Test, and Development Commands
```bash
npm run dev    # Start the Next.js dev server with Supabase client hooks
npm run build  # Create a production build; fails on type or lint errors
npm run start  # Serve the production build locally
npm run lint   # ESLint (via eslint-config-next) for TypeScript and JSX
```
Install dependencies once with `npm install`. Keep the dev server running while adjusting Supabase policies to catch auth issues early.

## Coding Style & Naming Conventions
- TypeScript everywhere; prefer `.tsx` for components and keep props typed explicitly instead of relying on `any`.
- Two-space indentation, trailing semicolons, and single quotes match the current codebase; let ESLint surface style drift.
- Components and modules use PascalCase (`TodoStats.tsx`), hooks use `useSomething`, and utility files stay camelCase.
- Tailwind CSS drives styling; group utility classes by layout → colour → state for readability. Avoid inline styles unless absolutely necessary.

## Testing Guidelines
- Automated testing is not yet wired in. Run `npm run lint` before commits, then execute the manual script in `test-add-button.js` from the browser console on `http://localhost:3000` to confirm add/toggle flows.
- When adding tests, follow a `*.test.ts` or `*.spec.ts` suffix in a `tests/` or colocated `__tests__` directory so future tooling (Vitest/Playwright) can pick them up consistently.
- Validate database changes with the `setup-database.sql` schema and watch the browser console for Supabase errors.

## Commit & Pull Request Guidelines
- Local history is not bundled here; align with Conventional Commits (`feat:`, `fix:`, `chore:`) so changelog automation stays possible once the repo is connected.
- Each PR should include: purpose summary, screenshots or GIFs of UI changes, notes on Supabase schema updates, and a checklist of commands run (`npm run lint`, manual test script).
- Link the relevant issue or Supabase ticket, call out any required environment variables, and request review from both frontend and backend owners when auth rules are touched.
