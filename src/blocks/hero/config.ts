import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { background } from '@/fields/background'
import { slug } from '@/fields/slug'
import { links } from '@/fields/links'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { getContentHeightField } from '@/fields/content-height'
import { getMaxWidthField } from '@/fields/styles'
import { getGapYField } from '@/fields/gap'
import { getSpaceYField } from '@/fields/spaces'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    plural: 'Heroes',
    singular: 'Hero',
  },
  interfaceName: 'HeroBlock',
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
          ...slug('label', 'block', false),
        },
        ...background,
        {
          type: 'select',
          required: true,
          label: 'Content Position',
          name: 'contentPosition',
          options: ['center', 'left', 'right'],
          admin: {
            width: '50%',
          },
          defaultValue: 'center',
        },
        getContentHeightField({
          admin: {
            width: '50%',
          },
        }),
        getGapYField({
          admin: {
            width: '50%',
          },
        }),
        getSpaceYField({
          admin: {
            width: '50%',
          },
          label: 'Content Space Vertical',
        }),
        getMaxWidthField({
          admin: {
            width: '50%',
          },
        }),
      ],
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: () => [...defaultFeatures],
      }),
    },
    links,
  ],
}
