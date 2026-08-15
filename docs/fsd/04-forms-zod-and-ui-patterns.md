# Chapter 04: Forms, Zod Schemas & UI Patterns

[Master FSD Index](../FEATURE-SLICED-DESIGN.md) > Chapter 04: Forms, Zod & UI Patterns

---

## 1. Overview & Architectural Principles

In this architecture, forms and user input validation serve as the primary defensive barrier for system integrity. Instead of treating validation as a purely presentation-layer concern, the system establishes **shared contract definitions** using [Zod](https://zod.dev) that are shared across both client-side interactive forms and server-side execution boundaries ([Server Actions](file:///c:/projects/parity-deals-clone/src/features/products/server/actions/products.ts)).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Form Architecture Flow                          │
└────────────────────────────────────────────────────────────────────────┘

  [UI Component (Client)]                [Zod Schema Contract]            [Server Action (Server)]
   ProductDetailsForm.tsx  ────────────►  schemas/products.ts   ◄────────   actions/products.ts
            │                                     │                                │
     React Hook Form                              │                          safeParse()
     zodResolver()                                │                        Permission Gate
            │                                     │                                │
     Instant Client-side                          │                         Database Layer
     Validation & Error UI                        ▼                        db/products.ts
            │                           Inferred TypeScript Type                   │
            └─────────────────────────► z.infer<typeof schema> ────────────────────┘
```

### Core Architecture Tenets
1. **Schema Co-location**: Schemas live strictly inside their feature domain slice under [`src/features/[feature]/schemas/`](file:///c:/projects/parity-deals-clone/src/features/products/schemas).
2. **Type Single-Source-of-Truth**: All payload types are derived via [`z.infer<typeof schema>`](file:///c:/projects/parity-deals-clone/src/features/products/server/actions/products.ts#L21), eliminating manual TypeScript interfaces that can drift from validation rules.
3. **Dual-Layer Validation**:
   - **Client-Side**: Immediate user feedback powered by [`react-hook-form`](file:///c:/projects/parity-deals-clone/package.json#L42) and [`@hookform/resolvers/zod`](file:///c:/projects/parity-deals-clone/package.json#L20).
   - **Server-Side**: Authoritative validation inside Server Actions via [`schema.safeParse()`](file:///c:/projects/parity-deals-clone/src/features/products/server/actions/products.ts#L24) before database mutation or third-party service calls.
4. **Subscription & Permission Guarding**: Server Actions gate mutations against subscription tier limits before executing database queries.

---

## 2. Zod Schema Contracts

All schema contracts for a feature reside in `src/features/[domain]/schemas/`. For the products feature, contracts are centralized in [`src/features/products/schemas/products.ts`](file:///c:/projects/parity-deals-clone/src/features/products/schemas/products.ts).

### Sanitizers and String Transformations
Input data often requires canonicalization before validation or database insertion. Zod provides `.transform()` pipelines to sanitize inputs:

```ts
import { removeTrailingSlash } from "@/lib/utils"

export const productDetailsSchema = z.object({
  name: z.string().min(1, "Required"),
  url: z.string().url().min(1, "Required").transform(removeTrailingSlash),
  description: z.string().optional(),
})
```
- [`removeTrailingSlash`](file:///c:/projects/parity-deals-clone/src/lib/utils.ts#L8-L10) normalizes website URLs by stripping trailing slashes (`https://example.com/` becomes `https://example.com`), preventing duplicate product URLs and ensuring deterministic parity matching.

### Numeric Sanitization and `NaN` Transforms
In HTML forms, empty or deleted numeric input fields typically emit empty strings `""` or `NaN` when coerced via `valueAsNumber`. Without proper handling, Zod's `z.number()` schema fails with runtime type errors.

To handle optional numeric fields cleanly:
```ts
discountPercentage: z
  .number()
  .max(100)
  .min(1)
  .or(z.nan())
  .transform(n => (isNaN(n) ? undefined : n))
  .optional(),
```
1. Accepts valid numbers between `1` and `100`.
2. Accepts `NaN` via `.or(z.nan())`.
3. Transforms `NaN` into `undefined` via `.transform(n => (isNaN(n) ? undefined : n))`.
4. Marks the entire field `.optional()`, seamlessly storing `undefined` / `null` in the database.

### Cross-Field Validation with `.refine()`
When validation logic spans multiple dependent fields, root-level `.refine()` attaches conditional business constraints:

```ts
.refine(
  value => {
    const hasCoupon = value.coupon != null && value.coupon.length > 0
    const hasDiscount = value.discountPercentage != null
    return !(hasCoupon && !hasDiscount)
  },
  {
    message: "A discount is required if a coupon code is provided",
    path: ["root"],
  }
)
```
- **Business Rule**: A coupon code cannot exist without an accompanying discount percentage.
- **Targeting**: Assigning `path: ["root"]` directs error messaging to the overall form or group container rather than orphaned child controls.

---

### Verbatim Code Reference: `src/features/products/schemas/products.ts`

```ts
// file:///c:/projects/parity-deals-clone/src/features/products/schemas/products.ts
import { removeTrailingSlash } from "@/lib/utils"
import { z } from "zod"

export const productDetailsSchema = z.object({
  name: z.string().min(1, "Required"),
  url: z.string().url().min(1, "Required").transform(removeTrailingSlash),
  description: z.string().optional(),
})

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
          const hasCoupon = value.coupon != null && value.coupon.length > 0
          const hasDiscount = value.discountPercentage != null
          return !(hasCoupon && !hasDiscount)
        },
        {
          message: "A discount is required if a coupon code is provided",
          path: ["root"],
        }
      )
  ),
})

export const productCustomizationSchema = z.object({
  classPrefix: z.string().optional(),
  backgroundColor: z.string().min(1, "Required"),
  textColor: z.string().min(1, "Required"),
  fontSize: z.string().min(1, "Required"),
  locationMessage: z.string().min(1, "Required"),
  bannerContainer: z.string().min(1, "Required"),
  isSticky: z.boolean(),
})
```

---

## 3. React Hook Form + Server Action UI Component

UI forms are built as Client Components (`"use client"`) using React Hook Form, Shadcn UI primitives, and typed Server Action dispatchers.

```
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                                UI Form Execution Lifecycle                                │
└───────────────────────────────────────────────────────────────────────────────────────────┘

 [User Clicks Submit]
         │
         ▼
 [form.handleSubmit(onSubmit)] ──(fails)──► [Display inline <FormMessage />]
         │
      (passes)
         ▼
 [Determine Action Mode]
   product == null ? createProduct : updateProduct.bind(null, product.id)
         │
         ▼
 [Dispatch Server Action] ──► [Button disabled via form.formState.isSubmitting]
         │
         ▼
 [Evaluate Response Envelope]
   { error: boolean, message: string }
         │
         ▼
 [Trigger Toast Notification] ──► { variant: data.error ? "destructive" : "default" }
```

### Key Implementation Patterns

1. **Schema Resolver Binding**:
   [`zodResolver(productDetailsSchema)`](file:///c:/projects/parity-deals-clone/src/features/products/components/forms/ProductDeailsForm.tsx#L38) binds Zod client-side validation into React Hook Form.
2. **Polymorphic Action Binding**:
   Forms support both Creation and Update workflows through higher-order function binding:
   ```ts
   const action =
     product == null ? createProduct : updateProduct.bind(null, product.id)
   ```
3. **Submitting State & UX Resilience**:
   [`form.formState.isSubmitting`](file:///c:/projects/parity-deals-clone/src/features/products/components/forms/ProductDeailsForm.tsx#L124) disables the submit button during asynchronous server processing, preventing duplicate submission requests.
4. **Standardized Toast Feedback**:
   Server actions return an envelope: `{ error: boolean; message: string }`. The client component inspects this response to trigger accessible toasts using [`useToast`](file:///c:/projects/parity-deals-clone/src/hooks/use-toast.ts).

---

### Verbatim Code Reference: `src/features/products/components/forms/ProductDeailsForm.tsx:1-60`

```tsx
// file:///c:/projects/parity-deals-clone/src/features/products/components/forms/ProductDeailsForm.tsx
"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { productDetailsSchema } from "@/features/products/schemas/products"
import {
  createProduct,
  updateProduct,
} from "@/features/products/server/actions/products"
import { useToast } from "@/hooks/use-toast"
import { RequiredLabelIcon } from "@/components/RequiredLabelIcon"

export function ProductDetailsForm({
  product,
}: {
  product?: {
    id: string
    name: string
    description: string | null
    url: string
  }
}) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof productDetailsSchema>>({
    resolver: zodResolver(productDetailsSchema),
    defaultValues: product
      ? { ...product, description: product.description ?? "" }
      : {
          name: "",
          url: "",
          description: "",
        },
  })

  async function onSubmit(values: z.infer<typeof productDetailsSchema>) {
    const action =
      product == null ? createProduct : updateProduct.bind(null, product.id)
    const data = await action(values)

    if (data?.message) {
      toast({
        title: data.error ? "Error" : "Success",
        description: data.message,
        variant: data.error ? "destructive" : "default",
      })
    }
  }
```

---

## 4. Permissions and Subscription Gatekeeping

Security and entitlement enforcement cannot rely on client-side state alone. All access controls and resource quotas are calculated dynamically on the server via [`src/lib/permissions.ts`](file:///c:/projects/parity-deals-clone/src/lib/permissions.ts).

### Permission Evaluation Functions

```ts
// file:///c:/projects/parity-deals-clone/src/lib/permissions.ts
import { startOfMonth } from "date-fns"
import { getProductCount } from "@/features/products/server/db/products"
import { getProductViewCount } from "@/features/analytics/server/db/productViews"
import { getUserSubscriptionTier } from "@/features/subscriptions/server/db/subscription"

export async function canRemoveBranding(userId: string | null) {
  if (userId == null) return false
  const tier = await getUserSubscriptionTier(userId)
  return tier.canRemoveBranding
}

export async function canCustomizeBanner(userId: string | null) {
  if (userId == null) return false
  const tier = await getUserSubscriptionTier(userId)
  return tier.canCustomizeBanner
}

export async function canAccessAnalytics(userId: string | null) {
  if (userId == null) return false
  const tier = await getUserSubscriptionTier(userId)
  return tier.canAccessAnalytics
}

export async function canCreateProduct(userId: string | null) {
  if (userId == null) return false
  const tier = await getUserSubscriptionTier(userId)
  const productCount = await getProductCount(userId)
  return productCount < tier.maxNumberOfProducts
}

export async function canShowDiscountBanner(userId: string | null) {
  if (userId == null) return false
  const tier = await getUserSubscriptionTier(userId)
  const productViews = await getProductViewCount(
    userId,
    startOfMonth(new Date())
  )
  return productViews < tier.maxNumberOfVisits
}
```

### Subscription Tiers and Feature Matrix

Defined in [`src/data/subscriptionTiers.ts`](file:///c:/projects/parity-deals-clone/src/data/subscriptionTiers.ts):

| Tier Name | Monthly Price | Max Products (`maxNumberOfProducts`) | Monthly Visits (`maxNumberOfVisits`) | Analytics (`canAccessAnalytics`) | Banner Customization (`canCustomizeBanner`) | Remove Branding (`canRemoveBranding`) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Free** | $0 / mo | `1` | `5,000` | ❌ No | ❌ No | ❌ No |
| **Basic** | $19 / mo | `5` | `10,000` | ✅ Yes | ❌ No | ✅ Yes |
| **Standard** | $49 / mo | `30` | `100,000` | ✅ Yes | ✅ Yes | ✅ Yes |
| **Premium** | $99 / mo | `50` | `1,000,000` | ✅ Yes | ✅ Yes | ✅ Yes |

### Enforcement in Server Actions

When a user attempts to execute a mutation, the server action checks the permission function before mutating state:

```ts
// file:///c:/projects/parity-deals-clone/src/features/products/server/actions/products.ts
export async function createProduct(
  unsafeData: z.infer<typeof productDetailsSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { userId } = auth()
  const { success, data } = productDetailsSchema.safeParse(unsafeData)
  const canCreate = await canCreateProduct(userId)

  if (!success || userId == null || !canCreate) {
    return { error: true, message: "There was an error creating your product" }
  }

  const { id } = await createProductDb({ ...data, clerkUserId: userId })
  redirect(`/dashboard/products/${id}/edit?tab=countries`)
}
```

---

## 5. Summary & Key Takeaways

1. **Schemas belong to feature domains**: Keep validation rules next to domain entities under `src/features/[feature]/schemas/`.
2. **Transform with care**: Use Zod `.transform()` for data sanitization (e.g., removing trailing slashes and converting `NaN` into `undefined`).
3. **Bind Server Actions cleanly**: Use `.bind(null, id)` on update operations and leverage `form.formState.isSubmitting` to prevent double-submits.
4. **Never trust client state**: Validate all inputs with `safeParse()` and verify permissions with [`canCreateProduct`](file:///c:/projects/parity-deals-clone/src/lib/permissions.ts#L24-L29) on the server.

---

← Previous: [Chapter 03: DB Caching & Drizzle Patterns](./03-db-caching-and-drizzle-patterns.md) | Next: [Chapter 05: ESLint Boundaries & Governance](./05-eslint-boundaries-and-governance.md) →
