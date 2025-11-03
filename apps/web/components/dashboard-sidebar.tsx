'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@lovico/ui/lib/utils'
import { usePathname } from 'next/navigation'
import { Button } from '@lovico/ui/components/button'
import { Skeleton } from '@lovico/ui/components/skeleton'
import { ScrollArea } from '@lovico/ui/components/scroll-area'
import {
  PlusCircle,
  FolderOpen,
  Settings,
  Menu,
  X,
  Clock,
  ChevronRight,
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description?: string | null
  updatedAt: Date
}

interface DashboardSidebarProps {
  projects?: Project[]
  isLoading?: boolean
  className?: string
}

export function DashboardSidebar({
  projects = [],
  isLoading = false,
  className,
}: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  const isProjectActive = (projectId: string) => {
    return pathname?.includes(projectId)
  }

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          'bg-card fixed top-0 left-0 z-40 h-screen w-64 border-r transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className,
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center border-b px-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold"
            >
              <div className="from-primary to-primary/70 flex size-8 items-center justify-center rounded-lg bg-gradient-to-br">
                <span className="text-primary-foreground text-sm">L</span>
              </div>
              <span>Lovico</span>
            </Link>
          </div>

          {/* New Project Button */}
          <div className="p-4">
            <Button className="w-full justify-start gap-2" size="sm">
              <PlusCircle className="size-4" />
              New Project
            </Button>
          </div>

          {/* Projects List */}
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 p-2">
              <div className="text-muted-foreground mb-2 flex items-center justify-between px-2 text-xs font-semibold">
                <span>Your Projects</span>
                <span className="bg-muted rounded-full px-2 py-0.5">
                  {projects.length}
                </span>
              </div>

              {isLoading ? (
                // Loading state
                <>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-2 rounded-lg p-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))}
                </>
              ) : projects.length === 0 ? (
                // Empty state
                <div className="rounded-lg border-2 border-dashed p-6 text-center">
                  <FolderOpen className="text-muted-foreground mx-auto mb-2 size-8" />
                  <p className="text-muted-foreground text-sm">
                    No projects yet
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Create your first project to get started
                  </p>
                </div>
              ) : (
                // Projects list
                projects.map((project) => {
                  const active = isProjectActive(project.id)
                  return (
                    <Link
                      key={project.id}
                      href={`/dashboard/${project.id}`}
                      className={cn(
                        'group hover:bg-muted flex items-start gap-3 rounded-lg p-3 transition-colors',
                        active && 'bg-muted',
                      )}
                    >
                      <div
                        className={cn(
                          'bg-muted mt-0.5 flex size-8 flex-shrink-0 items-center justify-center rounded-md transition-colors',
                          active && 'bg-primary/10',
                        )}
                      >
                        <FolderOpen
                          className={cn(
                            'text-muted-foreground size-4 transition-colors',
                            active && 'text-primary',
                          )}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4
                            className={cn(
                              'truncate text-sm font-medium',
                              active && 'text-primary',
                            )}
                          >
                            {project.name}
                          </h4>
                          {active && (
                            <ChevronRight className="text-primary size-4 flex-shrink-0" />
                          )}
                        </div>
                        {project.description && (
                          <p className="text-muted-foreground mt-0.5 truncate text-xs">
                            {project.description}
                          </p>
                        )}
                        <div className="text-muted-foreground mt-1.5 flex items-center gap-1 text-xs">
                          <Clock className="size-3" />
                          <span>
                            {new Date(project.updatedAt).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              size="sm"
            >
              <Settings className="size-4" />
              Settings
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
