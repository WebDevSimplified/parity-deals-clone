# Feature Sliced Design (FSD) Architecture Guidelines

When developing features and adding new code to this project, you MUST strictly adhere to the Feature Sliced Design architecture and folder structure outlined below.

## 📂 Directory Structure Overview

The project is structured into global shared elements and isolated features:

```text
src/
├── app/                    # 🌐 Next.js App Router (Pages, Layouts, API Routes)
│   ├── (marketing)/        # Public Landing Pages
│   ├── (auth)/             # Onboarding & Sign-In Layouts
│   ├── (dashboard)/        # 🔒 (RBAC) Role-Based Access Control Protected Workspaces
│   │   ├── user/           # User Portals
│   │   ├── admin/          # Admin Portals
│   │   └── shared/         # Cross-Role General Intersections (e.g., inbox, drafts, archived, sent, spam, trash, settings, etc.)
│   ├── globals.css         # Global stylesheets (e.g., Tailwind imports)
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # ✅ GLOBAL SHARED COMPONENTS
│   ├── layout/             # Layout components (e.g., header, footer, sidebar)
│   ├── primitives/         # Reusable UI components wrappers
│   ├── theme/              # Theme-related components
│   └── ui/                 # Shadcn UI primitives (e.g., button, card, dialog, etc.)
├── config/                 # ✅ GLOBAL SHARED App-wide configuration (e.g., Environment-based configs, constants, base URLs, etc.)
│   └── env.ts              # e.g., Validated environment variables (Zod)
├── contexts/               # ✅ GLOBAL SHARED React Contexts (e.g., Auth, Theme, Mobile menu, etc.)
│   ├── theme-context.tsx   # e.g., Theme context provider
│   └── auth-context.tsx    # e.g., Authentication context provider
├── data/                   # ✅ GLOBAL SHARED Static data, constants, or mock data
├── drizzle/                # ✅ GLOBAL SHARED Database schema (e.g., SQL schema, Drizzle ORM, etc.)
│   ├── migrations/         # SQL migration scripts
│   ├── db.ts               # Drizzle database connection
│   ├── schema.ts           # Drizzle schemas (e.g., User, Project, etc.)
│   └── seed.ts             # Drizzle seeders (e.g., DB seeding scripts)
├── schemas/                # ✅ GLOBAL SHARED Zod schemas (Validation)
├── server/                 # ✅ GLOBAL SHARED Server operations (Mutations, Actions, DB calls via Drizzle)
│   ├── actions/            # Global Server Actions
│   └── db/              	# Global Database Operations
├── features/               # 🏗️ FEATURE-SLICED DESIGN (FSD) ISOLATED DOMAINS, Feature-based business logic
├── hooks/                  # ✅ GLOBAL SHARED React Hooks
├── lib/                    # ✅ GLOBAL SHARED Library configurations, HEAVY THIRD-PARTY WRAPPERS, etc.
│   └── utils.ts            # e.g., General utilities (cn helper)
├── types/                  # ✅ GLOBAL SHARED Ambient TypeScript Type Matrices & Definitions
└── utils/                  # ✅ GLOBAL SHARED utility functions
```

---

## 🏗️ Feature Sliced Design (`src/features/`)

Each feature located in `src/features/` is a **self-contained, isolated module**. Features are **NOT shareable** across other features.

### Isolation Principle

| Location                                                                                 | Shareable? | Purpose                    |
| :--------------------------------------------------------------------------------------- | :--------- | :------------------------- |
| `src/components/`, `src/hooks/`, `src/lib/`, `src/contexts/`, `src/utils/`, `src/types/` | ✅ **YES** | Shared globally            |
| `src/features/[name]/`                                                                   | ❌ **NO**  | Feature-specific, isolated |

### Feature Internal Structure

When creating or modifying a feature, structure its internal directories as follows:

```text
src/features/[feature-name]/
├── servers/       # Feature-specific server actions (e.g. Actions, API calls, Database Operations and mutations)
├── components/    # Feature-specific UI components
├── hooks/         # Feature-specific custom hooks
├── schemas/       # Feature-specific Zod schemas
├── utils/         # Feature-specific helper functions, mappers, validators
└── etc...         # Any other feature-specific folders or files
```

### 🛑 Import Rules

You must respect these dependency rules to maintain isolation:

- **Shared to Feature**: Features CAN import from global shared folders.
- **Within Feature**: Files within a feature CAN import other files from the SAME feature.
- **Feature to Feature**: Features CANNOT import from other features. Cross-feature imports are strictly forbidden.

**Examples:**

```tsx
// ✅ ALLOWED: Shared → Feature
import { Button } from "@/components/ui/button";

// ✅ ALLOWED: Within same feature (e.g. `projects` feature)
import { ProjectCard } from "@/features/projects/components/project-card";

// ❌ FORBIDDEN: Feature → Feature (e.g. `projects` feature using or importing from `services` feature)
import { ServiceCard } from "@/features/services/components/service-card";
```

> **Need to share between features?**
> If logic or UI components are required by multiple features, you MUST extract them to `src/components/`, `src/hooks/`, `src/lib/`, `src/types/`, or `src/utils/` to share them globally instead of creating cross-feature dependencies.
