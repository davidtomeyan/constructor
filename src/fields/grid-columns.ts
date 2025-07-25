import { RadioField } from 'payload'
import { mergeFieldsSafely } from '@/lib/utils/merge-fields-safely'

export  const getGridColumnsField = (options?: Partial<RadioField>): RadioField => {
  const field: RadioField = {
    type: 'radio',
    required: false,
    label: 'Max Columns',
    name: 'columns',
    options: ['1', '2', '3', '4'],
    defaultValue: '1',
  }
  return mergeFieldsSafely(field, options)
}
