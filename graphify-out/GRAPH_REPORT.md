# Graph Report - parity-deals-clone  (2026-06-24)

## Corpus Check
- 86 files · ~20,746 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 509 nodes · 953 edges · 29 communities (23 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3e613090`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Development Operations & Contribution Setup|Development Operations & Contribution Setup]]
- [[_COMMUNITY_Feature Sliced Design (FSD) Rules & Boundaries|Feature Sliced Design (FSD) Rules & Boundaries]]
- [[_COMMUNITY_Production Operations & Webhooks|Production Operations & Webhooks]]
- [[_COMMUNITY_Core Integrations & Tech Stack|Core Integrations & Tech Stack]]
- [[_COMMUNITY_Build Tooling & Workspaces|Build Tooling & Workspaces]]
- [[_COMMUNITY_Database Query Caching (dbCache)|Database Query Caching (dbCache)]]
- [[_COMMUNITY_Environment Variables Validation|Environment Variables Validation]]
- [[_COMMUNITY_createProduct|createProduct]]
- [[_COMMUNITY_deleteProduct|deleteProduct]]
- [[_COMMUNITY_updateCountryDiscounts|updateCountryDiscounts]]
- [[_COMMUNITY_updateProduct|updateProduct]]
- [[_COMMUNITY_updateProductCustomization|updateProductCustomization]]
- [[_COMMUNITY_createCancelSession|createCancelSession]]
- [[_COMMUNITY_createCheckoutSession|createCheckoutSession]]
- [[_COMMUNITY_createCustomerPortalSession|createCustomerPortalSession]]
- [[_COMMUNITY_RootLayout|RootLayout]]
- [[_COMMUNITY_GET|GET]]
- [[_COMMUNITY_ViewsByCountryChart|ViewsByCountryChart]]
- [[_COMMUNITY_POST|POST]]
- [[_COMMUNITY_Banner|Banner]]
- [[_COMMUNITY_BrandLogo|BrandLogo]]
- [[_COMMUNITY_HasPermission|HasPermission]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_getTierByPriceId|getTierByPriceId]]

## God Nodes (most connected - your core abstractions)
1. `revalidateDbCache()` - 18 edges
2. `dbCache()` - 17 edges
3. `compilerOptions` - 16 edges
4. `Button` - 14 edges
5. `getUserTag()` - 12 edges
6. `useToast()` - 11 edges
7. `getIdTag()` - 11 edges
8. `Runbook` - 11 edges
9. `scripts` - 10 edges
10. `Card` - 10 edges

## Surprising Connections (you probably didn't know these)
- `ESLint Import Boundaries` --semantically_similar_to--> `🛑 Import Boundary Rules`  [INFERRED] [semantically similar]
  AGENTS.md → docs/FEATURE-SLICED-DESIGN.md
- `dbCache Caching Pattern` --semantically_similar_to--> `⚡ DB Caching Pattern`  [INFERRED] [semantically similar]
  AGENTS.md → docs/FEATURE-SLICED-DESIGN.md
- `⚡ DB Caching Pattern` --references--> `dbCache()`  [EXTRACTED]
  docs/FEATURE-SLICED-DESIGN.md → src/lib/cache.ts
- `⚡ DB Caching Pattern` --references--> `revalidateDbCache()`  [EXTRACTED]
  docs/FEATURE-SLICED-DESIGN.md → src/lib/cache.ts
- `dbCache Caching Pattern` --references--> `dbCache()`  [EXTRACTED]
  AGENTS.md → src/lib/cache.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **FSD Architectural Boundaries & Exceptions** — docs_feature_sliced_design_fsd, docs_feature_sliced_design_isolation_principle, docs_feature_sliced_design_import_boundary_rules, docs_feature_sliced_design_bridge_exception [EXTRACTED 1.00]
- **Runtime Validation & DB Caching** — docs_feature_sliced_design_db_caching_pattern, docs_feature_sliced_design_env_validation, lib_cache_dbcache, env_server_variables [INFERRED 0.85]

## Communities (29 total, 6 thin omitted)

### Community 0 - "Development Operations & Contribution Setup"
Cohesion: 0.06
Nodes (37): Available Commands, Clerk Authentication, Code Quality and Import Rules, Contributing Guide, Database, Environment Variables Configuration, Environment Variables, General Configuration & Local Testing (+29 more)

### Community 1 - "Feature Sliced Design (FSD) Rules & Boundaries"
Cohesion: 0.22
Nodes (8): ESLint Import Boundaries, 📂 Directory Structure Overview, 🔒 Environment Variable Validation, Feature Internal Structure, Feature Sliced Design (FSD) Architecture Guidelines, 🏗️ Feature Sliced Design (`src/features/`), 🛑 Import Boundary Rules, Isolation Principle

### Community 2 - "Production Operations & Webhooks"
Cohesion: 0.04
Nodes (46): dependencies, class-variance-authority, @clerk/nextjs, clsx, date-fns, @date-fns/tz, drizzle-orm, @hookform/resolvers (+38 more)

### Community 3 - "Core Integrations & Tech Stack"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 4 - "Build Tooling & Workspaces"
Cohesion: 0.40
Nodes (4): allowBuilds, @clerk/shared, esbuild, unrs-resolver

### Community 5 - "Database Query Caching (dbCache)"
Cohesion: 0.08
Nodes (43): dbCache Caching Pattern, ViewsByCountryCard(), ViewsByPPPCard(), GET(), getCountryCode(), getJavaScript(), Banner(), createProduct() (+35 more)

### Community 6 - "Environment Variables Validation"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 7 - "createProduct"
Cohesion: 0.10
Nodes (31): createProduct(), updateCountryDiscounts(), updateProduct(), updateProductCustomization(), DeleteProductAlertDialogContent(), RequiredLabelIcon(), CountryDiscountsForm(), ProductCustomizationForm() (+23 more)

### Community 8 - "deleteProduct"
Cohesion: 0.27
Nodes (10): deleteProduct(), AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay (+2 more)

### Community 9 - "updateCountryDiscounts"
Cohesion: 0.14
Nodes (14): devDependencies, drizzle-kit, eslint, eslint-config-next, eslint-plugin-boundaries, eslint-plugin-import, eslint-plugin-project-structure, postcss (+6 more)

### Community 10 - "updateProduct"
Cohesion: 0.26
Nodes (9): AddToSiteProductModalContent(), CopyState, getChildren(), getCopyIcon(), DialogContent, DialogDescription, DialogHeader(), DialogOverlay (+1 more)

### Community 11 - "updateProductCustomization"
Cohesion: 0.20
Nodes (9): Architecture, Commands, Feature directory pattern (`src/features/*/`), graphify, Import boundaries (enforced by ESLint), Key quirks, Local setup, Parity Deals Clone (+1 more)

### Community 12 - "createCancelSession"
Cohesion: 0.20
Nodes (9): extends, plugins, rules, boundaries/element-types, boundaries/no-unknown, boundaries/no-unknown-files, settings, boundaries/elements (+1 more)

### Community 13 - "createCheckoutSession"
Cohesion: 0.29
Nodes (6): extends, plugins, rules, project-structure/independent-modules, settings, project-structure/independent-modules-config-path

### Community 15 - "RootLayout"
Cohesion: 0.09
Nodes (26): geistMono, geistSans, metadata, Action, ActionType, actionTypes, addToRemoveQueue(), dispatch() (+18 more)

### Community 18 - "ViewsByCountryChart"
Cohesion: 0.40
Nodes (5): Clerk Authentication System, Neon Serverless & Drizzle ORM Integration, Next.js Framework Integration, Parity Deals Clone Project Overview, Stripe Payments Integration

### Community 21 - "BrandLogo"
Cohesion: 0.29
Nodes (3): BrandLogo(), DashboardNavBar(), MarketingNavBar()

### Community 23 - "HasPermission"
Cohesion: 0.06
Nodes (48): ProductDropdown(), ViewsByDayCard(), ViewsByCountryChart(), ViewsByDayChart(), ViewsByPPPChart(), HasPermission(), NoPermissionCard(), NoProducts() (+40 more)

### Community 32 - "getTierByPriceId"
Cohesion: 0.07
Nodes (46): createCancelSession(), createCheckoutSession(), createCustomerPortalSession(), getCheckoutSession(), getSubscriptionUpgradeSession(), stripe, POST(), stripe (+38 more)

## Knowledge Gaps
- **196 isolated node(s):** `📂 Directory Structure Overview`, `Isolation Principle`, `Feature Internal Structure`, `Caching a Database Query (`src/features/*/server/db/*`)`, `Revalidating Caches in Server Actions (`src/features/*/server/actions/*`)` (+191 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button` connect `HasPermission` to `updateProduct`, `createProduct`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `⚡ DB Caching Pattern` connect `Database Query Caching (dbCache)` to `Feature Sliced Design (FSD) Rules & Boundaries`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `revalidateDbCache()` connect `Database Query Caching (dbCache)` to `getTierByPriceId`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `📂 Directory Structure Overview`, `Isolation Principle`, `Feature Internal Structure` to the rest of the system?**
  _199 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Development Operations & Contribution Setup` be split into smaller, more focused modules?**
  _Cohesion score 0.05897435897435897 - nodes in this community are weakly interconnected._
- **Should `Production Operations & Webhooks` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `Core Integrations & Tech Stack` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._