import { startOfMonth } from "date-fns"
import { getProductCount } from "./db/products"
import { getProductViewCount } from "./db/productViews"
import { getUserSubscriptionTier } from "./db/subscription"

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
