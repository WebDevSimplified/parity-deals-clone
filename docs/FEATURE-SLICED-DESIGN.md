# Feature Sliced Design (FSD) Architecture Guidelines

When developing features and adding new code to this project, you MUST strictly adhere to the Feature Sliced Design architecture and folder structure outlined below.

---

## 📂 Directory Structure Overview

The project is structured into global shared elements and isolated features:

```text
src/
├── app/                    # 🌐 Next.js App Router (Pages, Layouts, API Routes)
│   ├── (auth)/             # Auth Route Group (Sign-In, Sign-Up)
│   ├── (marketing)/        # Public Marketing / Landing Pages
│   ├── dashboard/          # 🔒 RBAC Protected Admin/User Dashboard Workspace
│   └── api/                # API Endpoints (Webhooks, Banner APIs)
├── components/             # ✅ GLOBAL SHARED COMPONENTS (Atomic UI / Forms)
│   └── ui/                 # shadcn/ui primitive wrappers (e.g., button, card, dialog, etc.)
├── data/                   # ✅ GLOBAL SHARED Constants & Env Configurations
│   └── subscriptionTiers.ts# Global pricing and tier definitions
├── drizzle/                # ✅ GLOBAL SHARED Database Setup & Schemas
│   ├── migrations/         # SQL migration scripts
│   ├── db.ts               # Database client connection
│   └── schema.ts           # Drizzle schema definitions
├── features/               # 🏗️ FEATURE-SLICED DESIGN (FSD) ISOLATED DOMAINS
│   ├── analytics/          # Analytics metrics and view tracking
│   ├── products/           # Product CRUD, customization, and discounting
│   ├── subscriptions/      # Stripe payment portals and tier levels
│   └── users/              # User syncing via Clerk auth webhook
├── hooks/                  # ✅ GLOBAL SHARED React Hooks (e.g. use-toast.ts)
├── lib/                    # ✅ GLOBAL SHARED Utilities & Wrapper Libraries
│   ├── cache.ts            # dbCache database query caching helper
│   ├── formatters.ts       # Value representation utilities
│   └── permissions.ts      # RBAC / access control evaluation functions
├── server/                 # ✅ GLOBAL SHARED Data Access Layer (Promoted server files)
│   ├── db/                 # Promoted database queries
│   └── actions/            # Promoted server actions
├── tasks/                  # ⚙️ SYSTEM/CLI SCRIPTS (Never imported by code)
│   └── updateCountryGroups.ts # Sync task for country datasets
└── middleware.ts           # Next.js Middleware (Clerk routing protection)
```

---

## 🏗️ Feature-First Mini-Applications

Each feature in `src/features/[feature-name]/` is a **self-contained, isolated module** that acts like a mini-application. It is strictly organized by business capabilities (e.g., `products`, `subscriptions`) rather than technical roles.

To keep features decoupled, they have their own local versions of standard folders. A feature directory can contain:

```text
src/features/[feature-name]/
├── components/    # Feature-specific UI components and forms
├── hooks/         # Feature-specific React hooks
├── utils/         # Feature-specific helpers and utility functions
├── contexts/      # Feature-specific React state providers
├── schemas/       # Feature-specific Zod validation schemas
└── server/        # Feature-specific server operations
    ├── actions/   # Feature-specific Server Actions (mutations)
    └── db/        # Feature-specific Database queries (wrapped with dbCache)
```

---

## 📈 The Rule of Promotion

To prevent early optimization and keep the global scope clean, follow the **Rule of Promotion**:

1. **Local-First:** All code (components, hooks, queries, actions, types, zod schemas) MUST start inside its specific feature folder.
2. **Promotion on Demand:** Never create files in global root folders (like `src/hooks/`, `src/lib/`, `src/components/`, `src/server/db/`, or `src/server/actions/`) on day one.
3. **Trigger:** Move code out of the feature and promote it to the global shared `src/` directory **only when it is needed by another feature**.

---

## 🛑 Import Boundary Rules

Strict dependency rules are enforced via ESLint to prevent cross-feature imports and maintain clean horizontal boundaries:

