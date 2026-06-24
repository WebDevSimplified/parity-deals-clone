# Graph Report - .  (2026-06-24)

## Corpus Check
- 2 files · ~20,780 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 115 nodes · 48 edges · 80 communities (7 shown, 73 thin omitted)
- Extraction: 81% EXTRACTED · 19% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

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
- [[_COMMUNITY_AuthLayout|AuthLayout]]
- [[_COMMUNITY_GET|GET]]
- [[_COMMUNITY_ViewsByCountryChart|ViewsByCountryChart]]
- [[_COMMUNITY_POST|POST]]
- [[_COMMUNITY_Banner|Banner]]
- [[_COMMUNITY_BrandLogo|BrandLogo]]
- [[_COMMUNITY_DashboardNavBar|DashboardNavBar]]
- [[_COMMUNITY_HasPermission|HasPermission]]
- [[_COMMUNITY_MarketingNavBar|MarketingNavBar]]
- [[_COMMUNITY_NoPermissionCard|NoPermissionCard]]
- [[_COMMUNITY_NoProducts|NoProducts]]
- [[_COMMUNITY_PageWithBackButton|PageWithBackButton]]
- [[_COMMUNITY_RequiredLabelIcon|RequiredLabelIcon]]
- [[_COMMUNITY_TimezoneDropdownMenuItem|TimezoneDropdownMenuItem]]
- [[_COMMUNITY_DashboardLayout|DashboardLayout]]
- [[_COMMUNITY_DashboardPage|DashboardPage]]
- [[_COMMUNITY_getTierByPriceId|getTierByPriceId]]
- [[_COMMUNITY_PaidTierNames|PaidTierNames]]
- [[_COMMUNITY_TierNames|TierNames]]
- [[_COMMUNITY_createProduct|createProduct]]
- [[_COMMUNITY_deleteProduct|deleteProduct]]
- [[_COMMUNITY_getProduct|getProduct]]
- [[_COMMUNITY_getProductCount|getProductCount]]
- [[_COMMUNITY_getProductCountryGroups|getProductCountryGroups]]
- [[_COMMUNITY_getProductCustomization|getProductCustomization]]
- [[_COMMUNITY_getProductForBanner|getProductForBanner]]
- [[_COMMUNITY_getProducts|getProducts]]
- [[_COMMUNITY_updateCountryDiscounts|updateCountryDiscounts]]
- [[_COMMUNITY_updateProduct|updateProduct]]
- [[_COMMUNITY_updateProductCustomization|updateProductCustomization]]
- [[_COMMUNITY_createProductView|createProductView]]
- [[_COMMUNITY_getProductViewCount|getProductViewCount]]
- [[_COMMUNITY_getViewsByCountryChartData|getViewsByCountryChartData]]
- [[_COMMUNITY_getViewsByDayChartData|getViewsByDayChartData]]
- [[_COMMUNITY_getViewsByPPPChartData|getViewsByPPPChartData]]
- [[_COMMUNITY_createUserSubscription|createUserSubscription]]
- [[_COMMUNITY_getUserSubscription|getUserSubscription]]
- [[_COMMUNITY_getUserSubscriptionTier|getUserSubscriptionTier]]
- [[_COMMUNITY_updateUserSubscription|updateUserSubscription]]
- [[_COMMUNITY_deleteUser|deleteUser]]
- [[_COMMUNITY_EditProductPage|EditProductPage]]
- [[_COMMUNITY_ClerkIcon|ClerkIcon]]
- [[_COMMUNITY_NeonIcon|NeonIcon]]
- [[_COMMUNITY_clearFullCache|clearFullCache]]
- [[_COMMUNITY_getGlobalTag|getGlobalTag]]
- [[_COMMUNITY_getIdTag|getIdTag]]
- [[_COMMUNITY_getUserTag|getUserTag]]
- [[_COMMUNITY_ValidTags|ValidTags]]
- [[_COMMUNITY_formatCompactNumber|formatCompactNumber]]
- [[_COMMUNITY_canAccessAnalytics|canAccessAnalytics]]
- [[_COMMUNITY_canCreateProduct|canCreateProduct]]
- [[_COMMUNITY_canCustomizeBanner|canCustomizeBanner]]
- [[_COMMUNITY_canRemoveBranding|canRemoveBranding]]
- [[_COMMUNITY_canShowDiscountBanner|canShowDiscountBanner]]
- [[_COMMUNITY_MarketingLayout|MarketingLayout]]
- [[_COMMUNITY_NewProductPage|NewProductPage]]
- [[_COMMUNITY_Products|Products]]
- [[_COMMUNITY_SignInPage|SignInPage]]
- [[_COMMUNITY_SignUpPage|SignUpPage]]
- [[_COMMUNITY_POST|POST]]
- [[_COMMUNITY_ButtonProps|ButtonProps]]
- [[_COMMUNITY_ChartConfig|ChartConfig]]
- [[_COMMUNITY_InputProps|InputProps]]
- [[_COMMUNITY_TextareaProps|TextareaProps]]

