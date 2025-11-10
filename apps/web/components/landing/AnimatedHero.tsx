'use client'

import { motion } from 'motion/react'

import { Sparkles } from 'lucide-react'
import { AnimatedGroup } from '@lovico/ui/components/animated-group'

export const AnimatedHero = () => {
  return (
    <section className="relative px-6 pt-32 pb-20 lg:pt-48">
      <div className="mx-auto max-w-6xl">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              },
              item: {
                hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
                visible: {
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                  transition: {
                    type: 'spring',
                    bounce: 0.3,
                    duration: 1.5,
                  },
                },
              },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="border-primary/20 bg-primary/10 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-sm"
            >
              <Sparkles className="text-primary size-4" />
              <span className="from-primary to-primary/70 bg-linear-to-r bg-clip-text text-sm font-semibold text-transparent">
                Powered by Advanced AI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="from-foreground via-foreground to-foreground/70 bg-linear-to-br bg-clip-text text-5xl leading-tight font-bold text-balance text-transparent md:text-6xl lg:text-7xl"
            >
              Beautiful Websites,{' '}
              <span className="from-primary via-primary to-primary/80 bg-linear-to-r bg-clip-text text-transparent">
                One Prompt Away
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-muted-foreground/90 mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty md:text-xl"
            >
              Skip the complexity. Just describe what you want, and watch{' '}
              <span className="text-foreground font-semibold">Lovico</span> turn
              your ideas into pixel-perfect, production-ready websites in
              seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-muted-foreground mt-8 flex flex-wrap items-center justify-center gap-6 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500"></div>
                <span>No coding required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-blue-500"></div>
                <span>Export clean code</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-purple-500"></div>
                <span>Free to start</span>
              </div>
            </motion.div>

            <div className="mx-auto mt-12 flex items-center justify-center">
              <></>
            </div>
          </AnimatedGroup>
        </div>
      </div>
    </section>
  )
}
