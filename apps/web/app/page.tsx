import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'
import LightRays from '@/components/LightRays'
import { HeroHeader } from '@/components/header'
import { HallOfFame } from '@/components/hall-of-fame'
import { AnimatedHero } from '@/components/AnimatedHero'
import { FloatingChat } from '@/components/floating-chat'
import { ProjectGallery } from '@/components/project-gallery'
import { TextEffect } from '@lovico/ui/components/text-effect'
import { AnimatedGroup } from '@lovico/ui/components/animated-group'
import { PremiumPromptInput } from '@/components/premium-prompt-input'
import { dummyProjects, dummyFeaturedProjects } from '@/lib/dummy-data'

export default async function Home() {
  // Using dummy data for testing - replace with actual tRPC calls when ready
  const session = { user: { id: '1', name: 'Demo User' } } // Simulated logged in user
  const userProjects = dummyProjects
  const featuredProjects = dummyFeaturedProjects

  return (
    <>
      <HeroHeader />

      <main className="relative min-h-screen overflow-hidden">
        {/* Background with LightRays */}
        <div className="fixed inset-0 -z-10">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.2}
            lightSpread={0.8}
            rayLength={1.5}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.08}
            distortion={0.05}
            className="opacity-20"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_50%)] opacity-10" />
        </div>

        {/* Hero Section */}
        <AnimatedHero />

        {/* User Projects Section - Only show if logged in */}
        {session && userProjects.length > 0 && (
          <section className="relative px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <ProjectGallery projects={userProjects} />
            </div>
          </section>
        )}

        {/* Hall of Fame Section */}
        {featuredProjects.length > 0 && (
          <section className="relative">
            <HallOfFame projects={featuredProjects} />
          </section>
        )}

        {/* CTA Section */}
        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Start creating stunning websites in minutes
            </p>
          </div>
        </section>

        {/* Floating chat input for homepage */}
        <div className="pointer-events-none fixed inset-x-0 bottom-8 z-50 mx-auto w-full max-w-2xl px-4">
          <FloatingChat />
        </div>
      </main>
    </>
  )
}
