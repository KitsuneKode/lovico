'use client'

import { useTRPC } from '@/trpc/client'
import { DashboardSidebar } from './dashboard-sidebar'

export function DashboardSidebarClient() {
  // Fetch user projects via tRPC
  const trpc = useTRPC()
  const { data: projects, isLoading } = trpc.project.getUserProjects.useQuery(
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  )

  return <DashboardSidebar projects={projects || []} isLoading={isLoading} />
}
