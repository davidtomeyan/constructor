import { RadioField } from 'payload'
import { mergeFieldsSafely } from '@/lib/utils/merge-fields-safely'

export const getBorderTypeField = (options?: Partial<RadioField>): RadioField => {
  const field: RadioField = {
    type: 'radio',
    name: 'borderType',
    options: ['none', 'border', 'animated-border'],
    defaultValue: 'none',
  }
  return mergeFieldsSafely(field, options)
}
