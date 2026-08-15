# Chapter 05: ESLint Boundaries & Architecture Governance

[Master FSD Index](../FEATURE-SLICED-DESIGN.md) > Chapter 05: ESLint Boundaries & Governance

---

## 1. The Need for Automated Architectural Guardrails

Modular architectures like Feature-Sliced Design (FSD) provide high maintainability, domain isolation, and horizontal scalability. However, without automated compiler or linter gates, human discipline inevitably degrades over time. Common architectural rot includes:

- **Lateral Cross-Feature Coupling**: Feature A directly importing internal components or database helpers from Feature B.
- **Upward Inverted Dependencies**: Low-level shared utility libraries (`src/lib`) importing high-level feature logic (`src/features`).
- **Orphan / Rogue Modules**: Files created outside defined architectural layers without clear ownership or boundary constraints.

To eliminate architecture drift, this repository enforces strict boundary validation at build and lint time using [`eslint-plugin-boundaries`](file:///c:/projects/parity-deals-clone/package.json#L57) and [`eslint-plugin-project-structure`](file:///c:/projects/parity-deals-clone/package.json#L59).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FSD Dependency Hierarchy                        │
└────────────────────────────────────────────────────────────────────────┘

                 ┌──────────────────────────────┐
                 │       App Layer (Routing)     │
                 │          src/app/**/*        │
                 └──────────────┬───────────────┘
                                │ (can import both)
                 ┌──────────────┴───────────────┐
                 ▼                              │
  ┌──────────────────────────────┐              │
  │     Features (Domain Slices) │              │
  │    src/features/*/**/*       │              │
  │  (No peer feature imports!)  │              │
  └──────────────┬───────────────┘              │
                 │                              │
                 │ (can import shared)          │
                 ▼                              ▼
  ┌─────────────────────────────────────────────┐
  │           Shared Infrastructure Layers       │
  │  src/components  src/hooks   src/lib        │
  │  src/drizzle     src/data    src/server     │
  └─────────────────────────────────────────────┘
```

---

## 2. Programmatic Boundary Enforcement with `eslint-plugin-boundaries`

The primary boundary engine is configured in [`.eslintrc.json`](file:///c:/projects/parity-deals-clone/.eslintrc.json) using the `boundaries` ESLint plugin.

### Complete `.eslintrc.json` Configuration

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "plugins": ["boundaries"],
  "settings": {
    "boundaries/include": ["src/**/*"],
    "boundaries/elements": [
      {
        "mode": "full",
        "type": "shared",
        "pattern": [
          "src/components/**/*",
          "src/data/**/*",
          "src/drizzle/**/*",
          "src/hooks/**/*",
          "src/lib/**/*",
          "src/server/**/*"
        ]
      },
      {
        "mode": "full",
        "type": "feature",
        "capture": ["featureName"],
        "pattern": ["src/features/*/**/*"]
      },
      {
        "mode": "full",
        "type": "app",
        "capture": ["_", "fileName"],
        "pattern": ["src/app/**/*"]
      },
      {
        "mode": "full",
        "type": "neverImport",
        "pattern": ["src/*", "src/tasks/**/*"]
      }
    ]
  },
  "rules": {
    "boundaries/no-unknown": ["error"],
    "boundaries/no-unknown-files": ["error"],
    "boundaries/element-types": [
      "error",
      {
        "default": "disallow",
        "rules": [
          {
            "from": ["shared"],
            "allow": ["shared"]
          },
          {
            "from": ["feature"],
            "allow": [
              "shared",
              ["feature", { "featureName": "${from.featureName}" }]
            ]
          },
          {
            "from": ["app", "neverImport"],
            "allow": ["shared", "feature"]
          },
          {
            "from": ["app"],
            "allow": [["app", { "fileName": "*.css" }]]
          }
        ]
      }
    ]
  }
}
```

---

### Breakdown of Architectural Elements

| Element Type | Pattern | Description | Allowed Inbound Importers |
| :--- | :--- | :--- | :--- |
| `shared` | `src/components/**/*`<br/>`src/data/**/*`<br/>`src/drizzle/**/*`<br/>`src/hooks/**/*`<br/>`src/lib/**/*`<br/>`src/server/**/*` | Foundational primitives, DB schema, utilities, hooks, server helpers. | `shared`, `feature`, `app`, `neverImport` |
| `feature` | `src/features/*/**/*`<br/>(`capture: ["featureName"]`) | Isolated business domain slices (e.g. `products`, `subscriptions`, `analytics`, `users`). | `app`, and internal files within the **same** feature (`featureName`). |
| `app` | `src/app/**/*`<br/>(`capture: ["_", "fileName"]`) | Next.js App Router entry points, layouts, route handlers, page components. | No layers may import from `app` (except internal CSS). |
| `neverImport` | `src/*`, `src/tasks/**/*` | Root utilities or background operational scripts (e.g., [`updateCountryGroups.ts`](file:///c:/projects/parity-deals-clone/src/tasks/updateCountryGroups.ts)). | Disallowed from being imported by runtime application code. |

---

### Strict Import & Dependency Rules

1. **Shared Layer Isolation (`from: ["shared"]`)**:
   - `shared` modules can **only** import other `shared` modules.
   - ❌ Attempting to import from `src/features/*` or `src/app/*` inside `src/lib/` or `src/components/` triggers an immediate lint compilation error:
     ```
     error: '${file}' is not allowed to import '${target}' (boundaries/element-types)
     ```

2. **Feature Domain Boundary & Peer Prohibition (`from: ["feature"]`)**:
   - Features can import from `shared`.
   - Features can import from themselves using capture matching: `["feature", { "featureName": "${from.featureName}" }]`.
   - ❌ **Peer Feature Imports are STRICTLY FORBIDDEN**: `src/features/products` cannot import from `src/features/analytics` or `src/features/subscriptions`. Any shared logic must be hoisted to `src/lib/`, `src/data/`, or `src/server/`.

3. **App Composition Layer (`from: ["app"]`)**:
   - The App Router acts as the orchestrator and page assembler.
   - `app` is permitted to import from both `shared` and any `feature`.
   - Global stylesheet imports (`globals.css`) are permitted via `[["app", { "fileName": "*.css" }]]`.

4. **Catch-All Prohibition (`default: "disallow"`)**:
   - Any import relationship not explicitly permitted is blocked by default.
   - `boundaries/no-unknown` and `boundaries/no-unknown-files` ensure all files inside `src/` belong to recognized boundary elements.

---

### Alternative Structure Engine: `eslint-plugin-project-structure`

The repository also includes an alternative declarative structure definition in [`.eslintrc.alt.json`](file:///c:/projects/parity-deals-clone/.eslintrc.alt.json) and [`independentModules.jsonc`](file:///c:/projects/parity-deals-clone/independentModules.jsonc).

Key constraints defined in `independentModules.jsonc`:
- **Features Rule**:
  ```jsonc
  {
    "name": "Features",
    "pattern": "src/features/**",
    "allowImportsFrom": ["{family_3}/**", "{sharedImports}"],
    "errorMessage": "🔥 A feature may only import items from shared folders and its own family. Importing items from another feature is prohibited. 🔥"
  }
  ```
- **Permission File Exception**:
  ```jsonc
  {
    "name": "Permissions file",
    "pattern": "src/lib/permissions.ts",
    "allowImportsFrom": ["src/features/**/db/**"],
    "errorMessage": "🔥 The permission file may only import items from `src/features/**/db/**` 🔥"
  }
  ```

---

## 3. Verification & Lint Gate Commands

### Local Verification Commands

Developers can run lint verification locally before committing:

```bash
# Using npm
npm run lint

# Using pnpm
pnpm lint

# Using bun
bun run lint
```

When an illegal import occurs, ESLint exits with a non-zero exit code (`1`) and prints the exact offending import path:

```
c:/projects/parity-deals-clone/src/features/products/server/actions/products.ts
  4:1  error  Importing from feature 'analytics' inside feature 'products' is disallowed  boundaries/element-types

✖ 1 problem (1 error, 0 warnings)
```

---

### CI/CD Enforcement Workflow

To ensure zero architectural degradation reaches production branches, configure a continuous integration step in `.github/workflows/ci.yml`:

```yaml
name: CI Quality Gate

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  lint-and-validate:
    name: ESLint Boundary & Architecture Gate
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install Dependencies
        run: npm ci

      - name: Run ESLint Boundary Verification
        run: npm run lint

      - name: Verify TypeScript Compilation
        run: npx tsc --noEmit
```

---

## 4. Architectural Self-Audit Checklist for PR Reviews

When submitting or reviewing pull requests, verify compliance against this checklist:

| Check Item | Validation Criterion | Pass / Fail Rule |
| :--- | :--- | :--- |
| **1. Feature Domain Isolation** | Does any file in `src/features/A` import from `src/features/B`? | ❌ Fail if lateral imports exist. Hoist shared logic to `src/lib`, `src/data`, or `src/server`. |
| **2. Downward Layer Flow** | Does any file in `src/lib`, `src/components`, or `src/drizzle` import from `src/features` or `src/app`? | ❌ Fail if lower layer depends on upper layer. |
| **3. Schema Location** | Are all Zod validation contracts located in `src/features/[feature]/schemas/`? | ❌ Fail if validation schemas are inlined inside component JSX or mixed in actions. |
| **4. Permission Gates** | Are all mutating Server Actions guarded by `canCreateProduct` or subscription permission checks? | ❌ Fail if mutations execute without verifying user quotas and entitlements. |
| **5. Sub-component Grouping** | Are domain-specific UI components placed in `src/features/[feature]/components/` and shared primitives in `src/components/ui/`? | ❌ Fail if generic buttons or inputs live inside feature folders. |
| **6. Clean Lint Gate** | Does `npm run lint` pass with `0 errors` and `0 warnings`? | ❌ Fail if boundaries or rules are bypassed using `// eslint-disable`. |

---

## 5. Summary & Governance Protocol

1. **Linters are non-negotiable gates**: Boundary rules run on every save, commit, and pull request.
2. **Never cross feature streams**: Keep feature slices completely autonomous. If two features need the same helper, move the helper to `src/lib/` or `src/server/`.
3. **Respect layer hierarchies**: Dependencies may only flow downward towards `shared`.

---

← Previous: [Chapter 04: Forms, Zod & UI Patterns](./04-forms-zod-and-ui-patterns.md) | Next: [Chapter 06: Webhooks & Third-Party Sync](./06-webhooks-and-third-party-sync.md) →
