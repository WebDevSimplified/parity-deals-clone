import { ReactNode } from "react"
import { DashboardNavBar } from "../../components/DashboardNavBar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-accent/5 min-h-screen">
      <DashboardNavBar />
      <div className="container py-6">{children}</div>
    </div>
  )
}
