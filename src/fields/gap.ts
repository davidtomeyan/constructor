import { RowField, SelectField } from 'payload'
import { mergeFieldsSafely } from '@/lib/utils/merge-fields-safely'

const gapXOptions = [
  { label: 'None', value: 'gap-x-0' },
  { label: 'Extra Small', value: 'gap-x-2' },
  { label: 'Small', value: 'gap-x-4' },
  { label: 'Medium', value: 'gap-x-6' },
  { label: 'Large', value: 'gap-x-8' },
  { label: 'Extra Large', value: 'gap-x-12' },
  { label: '2XL', value: 'gap-x-14' },
  { label: '3XL', value: 'gap-x-16' },
  { label: '4XL', value: 'gap-x-20' },
  { label: '5XL', value: 'gap-x-24' },
]

const gapYOptions = [
  { label: 'None', value: 'gap-y-0' },
  { label: 'Extra Small', value: 'gap-y-2' },
  { label: 'Small', value: 'gap-y-4' },
  { label: 'Medium', value: 'gap-y-6' },
  { label: 'Large', value: 'gap-y-8' },
  { label: 'Extra Large', value: 'gap-y-12' },
  { label: '2XL', value: 'gap-y-14' },
  { label: '3XL', value: 'gap-y-16' },
  { label: '4XL', value: 'gap-y-20' },
  { label: '5XL', value: 'gap-y-24' },
]
const gapOptions = [
  { label: 'None', value: 'gap-0' },
  { label: 'Extra Small', value: 'gap-2' },
  { label: 'Small', value: 'gap-4' },
  { label: 'Medium', value: 'gap-6' },
  { label: 'Large', value: 'gap-8' },
  { label: 'Extra Large', value: 'gap-12' },
  { label: '2XL', value: 'gap-14' },
  { label: '3XL', value: 'gap-16' },
  { label: '4XL', value: 'gap-20' },
  { label: '5XL', value: 'gap-24' },
]

export const getGapField =(options?:Partial<SelectField>):SelectField=> {
  const field:SelectField = {
    type: 'select',
    name: 'gap',
    label: 'Gap Vertical',
    required: false,
    options: gapOptions,
    defaultValue: 'gap-0',
  }
  return mergeFieldsSafely(field, options)
}
export const getGapYField =(options?:Partial<SelectField>):SelectField=> {
  const field:SelectField = {
    type: 'select',
    name: 'gapY',
    label: 'Gap Vertical',
    required: false,
    options: gapYOptions,
    defaultValue: 'gap-y-0',
  }
  return mergeFieldsSafely(field, options)
}
export const getGapXField =(options?:Partial<SelectField>):SelectField=> {
  const field:SelectField = {
    type: 'select',
    name: 'gapX',
    label: 'Gap Horizontal',
    required: false,
    options: gapXOptions,
    defaultValue: 'gap-x-0',
  }
  return mergeFieldsSafely(field, options)
}

export const getGapsField = (
  options?: {
    rowOptions?: Partial<RowField>
    selectOptions?: Partial<SelectField>
  }
): RowField => {

  const field: RowField = {
    type: 'row',
    fields: [
      getGapXField(options?.selectOptions),
      getGapYField(options?.selectOptions)
    ],
  }

  return mergeFieldsSafely(field, options?.rowOptions)
}