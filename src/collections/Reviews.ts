import type { CollectionConfig } from 'payload'

import { revalidatePath } from 'next/cache'
import { authenticated, authenticatedOrPublished } from '@/lib/utils/hooks/auth'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/', 'layout')
      },
    ],
    afterDelete: [
      () => {
        revalidatePath('/', 'layout')
      },
    ],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  fields: [
    {
      type: 'upload',
      name: 'avatar',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'rating',
          label: 'Rating',
          type: 'number',
          max: 5,
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          required: true,
          type: 'date',
          name: 'date',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      required: true,
      type: 'textarea',
      name: 'description',
    },
  ],
}
