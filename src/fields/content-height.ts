import type { SelectField } from 'payload'
import { mergeFieldsSafely } from '@/lib/utils/merge-fields-safely'

export const getContentHeightField = (options?: Partial<SelectField>):SelectField => {
  const field:SelectField = {
    type: 'select',
    required: true,
    interfaceName:"IContentHeight",
    label: 'Content Height',
    name: 'contentHeight',
    options: [
      { label: 'Fit to Content', value: 'h-auto' },
      { label: 'Full Screen Height', value: 'min-h-screen' },
    ],
    admin: {
      width: '50%',
    },
    defaultValue: 'h-auto',
  }
  return mergeFieldsSafely(field, options)
}
