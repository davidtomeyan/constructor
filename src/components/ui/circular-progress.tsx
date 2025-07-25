'use client'

import { AnimatedCircularProgressBar } from '@/components/magicui/animated-circular-progress-bar'
import { ComponentProps, useState } from 'react'

import { InViewElement } from '@/components/in-view-element'
import { cn, validateNumber } from '@/lib/utils'

export function CircularProgress({
  value,
  className,
  ...props
}: ComponentProps<typeof AnimatedCircularProgressBar>) {
  const validValue = validateNumber(value)?.num
  const [num, setNum] = useState(0)
  if (!validValue) return null
  return (
    <InViewElement
      className={cn([
        className,
        'transition-all translate-y-10',
          'opacity-0 scale-80 delay-50',
          'duration-400 data-[inview=true]:translate-y-0 data-[inview=true]:opacity-100 data-[inview=true]:scale-100 ease-in-out',
      ])}
      onIntersecting={(isIntersecting) => {
        // console.log(isIntersecting)
        if (!isIntersecting) {
          setNum(0)
        } else setNum(validValue)
      }}
    >
      <AnimatedCircularProgressBar {...props} className={'size-full'} value={num} />
    </InViewElement>
  )
}
