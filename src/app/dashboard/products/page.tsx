import { auth } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { NoProducts } from "@/features/products/components/NoProducts"
import { getProducts } from "@/features/products/server/db/products"
import { ProductGrid } from "@/features/products/components/ProductGrid"

export default async function Products() {
  const { userId, redirectToSignIn } = await auth()
  if (userId == null) return redirectToSignIn()

  const products = await getProducts(userId)

  if (products.length === 0) return <NoProducts />

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold flex justify-between">
        Products
        <Button asChild>
          <Link href="/dashboard/products/new">
            <PlusIcon className="size-4 mr-2" /> New Product
          </Link>
        </Button>
      </h1>
      <ProductGrid products={products} />
    </>
  )
}
