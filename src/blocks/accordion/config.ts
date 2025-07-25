import { Block } from 'payload'
import { getMaxWidthField } from '@/fields/styles'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { getBackgroundVariants } from '@/fields/background-variants'
import { getPaddingsField } from '@/fields/paddings'

export const AccordionBlock: Block = {
  slug: 'accordion',
  interfaceName: 'IAccordionBlock',
  fields: [
    {
      type: 'row',
      fields: [getMaxWidthField(), getBackgroundVariants()],
    },
    getPaddingsField(),
    {
      type: 'checkbox',
      name: 'isBordered',
    },
    {
      type: 'array',
      name: 'items',
      fields: [
        { type: 'text', name: 'title', required: true },
        {
          name: 'content',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: [...defaultFeatures,HeadingFeature({enabledHeadingSizes:["h4","h5","h6"]})],
          }),
        },
      ],
    },
  ],
}
