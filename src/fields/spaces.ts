import { RowField, SelectField } from 'payload'
import { mergeFieldsSafely } from '@/lib/utils/merge-fields-safely'

const spaceXOptions = [
  { label: 'Auto', value: 'auto' },
  { label: 'None', value: 'space-x-0!' },
  { label: 'Extra Small', value: 'space-x-2!' },
  { label: 'Small', value: 'space-x-4!' },
  { label: 'Medium', value: 'space-x-6!' },
  { label: 'Large', value: 'space-x-8!' },
  { label: 'Extra Large', value: 'space-x-12!' },
]

const spaceYOptions = [
  { label: 'Auto', value: 'auto' },
  { label: 'None', value: 'space-y-0!' },
  { label: 'Extra Small', value: 'space-y-2!' },
  { label: 'Small', value: 'space-y-4!' },
  { label: 'Medium', value: 'space-y-6!' },
  { label: 'Large', value: 'space-y-8!' },
  { label: 'Extra Large', value: 'space-y-12!' },
]

export const getSpaceXField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    name: 'spaceX',
    label: 'Space Horizontal',
    required: false,
    options: spaceXOptions,
    defaultValue: 'auto',
  }
  return mergeFieldsSafely(field, options)
}

export const getSpaceYField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    name: 'spaceY',
    label: 'Space Vertical',
    required: false,
    options: spaceYOptions,
    defaultValue: 'auto',
  }
  return mergeFieldsSafely(field, options)
}

export const getSpacesField = (options?: {
  rowOptions?: Partial<RowField>
  selectOptions?: Partial<SelectField>
}): RowField => {
  const field: RowField = {
    type: 'row',
    fields: [
      getSpaceXField(options?.selectOptions),
      getSpaceYField(options?.selectOptions),
    ],
  }

  return mergeFieldsSafely(field, options?.rowOptions)
}