import { Block } from 'payload'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { getGridColumnsField } from '@/fields/grid-columns'
import { getObjectFitField, getRatioField, getRoundedFitField } from '@/fields/image-styles'
import { getGapField } from '@/fields/gap'
import { getBackgroundVariants } from '@/fields/background-variants'
import { getSpaceYField } from '@/fields/spaces'
import { getJustifyField, getItemsField } from '@/fields/styles'

const gpFieldsAdmin = { admin: { width: '33%' } }

const gpFields = [
  getGapField({ name: 'flexItemGap', label: 'Gap', ...gpFieldsAdmin }),
  getBackgroundVariants({ required: false, ...gpFieldsAdmin }),
]

export const TabsBlock: Block = {
  slug: 'tabs-block',
  interfaceName: 'ITabsBlock',
  fields: [
    getGridColumnsField(),
    {
      type: 'select',
      name: 'linksPosition',
      label: 'Links Position',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
      ...gpFieldsAdmin,
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
            getJustifyField({ ...gpFieldsAdmin }),
            getItemsField({ ...gpFieldsAdmin }),
            getSpaceYField({
              name: 'headerLeftSpaceY',
              admin: { width: '33%' },
              label: 'Header SpaceY Left  ',
            }),
            getSpaceYField({ name: 'bodySpaceY', admin: { width: '33%' }, label: 'Body SpaceY ' }),
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
      type: 'array',
      name: 'tabList',
      interfaceName: 'ITabList',
      fields: [
        { type: 'text', name: 'Label', required: true },
        {
          type: 'group',
          label: 'Banner',
          fields: [
            {
              type: 'upload',
              name: 'banner',
              relationTo: 'media',
            },
            getRatioField({ name: 'ratioBanner' }),
          ],
        },
        {
          type: 'array',
          name: 'tabItems',
          dbName: 'tabItems',
          fields: [
            {
              name: 'headerLeft',
              type: 'richText',
              editor: lexicalEditor({
                features: () => [
                  ...defaultFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'] }),
                ],
              }),
            },
            {
              name: 'headerRight',
              type: 'richText',
              editor: lexicalEditor({
                features: () => [
                  ...defaultFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'] }),
                ],
              }),
            },

            {
              name: 'body',
              type: 'richText',
              editor: lexicalEditor({
                features: () => [
                  ...defaultFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'] }),
                ],
              }),
            },
            {
              type: 'upload',
              name: 'media',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
