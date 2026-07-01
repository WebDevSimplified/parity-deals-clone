# Graph Report - parity-deals-clone  (2026-06-26)

## Corpus Check
- 86 files · ~23,920 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 543 nodes · 983 edges · 32 communities (25 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5cb04ffe`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Analytics & Charts|Analytics & Charts]]
- [[_COMMUNITY_Database & Authentication Webhooks|Database & Authentication Webhooks]]
- [[_COMMUNITY_Product Customization & Discounts|Product Customization & Discounts]]
- [[_COMMUNITY_Contributing Documentation & Setup|Contributing Documentation & Setup]]
- [[_COMMUNITY_Package Dependencies & Libraries|Package Dependencies & Libraries]]
- [[_COMMUNITY_Root Layout & Toast Notifications|Root Layout & Toast Notifications]]
- [[_COMMUNITY_Development Dependencies & ESLint Tools|Development Dependencies & ESLint Tools]]
- [[_COMMUNITY_Banner Component & Back Button|Banner Component & Back Button]]
- [[_COMMUNITY_Stripe Subscriptions & Upgrades|Stripe Subscriptions & Upgrades]]
- [[_COMMUNITY_TypeScript Configuration|TypeScript Configuration]]
- [[_COMMUNITY_WebpackNext.js Aliases & RSC|Webpack/Next.js Aliases & RSC]]
- [[_COMMUNITY_Product Deletion Alert Dialog|Product Deletion Alert Dialog]]
- [[_COMMUNITY_Product Integration Modal Dialog|Product Integration Modal Dialog]]
- [[_COMMUNITY_ECC Agent Instructions & Quirks|ECC Agent Instructions & Quirks]]
- [[_COMMUNITY_Navigation Bars & Dashboard Layout|Navigation Bars & Dashboard Layout]]
- [[_COMMUNITY_ESLint Configuration & Boundaries|ESLint Configuration & Boundaries]]
- [[_COMMUNITY_Alternative ESLint Config & Rules|Alternative ESLint Config & Rules]]
- [[_COMMUNITY_Agent Overview & Tech Stack|Agent Overview & Tech Stack]]
- [[_COMMUNITY_PNPM Workspace Configuration|PNPM Workspace Configuration]]
- [[_COMMUNITY_FSD Architecture & Promotion Rules|FSD Architecture & Promotion Rules]]
- [[_COMMUNITY_Clerk Middleware & Public Routes|Clerk Middleware & Public Routes]]
- [[_COMMUNITY_Next.js Build Configuration|Next.js Build Configuration]]
- [[_COMMUNITY_PostCSS Configuration|PostCSS Configuration]]
- [[_COMMUNITY_Tailwind CSS Styling Config|Tailwind CSS Styling Config]]
- [[_COMMUNITY_Agent Env Variable Validation|Agent Env Variable Validation]]
- [[_COMMUNITY_Agent Feature Directory Pattern|Agent Feature Directory Pattern]]
- [[_COMMUNITY_Agent Import Boundaries|Agent Import Boundaries]]
- [[_COMMUNITY_FSD Form Action Type Safety|FSD Form Action Type Safety]]

## God Nodes (most connected - your core abstractions)
1. `Feature Sliced Design (FSD) Architecture Guidelines` - 18 edges
2. `revalidateDbCache()` - 17 edges
3. `dbCache()` - 16 edges
4. `compilerOptions` - 16 edges
5. `Button` - 14 edges
6. `getUserTag()` - 12 edges
7. `useToast()` - 11 edges
8. `getIdTag()` - 11 edges
9. `Runbook` - 11 edges
10. `scripts` - 10 edges

## Surprising Connections (you probably didn't know these)
- `dbCache Caching Pattern` --references--> `dbCache()`  [EXTRACTED]
  AGENTS.md → src/lib/cache.ts
- `dbCache Caching Pattern` --references--> `revalidateDbCache()`  [EXTRACTED]
  AGENTS.md → src/lib/cache.ts
- `ViewsByDayCard()` --calls--> `getViewsByDayChartData()`  [EXTRACTED]
  src/app/dashboard/analytics/page.tsx → src/features/analytics/server/db/productViews.ts
- `ViewsByPPPCard()` --calls--> `getViewsByPPPChartData()`  [EXTRACTED]
  src/app/dashboard/analytics/page.tsx → src/features/analytics/server/db/productViews.ts
- `ViewsByCountryCard()` --calls--> `getViewsByCountryChartData()`  [EXTRACTED]
  src/app/dashboard/analytics/page.tsx → src/features/analytics/server/db/productViews.ts

## Import Cycles
- None detected.

## Communities (32 total, 7 thin omitted)

### Community 0 - "Analytics & Charts"
Cohesion: 0.09
Nodes (32): ProductDropdown(), ViewsByCountryCard(), ViewsByDayCard(), ViewsByPPPCard(), HasPermission(), NoPermissionCard(), NoProducts(), ProductGrid() (+24 more)

### Community 1 - "Database & Authentication Webhooks"
Cohesion: 0.07
Nodes (47): dbCache Caching Pattern, createProduct(), deleteProduct(), getProduct(), getProductCount(), getProductCountryGroups(), getProductCountryGroupsInternal(), getProductCustomization() (+39 more)

### Community 2 - "Product Customization & Discounts"
Cohesion: 0.11
Nodes (29): updateCountryDiscounts(), updateProduct(), updateProductCustomization(), DeleteProductAlertDialogContent(), RequiredLabelIcon(), CountryDiscountsForm(), ProductCustomizationForm(), ProductDetailsForm() (+21 more)

### Community 3 - "Contributing Documentation & Setup"
Cohesion: 0.06
Nodes (37): Available Commands, Clerk Authentication, Code Quality and Import Rules, Contributing Guide, Database, Environment Variables Configuration, Environment Variables, General Configuration & Local Testing (+29 more)

### Community 4 - "Package Dependencies & Libraries"
Cohesion: 0.06
Nodes (32): dependencies, class-variance-authority, @clerk/nextjs, clsx, date-fns, @date-fns/tz, drizzle-orm, @hookform/resolvers (+24 more)

### Community 5 - "Root Layout & Toast Notifications"
Cohesion: 0.09
Nodes (26): geistMono, geistSans, metadata, Action, ActionType, actionTypes, addToRemoveQueue(), dispatch() (+18 more)

### Community 6 - "Development Dependencies & ESLint Tools"
Cohesion: 0.07
Nodes (28): devDependencies, drizzle-kit, eslint, eslint-config-next, eslint-plugin-boundaries, eslint-plugin-import, eslint-plugin-project-structure, postcss (+20 more)

### Community 7 - "Banner Component & Back Button"
Cohesion: 0.14
Nodes (19): createProduct(), GET(), getCountryCode(), getJavaScript(), Banner(), PageWithBackButton(), createProductView(), getUserSubscriptionTier() (+11 more)

### Community 8 - "Stripe Subscriptions & Upgrades"
Cohesion: 0.13
Nodes (24): createCancelSession(), createCheckoutSession(), createCustomerPortalSession(), getCheckoutSession(), getSubscriptionUpgradeSession(), stripe, POST(), stripe (+16 more)

### Community 9 - "TypeScript Configuration"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 10 - "Webpack/Next.js Aliases & RSC"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 11 - "Product Deletion Alert Dialog"
Cohesion: 0.27
Nodes (10): deleteProduct(), AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay (+2 more)

### Community 12 - "Product Integration Modal Dialog"
Cohesion: 0.26
Nodes (9): AddToSiteProductModalContent(), CopyState, getChildren(), getCopyIcon(), DialogContent, DialogDescription, DialogHeader(), DialogOverlay (+1 more)

### Community 13 - "ECC Agent Instructions & Quirks"
Cohesion: 0.20
Nodes (9): Architecture, Commands, Feature directory pattern (`src/features/*/`), graphify, Import boundaries (enforced by ESLint), Key quirks, Local setup, Parity Deals Clone (+1 more)

### Community 14 - "Navigation Bars & Dashboard Layout"
Cohesion: 0.29
Nodes (3): BrandLogo(), DashboardNavBar(), MarketingNavBar()

### Community 15 - "ESLint Configuration & Boundaries"
Cohesion: 0.20
Nodes (9): extends, plugins, rules, boundaries/element-types, boundaries/no-unknown, boundaries/no-unknown-files, settings, boundaries/elements (+1 more)

### Community 16 - "Alternative ESLint Config & Rules"
Cohesion: 0.29
Nodes (6): extends, plugins, rules, project-structure/independent-modules, settings, project-structure/independent-modules-config-path

### Community 17 - "Agent Overview & Tech Stack"
Cohesion: 0.40
Nodes (5): Clerk Authentication System, Neon Serverless & Drizzle ORM Integration, Next.js Framework Integration, Parity Deals Clone Project Overview, Stripe Payments Integration

### Community 18 - "PNPM Workspace Configuration"
Cohesion: 0.40
Nodes (4): allowBuilds, @clerk/shared, esbuild, unrs-resolver

### Community 19 - "FSD Architecture & Promotion Rules"
Cohesion: 0.04
Nodes (44): 1. Caching Strategy & Public/Internal Split, 2. Cache Tagging Levels, 3. Mutations & Revalidation Pattern, 🌐 API Route Patterns, Build-Time Bypass, ⚡ DB Caching & Query Patterns, 📂 Directory Structure Overview, 🏗️ Drizzle Schema Definition Patterns (+36 more)

### Community 30 - "FSD Form Action Type Safety"
Cohesion: 0.14
Nodes (14): ViewsByCountryChart(), ViewsByDayChart(), ViewsByPPPChart(), compactNumberFormatter, formatCompactNumber(), PricingCard(), PricingCard(), ChartConfig (+6 more)

## Knowledge Gaps
- **221 isolated node(s):** `extends`, `plugins`, `project-structure/independent-modules-config-path`, `project-structure/independent-modules`, `extends` (+216 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button` connect `Analytics & Charts` to `Stripe Subscriptions & Upgrades`, `Product Customization & Discounts`, `Product Integration Modal Dialog`, `Banner Component & Back Button`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `useToast()` connect `Product Customization & Discounts` to `Product Deletion Alert Dialog`, `Root Layout & Toast Notifications`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Package Dependencies & Libraries` to `Development Dependencies & ESLint Tools`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `extends`, `plugins`, `project-structure/independent-modules-config-path` to the rest of the system?**
  _224 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Analytics & Charts` be split into smaller, more focused modules?**
  _Cohesion score 0.08735150244584207 - nodes in this community are weakly interconnected._
- **Should `Database & Authentication Webhooks` be split into smaller, more focused modules?**
  _Cohesion score 0.07168458781362007 - nodes in this community are weakly interconnected._
- **Should `Product Customization & Discounts` be split into smaller, more focused modules?**
  _Cohesion score 0.10853658536585366 - nodes in this community are weakly interconnected._