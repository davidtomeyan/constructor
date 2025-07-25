import { GlobalConfig } from 'payload'
import { authenticated, authenticatedOrPublished } from '@/lib/utils/hooks/auth'

export const Site: GlobalConfig = {
  slug: 'site',
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      type: 'upload',
      relationTo: 'media',
      name: 'favicon',
      label: 'Favicon',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      type: 'text',
      name: 'googleVerificationCode',
    },
    {
      type: 'text',
      name: 'googleTagManagerId',
    },
    {
      type: 'text',
      name: 'googleAnalyticsID',
    },
  ],
}
