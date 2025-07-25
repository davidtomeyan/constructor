import { RowField, SelectField } from 'payload'
import merge from 'lodash/merge'

const paddingXOptions = [
  { label: 'None', value: 'px-0' },
  { label: 'Extra Small', value: 'px-2' },
  { label: 'Small', value: 'px-4' },
  { label: 'Medium', value: 'px-6' },
  { label: 'Large', value: 'px-8' },
  { label: 'Extra Large', value: 'px-12' },
]
const paddingYOptions = [
  { label: 'None', value: 'py-0' },
  { label: 'Extra Small', value: 'py-2' },
  { label: 'Small', value: 'py-4' },
  { label: 'Medium', value: 'py-6' },
  { label: 'Large', value: 'py-8' },
  { label: 'Extra Large', value: 'py-12' },
]

export const getPaddingsField = (
  options?: {
  rowOptions?: Partial<RowField>
  selectOptions?: Partial<SelectField>
}): RowField => {
  const fieldX: SelectField = {
    type: 'select',
    name: 'paddingX',
    label: 'Padding X',
    required: false,
    options: paddingXOptions,
    defaultValue: 'px-0',
  }
  const fieldY: SelectField = {
    type: 'select',
    name: 'paddingY',
    label: 'Padding Y',
    required: false,
    options: paddingYOptions,
    defaultValue: 'py-0',
  }
  const field: RowField = {
    type: 'row',
    fields: [merge(fieldX, options?.selectOptions), merge(fieldY, options?.selectOptions)],
  }

  return merge(field, options?.rowOptions)
}
