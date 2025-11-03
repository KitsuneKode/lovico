import { dummyProjects } from '@/lib/dummy-data'
import { DashboardClient } from './dashboard-client'
import { DashboardSidebar } from '@/components/dashboard-sidebar'

interface DashboardPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { id } = await params

  return (
    <div className="bg-background flex h-screen overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar projects={dummyProjects} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:ml-64">
        <DashboardClient projectId={id} />
      </div>
    </div>
  )
}
