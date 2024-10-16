import { db } from "@/drizzle/db"
import { ProductTable, UserSubscriptionTable } from "@/drizzle/schema"
import { CACHE_TAGS, revalidateDbCache } from "@/lib/cache"
import { eq } from "drizzle-orm"

export async function deleteUser(clerkUserId: string) {
  const [userSubscriptions, products] = await db.batch([
    db
      .delete(UserSubscriptionTable)
      .where(eq(UserSubscriptionTable.clerkUserId, clerkUserId))
      .returning({
        id: UserSubscriptionTable.id,
      }),
    db
      .delete(ProductTable)
      .where(eq(ProductTable.clerkUserId, clerkUserId))
      .returning({
        id: ProductTable.id,
      }),
  ])

  userSubscriptions.forEach(sub => {
    revalidateDbCache({
      tag: CACHE_TAGS.subscription,
      id: sub.id,
      userId: clerkUserId,
    })
  })

  products.forEach(prod => {
    revalidateDbCache({
      tag: CACHE_TAGS.products,
      id: prod.id,
      userId: clerkUserId,
    })
  })

  return [userSubscriptions, products]
}
