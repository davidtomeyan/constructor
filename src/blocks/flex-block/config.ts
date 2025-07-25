import { Block } from 'payload'
import { getGridColumnsField } from '@/fields/grid-columns'
import { getObjectFitField, getRatioField, getRoundedFitField } from '@/fields/image-styles'
import { links } from '@/fields/links'
import { getGapField } from '@/fields/gap'
import { getBackgroundVariants } from '@/fields/background-variants'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { getSpaceYField } from '@/fields/spaces'

const gpFieldsAdmin = { admin: { width: '50%' } }

const gpFields = [
  getGapField({ name: 'flexItemGap', label: 'Gap', ...gpFieldsAdmin }),
  getBackgroundVariants({ required: false, ...gpFieldsAdmin }),
]

export const FlexBlock: Block = {
  slug: 'flex-block',
  interfaceName: 'IFlexBlock',
  fields: [
    {
      type: 'row',
      fields: [
        getGridColumnsField({ admin: { width: '50%' } }),
      ],
    },
    {
      type: 'group',
      label: 'Media Options',
      fields: [
        {
          type: 'row',
          fields: [
            getRoundedFitField(),
            getObjectFitField(),
            getRatioField(),
            {
              type: 'checkbox',
              name: 'isIcon',
              admin: { width: '33%' },
            },
            {
              type: 'checkbox',
              name: 'isBordered',
              admin: { width: '33%' },
            },
            getSpaceYField({ admin: { width: '33%' }, label: 'Content SpaceY ' }),
          ],
        },
      ],
    },
    {
      type: 'group',
      label: 'Card Options',
      fields: [
        {
          type: 'row',
          fields: [
            ...gpFields,
            {
              type: 'select',
              name: 'linksPosition',
              options: ['left', 'center', 'right'],
              defaultValue: 'left',
              ...gpFieldsAdmin,
            },
            {
              type: 'select',
              name: 'orientation',
              label: 'Orientation',
              options: [
                { label: 'Horizontal', value: 'horizontal' },
                { label: 'Vertical', value: 'vertical' },
              ],
              defaultValue: 'vertical',
              ...gpFieldsAdmin,
            },
          ],
        },
      ],
    },
    {
      interfaceName: 'IFlexCardItem',
      name: 'flexItems',
      label: 'Flex Items',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          type: 'richText',
          name: 'content',
          editor: lexicalEditor({
            features: [
              ...defaultFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'] }),
            ],
          }),
        },
        links,
      ],
    },
  ],
}
