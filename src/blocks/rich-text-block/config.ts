import { Block } from 'payload'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { getRoundedFitField } from '@/fields/image-styles'
import { slug } from '@/fields/slug'
import { getBackgroundVariants } from '@/fields/background-variants'
import { getSpaceYField } from '@/fields/spaces'
import { getMaxWidthField } from '@/fields/styles'
import { getPaddingsField } from '@/fields/paddings'

export const RichTextBlock: Block = {
  slug: 'rich-text-block',
  interfaceName: 'IRichTextBlock',

  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'label',
          label: 'Label',
          admin: {
            width: '50%',
            description: 'The name shown in navigation links that point to this block.',
          },
        },
        {
          ...slug('label', 'block',false),
        },
      ],
    },
    getPaddingsField({ selectOptions: { admin: { width: '50%' } } }),
    {
      type: 'row',
      fields: [
        getBackgroundVariants({
          name: 'variant',
          label: 'Variant',
          admin: {
            width: '50%',
          },
        }),

        getSpaceYField({
          admin: {
            width: '50%',
          },
        }),
        {
          label: 'Bordered',
          type: 'checkbox',
          name: 'isBordered',
        },
        getMaxWidthField({ admin: { width: '50%' } }),
      ],
    },
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
}
