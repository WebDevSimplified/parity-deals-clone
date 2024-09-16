import { auth } from "@clerk/nextjs/server"
import { AwaitedReactNode } from "react"
import { NoPermissionCard } from "./NoPermissionCard"

export async function HasPermission({
  permission,
  renderFallback = false,
  fallbackText,
  children,
}: {
  permission: (userId: string | null) => Promise<boolean>
  renderFallback?: boolean
  fallbackText?: string
  children: AwaitedReactNode
}) {
  const { userId } = auth()
  const hasPermission = await permission(userId)
  if (hasPermission) return children
  if (renderFallback) return <NoPermissionCard>{fallbackText}</NoPermissionCard>
  return null
}
