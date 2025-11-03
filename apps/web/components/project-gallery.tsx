'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { cn } from '@lovico/ui/lib/utils'
import { Plus, Clock } from 'lucide-react'
import { Button } from '@lovico/ui/components/button'

interface Project {
  id: string
  name: string
  thumbnail?: string | null
  updatedAt: Date
}

interface ProjectGalleryProps {
  projects: Project[]
  className?: string
}

export function ProjectGallery({ projects, className }: ProjectGalleryProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Projects</h2>
        <Button size="sm" asChild>
          <Link href="/dashboard/new">
            <Plus className="mr-2 size-4" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Link
              href={`/dashboard/${project.id}`}
              className="group bg-card hover:shadow-primary/10 block overflow-hidden rounded-lg border transition-all hover:shadow-lg"
            >
              <div className="bg-muted relative aspect-video overflow-hidden">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="size-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="text-muted-foreground flex size-full items-center justify-center">
                    <span className="text-4xl font-bold opacity-20">
                      {project.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="line-clamp-1 font-semibold">{project.name}</h3>
                <div className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
                  <Clock className="size-3" />
                  <span>
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
