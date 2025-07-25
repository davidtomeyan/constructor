import { SelectField } from 'payload'
import { mergeFieldsSafely } from '@/lib/utils/merge-fields-safely'

export const backgroundOptions = [
  { label: 'Transparent', value: 'bg-transparent' },
  { label: 'Default', value: 'bg-background' },
  { label: 'Primary', value: 'bg-primary' },
  { label: 'Secondary', value: 'bg-secondary' },
  { label: 'Accent', value: 'bg-accent' },
  { label: 'Muted', value: 'bg-muted' },
]

export const getBackgroundVariants = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    name: 'backgroundVariant',
    label: 'Background Variant',
    interfaceName:"TBackgroundVariants",
    required: true,
    options: backgroundOptions,
    defaultValue: 'bg-transparent',
  }
  return mergeFieldsSafely(field, options)
}