1. **Shared to Feature:** Features CAN import from global shared folders (e.g., `src/components/`, `src/lib/`, `src/server/`).
2. **Within Feature:** Files within a feature CAN import other files from the SAME feature.
3. **Feature to Feature:** Features CANNOT import from other features. Cross-feature imports are strictly forbidden.
4. **Shared Imports Restrictions:** Shared folders are not allowed to import items from features or app folders.
   - **Bridge Exception:** `src/lib/permissions.ts` (shared) is allowed to import from features' `db` folders (`src/features/*/server/db/*`) to evaluate access control across multiple domains (e.g. checking subscription tiers and product count).

> [!NOTE]
> **Keeping Linters in Sync:** Any import boundary exception (like `permissions.ts`) must be explicitly declared in **both** linting configurations:
> 1. `.eslintrc.json` (under `boundaries/element-types` rules)
> 2. `independentModules.jsonc` (project-structure rules)
> This ensures that regardless of which configuration is active, the workspace builds successfully.

---

## 📝 React Form Action Type-Safety

When using Next.js Server Actions as form handlers, React expects the function signature to return `void` or `Promise<void>`. Returning objects (e.g., `{ error: boolean }`) will cause TypeScript compilation failures during build time.

### Good Practice: Returning `void`
```typescript
// src/features/subscriptions/server/actions/stripe.ts
export async function createCustomerPortalSession() {
  const { userId } = auth()
  if (userId == null) return // returns void, matching React form action signature
  
  // ... session creation ...
}
```

### Handling Action State & Feedback
If you need to return status or validation errors back to the client, use React's `useActionState` hook instead of binding the action directly to `<form action={...}>`:

```tsx
// src/components/MyForm.tsx
import { useActionState } from "react"
import { myAction } from "@/features/my-feature/server/actions"

export function MyForm() {
  const [state, formAction, isPending] = useActionState(myAction, { error: null })

  return (
    <form action={formAction}>
      {state.error && <p className="text-red-500">{state.error}</p>}
      <button disabled={isPending}>Submit</button>
    </form>
  )
}
```

---

## 🚪 Controlled Feature Communication (Public APIs)

If Feature A **must** communicate with Feature B, Feature B should expose a controlled entry point via an `index.ts` file in its root. This index file acts as a gatekeeper.

```text
src/features/subscriptions/
├── components/
├── server/
└── index.ts        # 🚪 Public API: Only exports safe queries/helpers for other features
```

### Example Usage:
```typescript
// ✅ ALLOWED: Importing from the public feature index API
import { getUserSubscriptionTier } from "@/features/subscriptions"

// ❌ FORBIDDEN: Importing from the feature's internal folders
import { getUserSubscriptionTier } from "@/features/subscriptions/server/db/subscription"
```

---

## ⚡ DB Caching Pattern

Database queries in feature `db` folders should use the `dbCache` wrapper (Next.js `unstable_cache` helper) defined in `src/lib/cache.ts` for optimized server-side rendering:

### Caching a Database Query (`src/features/*/server/db/*`)
```typescript
import { dbCache, getUserTag } from "@/lib/cache"
import { db } from "@/drizzle/db"

export const getProducts = dbCache(
  async (userId: string) => {
    return db.query.ProductTable.findMany({
      where: eq(ProductTable.clerkUserId, userId),
    })
  },
  {
    tags: [getUserTag(userId, "products")]
  }
)
```

### Revalidating Caches in Server Actions (`src/features/*/server/actions/*`)
When performing mutations, revalidate the database cache tags using `revalidateDbCache`:
```typescript
import { revalidateDbCache } from "@/lib/cache"

export async function createProduct(data: ProductSchema) {
  // ... mutation logic ...
  
  revalidateDbCache({ tag: "products", userId })
}
```

---

## 🔒 Environment Variable Validation

Environment variables are validated at runtime using `@t3-oss/env-nextjs` and are split into two files:
- **Server Variables** (`src/data/env/server.ts`): Loaded and accessible only in Server Components / API Routes.
- **Client Variables** (`src/data/env/client.ts`): Accessible in Client Components (prefixed with `NEXT_PUBLIC_`).

Do not read `process.env` directly; import `env` from `@/data/env/server` or `@/data/env/client` instead.

### Build-Time Bypass
To prevent production compilation or CI/CD pipelines from failing due to missing environment variables, configure a validation bypass in `src/data/env/server.ts`:

```typescript
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION, // ⚡ Bypasses validation checks during build compilation
  server: {
    DATABASE_URL: z.string().url(),
    // ... other env schemas ...
  },
  experimental__runtimeEnv: process.env,
})
```