## God Nodes (most connected - your core abstractions)
1. `Runbook` - 7 edges
2. `Contributing Guide` - 6 edges
3. `Feature Sliced Design (FSD)` - 6 edges
4. `Parity Deals Clone Project Overview` - 5 edges
5. `allowBuilds` - 4 edges
6. `ESLint Import Validation` - 4 edges
7. `FSD Database Query Caching Pattern` - 4 edges
8. `FSD Environment Variable Validation` - 4 edges
9. `Environment Variables Configuration` - 3 edges
10. `Clerk Webhook Integration` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Feature Directory Pattern` --semantically_similar_to--> `Feature Sliced Design (FSD)`  [INFERRED] [semantically similar]
  AGENTS.md → docs/FEATURE-SLICED-DESIGN.md
- `ESLint Import Boundaries` --semantically_similar_to--> `FSD Import Boundary Rules`  [INFERRED] [semantically similar]
  AGENTS.md → docs/FEATURE-SLICED-DESIGN.md
- `dbCache Caching Pattern` --semantically_similar_to--> `FSD Database Query Caching Pattern`  [INFERRED] [semantically similar]
  AGENTS.md → docs/FEATURE-SLICED-DESIGN.md
- `Env Validation Strategy` --semantically_similar_to--> `FSD Environment Variable Validation`  [INFERRED] [semantically similar]
  AGENTS.md → docs/FEATURE-SLICED-DESIGN.md
- `dbCache Caching Pattern` --references--> `dbCache`  [EXTRACTED]
  AGENTS.md → src/lib/cache.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **FSD Architectural Boundaries & Exceptions** — docs_feature_sliced_design_fsd, docs_feature_sliced_design_isolation_principle, docs_feature_sliced_design_import_boundary_rules, docs_feature_sliced_design_bridge_exception [EXTRACTED 1.00]
- **Runtime Validation & DB Caching** — docs_feature_sliced_design_db_caching_pattern, docs_feature_sliced_design_env_validation, lib_cache_dbcache, env_server_variables [INFERRED 0.85]

## Communities (80 total, 73 thin omitted)

### Community 0 - "Development Operations & Contribution Setup"
Cohesion: 0.22
Nodes (9): Available Commands, Contributing Guide, Local Development Setup, PR Submission Checklist, Database Migration Procedure, ESLint Import Validation, eslint-plugin-boundaries, eslint-plugin-project-structure (+1 more)

### Community 1 - "Feature Sliced Design (FSD) Rules & Boundaries"
Cohesion: 0.29
Nodes (7): Feature Directory Pattern, ESLint Import Boundaries, FSD Bridge Exception, Feature Sliced Design (FSD), FSD Import Boundary Rules, FSD Isolation Principle, permissions.ts

### Community 2 - "Production Operations & Webhooks"
Cohesion: 0.38
Nodes (7): Environment Variables Configuration, Clerk Webhook Integration, Health Checks & Monitoring, Troubleshooting & Rollback Procedures, Runbook, Stripe Webhook Integration, Vercel Deployment

### Community 3 - "Core Integrations & Tech Stack"
Cohesion: 0.40
Nodes (5): Clerk Authentication System, Neon Serverless & Drizzle ORM Integration, Next.js Framework Integration, Parity Deals Clone Project Overview, Stripe Payments Integration

### Community 4 - "Build Tooling & Workspaces"
Cohesion: 0.40
Nodes (4): allowBuilds, @clerk/shared, esbuild, unrs-resolver

### Community 5 - "Database Query Caching (dbCache)"
Cohesion: 0.83
Nodes (4): dbCache Caching Pattern, FSD Database Query Caching Pattern, dbCache, revalidateDbCache

### Community 6 - "Environment Variables Validation"
Cohesion: 0.83
Nodes (4): Env Validation Strategy, FSD Environment Variable Validation, Client-side Environment Variables, Server-side Environment Variables

## Knowledge Gaps
- **87 isolated node(s):** `AuthLayout`, `SignInPage`, `SignUpPage`, `MarketingLayout`, `GET` (+82 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **73 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Feature Sliced Design (FSD)` connect `Feature Sliced Design (FSD) Rules & Boundaries` to `Core Integrations & Tech Stack`, `Database Query Caching (dbCache)`, `Environment Variables Validation`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `Parity Deals Clone Project Overview` connect `Core Integrations & Tech Stack` to `Feature Sliced Design (FSD) Rules & Boundaries`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `Runbook` connect `Production Operations & Webhooks` to `Development Operations & Contribution Setup`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Feature Sliced Design (FSD)` (e.g. with `Feature Directory Pattern` and `Parity Deals Clone Project Overview`) actually correct?**
  _`Feature Sliced Design (FSD)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `AuthLayout`, `SignInPage`, `SignUpPage` to the rest of the system?**
  _92 weakly-connected nodes found - possible documentation gaps or missing edges._