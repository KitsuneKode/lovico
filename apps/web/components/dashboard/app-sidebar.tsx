'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@lovico/ui/components/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@lovico/ui/components/collapsible'
import { ScrollArea } from '@lovico/ui/components/scroll-area'
import { authClient } from '@lovico/auth/client'
import { cn } from '@lovico/ui/lib/utils'
import Link from 'next/link'

interface Project {
  id: string
  name: string
  icon: string
}

interface AppSidebarProps {
  className?: string
}

export function AppSidebar({ className }: AppSidebarProps) {
  const { data: session } = authClient.useSession()

  // TODO: Replace with real tRPC query
  // import { trpc } from '@/trpc/client'
  // const { data: recentProjects } = trpc.project.getRecent.useQuery({ limit: 10 })
  const mockRecentProjects: Project[] = [
    { id: 'new-1', name: 'New Project', icon: '📄' },
    { id: 'booking', name: 'Appointment Booking S...', icon: '📅' },
    { id: 'auth', name: 'C-Auth Wi-Fi PWA', icon: '🟧' },
  ]

  return (
    <aside
      className={cn(
        'h-screen flex flex-col bg-[#1a1a1a] border-r border-white/[0.08]',
        'w-[280px]',
        className
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-lg">
            L
          </div>
          <span className="font-semibold text-white text-base">Lovico</span>
        </div>
      </div>

      {/* New Project Button */}
      <div className="p-4">
        <Button
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 h-10 text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Project Lists */}
      <ScrollArea className="flex-1 px-3">
        {/* Favorites */}
        <ProjectSection
          title="Favorites"
          projects={[]}
          emptyMessage="No favorites yet."
        />

        {/* Recents */}
        <ProjectSection title="Recents" projects={mockRecentProjects} />

        {/* All Projects Link */}
        <Link
          href="/dashboard/projects"
          className="w-full px-4 py-2.5 text-sm text-neutral-400 hover:text-white hover:bg-white/[0.08] rounded-lg flex items-center justify-between transition-all duration-200"
        >
          All Projects
          <ChevronRight className="h-4 w-4" />
        </Link>
      </ScrollArea>

      {/* User Profile */}
      {session?.user && (
        <div className="border-t border-white/[0.08] p-4">
          <div className="flex items-start gap-3">
            <img
              src={session.user.image || '/default-avatar.png'}
              alt={session.user.name || 'User'}
              className="w-10 h-10 rounded-full flex-shrink-0 ring-2 ring-white/10"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-neutral-400 truncate">
                {session.user.email}
              </p>
            </div>
            <span className="text-xs px-2 py-1 bg-white/10 rounded-md text-neutral-300 flex-shrink-0 font-medium">
              Free
            </span>
          </div>
        </div>
      )}
    </aside>
  )
}

interface ProjectSectionProps {
  title: string
  projects: Project[]
  emptyMessage?: string
}

function ProjectSection({ title, projects, emptyMessage }: ProjectSectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
      <CollapsibleTrigger className="w-full px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-2 transition-colors duration-200 uppercase tracking-wider">
        {isOpen ? (
          <ChevronDown className="h-3.5 w-3.5" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5" />
        )}
        {title}
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-1 mt-2">
        {projects.length === 0 && emptyMessage ? (
          <p className="px-4 py-3 text-sm text-neutral-500">{emptyMessage}</p>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/dashboard/${project.id}`}
      className="w-full px-4 py-2.5 text-sm text-white hover:bg-white/[0.08] rounded-lg flex items-center gap-3 transition-all duration-200 group hover:-translate-y-0.5"
    >
      <span className="text-lg flex-shrink-0">{project.icon}</span>
      <span className="flex-1 text-left truncate text-sm group-hover:text-white font-medium">
        {project.name}
      </span>
    </Link>
  )
}
