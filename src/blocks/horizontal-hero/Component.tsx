import { HorizontalHeroBlock as THorizontalHeroBlock, Media as IMedia } from '@/payload-types'
import { RichText } from '@/components/rich-text'
import { Media } from '@/components/Media'
import { cn, validateNumber } from '@/lib/utils'
import { Section, SectionContent } from '@/components/section'
import { CmsLinkList } from '@/components/cms-link/cms-link-list'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ComponentProps } from 'react'
import { InViewElement } from '@/components/in-view-element'

export default function HorizontalHeroBlock({
  slug,
  content,
  backgroundVariant,
  contentHeight,
  media,
  spaceY,
  links,
  gapY,
  objectFit,
  objectPosition,
  ratio,
  rounded,
  revers,
  imageSize,
}: THorizontalHeroBlock) {
  return (
    <Section id={slug??undefined} className={cn([backgroundVariant, contentHeight])}>
      <SectionContent
        className={cn([
          'gap-14 lg:gap-8',
          'text-center items-stretch flex-col',
          'lg:flex-row lg:text-start lg:items-center',
          !revers ? '' : 'lg:flex-row-reverse',
        ])}
      >
        <div
          className={cn(['flex flex-col basis-full lg:basis-[53%] order-2 lg:order-none', gapY])}
        >
          {content && (
            <RichText
              className={cn([spaceY === 'auto' ? undefined : cn(['[&_*]:p-0 [&_*]:m-0', spaceY])])}
              data={content}
            />
          )}
          {links && <CmsLinkList className="justify-center lg:justify-start" links={links} />}
        </div>
        {typeof media === 'object' && media?.url && (
          <div className="basis-full lg:basis-[47%] order-1 lg:order-none">
            <Wrapper
              imageSize={imageSize}
              media={media}
              objectPosition={objectPosition}
              objectFit={objectFit}
              rounded={rounded}
              ratio={ratio}
            />
          </div>
        )}
      </SectionContent>
    </Section>
  )
}

function Wrapper({
  className,
  imageSize,
  ratio,
  objectPosition,
  objectFit,
  rounded,
  media,
}: Pick<
  THorizontalHeroBlock,
  'imageSize' | 'ratio' | 'rounded' | 'objectFit' | 'objectPosition'
> & {
  media: IMedia
} & ComponentProps<'div'>) {
  const defaultClassName = cn(['lg:order-none overflow-hidden', rounded])
  return (
    <InViewElement
      className={cn([
        'translate-y-14 scale-90 opacity-0 delay-50 transition-[translate,scale,opacity] ease-in-out duration-500 ',
        'data-[inview=true]:translate-y-0 data-[inview=true]:opacity-100 data-[inview=true]:scale-100',
      ])}
      asChild
    >
      {imageSize === 'aspect-ratio' ? (
        <AspectRatio
          ratio={validateNumber(ratio)?.num ?? 1}
          className={cn(['relative bg-accent', defaultClassName, className])}
        >
          <Media
            fill
            htmlElement={null}
            videoClassName={cn(["w-full h-full inset-0",objectFit])}
            imgClassName={cn([objectFit, objectPosition])}
            loading={'eager'}
            resource={media}
            alt={media?.alt}
          />
        </AspectRatio>
      ) : (
        <Media
          className={cn([defaultClassName, className])}
          imgClassName={cn([objectFit, objectPosition])}
          loading={'eager'}
          resource={media}
          alt={media?.alt}
        />
      )}
    </InViewElement>
  )
}
