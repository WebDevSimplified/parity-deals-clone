# Feature Sliced Design (FSD) Architecture Guidelines

When developing features and adding new code to this project, you MUST strictly adhere to the Feature Sliced Design architecture and folder structure outlined below.

## 📂 Directory Structure Overview

The project is structured into global shared elements and isolated features:

```text
src/
├── app/                    # 🌐 Next.js App Router (Pages, Layouts, API Routes)
│   ├── (auth)/             # Auth Route Group (Sign-In, Sign-Up)
│   ├── (marketing)/        # Public Marketing / Landing Pages
│   ├── dashboard/          # 🔒 RBAC Protected Admin/User Dashboard Workspace
│   │   ├── products/       # Products Management Dashboard views
│   │   ├── analytics/      # Analytics views
│   │   └── subscription/   # Subscription Management view
│   ├── api/                # API Endpoints (Webhooks, Banner APIs)
│   │   ├── products/       # e.g., /api/products/[productId]/banner
│   │   └── webhooks/       # e.g., Stripe/Clerk Webhooks
│   ├── globals.css         # Global Stylesheet
│   ├── layout.tsx          # Root Layout
│   └── page.tsx            # Home page
├── components/             # ✅ GLOBAL SHARED COMPONENTS (Atomic UI / Forms)
│   ├── ui/                 # shadcn/ui primitive wrappers (e.g., button, card, dialog, etc.)
│   ├── Banner.tsx          # Shared UI elements
│   └── MarketingNavBar.tsx # Shared layouts
├── data/                   # ✅ GLOBAL SHARED Constants & Env Configurations
│   ├── env/                # validated runtime environment schemas
│   │   ├── server.ts       # Server-only variables schema
│   │   └── client.ts       # Client-only variables schema
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
│   ├── permissions.ts      # RBAC / access control evaluation functions
│   └── utils.ts            # General cn utility
├── tasks/                  # ⚙️ SYSTEM/CLI SCRIPTS (Never imported by code)
│   └── updateCountryGroups.ts # Sync task for country datasets
└── middleware.ts           # Next.js Middleware (Clerk routing protection)
```

---

## 🏗️ Feature Sliced Design (`src/features/`)

Each feature in `src/features/` is a **self-contained, isolated module**. Features are **NOT shareable** across other features to prevent tight coupling.

### Isolation Principle

| Location | Shareable? | Purpose |
| :--- | :--- | :--- |
| `src/components/`, `src/data/`, `src/hooks/`, `src/lib/`, `src/drizzle/` | ✅ **YES** | Shared globally |
| `src/features/[name]/` | ❌ **NO** | Feature-specific, isolated |

### Feature Internal Structure

When creating or modifying a feature, structure its internal directories as follows:

```text
src/features/[feature-name]/
├── components/    # Feature-specific UI components and forms
├── schemas/       # Feature-specific Zod validation schemas (e.g., product CRUD schemas)
└── server/        # Feature-specific server operations
    ├── actions/   # Next.js Server Actions for mutations (revalidates cache here)
    └── db/        # Database queries (wrapped with dbCache for tag-based caching)
```

---

## 🛑 Import Boundary Rules

Strict dependency rules are enforced via ESLint to prevent cross-feature imports:

1. **Shared to Feature**: Features CAN import from global shared folders.
2. **Within Feature**: Files within a feature CAN import other files from the SAME feature.
3. **Feature to Feature**: Features CANNOT import from other features. Cross-feature imports are strictly forbidden.
4. **Shared Imports Restrictions**: Shared folders are not allowed to import items from features or app folders.
   - **Bridge Exception**: `src/lib/permissions.ts` (shared) is allowed to import from features' `db` folders (`src/features/*/server/db/*`) to evaluate access control across multiple domains (e.g. checking subscription tiers and product count).

**Examples:**

```tsx
// ✅ ALLOWED: Shared → Feature
import { dbCache } from "@/lib/cache";
import { ProductTable } from "@/drizzle/schema";

// ✅ ALLOWED: Within same feature (e.g. `products` feature)
import { getProduct } from "@/features/products/server/db/products";

// ❌ FORBIDDEN: Feature → Feature (e.g. `products` feature importing from `subscriptions` feature)
import { createCheckoutSession } from "@/features/subscriptions/server/actions/stripe";
```

> **Need to share logic?**
> If logic, types, or UI components are required by multiple features, you MUST extract them to shared directories (e.g. `src/components/`, `src/hooks/`, `src/lib/`, etc.) instead of creating cross-feature imports.

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
