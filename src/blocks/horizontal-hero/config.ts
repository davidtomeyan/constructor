import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { slug } from '@/fields/slug'
import { links } from '@/fields/links'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { getContentHeightField } from '@/fields/content-height'
import { getGapYField } from '@/fields/gap'
import { getSpaceYField } from '@/fields/spaces'
import { getBackgroundVariants } from '@/fields/background-variants'
import {
  getImageSizeField,
  getObjectFitField,
  getObjectPositionField,
  getRatioField,
  getRoundedFitField,
} from '@/fields/image-styles'

export const HorizontalHeroBlock: Block = {
  slug: 'horizontal-hero',
  labels: {
    plural: 'Horizontal Heroes',
    singular: 'Horizontal Hero',
  },
  interfaceName: 'HorizontalHeroBlock',
  fields: [
    {
      type: 'group',
      label: 'Block',
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
            getBackgroundVariants({ admin: { width: '50%' } }),
            getContentHeightField({
              admin: {
                width: '50%',
              },
            }),
            {
              type: 'checkbox',
              name: 'revers',
              label:"Flex Revers",
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      label: 'Media',
      fields: [
        {
          type: 'upload',
          name: 'media',
          relationTo: 'media',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              ...getImageSizeField(),
              options: ['auto', 'aspect-ratio'],
              admin: {
                width: '33%',
              },
            },
            getRatioField({
              admin: {
                condition: (_, __, { blockData }) => {
                  return blockData?.imageSize === 'aspect-ratio'
                },
              },
            }),
            getRoundedFitField(),
            getObjectFitField(),
            getObjectPositionField(),
          ],
        },
      ],
    },
    {
      type: 'group',
      label: 'Content',
      fields: [
        {
          type: 'row',
          fields: [
            getGapYField({
              admin: {
                width: '50%',
              },
            }),
          ],
        },
        {
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [
                getSpaceYField({
                  admin: {
                    width: '50%',
                  },
                  label: 'Rich Text Content space vertical',
                }),
              ],
            },
            {
              label: '',
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: () => [...defaultFeatures],
              }),
            },
            links,
          ],
        },
      ],
    },
  ],
}
