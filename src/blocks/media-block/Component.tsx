import { IMediaBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { RichText } from '@/components/rich-text'
import { cn, validateNumber } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { InViewElement } from '@/components/in-view-element'
import { hasText } from '@payloadcms/richtext-lexical/shared'

export function MediaBlock(props: IMediaBlock) {
  if (!props.media && !props.content) return null

  return (
    <div
      className={cn([
        'overflow-hidden',
        props['container-background'],

        props['container-width'],
        props['container-min-width'],
        props['container-max-width'],

        props['containerSpaceX'],
        props['containerSpaceY'],

        props.display,
        props.justify,
        props.items,
        props.flexDirection,

        props['container-gap-x'],
        props['container-gap-y'],

        props['container-padding-x'],
        props['container-padding-y'],

        props.isBordered && 'border',
        props.isRounded && 'rounded-lg',
      ])}
    >
      {props.media && typeof props.media === 'object' && (
        <InViewElement
          className={cn([
            'translate-y-4 scale-95 opacity-0 delay-50 transition-[translate,scale,opacity] ease-in-out duration-500 ',
            'data-[inview=true]:translate-y-0 data-[inview=true]:opacity-100 data-[inview=true]:scale-100',
          ])}
          asChild
        >
          <div
            className={cn([
              'overflow-hidden',
              props['media-min-width'],
              props['media-flex-item'],
              props['media-width'],
              props['media-max-width'],
              props['media-padding-x'],
              props['media-padding-y'],
              props.isBorderedMediaContainer && 'border',
            ])}
          >
            {props.imageSize === 'aspect-ratio' ? (
              <AspectRatio
                ratio={validateNumber(props.ratio)?.num ?? 1}
                className={cn(['relative overflow-hidden', props['media-rounded']])}
              >
                <Media
                  fill
                  videoClassName={cn([
                    "size-full object-cover inset-0 absolute",
                    props['media-rounded'],
                    props.objectFit,
                    props.objectPosition,
                  ])}
                  pictureClassName={"size-full absolute"}
                  imgClassName={cn([
                    "size-full absolute",
                    props.objectFit,
                    props.objectPosition,
                    props['media-rounded'],
                    'overflow-hidden',
                  ])}
                  htmlElement={null}
                  resource={props.media}
                />
              </AspectRatio>
            ) : (
              <Media
                imgClassName={cn([props.objectFit, props.objectPosition, props['media-rounded']])}
                htmlElement={null}
                resource={props.media}
              />
            )}
          </div>
        </InViewElement>
      )}
      {props.content && hasText(props.content) && (
        <RichText
          className={cn([
            props['content-flex-item'],
            props['content-gap-y']?.length && '[&_*]:p-0 [&_*]:m-0',
            props['content-max-width'],
            props['contentDisplay'],
            props['content-min-width'],
            props['content-width'],
            props['content-background'],
            props['content-padding-x'],
            props['content-padding-y'],
            props['content-gap-y'],
            props['content-Justify'],
            props['content-align-items'],
            props['textAlign'],
            props['contentFlexDirection'],
            props.isBorderedContentContainer && 'border',
            props.isRoundedContentContainer && 'rounded-lg',
          ])}
          data={props.content}
        />
      )}
    </div>
  )
}
