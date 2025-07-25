import { ITabsBlock } from '@/payload-types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn, validateNumber } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { RichText } from '@/components/rich-text'
import { hasText } from '@payloadcms/richtext-lexical/shared'
import { InViewElement } from '@/components/in-view-element'
import { Media } from '@/components/Media'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export function TabsBlock({
  tabList,
  columns,
  isIcon,
  justify,
  items,
  objectFit,
  ratio,
  isBordered,
  rounded,
  backgroundVariant,
  flexItemGap,
  linksPosition,
  orientation,
  bodySpaceY,
  headerLeftSpaceY,
}: ITabsBlock) {
  if (!tabList?.length) return null
  const isHorizontal = orientation === 'horizontal'
  return (
    <Tabs defaultValue="tab-0" className="w-full min-w-0 text-start">
      <TabsList
        className={cn([
          'w-full min-w-0 bg-transparent border-b rounded-none',
        ])}
      >
        <Carousel opts={{ dragFree: true }} className={cn([
          "w-full min-w-0",
          linksPosition === "center" && "flex justify-center",
          linksPosition === "right" && "flex justify-end",
        ])}>
          <CarouselContent>
            {tabList.map((tab, i) => {
              const tabId = `tab-${i}`
              return (
                <CarouselItem className="max-w-fit" key={tabId}>
                  <TabsTrigger
                    className={cn([
                      'bg-transparent! relative data-[state=active]:bg-none dark:data-[state=active]:bg-background data-[state=active]:shadow-none border-none shadow-none hover:cursor-pointer',
                      'before:w-0 before:transition-[width] before:absolute data-[state=active]:before:w-full before:bottom-0 before:bg-primary before:h-0.5 before:rounded-full',
                    ])}
                    value={tabId}
                  >
                    {tab.Label}
                  </TabsTrigger>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </TabsList>
      {tabList.map((tab, i) => {
        const tabId = `tab-${i}`
        return (
          <InViewElement className="group" key={tabId} asChild>
            <TabsContent
              className={cn(['flex flex-col gap-8 *:nth-[1]:mt-6 min-w-0'])}
              value={tabId}
            >
              {tab.banner && (
                <AspectRatio
                  ratio={validateNumber(tab.ratioBanner)?.num ?? 1}
                  className={cn(['relative overflow-hidden', rounded])}
                >
                  <Media
                    fill
                    videoClassName="absolute object-cover inset-0 size-full"
                    pictureClassName="absolute inset-0 size-full"
                    imgClassName={objectFit}
                    htmlElement={null}
                    resource={tab.banner}
                  />
                </AspectRatio>
              )}
              <div className={cn(['flex flex-1 flex-wrap gap-4 min-w-0'])}>
                {tab.tabItems?.map((tabItem, index) => {
                  const tabItemId = `tab-${index}`
                  return (
                    <Card
                      className={cn([
                        backgroundVariant,
                        isBordered ? 'border' : 'border-none',
                        'transition-[opacity,translate] opacity-0 -translate-x-8 translate-y-8 ease-in-out duration-300 group-data-[inview=true]:opacity-100 group-data-[inview=true]:translate-0',
                        'basis-full',
                        columns === '2' && 'md:basis-[calc(50%-calc(--spacing(4)/2))]',
                        columns === '3' &&
                          'md:basis-[calc(50%-calc(--spacing(4)/2))] lg:basis-[calc(100%/3-calc(--spacing(4)*2/3))] ',
                        columns === '4' &&
                          'md:basis-[calc(50%-calc(--spacing(4)/2))] lg:basis-[calc(100%/3-calc(--spacing(4)*2/3))] xl:basis-[calc(25%-calc(--spacing(4)*3/4))]',
                        'overflow-hidden',
                      ])}
                      key={tabItemId}
                    >
                      <CardContent
                        className={cn([
                          'flex flex-1',
                          isHorizontal ? 'flex-row ' : 'flex-col ',
                          'flex flex-col flex-1',
                          isHorizontal ? 'flex-row' : 'flex-col',
                          justify,
                          items,
                          flexItemGap,
                        ])}
                      >
                        {tabItem.media && (
                          <div
                            className={cn([
                              isIcon && 'size-20 justify-self-center self-center',
                              isHorizontal && 'basis-3/10 flex items-center',
                              isIcon && isHorizontal && 'basis-auto',
                            ])}
                          >
                            <AspectRatio
                              ratio={validateNumber(ratio)?.num ?? 1}
                              className={cn(['relative overflow-hidden', rounded])}
                            >
                              <Media
                                fill
                                videoClassName="absolute object-cover inset-0 size-full"
                                pictureClassName="absolute inset-0 size-full"
                                imgClassName={objectFit}
                                htmlElement={null}
                                resource={tabItem.media}
                              />
                            </AspectRatio>
                          </div>
                        )}
                        <div className={cn('basis-7/10 flex-1 flex flex-col', flexItemGap)}>
                          <div className="flex justify-between">
                            {tabItem.headerLeft && hasText(tabItem.headerLeft) && (
                              <RichText
                                className={cn([
                                  'prose-base! lg:prose-base max-w-full',
                                  headerLeftSpaceY === 'auto'
                                    ? undefined
                                    : cn(['[&_*]:p-0 [&_*]:m-0', headerLeftSpaceY]),
                                ])}
                                data={tabItem.headerLeft}
                              />
                            )}
                            {tabItem.headerRight && hasText(tabItem.headerRight) && (
                              <RichText
                                className="prose-base! lg:prose-base max-w-full"
                                data={tabItem.headerRight}
                              />
                            )}
                          </div>
                          <div>
                            {tabItem.body && hasText(tabItem.body) && (
                              <RichText
                                className={cn([
                                  'prose-base! lg:prose-base max-w-full',
                                  bodySpaceY === 'auto'
                                    ? undefined
                                    : cn(['[&_*]:p-0 [&_*]:m-0', bodySpaceY]),
                                ])}
                                data={tabItem.body}
                              />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </InViewElement>
        )
      })}
    </Tabs>
  )
}
