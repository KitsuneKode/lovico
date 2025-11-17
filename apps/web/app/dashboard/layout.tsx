import { type ReactNode } from 'react'
import { AppSidebar } from '@/components/dashboard/app-sidebar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0d0d0d]">
      <AppSidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
