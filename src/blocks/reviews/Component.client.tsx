'use client'
import AutoScroll from 'embla-carousel-auto-scroll'
import { Carousel } from '@/components/ui/carousel'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

export function CarouselAutoScroll({ children }: { children: React.ReactNode }) {
  return (
    <Carousel
      plugins={[
        WheelGesturesPlugin(),
        AutoScroll({
          speed: 0.5,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
          stopOnFocusIn: true,
        }),
      ]}
      opts={{ align: 'center', loop: true, dragFree: true }}
    >
      {children}
    </Carousel>
  )
}
