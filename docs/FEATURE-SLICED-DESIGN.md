# Feature Sliced Design (FSD) Architecture Guidelines

When developing features and adding new code to this project, you MUST strictly adhere to the Feature Sliced Design architecture and folder structure outlined below.

---

## 📖 Table of Contents

- [📂 Directory Structure Overview](#-directory-structure-overview)
- [🏗️ Feature-First Mini-Applications](#️-feature-first-mini-applications)
- [📈 The Rule of Promotion](#-the-rule-of-promotion)
- [🛑 Import Boundary Rules](#-import-boundary-rules)
- [📝 React Form Action Type-Safety](#-react-form-action-type-safety)
- [⚡ DB Caching & Query Patterns](#-db-caching--query-patterns)
- [🌐 API Route Patterns](#-api-route-patterns)
- [📋 Zod Schema Patterns](#-zod-schema-patterns)
- [⚡ Server Action Patterns](#-server-action-patterns)
- [🏗️ Drizzle Schema Definition Patterns](#-drizzle-schema-definition-patterns)
- [🧩 Feature Component Patterns](#-feature-component-patterns)
- [🔐 Permission System Pattern](#-permission-system-pattern)
- [🛡️ Middleware Pattern](#-middleware-pattern)
- [⚙️ Task Script Pattern](#-task-script-pattern)
- [🎨 Layout & Provider Pattern](#-layout--provider-pattern)
- [🔒 Environment Variable Validation](#-environment-variable-validation)

---

## 📂 Directory Structure Overview

The project is structured into global shared elements and isolated features:

```text
src/
├── app/                                # 🌐 Next.js App Router (Pages, Layouts, API Routes)
│   ├── (auth)/                         # Auth Route Group (Sign-In, Sign-Up)
│   ├── (marketing)/                    # Public Marketing / Landing Pages
│   ├── (dashboard)/                    # 🔒 (RBAC) Role-Based Access Control Protected Workspaces
│   │   ├── user/                       # User Specific Pages
│   │   ├── admin/                      # Admin Specific Pages
│   │   └── shared/                     # Cross-Role General Intersections
│   └── api/                            # API Endpoints (Webhooks, Banner APIs)
├── components/                         # ✅ GLOBAL SHARED COMPONENTS (Atomic UI / Forms)
│   ├── layout/                         # Layout components (e.g., header, footer, sidebar)
│   ├── ui/                             # shadcn/ui primitive wrappers (e.g., button, card, dialog, etc.)
│   └── etc...                          # Other shared components
├── contexts/                           # ✅ GLOBAL SHARED React Contexts (e.g., Auth, Theme, Mobile menu, etc.)
│   ├── theme-context.tsx               # e.g., Theme context provider
│   ├── auth-context.tsx                # e.g., Authentication context provider
│   └── etc...                          # Other shared contexts
├── data/                               # ✅ GLOBAL SHARED Constants, Mock/Static Data, & Env Configurations
│   ├── env/                            # validated runtime environment schemas
│   │   ├── server.ts                   # Server-only variables schema
│   │   └── client.ts                   # Client-only variables schema
│   ├── subscriptionTiers.ts            # Global pricing and tier definitions
│   └── etc...                          # Other shared data
├── drizzle/                            # ✅ GLOBAL SHARED Database Setup & Schemas
│   ├── migrations/                     # SQL migration scripts
│   ├── db.ts                           # Database client connection
│   ├── schema.ts                       # Drizzle schema definitions
│   └── seed.ts                         # Drizzle seeders
├── features/                           # 🏗️ FEATURE-SLICED DESIGN (FSD) ISOLATED DOMAINS
│   ├── analytics/                      # Analytics metrics and view tracking
│   ├── products/                       # Product CRUD, customization, and discounting
│   ├── subscriptions/                  # Stripe payment portals and tier levels
│   ├── users/                          # User syncing via Clerk auth webhook
│   └── etc...                          # Other features
├── hooks/                              # ✅ GLOBAL SHARED React Hooks (e.g. use-toast.ts)
│   ├── use-toast.ts                    # toast hook
│   └── etc...                          # Other shared hooks
├── lib/                                # ✅ GLOBAL SHARED Utilities & Wrapper Libraries
│   ├── cache.ts                        # dbCache database query caching helper
│   ├── formatters.ts                   # Value representation utilities
│   ├── permissions.ts                  # RBAC / access control evaluation functions
│   ├── utils.ts                        # General cn utility
│   └── etc...                          # Other shared libraries
├── server/                             # ✅ GLOBAL SHARED Data Access Layer (Promoted server files)
│   ├── db/                             # Promoted database queries
│   └── actions/                        # Promoted server actions
├── tasks/                              # ⚙️ SYSTEM/CLI SCRIPTS (Never imported by code)
│   ├── updateCountryGroups.ts          # Sync task for country datasets
│   └── etc...                          # Other shared tasks
├── types/                              # ✅ GLOBAL SHARED Ambient TypeScript Type Matrices & Definitions
├── utils/                              # ✅ GLOBAL SHARED utility functions
└── middleware.ts                       # Next.js Middleware / Proxy.ts
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
>
> 1. `.eslintrc.json` (under `boundaries/element-types` rules)
> 2. `independentModules.jsonc` (project-structure rules)
>    This ensures that regardless of which configuration is active, the workspace builds successfully.

---

## 📝 React Form Action Type-Safety

When using Next.js Server Actions as form handlers, React expects the function signature to return `void` or `Promise<void>`. Returning objects (e.g., `{ error: boolean }`) will cause TypeScript compilation failures during build time.

### Good Practice: Returning `void`

```typescript
// SOURCE: src/features/subscriptions/server/actions/stripe.ts
export async function createCustomerPortalSession() {
  const { userId } = auth();
  if (userId == null) return; // returns void, matching React form action signature

  // ... session creation ...
}
```

### Handling Action State & Feedback

If you need to return status or validation errors back to the client, use React's `useActionState` hook instead of binding the action directly to `<form action={...}>`:

```tsx
// Example form handler
import { useActionState } from "react";
import { myAction } from "@/features/my-feature/server/actions";

export function MyForm() {
  const [state, formAction, isPending] = useActionState(myAction, {
    error: null,
  });

  return (
    <form action={formAction}>
      {state.error && <p className="text-red-500">{state.error}</p>}
      <button disabled={isPending}>Submit</button>
    </form>
  );
}
```

---

## ⚡ DB Caching & Query Patterns

Database queries in feature `db` folders should be structured with a strict separation between **Cached (Public)** and **Uncached (Internal)** functions. This allows server-side operations to reuse queries while optimizing performance and ensuring type safety.

### 1. Caching Strategy & Public/Internal Split

All read functions should follow a split pattern:
1. **Public Cached Wrapper**: Exported from the db file. Wraps the internal query using the `dbCache` wrapper (Next.js `unstable_cache` helper) defined in [cache.ts](file:///c:/projects/parity-deals-clone/src/lib/cache.ts).
2. **Private Uncached Internal Query**: Prefixed with `*Internal`. Contains the actual Drizzle ORM query logic. It is not exported.

```typescript
// SOURCE: src/features/products/server/db/products.ts
import { db } from "@/drizzle/db";
import { ProductTable } from "@/drizzle/schema";
import { CACHE_TAGS, dbCache, getUserTag } from "@/lib/cache";
import { eq } from "drizzle-orm";

// 1. Public Cached Wrapper (Exported)
export function getProducts(
  userId: string,
  { limit }: { limit?: number } = {}
) {
  const cacheFn = dbCache(getProductsInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.products)],
  });

  return cacheFn(userId, { limit });
}

// 2. Private Uncached Internal Query (Not Exported)
function getProductsInternal(userId: string, { limit }: { limit?: number }) {
  return db.query.ProductTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    limit,
  });
}
```

### 2. Cache Tagging Levels

Three standardized cache tagging functions are defined in [cache.ts](file:///c:/projects/parity-deals-clone/src/lib/cache.ts):

- **Global Tag**: `getGlobalTag(tag)` - Used for static data shared across all users (e.g., countries, country groups).
- **User Tag**: `getUserTag(userId, tag)` - Used for user-specific lists (e.g., a user's products list).
- **ID Tag**: `getIdTag(id, tag)` - Used for specific entity details (e.g., details of a single product).

When caching functions, associate all relevant tags so updates can selectively purge caches.

### 3. Mutations & Revalidation Pattern

When executing mutations (inserts, updates, deletes), database functions must revalidate the cache using `revalidateDbCache`.

- For **Updates and Deletes**, check if `rowCount > 0` before purging to prevent unnecessary cache invalidation.
- Return a boolean indicating operation success, or the newly created record.

```typescript
// SOURCE: src/features/products/server/db/products.ts
import { and } from "drizzle-orm";

export async function updateProduct(
  data: Partial<typeof ProductTable.$inferInsert>,
  { id, userId }: { id: string; userId: string }
): Promise<boolean> {
  const { rowCount } = await db
    .update(ProductTable)
    .set(data)
    .where(and(eq(ProductTable.clerkUserId, userId), eq(ProductTable.id, id)));

  if (rowCount > 0) {
    revalidateDbCache({
      tag: CACHE_TAGS.products,
      userId,
      id,
    });
  }

  return rowCount > 0;
}
```

---

## 🌐 API Route Patterns

API routes inside the `src/app/api/` folder are dedicated to public endpoints, authentication webhooks, and payment processor callbacks.

### Key Rules
1. **Named HTTP Method Exports**: Export named async functions matching HTTP verbs (`GET`, `POST`). Default exports are forbidden.
2. **Response Construction**: Return standard `Response` objects (e.g., `new Response("body", { status, headers })`) rather than using helper structures like `NextResponse.json()`.
3. **Execution Runtime**: For endpoints requiring fast regional/geographic data (like geolocation lookups), specify the edge runtime: `export const runtime = "edge"`.
4. **CORS Headers**: Set CORS headers manually when public access is required.
5. **Payload Security & Verification**:
   - For webhooks (Clerk, Stripe), verify cryptographic signatures manually (using `svix` for Clerk and the Stripe SDK for Stripe) before handling payloads.
   - For regular endpoints, rely on authentication/permissions check helper libraries rather than parsing `unsafeData` via Zod.
6. **No Server Action Calls**: API routes must perform database operations by directly importing functions from features' `db` folders (`src/features/*/server/db/*`). They must never invoke server actions.

### Snippet: Edge API Route (discount banner script generator)
```typescript
// SOURCE: src/app/api/products/[productId]/banner/route.ts
import { env } from "@/data/env/server";
import { getProductForBanner } from "@/features/products/server/db/products";
import { createProductView } from "@/features/analytics/server/db/productViews";
import { canShowDiscountBanner } from "@/lib/permissions";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params: { productId } }: { params: { productId: string } }
) {
  const headersMap = headers();
  const requestingUrl = headersMap.get("referer") || headersMap.get("origin");
  if (requestingUrl == null) return notFound();
  
  const countryCode = request.geo?.country || (process.env.NODE_ENV === "development" ? env.TEST_COUNTRY_CODE : null);
  if (countryCode == null) return notFound();

  const { product, discount, country } = await getProductForBanner({
    id: productId,
    countryCode,
    url: requestingUrl,
  });

  if (product == null) return notFound();

  const canShowBanner = await canShowDiscountBanner(product.clerkUserId);
  await createProductView({
    productId: product.id,
    countryId: country?.id,
    userId: product.clerkUserId,
  });

  if (!canShowBanner || country == null || discount == null) return notFound();

  return new Response(
    `console.log("Render banner code here");`,
    { headers: { "content-type": "text/javascript" } }
  );
}
```

### Snippet: Cryptographic Webhook Handler (Clerk Webhook)
```typescript
// SOURCE: src/app/api/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { env } from "@/data/env/server";
import { createUserSubscription } from "@/features/subscriptions/server/db/subscription";

export async function POST(req: Request) {
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occurred -- no svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Error occurred during signature verification", { status: 400 });
  }

  if (event.type === "user.created") {
    await createUserSubscription({
      clerkUserId: event.data.id,
      tier: "Free",
    });
  }

  return new Response("", { status: 200 });
}
```

---

## 📋 Zod Schema Patterns

Zod schemas reside inside features' `schemas/` directories and are primarily used to validate form data and server action inputs.

### Key Rules
1. **File Naming**: Reside in `src/features/[feature-name]/schemas/` under filenames corresponding to features (e.g., `products.ts`).
2. **Schema Naming**: Named exports in `camelCase` with a `Schema` suffix (e.g., `productDetailsSchema`).
3. **Form-Oriented Definition**: Zod schemas are written from the perspective of form field inputs, rather than generated automatically from database schemas (e.g., no `createInsertSchema` from `drizzle-zod`).
4. **Input Constraints**:
   - Strings: Always enforce a minimum length and present clear error messages: `z.string().min(1, "Required")`.
   - Numeric inputs from HTML: Coerce or validate using a union or transformation to avoid `NaN` errors: `z.number().min(1).or(z.nan()).transform(n => isNaN(n) ? undefined : n)`.
   - Optionals: Append `.optional()` at the end of the schema chains.
5. **Cross-Field Refinement**: Use `.refine()` to validate fields that depend on one another. Always specify `path: ["root"]` to attach refinement errors to the form container.

### Snippet: Form Zod Schemas with Transformations & Refinement
```typescript
// SOURCE: src/features/products/schemas/products.ts
import { removeTrailingSlash } from "@/lib/utils";
import { z } from "zod";

export const productDetailsSchema = z.object({
  name: z.string().min(1, "Required"),
  url: z.string().url().min(1, "Required").transform(removeTrailingSlash),
  description: z.string().optional(),
});

export const productCountryDiscountsSchema = z.object({
  groups: z.array(
    z
      .object({
        countryGroupId: z.string().min(1, "Required"),
        discountPercentage: z
          .number()
          .max(100)
          .min(1)
          .or(z.nan())
          .transform(n => (isNaN(n) ? undefined : n))
          .optional(),
        coupon: z.string().optional(),
      })
      .refine(
        value => {
          const hasCoupon = value.coupon != null && value.coupon.length > 0;
          const hasDiscount = value.discountPercentage != null;
          return !(hasCoupon && !hasDiscount);
        },
        {
          message: "A discount is required if a coupon code is provided",
          path: ["root"],
        }
      )
  ),
});
```

---

## ⚡ Server Action Patterns

Server actions reside in features' `server/actions/` folders and handle state-modifying operations (mutations).

### Key Rules
1. **File-Level Directive**: Place `"use server"` on the very first line of the file.
2. **Access Control & Guard Clauses**:
   - Check authentication first: `const { userId } = auth()`. Reject immediately if the user is unauthenticated.
   - Run permission checks via `@/lib/permissions` before executing database mutations.
3. **Input Parameter Naming**: Name input parameters `unsafeData` to indicate that input is untrusted. Immediately call `schema.safeParse(unsafeData)` to validate on the server side.
4. **Error Handling & Return Contract**:
   - Return `{ error: boolean; message: string }` objects to inform the frontend of validation or operational errors.
   - Do not wrap the entire logic in generic `try/catch` blocks; prefer return status codes and error flags from database functions.
5. **Data Layer Delegation**: Actions must import database mutations and queries under aliased names (e.g. `createProduct as createProductDb`) and delegate database writes to them.
6. **Navigation & Redirects**:
   - When redirecting after a mutation, use `redirect(url)` from `next/navigation`.
   - Since `redirect()` internally throws a Next.js navigation error, ensure actions executing redirects return `void` or `undefined` instead of returning a status object.

### Snippet: Standard Mutation Server Action
```typescript
// SOURCE: src/features/products/server/actions/products.ts
"use server"

import { productDetailsSchema } from "@/features/products/schemas/products";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createProduct as createProductDb } from "@/features/products/server/db/products";
import { redirect } from "next/navigation";
import { canCreateProduct } from "@/lib/permissions";

export async function createProduct(
  unsafeData: z.infer<typeof productDetailsSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { userId } = auth();
  const { success, data } = productDetailsSchema.safeParse(unsafeData);
  const canCreate = await canCreateProduct(userId);

  if (!success || userId == null || !canCreate) {
    return { error: true, message: "There was an error creating your product" };
  }

  const { id } = await createProductDb({ ...data, clerkUserId: userId });

  redirect(`/dashboard/products/${id}/edit?tab=countries`);
}
```

---

## 🏗️ Drizzle Schema Definition Patterns

All database table, relationship, index, and enum schemas are defined in [schema.ts](file:///c:/projects/parity-deals-clone/src/drizzle/schema.ts).

### Key Rules
1. **Single Schema File**: All tables are declared in [schema.ts](file:///c:/projects/parity-deals-clone/src/drizzle/schema.ts).
2. **Naming Conventions**:
   - TypeScript Export: `PascalCaseTable` (e.g., `ProductCustomizationTable`).
   - PostgreSQL Table Name: `snake_case` plural (e.g., `"product_customizations"`).
3. **Primary Keys**: Always use UUID primary keys: `uuid("id").primaryKey().defaultRandom()`.
4. **Shared Timestamps**: Define `createdAt` and `updatedAt` once in the module scope and reuse them across tables. `updatedAt` uses `.$onUpdate(() => new Date())` for automatic timestamp updates.
5. **Foreign Keys**: Define cascading deletes explicitly on referential columns: `.references(() => Table.id, { onDelete: "cascade" })`.
6. **Unique Constraints**: For 1-to-1 relations, mark the reference column as `.unique()`.
7. **Indexes**: Declare indices inside the third argument of `pgTable` (e.g. `index("table.column_index").on(table.column)`).
8. **ORM Relationships**: Declare relationships separately using the `relations` utility from `drizzle-orm`, appending `Relations` to the TypeScript export.

### Snippet: Schema and Relationships Definitions
```typescript
// SOURCE: src/drizzle/schema.ts
import { relations } from "drizzle-orm";
import { boolean, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();

const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const ProductTable = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserId: text("clerk_user_id").notNull(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    description: text("description"),
    createdAt,
    updatedAt,
  },
  table => ({
    clerkUserIdIndex: index("products.clerk_user_id_index").on(table.clerkUserId),
  })
);

export const ProductCustomizationTable = pgTable("product_customizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => ProductTable.id, { onDelete: "cascade" })
    .unique(),
  locationMessage: text("location_message").notNull(),
  backgroundColor: text("background_color").notNull().default("hsl(193, 82%, 31%)"),
  textColor: text("text_color").notNull().default("hsl(0, 0%, 100%)"),
  fontSize: text("font_size").notNull().default("1rem"),
  bannerContainer: text("banner_container").notNull().default("body"),
  isSticky: boolean("is_sticky").notNull().default(true),
  createdAt,
  updatedAt,
});

export const productRelations = relations(ProductTable, ({ one }) => ({
  productCustomization: one(ProductCustomizationTable),
}));

export const productCustomizationRelations = relations(
  ProductCustomizationTable,
  ({ one }) => ({
    product: one(ProductTable, {
      fields: [ProductCustomizationTable.productId],
      references: [ProductTable.id],
    }),
  })
);
```

---

## 🧩 Feature Component Patterns

Components local to a feature reside inside `src/features/[feature-name]/components/`.

### Key Rules
1. **Interactive Client Components**: Mark client files executing form actions or hook logic with `"use client"`.
2. **Form Architecture**:
   - Initialize fields using `useForm` from `react-hook-form` along with Zod validation.
   - Bind submissions to custom onSubmit action wrappers instead of relying on default HTML action attributes or `useActionState`.
   - Provide feedback to user operations using the `toast` notification system.
   - Disable input submission controls when forms are submitting: `disabled={form.formState.isSubmitting}`.
   - For labels associated with required fields, include the `<RequiredLabelIcon />` inside `<FormLabel>`.
3. **Non-Form Interactions**: For regular element buttons triggering deletion actions, wrap mutations inside React's `useTransition` to track pending state.
4. **Data Visualization**: Recharts components are placed inside features and wrapped in a shadcn `ChartContainer`.
5. **Strict TypeScript Typings**:
   - Provide explicit inline typing for component parameter definitions. Do not export dedicated interface namespaces for parameters.
   - Form parameters should be typed against schemas, not raw database objects.
6. **Exports**: Use named exports for all React components.

### Snippet: Standard Client Form Component
```tsx
// SOURCE: src/features/products/components/forms/ProductDeailsForm.tsx
"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { productDetailsSchema } from "@/features/products/schemas/products";
import { createProduct, updateProduct } from "@/features/products/server/actions/products";
import { useToast } from "@/hooks/use-toast";
import { RequiredLabelIcon } from "@/components/RequiredLabelIcon";

export function ProductDetailsForm({
  product,
}: {
  product?: {
    id: string;
    name: string;
    description: string | null;
    url: string;
  };
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof productDetailsSchema>>({
    resolver: zodResolver(productDetailsSchema),
    defaultValues: product
      ? { ...product, description: product.description ?? "" }
      : { name: "", url: "", description: "" },
  });

  async function onSubmit(values: z.infer<typeof productDetailsSchema>) {
    const action = product == null ? createProduct : updateProduct.bind(null, product.id);
    const data = await action(values);

    if (data?.message) {
      toast({
        title: data.error ? "Error" : "Success",
        description: data.message,
        variant: data.error ? "destructive" : "default",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6 flex-col">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Product Name
                <RequiredLabelIcon />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}
```

---

## 🔐 Permission System Pattern

Access authorization and subscription limit validation are managed through a centralized permissions checker.

### Key Rules
1. **Centralized Evaluation Functions**: Reside in [permissions.ts](file:///c:/projects/parity-deals-clone/src/lib/permissions.ts).
2. **Access Contract**: Evaluate parameters asynchronously returning a `Promise<boolean>` output: `async (userId: string) => Promise<boolean>`.
3. **Database Checks**: Query subscription limits or record counts directly from feature database services (e.g., retrieving `getProductCount` from products and checking constraints against tier definitions).
4. **Conditional UI Gating (Server Side)**: Protect parts of pages by wrapping them in the async [HasPermission.tsx](file:///c:/projects/parity-deals-clone/src/components/HasPermission.tsx) server component, providing optional fallback elements when permissions check fails.

### Snippet: Centralized Permissions Checking
```typescript
// SOURCE: src/lib/permissions.ts
import { getProductCount } from "@/features/products/server/db/products";
import { getUserSubscriptionTier } from "@/features/subscriptions/server/db/subscription";

export async function canCreateProduct(userId: string | null): Promise<boolean> {
  if (userId == null) return false;
  const tier = await getUserSubscriptionTier(userId);
  const productCount = await getProductCount(userId);
  return productCount < tier.maxNumberOfProducts;
}
```

### Snippet: Conditional Layout Wrapper component
```tsx
// SOURCE: src/components/HasPermission.tsx
import { auth } from "@clerk/nextjs/server";
import { AwaitedReactNode } from "react";
import { NoPermissionCard } from "./NoPermissionCard";

export async function HasPermission({
  permission,
  renderFallback = false,
  fallbackText,
  children,
}: {
  permission: (userId: string | null) => Promise<boolean>;
  renderFallback?: boolean;
  fallbackText?: string;
  children: AwaitedReactNode;
}) {
  const { userId } = auth();
  const hasPermission = await permission(userId);
  
  if (hasPermission) return children;
  if (renderFallback) return <NoPermissionCard>{fallbackText}</NoPermissionCard>;
  return null;
}
```

---

## 🛡️ Middleware Pattern

Request authentication routing rules are parsed globally inside [middleware.ts](file:///c:/projects/parity-deals-clone/src/middleware.ts).

### Key Rules
1. **Public/Protected Split**: Protect routes using Clerk's `clerkMiddleware` and `createRouteMatcher`. Match routes matching landing, authentication, and webhook urls.
2. **Bypass Rules**: API paths (`/api(.*)`) are marked public at the middleware level; webhook authorization is evaluated individually inside API handlers using cryptographic sign verifications.

### Snippet: Route Authorization Middleware
```typescript
// SOURCE: src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

---

## ⚙️ Task Script Pattern

CLI scripts reside in `src/tasks/` and are executed outside the Next.js runtime environment.

### Key Rules
1. **Codebase Isolation**: Task files are reserved exclusively for terminal execution; they must never be imported by application code files.
2. **Execution Runner**: Executed via the command-line executor `tsx` directly (e.g. `tsx src/tasks/updateCountryGroups.ts`).
3. **No Database Cache Wrapping**: Tasks bypass database wrapper cache layers, retrieving data and updating schemas directly.
4. **Conflict Resolution**: Enforce upserts using `onConflictDoUpdate` to cleanly refresh static datasets.

### Snippet: CLI Seeder Script (updateCountryGroups)
```typescript
// SOURCE: src/tasks/updateCountryGroups.ts
import { db } from "@/drizzle/db";
import countriesByDiscount from "@/data/countriesByDiscount.json";
import { CountryGroupTable, CountryTable } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

async function updateCountryGroups() {
  const countryGroupInsertData = countriesByDiscount.map(
    ({ name, recommendedDiscountPercentage }) => ({ name, recommendedDiscountPercentage })
  );

  const { rowCount } = await db
    .insert(CountryGroupTable)
    .values(countryGroupInsertData)
    .onConflictDoUpdate({
      target: CountryGroupTable.name,
      set: {
        recommendedDiscountPercentage: sql.raw(
          `excluded.${CountryGroupTable.recommendedDiscountPercentage.name}`
        ),
      },
    });

  return rowCount;
}

const count = await updateCountryGroups();
console.log(`Updated ${count} country groups`);
```

---

## 🎨 Layout & Provider Pattern

Next.js routing layouts handle configuration wrappers and visual container layouts.

### Key Rules
1. **Providers Wrapper**: The root layout initializes Clerk and shared UI components (e.g. `<Toaster />`).
2. **Route Group Layout Styling**:
   - Auth Layout: Centers authentication cards horizontally and vertically.
   - Dashboard Layout: Adds a uniform background, loads `<DashboardNavBar />`, and defines standard page padding sizes.

### Snippet: Root Layout configuration
```tsx
// SOURCE: src/app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} antialiased font-sans bg-background`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
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
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION, // ⚡ Bypasses validation checks during build compilation
  server: {
    DATABASE_URL: z.string().url(),
    // ... other env schemas ...
  },
  experimental__runtimeEnv: process.env,
});
```
