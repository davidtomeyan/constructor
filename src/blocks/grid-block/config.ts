import { Block } from 'payload'
import { links } from '@/fields/links'
import {
  getImageSizeField,
  getObjectFitField,
  getObjectPositionField,
  getRatioField,
  getRoundedFitField,
} from '@/fields/image-styles'
import { getGridColumnsField } from '@/fields/grid-columns'
import { getBorderTypeField } from '@/fields/border-type'
import { getBackgroundVariants } from '@/fields/background-variants'
import { getPaddingsField } from '@/fields/paddings'
import { getGapsField, getGapYField } from '@/fields/gap'
import { getRichTextContent } from '@/blocks/rich-text-content/config'

const gpFieldsAdmin = { admin: { width: '50%' } }
const gpFields = [
  ...getGapsField({ selectOptions: gpFieldsAdmin }).fields,
  ...getPaddingsField({ selectOptions: gpFieldsAdmin }).fields,
  getGapYField({ name: 'gridItemGap', label: 'Grid Item Gap' }),
  getBackgroundVariants({ required: false, ...gpFieldsAdmin }),
]

export const GridBlock: Block = {
  slug: 'grid-block',
  interfaceName: 'IGridBlock',
  fields: [
    { type: 'row', fields: [...gpFields] },
    {
      type: 'row',
      fields: [
        getGridColumnsField({ admin: { width: '50%' } }),
        getBorderTypeField({ admin: { width: '50%' } }),
      ],
    },

    {
      interfaceName: 'IGridItem',
      name: 'gridItems',
      label: 'Grid Items',
      type: 'array',
      fields: [
        {
          type: 'blocks',
          name: 'rows',
          label: 'Rows',
          blocks: [
            {
              slug: 'progress',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'number',
                      name: 'progress',
                      required: true,
                      defaultValue: 0,
                      min: 0,
                      max: 100,
                    },
                    getPaddingsField({ rowOptions: { admin: { width: '50%' } } }),
                  ],
                },
              ],
            },
            {
              slug: 'card-media',
              fields: [
                {
                  type: 'row',
                  fields: [getRoundedFitField(), getObjectFitField(), getObjectPositionField()],
                },
                {
                  type: 'row',
                  fields: [
                    getImageSizeField(),
                    getRatioField({
                      admin: {
                        condition: (_, __, { blockData }) => {
                          return blockData.imageSize === 'aspect-ratio'
                        },
                      },
                    }),
                  ],
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              slug: 'links',
              fields: [links],
            },
            getRichTextContent(),
          ],
        },
      ],
    },
  ],
}
