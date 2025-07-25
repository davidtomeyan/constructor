import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { IScrollCardsBlock } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { InViewElement } from '@/components/in-view-element'
import { RichText } from '@/components/rich-text'
import { Media } from '@/components/Media'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn, validateNumber } from '@/lib/utils'
import { CmsLinkList } from '@/components/cms-link/cms-link-list'

export function ScrollCardsBlock({
  scrollItems,
  objectFit,
  orientation,
  isBordered,
  backgroundVariant,
  linksPosition,
  rounded,
  columns,
  spaceY,
  isIcon,
  ratio,
  loop,
  scrollItemGap,
}: IScrollCardsBlock) {
  if (!scrollItems?.length) return null

  const isHorizontal = orientation === 'horizontal'
  return (
    <InViewElement asChild>
      <div className="relative text-start min-w-0 max-w-full w-full opacity-0 translate-y-8 transition-[opacity,translate]  duration-500 data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0">
        <Carousel opts={{ loop: !!loop, align: 'start' }}>
          <CarouselContent className="ml-1 lg:ml-2 mr-2 lg:mr-3">
            {scrollItems.map((item, i) => (
              <CarouselItem
                className={cn([
                  'basis-9/10',
                  columns === '2' && 'md:basis-7/15',
                  columns === '3' && 'md:basis-7/15 lg:basis-7/22',
                  columns === '4' && 'md:basis-7/15 lg:basis-7/22 xl:basis-[24%]',
                  isHorizontal && columns === '1' && 'md:basis-7/10',
                  isHorizontal && columns === '2' && 'md:basis-7/11',
                  isHorizontal && columns === '3' && 'md:basis-7/11 lg:basis-7/16',
                  isHorizontal && columns === '4' && 'md:basis-7/11 lg:basis-7/16 xl:basis-7/18',
                ])}
                key={`scroll-item-${i}`}
              >
                <Card
                  className={cn(
                    'overflow-hidden h-full',
                    isBordered ? 'border' : 'border-none',
                    backgroundVariant,
                  )}
                >
                  <CardContent
                    className={cn([
                      'flex flex-col flex-1',
                      isHorizontal ? 'flex-row' : 'flex-col',
                      scrollItemGap,
                    ])}
                  >
                    {item.image && (
                      <div
                        className={cn([
                          isIcon && 'size-20 justify-self-center self-center',
                          isHorizontal && 'w-1/3 flex items-center',
                          isIcon && isHorizontal && 'size-20 flex items-center',
                        ])}
                      >
                        <AspectRatio
                          ratio={validateNumber(ratio)?.num ?? 1}
                          className={cn(['relative overflow-hidden', rounded])}
                        >
                          <Media
                            imgClassName={objectFit}
                            htmlElement={null}
                            fill
                            resource={item.image}
                          />
                        </AspectRatio>
                      </div>
                    )}
                    {(item.content || item.links?.length) && (
                      <div className={cn('flex-1 flex flex-col', scrollItemGap)}>
                        {item.content && (
                          <div className={cn(['grow flex', isHorizontal && 'items-center'])}>
                            <RichText
                              className={cn([
                                'prose w-full max-w-full min-w-0 prose-sm lg:prose-base',
                                spaceY === 'auto' ? undefined : spaceY,
                              ])}
                              data={item.content}
                            />
                          </div>
                        )}
                        {item.links && (
                          <CmsLinkList
                            size={'sm'}
                            linkClassName={'max-w-lg'}
                            className={cn([
                              'justify-start',
                              linksPosition === 'left' && 'justify-start',
                              linksPosition === 'center' && 'justify-center',
                              linksPosition === 'right' && 'justify-end',
                            ])}
                            links={item.links}
                          />
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 z-30 pointer-events-auto" />
          <CarouselNext className="right-1 z-30 pointer-events-auto" />
        </Carousel>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-4 lg:w-10 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-4 lg:w-10 bg-gradient-to-l from-background"></div>
      </div>
    </InViewElement>
  )
}
