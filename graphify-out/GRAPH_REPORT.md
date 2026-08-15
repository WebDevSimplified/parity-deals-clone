# Graph Report - .  (2026-08-15)

## Corpus Check
- Corpus is ~17,709 words - fits in a single context window. You may not need a graph.

## Summary
- 321 nodes · 857 edges · 13 communities (12 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Product Forms & Editing
- Database Schema & Data Layer
- Dashboard & Product Views
- Analytics & Charting
- Root Layout & Toast Notifications
- Stripe & Clerk Webhooks
- Banner API & Embed Script
- Embed Modal & Dialog UI
- Navigation & Layout Headers
- Routing Middleware & Auth Guard

## God Nodes (most connected - your core abstractions)
1. `cn()` - 27 edges
2. `revalidateDbCache()` - 17 edges
3. `dbCache()` - 15 edges
4. `Button` - 14 edges
5. `useToast()` - 12 edges
6. `getUserTag()` - 12 edges
7. `getUserSubscription()` - 11 edges
8. `getIdTag()` - 11 edges
9. `Card` - 10 edges
10. `CardContent` - 10 edges

## Surprising Connections (you probably didn't know these)
- `ViewsByDayCard()` --calls--> `getViewsByDayChartData()`  [EXTRACTED]
  src/app/dashboard/analytics/page.tsx → src/features/analytics/server/db/productViews.ts
- `ViewsByPPPCard()` --calls--> `getViewsByPPPChartData()`  [EXTRACTED]
  src/app/dashboard/analytics/page.tsx → src/features/analytics/server/db/productViews.ts
- `ViewsByCountryCard()` --calls--> `getViewsByCountryChartData()`  [EXTRACTED]
  src/app/dashboard/analytics/page.tsx → src/features/analytics/server/db/productViews.ts
- `AnalyticsChart()` --calls--> `getViewsByDayChartData()`  [EXTRACTED]
  src/app/dashboard/page.tsx → src/features/analytics/server/db/productViews.ts
- `EditProductPage()` --calls--> `getProduct()`  [EXTRACTED]
  src/app/dashboard/products/[productId]/edit/page.tsx → src/features/products/server/db/products.ts

## Import Cycles
- None detected.

## Communities (13 total, 1 thin omitted)

### Community 0 - "Product Forms & Editing"
Cohesion: 0.07
Nodes (50): CountryTab(), EditProductPage(), Feature(), Feature(), RequiredLabelIcon(), AlertDialogAction, AlertDialogCancel, AlertDialogContent (+42 more)

### Community 1 - "Database Schema & Data Layer"
Cohesion: 0.08
Nodes (48): TierNames, db, sql, countryGroupDiscountRelations, CountryGroupDiscountTable, countryGroupRelations, CountryGroupTable, countryRelations (+40 more)

### Community 2 - "Dashboard & Product Views"
Cohesion: 0.12
Nodes (25): AnalyticsChart(), DashboardPage(), Products(), PricingCard(), PricingCard(), HasPermission(), ClerkIcon(), NeonIcon() (+17 more)

### Community 3 - "Analytics & Charting"
Cohesion: 0.08
Nodes (27): AnalyticsPage(), ProductDropdown(), ViewsByCountryCard(), ViewsByDayCard(), ViewsByPPPCard(), ChartConfig, ChartContainer, ChartContext (+19 more)

### Community 4 - "Root Layout & Toast Notifications"
Cohesion: 0.09
Nodes (26): geistMono, geistSans, metadata, Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription (+18 more)

### Community 5 - "Stripe & Clerk Webhooks"
Cohesion: 0.16
Nodes (23): POST(), stripe, handleCreate(), handleDelete(), handleUpdate(), POST(), stripe, env (+15 more)

### Community 6 - "Banner API & Embed Script"
Cohesion: 0.20
Nodes (17): GET(), getCountryCode(), getJavaScript(), runtime, CustomizationsTab(), SubscriptionPage(), Banner(), createProductView() (+9 more)

### Community 7 - "Embed Modal & Dialog UI"
Cohesion: 0.21
Nodes (11): DialogContent, DialogDescription, DialogFooter(), DialogHeader(), DialogOverlay, DialogTitle, env, AddToSiteProductModalContent() (+3 more)

### Community 8 - "Navigation & Layout Headers"
Cohesion: 0.29
Nodes (3): BrandLogo(), DashboardNavBar(), MarketingNavBar()

## Knowledge Gaps
- **52 isolated node(s):** `runtime`, `stripe`, `stripe`, `geistSans`, `geistMono` (+47 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Product Forms & Editing` to `Dashboard & Product Views`, `Analytics & Charting`, `Root Layout & Toast Notifications`, `Embed Modal & Dialog UI`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `Button` connect `Dashboard & Product Views` to `Product Forms & Editing`, `Analytics & Charting`, `Embed Modal & Dialog UI`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `BrandLogo()` connect `Navigation & Layout Headers` to `Dashboard & Product Views`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `runtime`, `stripe`, `stripe` to the rest of the system?**
  _52 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Product Forms & Editing` be split into smaller, more focused modules?**
  _Cohesion score 0.06777493606138107 - nodes in this community are weakly interconnected._
- **Should `Database Schema & Data Layer` be split into smaller, more focused modules?**
  _Cohesion score 0.08348457350272233 - nodes in this community are weakly interconnected._
- **Should `Dashboard & Product Views` be split into smaller, more focused modules?**
  _Cohesion score 0.11839323467230443 - nodes in this community are weakly interconnected._