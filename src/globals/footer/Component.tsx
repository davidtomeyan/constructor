import { cache, Fragment } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

import { RicheTextContent } from '@/blocks/rich-text-content/Component'
import { cn } from '@/lib/utils'
import { SocialMediaBlock } from './social-media-block'
import { LinksBlock } from './links-block'

export const getFooter = cache(async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.findGlobal({
    slug: 'footer',
  })

  return result || null
})

export async function Footer() {
  const res = await getFooter()
  if (!res?.footerBlocks?.length) return null
  return (
    <footer className="relative flex justify-center items-center before:absolute before:top-0 before:w-full before:max-w-9xl before:bg-border before:h-[1px] ">
      <div
        className={cn([
          'flex flex-col items-center gap-8 px-4 md:px-8 lg:px-16 xl:px-24 py-14 xl:py-20 max-w-9xl min-w-0',
          res.maxWidth,
          res.gapY
        ])}
      >
        {res.footerBlocks.map((block, i) => (
          <Fragment key={`footer-block-${i}`}>
            {block.blockType === 'rich-text-content' && (
              <RicheTextContent className="flex-1 lg:prose-xl" block={block} />
            )}
            {block.blockType === 'socialMedia' && <SocialMediaBlock {...block} />}
            {block.blockType === "links" && <LinksBlock {...block} />}
          </Fragment>
        ))}
      </div>
    </footer>
  )
}
