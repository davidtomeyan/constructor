import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern'
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern'
import { Particles } from '@/components/magicui/particles'
import { cn } from '@/lib/utils'

import { DotPattern } from '@/components/magicui/dot-pattern'

import { memo } from 'react'
import { Meteors } from '@/components/magicui/meteors'

interface BackgroundEffectsProps {
  type?:
    | 'particles'
    | 'interactive-grid-pattern'
    | 'animated-grid-pattern'
    | 'glow-effect'
    | 'meteors'
    | null
}

function BackgroundEffects({ type }: BackgroundEffectsProps) {
  switch (type) {
    case 'particles': {
      return (
        <Particles
          className="absolute inset-0 z-0"
          quantity={220}
          ease={80}
          color={'#3730a3'}
          refresh
        />
      )
    }
    case 'interactive-grid-pattern': {
      return (
        <InteractiveGridPattern
          squares={[50, 50]}
          squaresClassName={'stroke-slate-200 dark:stroke-slate-800'}
          className={cn(
            "border-none",
            'pointer-events-auto [mask-image:radial-gradient(900px_circle_at_center,white,transparent)] lg:[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[-95%]  h-[220%] skew-y-12 z-0',
          )}
        />
      )
    }
    case 'animated-grid-pattern': {
      return (
        <AnimatedGridPattern
          numSquares={40}
          maxOpacity={0.1}
          duration={2}
          repeatDelay={1}
          className={cn(
            '[mask-image:radial-gradient(900px_circle_at_center,white,transparent)] lg:[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[-95%]  h-[220%]  skew-y-12 z-0 fill-accent stroke-slate-200 dark:stroke-slate-800',
          )}
        />
      )
    }
    case 'glow-effect': {
      return (
        <DotPattern
          width={45}
          height={45}
          glow={true}
          className={cn(
            '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] lg:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] z-0  stroke-secondary',
          )}
        />
      )
    }
    case 'meteors': {
      return <Meteors className="z-0 bg-secondary" number={30} />
    }
    default:
      return null
  }
}

const BackgroundEffectsMemo = memo(BackgroundEffects)

export { BackgroundEffectsMemo as BackgroundEffects }
