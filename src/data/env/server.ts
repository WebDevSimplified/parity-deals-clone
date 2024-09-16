import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    DATABASE_URL: z.string().url(),
    CLERK_SECRET_KEY: z.string(),
    CLERK_WEBHOOK_SECRET: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    STRIPE_BASIC_PLAN_STRIPE_PRICE_ID: z.string(),
    STRIPE_STANDARD_PLAN_STRIPE_PRICE_ID: z.string(),
    STRIPE_PREMIUM_PLAN_STRIPE_PRICE_ID: z.string(),
    TEST_COUNTRY_CODE: z.string(),
  },
  experimental__runtimeEnv: process.env,
})
