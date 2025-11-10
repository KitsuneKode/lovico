// 'use client'

import Image from 'next/image'
import { type ReactNode } from 'react'
import { cn } from '@lovico/ui/lib/utils'
import { motion, Variants } from 'motion/react'
import type { Project } from '@lovico/common/types'
import { Card, CardContent } from '@lovico/ui/components/card'

// // Subtle lift animation on hover
// const projectCardVariants: Variants = {
//   initial: { scale: 1, y: 0 },
//   hover: {
//     scale: 1.02,
//     y: -2,
//     transition: { duration: 0.2, ease: 'easeOut' },
//   },
// }

// // Shimmer effect for loading states
// const shimmer =
//   'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent'

// function formatDate(date: Date | string) {
//   const d = typeof date === 'string' ? new Date(date) : date
//   return d.toLocaleDateString(undefined, {
//     month: 'short',
//     day: '2-digit',
//   })
// }

// export function ProjectGrid({ projects }: { projects: Project[] }) {
//   return (
//     <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {projects.map((project) => (
//         <motion.div
//           key={project.id}
//           variants={projectCardVariants}
//           initial="initial"
//           whileHover="hover"
//           className="group relative"
//         >
//           <Card className="border-border/50 bg-background/50 overflow-hidden backdrop-blur">
//             {/* Thumbnail Preview */}
//             <div className="bg-muted relative aspect-video overflow-hidden">
//               {project.thumbnail ? (
//                 <Image
//                   src={project.thumbnail}
//                   alt={project.name}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <div className={cn('h-full w-full', shimmer)} />
//               )}
//             </div>
//             <CardContent className="p-4">
//               <h3 className="truncate font-semibold">{project.name}</h3>
//               <p className="text-muted-foreground mt-1 text-sm">
//                 {project.framework} • {formatDate(project.updatedAt)}
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       ))}
//     </div>
//   )
// }

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar placeholder (enhanced sidebar can plug in here) */}
      <main className="flex-1">{children}</main>
    </div>
  )
}

// export { shimmer, projectCardVariants }
