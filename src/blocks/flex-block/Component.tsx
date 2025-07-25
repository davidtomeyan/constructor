import { Card, CardContent } from '@/components/ui/card'
import { InViewElement } from '@/components/in-view-element'
import { RichText } from '@/components/rich-text'
import { Media } from '@/components/Media'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn, validateNumber } from '@/lib/utils'
import { CmsLinkList } from '@/components/cms-link/cms-link-list'
import { IFlexBlock } from '@/payload-types'

export function FlexBlock({
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
  flexItemGap,
  flexItems,
}: IFlexBlock) {
  if (!flexItems?.length) return null

  const isHorizontal = orientation === 'horizontal'
  return (
    <div
      className={cn([
        'text-start min-w-0 max-w-full w-full justify-center',
        'flex flex-row flex-wrap gap-y-8 md:gap-4',
      ])}
    >
      {flexItems.map((item, i) => (
        <InViewElement
          key={`scroll-item-${i}`}
          className="opacity-0 translate-y-8 scale-95 transition-[opacity,translate,scale]  duration-500 data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 data-[inview=true]:scale-100"
          asChild
        >
          <Card
            className={cn(
              'basis-full',
              columns === '2' && 'md:basis-[calc(50%-calc(--spacing(4)/2))]',
              columns === '3' &&
                'md:basis-[calc(50%-calc(--spacing(4)/2))] lg:basis-[calc(100%/3-calc(--spacing(4)*2/3))] ',
              columns === '4' &&
                'md:basis-[calc(50%-calc(--spacing(4)/2))] lg:basis-[calc(100%/3-calc(--spacing(4)*2/3))] xl:basis-[calc(25%-calc(--spacing(4)*3/4))]',
              'overflow-hidden',
              isBordered ? 'border' : 'border-none',
              orientation === "horizontal" && columns === '2' && 'md:basis-full lg:basis-[calc(50%-calc(--spacing(4)/2))]',
              backgroundVariant,
            )}
          >
            <CardContent
              className={cn([
                'flex flex-col flex-1',
                isHorizontal ? 'flex-row' : 'flex-col',
                flexItemGap,
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
                    <Media imgClassName={objectFit} htmlElement={null} fill resource={item.image} />
                  </AspectRatio>
                </div>
              )}
              {(item.content || item.links?.length) && (
                <div className={cn('flex-1 flex flex-col', flexItemGap)}>
                  {item.content && (
                    <div className={cn(['grow flex', isHorizontal && 'items-center'])}>
                      <RichText
                        className={cn([
                          'prose w-full max-w-full min-w-0 prose-sm lg:prose-base',
                          spaceY === 'auto' ? undefined : cn(['[&_*]:p-0 [&_*]:m-0', spaceY]),
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
        </InViewElement>
      ))}
    </div>
  )
}
