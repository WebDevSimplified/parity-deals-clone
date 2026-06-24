# Parity Deals Clone

## Stack

- **Framework:** Next.js 14.2.11 (App Router), React 18
- **Auth:** Clerk (webhooks at `/api/webhooks/clerk`)
- **DB:** PostgreSQL via Neon serverless + Drizzle ORM (`src/drizzle/`)
- **Payments:** Stripe (3 tiers: Basic $19, Standard $49, Premium $99)
- **Styling:** Tailwind CSS + shadcn/ui (New York style)

## Commands

| Command                       | Use                                         |
| ----------------------------- | ------------------------------------------- |
| `pnpm dev`                    | Dev server                                  |
| `pnpm build`                  | Production build (includes type checking)   |
| `pnpm lint`                   | ESLint (enforces import boundaries)         |
| `pnpm db:generate`            | Generate Drizzle migrations                 |
| `pnpm db:migrate`             | Apply migrations                            |
| `pnpm db:studio`              | Drizzle Studio GUI                          |
| `pnpm db:updateCountryGroups` | Seed country groups (run after setup)       |
| `pnpm stripe:webhooks`        | Stripe CLI tunnel for local webhook testing |

## Architecture

### Import boundaries (enforced by ESLint)

- `src/components/`, `src/data/`, `src/drizzle/`, `src/hooks/`, `src/lib/` — **shared**, import only each other
- `src/features/*/` — import from shared only; cross-feature imports forbidden
- `src/app/` — imports from shared and features
- `src/tasks/` — never imported

### Feature directory pattern (`src/features/*/`)

Each feature has:

- `server/db/` — DB queries wrapped with `dbCache` (Next.js `unstable_cache`)
- `server/actions/` — server actions
- `schemas/` — Zod validation schemas
- `components/` — feature-specific components

## Key quirks

- **Env validation:** Uses `@t3-oss/env-nextjs` — server vars in `src/data/env/server.ts`, client vars in `src/data/env/client.ts`. All env vars are validated at runtime.
- **Caching:** Use `dbCache()` wrapper + `revalidateDbCache()` for tag-based invalidation (global/user/id tags). See `src/lib/cache.ts`.
- **Drizzle logger enabled** in `src/drizzle/db.ts` (`logger: true`).
- **Two ESLint configs:** `.eslintrc.json` (boundaries plugin, active) vs `.eslintrc.alt.json` (project-structure). Switch by renaming files.
- **No test framework** installed (no Jest, Vitest, Playwright in deps).
- **Route groups:** `(auth)/` (sign-in/up), `(marketing)/` (landing), `dashboard/`, `api/`.
- **Path alias:** `@/*` maps to `./src/*`.

## Local setup

1. `pnpm install`
2. Copy `.env.example` → `.env`, fill vars (needs Neon DB URL, Clerk keys, Stripe keys)
3. `pnpm db:generate` then `pnpm db:migrate`
4. `pnpm db:updateCountryGroups`
5. `pnpm dev`

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
