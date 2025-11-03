import LightRays from '@/components/LightRays'
import { AuthForm } from '@/components/auth-form'

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <LightRays
        raysOrigin="top-center"
        raysColor="#9247e6"
        raysSpeed={1}
        lightSpread={0.6}
        rayLength={1.5}
        followMouse={true}
        mouseInfluence={0.15}
        noiseAmount={0.05}
        distortion={0.03}
        className="absolute inset-0 opacity-30"
      />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-card/80 rounded-xl border p-8 shadow-2xl backdrop-blur-xl">
          <AuthForm mode="login" />
        </div>
      </div>
    </div>
  )
}
