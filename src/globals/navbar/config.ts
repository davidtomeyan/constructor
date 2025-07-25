import { GlobalConfig } from 'payload'
import { links } from '@/fields/links'
import { authenticated, authenticatedOrPublished } from '@/lib/utils/hooks/auth'
import { mergeFieldsSafely } from '@/lib/utils/merge-fields-safely'

export const Navbar: GlobalConfig = {
  slug: 'navbar',
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      type: 'group',
      label: 'Logo',
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'upload',
              relationTo: 'media',
              name: 'logoBase',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            {
              type: 'upload',
              relationTo: 'media',
              name: 'logoDark',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
          ],
        },
      ],
    },
    { ...mergeFieldsSafely(links, { maxRows: 1000 }) },
    { ...mergeFieldsSafely(links, {name:"callToAction",label:"Call To Action Link"}) },
  ],
}
