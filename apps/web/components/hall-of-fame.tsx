'use client'

import { motion } from 'motion/react'
import { Star, User } from 'lucide-react'
import { cn } from '@lovico/ui/lib/utils'

interface FeaturedProject {
  id: string
  name: string
  description?: string | null
  thumbnail?: string | null
  user: {
    name: string
    image?: string | null
  }
}

interface HallOfFameProps {
  projects: FeaturedProject[]
  className?: string
}

export function HallOfFame({ projects, className }: HallOfFameProps) {
  return (
    <div className={cn('w-full py-16', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium">
            <Star className="size-4" />
            Hall of Fame
          </div>
          <h2 className="text-4xl font-bold">Featured Creations</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Discover amazing websites built by our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group bg-card hover:shadow-primary/10 relative overflow-hidden rounded-xl border transition-all hover:shadow-xl"
            >
              <div className="bg-muted relative aspect-[4/3] overflow-hidden">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="from-primary/20 to-primary/5 flex size-full items-center justify-center bg-gradient-to-br">
                    <span className="text-6xl font-bold opacity-20">
                      {project.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <div className="p-4">
                <h3 className="line-clamp-1 font-semibold">{project.name}</h3>
                {project.description && (
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                    {project.description}
                  </p>
                )}

                <div className="text-muted-foreground mt-3 flex items-center gap-2 text-xs">
                  {project.user.image ? (
                    <img
                      src={project.user.image}
                      alt={project.user.name}
                      className="size-5 rounded-full"
                    />
                  ) : (
                    <div className="bg-primary/20 flex size-5 items-center justify-center rounded-full">
                      <User className="size-3" />
                    </div>
                  )}
                  <span className="line-clamp-1">{project.user.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
