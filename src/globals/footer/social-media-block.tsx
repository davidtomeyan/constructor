import { ISocialMediaFooterBlock } from '@/payload-types'
import NextLink from 'next/link'
import { SocialIcons } from '@/components/social-icons'

export function SocialMediaBlock (block:ISocialMediaFooterBlock){
  if (!block?.items?.length) return null
  return (
    <div className="flex flex-1 gap-6 flex-wrap justify-center ">
      {block.items.map((item, itemIndex) => (
        <NextLink
          target="_blank"
          rel="noopener noreferrer"
          href={item.url}
          key={`footer-block-item-${itemIndex}`}
        >
          <SocialIcons className="size-5" iconName={item.platformName} />
        </NextLink>
      ))}
    </div>
  )
}