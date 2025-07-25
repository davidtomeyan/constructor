import type { CollectionConfig } from 'payload'

import { revalidatePath } from 'next/cache'
import { lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { getRoundedFitField } from '@/fields/image-styles'
import { authenticated, authenticatedOrPublished } from '@/lib/utils/hooks/auth'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    shortTitle: true,
    shortDescription: true,
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
    useAsTitle:"shortTitle",
    defaultColumns: ['shortTitle', 'updatedAt'],
    group: 'Posts',
  },
  fields: [
    {
      type: 'text',
      name: 'shortTitle',
      maxLength: 60,
      required: true,
      admin: {
        description: 'Maximum length: 60 characters',
      },
    },
    {
      type: 'textarea',
      name: 'shortDescription',
      maxLength: 150,
      required: true,
      admin: {
        description: 'Maximum length: 150 characters',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          fields: [
            {
              type: 'richText',
              name: 'content',
              required: true,
              editor: lexicalEditor({
                features: () => [
                  ...defaultFeatures,
                  BlocksFeature({
                    blocks: [
                      {
                        slug: 'media-block',
                        interfaceName: 'IRichTextMediaBlock',
                        fields: [
                          {
                            type: 'upload',
                            name: 'media',
                            relationTo: 'media',
                            filterOptions: {
                              mimeType: { contains: 'image' },
                            },
                            required: true,
                          },
                          getRoundedFitField({ required: false }),
                          {
                            type: 'row',
                            fields: [
                              {
                                type: 'radio',
                                name: 'imageSize',
                                options: ['auto', 'aspect-ratio'],
                                defaultValue: 'auto',
                                admin: {
                                  width: '50%',
                                },
                              },
                              {
                                type: 'number',
                                name: 'ratio',
                                defaultValue: 1,
                                required: true,
                                admin: {
                                  width: '33%',
                                  condition: (_, __, { blockData }) => {
                                    return blockData?.imageSize === 'aspect-ratio'
                                  },
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  }),
                ],
              }),
            },
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
