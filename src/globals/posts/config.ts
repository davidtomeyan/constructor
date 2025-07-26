import { GlobalConfig } from 'payload'
import { richTextContentFields } from '@/blocks/rich-text-content/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated, authenticatedOrPublished } from '@/lib/utils/hooks/auth'
import { revalidatePath } from 'next/cache'

export const Posts: GlobalConfig = {
  slug: 'posts-page',
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
  admin: {
    group: 'Posts',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'Content',
          fields: [
            {
              type: 'text',
              name: 'cardLinkLabel',
            },
            ...richTextContentFields,
          ],
        },
        {
          name: 'meta',
          label: 'Seo',
          fields: [
            MetaImageField({
              relationTo: 'media',
              hasGenerateFn: false,
            }),

            MetaDescriptionField({
              hasGenerateFn: false,
            }),

            MetaTitleField({
              hasGenerateFn: true,
            }),

            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),

            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
          ],
        },
      ],
    },
  ],
}
