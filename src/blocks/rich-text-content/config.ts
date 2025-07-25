import { getPaddingsField } from '@/fields/paddings'
import { getBackgroundVariants } from '@/fields/background-variants'
import { getSpaceYField } from '@/fields/spaces'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { Block, Field } from 'payload'
import { getMaxWidthField } from '@/fields/styles'
import { mergeFieldsSafely } from '@/lib/utils/merge-fields-safely'

export const getRichTextContent = (options?: Partial<Block>): Block => {
  const block: Block = {
    slug: 'rich-text-content',
    interfaceName: 'IRichTextContent',
    fields: richTextContentFields,
  }
  return mergeFieldsSafely(block, options)
}
export const richTextContentFields: Field[] = [
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
    editor: lexicalEditor({
      features: () => [...defaultFeatures],
    }),
  },
]
