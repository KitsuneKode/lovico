import { DashboardClient } from './dashboard-client'

interface DashboardPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { id } = await params

  return <DashboardClient projectId={id} />
}
