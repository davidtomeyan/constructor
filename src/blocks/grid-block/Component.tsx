import { Fragment } from 'react'
import Image from 'next/image'
import { IGridBlock } from '@/payload-types'
import { InViewElement } from '@/components/in-view-element'
import { cn, validateNumber } from '@/lib/utils'
import { CmsLinkList } from '@/components/cms-link/cms-link-list'
import { ShineBorder } from '@/components/magicui/shine-border'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { CircularProgress } from '@/components/ui/circular-progress'
import { RicheTextContent } from '@/blocks/rich-text-content/Component'

export const cols2 = ['md:grid-cols-4', '*:md:nth-last-1:nth-[2n+1]:col-start-2']

export const cols3 = [
  ...cols2,
  'lg:grid-cols-6',
  '*:lg:nth-last-1:nth-[3n+1]:col-start-3',
  '*:lg:nth-last-2:nth-[3n+1]:col-start-2',
  // ⛔️ переопределить cols2
  '*:lg:nth-last-1:nth-[2n+1]:col-start-auto',
]

export const cols4 = [
  ...cols3,
  'xl:grid-cols-8',
  '*:xl:nth-last-1:nth-[4n+1]:col-start-4',
  '*:xl:nth-last-2:nth-[4n+1]:col-start-3',
  '*:xl:nth-last-3:nth-[4n+1]:col-start-2',
  // ⛔️ отменяем предыдущие
  '*:xl:nth-last-1:nth-[3n+1]:col-start-auto',
  '*:xl:nth-last-2:nth-[3n+1]:col-start-auto',
  '*:xl:nth-last-1:nth-[2n+1]:col-start-auto',
]

export function GridItems({
  gridItems,
  borderType,
  columns,
  backgroundVariant,
  paddingX,
  paddingY,
  gapY,
  gapX,
  gridItemGap,
}: IGridBlock) {
  if (!gridItems?.length) return null
  const maxRows = Math.max(...gridItems.map((item) => item.rows?.length || 0))
  return (
    <div
      className={cn([
        ['grid text-start relative', 'w-full auto-rows-auto', 'grid-cols-2'],
        gapY,
        gapX,
        columns === '2' && cols2,
        columns === '3' && cols3,
        columns === '4' && cols4,
      ])}
    >
      {gridItems.map((gridItem) => {
        if (!gridItem.rows?.length) return null
        return (
          <InViewElement asChild key={gridItem.id}>
            <div
              style={{
                gridRow: `span ${maxRows} / span ${maxRows}`,
              }}
              className={cn([
                'col-span-2 rounded-lg grid transition-all translate-y-16 opacity-0 scale-95 delay-50',
                'duration-400 data-[inview=true]:translate-y-0 data-[inview=true]:opacity-100 data-[inview=true]:scale-100 ease-in-out',
                'grid-rows-subgrid',
                borderType === 'border' && 'border',
                backgroundVariant,
                paddingX,
                paddingY,
                gridItemGap,
              ])}
            >
              {gridItem.rows.map((block) => {
                return (
                  <Fragment key={block.id}>
                    {block.blockType === 'rich-text-content' && (
                      <RicheTextContent
                        className={'rounded-lg lg:prose-lg max-w-full'}
                        block={block}
                      />
                    )}
                    {block.blockType === 'progress' && validateNumber(block.progress) && (
                      <CircularProgress
                        max={100}
                        min={0}
                        value={block.progress}
                        gaugePrimaryColor="var(--primary)"
                        gaugeSecondaryColor="var(--secondary)"
                        className={cn([
                          'justify-self-center w-full max-w-72',
                          block.paddingX,
                          block.paddingY,
                        ])}
                      />
                    )}
                    {block.blockType === 'card-media' &&
                      typeof block.image === 'object' &&
                      block.image?.url && (
                        <ImageWrapper
                          className={block.rounded}
                          ratio={block.ratio}
                          size={block.imageSize}
                        >
                          <Image
                            className={cn([
                              'w-full h-full object-cover max-w-full overflow-hidden',
                              block.objectFit,
                              block.objectPosition,
                            ])}
                            width={block.image.width ?? 0}
                            height={block.image.height ?? 0}
                            src={block.image?.url}
                            alt={block.image?.alt ?? block.image.filename}
                          />
                        </ImageWrapper>
                      )}
                    {block.blockType === 'links' && block.links?.length && (
                      <CmsLinkList linkClassName="max-w-full" links={block.links} />
                    )}
                  </Fragment>
                )
              })}
              {borderType === 'animated-border' && (
                <ShineBorder
                  shineColor={[
                    'rgba(139,92,246,0.76)',
                    'rgba(91,33,182,0.68)',
                    'rgba(167,139,250,0.65)',
                  ]}
                />
              )}
            </div>
          </InViewElement>
        )
      })}
    </div>
  )
}

function ImageWrapper({
  size,
  ratio,
  className,
  ...props
}: {
  size?: 'auto' | 'icon' | 'aspect-ratio' | null | undefined
  ratio?: number | null
} & React.ComponentProps<'div'>) {
  const isAutoSize = size !== 'aspect-ratio'

  return isAutoSize ? (
    <div
      {...props}
      className={cn([
        'w-full overflow-hidden shadow-md',
        size === 'icon' && 'shadow-none size-24 justify-self-center mt-4!',
        className,
      ])}
    />
  ) : (
    <AspectRatio
      {...props}
      ratio={size === 'aspect-ratio' ? (ratio ?? undefined) : undefined}
      className={cn(['w-full overflow-hidden shadow-md', className])}
    />
  )
}
