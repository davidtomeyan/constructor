import { IReviewsBlock } from '@/payload-types'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format, isValid, parseISO } from 'date-fns'
import { ReadOnlyRating } from 'src/components/read-only-rating'
import { CarouselItem, CarouselContent } from '@/components/ui/carousel'
import { InViewElement } from '@/components/in-view-element'
import { CarouselAutoScroll } from '@/blocks/reviews/Component.client'

export function ReviewsBlock({ reviews }: IReviewsBlock) {
  if (!reviews?.length) return null
  return (
    <InViewElement asChild>
      <div className="relative text-start min-w-0 max-w-full w-full opacity-0 translate-y-8 transition-[opacity,translate]  duration-500 data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0">
        <CarouselAutoScroll>
          <CarouselContent>
            {(reviews.length < 6 ? [...reviews, ...reviews] : reviews).map((review,index) => {
              if (typeof review !== 'object') return null
              const avatar =
                typeof review.avatar === 'object' ? (review.avatar?.url ?? undefined) : undefined
              const alt =
                typeof review.avatar === 'object' ? (review.avatar?.alt ?? undefined) : undefined
              const parsedISO = parseISO(review.date)
              const formatedData = isValid(parsedISO) ? format(parsedISO, 'PP') : ''
              return (
                <CarouselItem className="basis-5/6 lg:basis-2/5 justify-self-stretch" key={`review-${index}`}>
                  <Card className="gap-4 h-full">
                    <CardHeader className="flex justify-between">
                      <div className="flex gap-3">
                        <Avatar className="size-11">
                          <AvatarImage alt={alt} src={avatar} />
                          <AvatarFallback>{review.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <CardTitle>{review.name}</CardTitle>
                          <CardDescription>{formatedData}</CardDescription>
                        </div>
                      </div>
                      <div>
                        <ReadOnlyRating rating={review.rating} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle>{review.title}</CardTitle>
                    </CardContent>
                    <CardFooter>
                      <CardDescription>{review.description}</CardDescription>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </CarouselAutoScroll>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-4 lg:w-10 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-4 lg:w-10 bg-gradient-to-l from-background"></div>
      </div>
    </InViewElement>
  )
}
