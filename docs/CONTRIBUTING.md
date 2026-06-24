# Contributing Guide

Welcome to the project! This document provides guidelines for setting up your local environment, running the application, and contributing changes.

## Local Development Setup

### Prerequisites
- **Node.js**: `v18.x` or later (matching the React 18 / Next.js 14 stack)
- **pnpm**: `v9.x` or later (workspace manager)
- **Stripe CLI**: Optional, required for local webhook testing
- **Docker**: Optional, for running local PostgreSQL if not using Neon Database

### Setup Steps
1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
4. Fill in the required environment variables in `.env` (see the [Environment Variables](#environment-variables) section below).
5. Generate and run the database migrations:
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```
6. Seed or update country groups:
   ```bash
   pnpm db:updateCountryGroups
   ```
7. Start the local development server:
   ```bash
   pnpm dev
   ```

---

## Available Commands

<!-- AUTO-GENERATED -->
| Command | Description |
|---------|-------------|
| `pnpm dev` | Starts the Next.js development server with hot-reload |
| `pnpm build` | Compiles the production build with type checking |
| `pnpm start` | Starts the compiled production build locally |
| `pnpm lint` | Runs ESLint for checking syntax, imports, and boundaries |
| `pnpm db:generate` | Generates SQL migrations from Drizzle schema |
| `pnpm db:migrate` | Executes pending Drizzle database migrations |
| `pnpm db:studio` | Opens Drizzle Studio web UI to view and edit database data |
| `pnpm db:updateCountryGroups` | Runs the TS task to sync and populate country groups |
| `pnpm stripe:webhooks` | Listens to Stripe events and forwards them to the local server endpoint |
<!-- AUTO-GENERATED -->

---

## Environment Variables

<!-- AUTO-GENERATED -->
### Database
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | **Yes** | Postgres connection URL (Neon or local) | `postgres://user:pass@host:5432/db` |

### Clerk Authentication
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `CLERK_SECRET_KEY` | **Yes** | Clerk authentication secret API key | `sk_test_...` |
| `CLERK_WEBHOOK_SECRET` | **Yes** | Signature secret for Clerk webhook routing | `whsec_...` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | **Yes** | Clerk public key for client-side routing | `pk_test_...` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | No | Route to sign-in page (default: `/sign-in`) | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | No | Route to sign-up page (default: `/sign-up`) | `/sign-up` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL` | No | Target path after successful sign-in | `/dashboard` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL` | No | Target path after successful sign-up | `/dashboard` |

### Stripe Payments
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `STRIPE_BASIC_PLAN_STRIPE_PRICE_ID` | **Yes** | Price ID for the Basic subscription plan | `price_...` |
| `STRIPE_STANDARD_PLAN_STRIPE_PRICE_ID` | **Yes** | Price ID for the Standard subscription plan | `price_...` |
| `STRIPE_PREMIUM_PLAN_STRIPE_PRICE_ID` | **Yes** | Price ID for the Premium subscription plan | `price_...` |
| `STRIPE_SECRET_KEY` | **Yes** | Stripe secret API key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | **Yes** | Signature secret for Stripe webhook validation | `whsec_...` |

### General Configuration & Local Testing
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_SERVER_URL` | No | Root server URL for redirects and APIs (default: `http://localhost:3000`) | `https://my-app.com` |
| `TEST_COUNTRY_CODE` | No | Country code override for local testing of PPP banners | `IN`, `US`, `GB` |
<!-- AUTO-GENERATED -->

---

## Code Quality and Import Rules

This project enforces a clean, modular structure. Two ESLint plugins are supported:
- **`eslint-plugin-project-structure`**: Configuration is in `independentModules.jsonc`.
- **`eslint-plugin-boundaries`**: Configuration is in `.eslintrc.json`.

If you prefer to check imports using `eslint-plugin-project-structure`:
1. Remove `.eslintrc.json`
2. Rename `.eslintrc.alt.json` to `.eslintrc.json`

Run checks using:
```bash
pnpm lint
```

---

## PR Submission Checklist

Before submitting a Pull Request, ensure that:
1. All linting checks pass: `pnpm lint`
2. The production build compiles successfully: `pnpm build`
3. All environment variables added are listed in `.env.example`
4. Database migrations have been generated for any schema modifications
