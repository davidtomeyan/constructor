import { GlobalConfig } from 'payload'
import { socialContactPlatform } from '@/fields/social-contact-platform'
import { getRichTextContent } from '@/blocks/rich-text-content/config'
import { links } from '@/fields/links'
import { getMaxWidthField, getGapYField } from '@/fields/styles'
import { authenticated, authenticatedOrPublished } from '@/lib/utils/hooks/auth'
import { mergeFieldsSafely } from '@/lib/utils/merge-fields-safely'
import { revalidatePath } from 'next/cache'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks:{
    afterChange: [
      () => {
        revalidatePath('/', 'layout')
      },
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        getMaxWidthField({ admin: { width: '50%' } }),
        getGapYField({ admin: { width: '50%' } }),
      ],
    },
    {
      type: 'blocks',
      name: 'footerBlocks',
      blocks: [
        getRichTextContent(),
        {
          slug: 'links',
          interfaceName: 'IFooterLinks',
          labels: { plural: 'links', singular: 'link' },
          fields: [{ ...mergeFieldsSafely(links, { maxRows: 1000}) }],
        },
        {
          slug: 'socialMedia',
          interfaceName: 'ISocialMediaFooterBlock',
          fields: [
            {
              label: 'Links',
              type: 'array',
              name: 'items',
              fields: [socialContactPlatform, { type: 'text', name: 'url', required: true }],
            },
          ],
        },
      ],
    },
  ],
}
