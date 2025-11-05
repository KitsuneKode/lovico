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
        'h-screen flex flex-col bg-[#1a1a1a] border-r border-white/5',
        'w-[200px]',
        className
      )}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-xs">
            L
          </div>
          <span className="font-semibold text-white text-sm">Lovico</span>
        </div>
      </div>

      {/* New Project Button */}
      <div className="p-3">
        <Button
          className="w-full bg-white text-black hover:bg-white/90 h-9 text-sm font-medium"
          size="sm"
        >
          New Project
        </Button>
      </div>

      {/* Project Lists */}
      <ScrollArea className="flex-1 px-2">
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
          className="w-full px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-md flex items-center justify-between transition-colors duration-200"
        >
          All Projects
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </ScrollArea>

      {/* User Profile */}
      {session?.user && (
        <div className="border-t border-white/5 p-3">
          <div className="flex items-start gap-2.5">
            <img
              src={session.user.image || '/default-avatar.png'}
              alt={session.user.name || 'User'}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">
                {session.user.name}
              </p>
              <p className="text-[11px] text-neutral-400 truncate">
                {session.user.email}
              </p>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-neutral-300 flex-shrink-0">
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
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-3">
      <CollapsibleTrigger className="w-full px-3 py-1.5 text-[11px] font-medium text-neutral-400 hover:text-white flex items-center gap-2 transition-colors duration-200">
        {isOpen ? (
          <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
        {title}
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-0.5 mt-1">
        {projects.length === 0 && emptyMessage ? (
          <p className="px-3 py-2 text-xs text-neutral-500">{emptyMessage}</p>
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
      className="w-full px-3 py-2 text-sm text-white hover:bg-white/5 rounded-md flex items-center gap-2.5 transition-colors duration-200 group"
    >
      <span className="text-base flex-shrink-0">{project.icon}</span>
      <span className="flex-1 text-left truncate text-xs group-hover:text-white">
        {project.name}
      </span>
    </Link>
  )
}
