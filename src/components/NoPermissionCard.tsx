import Link from "next/link"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { ReactNode } from "react"

export function NoPermissionCard({
  children = "You do not have permission to perform this action. Try upgrading your account to access this feature.",
}: {
  children?: ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Permission Denied</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{children}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href="/dashboard/subscription">Upgrade Account</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
