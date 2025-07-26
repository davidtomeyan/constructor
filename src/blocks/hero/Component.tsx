import { HeroBlock as THeroBlock } from '@/payload-types'
import { RichText } from '@/components/rich-text'
import { Media } from '@/components/Media'
import { cn } from '@/lib/utils'
import { BackgroundEffects } from '@/components/background-effects'
import { Section, SectionContent } from '@/components/section'
import { CmsLinkList } from '@/components/cms-link/cms-link-list'

export default function HeroBlock({
  slug,
  content,
  backgroundType,
  contentPosition,
  backgroundEffect,
  backgroundVariant,
  contentHeight,
  imageBackground,
  maxWidth,
  spaceY,
  links,
  gapY,
}: THeroBlock) {
  return (
    <Section
      id={slug??undefined}
      className={cn(['relative', backgroundType === 'variant' && backgroundVariant, contentHeight])}
    >
      <SectionContent
        className={cn([
          'flex-col z-30 justify-center items-center text-center pointer-events-none',
          contentPosition === 'left' && 'lg:items-start lg:text-start',
          contentPosition === 'right' && 'lg:items-end lg:text-start',
        ])}
      >
        <div className={cn(['grow flex flex-col z-20', maxWidth, gapY])}>
          {content && (
            <RichText
              className={cn([
                '[&_a]:pointer-events-auto ',
                maxWidth,
                backgroundType === 'image' && 'prose-invert',
                spaceY === 'auto' ? undefined : cn(['[&_*]:p-0 [&_*]:m-0', spaceY]),
              ])}
              data={content}
            />
          )}
          {links && (
            <CmsLinkList
              className={cn([
                contentPosition === 'left' && 'lg:justify-start',
                contentPosition === 'right' && 'lg:justify-start',
              ])}
              links={links}
            />
          )}
        </div>
      </SectionContent>
      {backgroundType === 'effect' && (
        <div className="absolute inset-0 overflow-hidden z-0">
          <BackgroundEffects type={backgroundEffect} />
        </div>
      )}
      {backgroundType === 'image' &&
        typeof imageBackground === 'object' &&
        imageBackground?.url && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="bg-black/50 backdrop-blur-[1.5px] absolute inset-0 z-10" />
            <Media
              fill
              htmlElement={null}
              videoClassName={"inset-0 absolute w-full h-full object-cover"}
              imgClassName={'object-cover inset-0'}
              loading={'eager'}
              resource={imageBackground}
              alt={imageBackground?.alt}
            />
          </div>
        )}
    </Section>
  )
}
