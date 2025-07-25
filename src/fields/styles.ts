import type { SelectField } from 'payload'
import { mergeFieldsSafely } from '@/lib/utils/merge-fields-safely'

const breakpoints = ['', 'md', 'lg', 'xl'] as const

const withBreakpoints = <T extends { label: string; value: string }>(items: T[]) =>
  breakpoints.flatMap((prefix) =>
    items.map((item) => ({
      label: prefix ? `${prefix.toUpperCase()}: ${item.label}` : item.label,
      value: prefix ? `${prefix}:${item.value}` : item.value,
    })),
  )
type WidthPrefix = 'max' | 'min'

export const generateWidthOptionsWithPrefix = (
  prefix: WidthPrefix,
  base: typeof baseWidthOptions,
) => {
  return base.map(({ label, value }) => {
    const newValue = `${prefix}-${value}`
    return { label, value: newValue }
  })
}
export const generateOptionsWithImportantPrefix = (
  base: typeof baseWidthOptions,
) => {
  return base.map(({ label, value }) => {
    const newValue = `!${value}`
    return { label, value: newValue }
  })
}

const baseWidthOptions = [
  { label: 'Auto', value: 'w-auto' },
  { label: 'Extra Small (xs)', value: 'w-xs' },
  { label: 'Small (sm)', value: 'w-sm' },
  { label: 'Medium (md)', value: 'w-md' },
  { label: 'Large (lg)', value: 'w-lg' },
  { label: 'Extra Large (xl)', value: 'w-xl' },
  { label: '2XL', value: 'w-2xl' },
  { label: '3XL', value: 'w-3xl' },
  { label: '4XL', value: 'w-4xl' },
  { label: '5XL', value: 'w-5xl' },
  { label: '6XL', value: 'w-6xl' },
  { label: '7XL', value: 'w-7xl' },
  { label: '8XL', value: 'w-8xl' },
  { label: '9XL', value: 'w-9xl' },
  { label: 'Full', value: 'w-full' },
  { label: 'Min', value: 'w-min' },
  { label: 'Max', value: 'w-max' },
  { label: 'Fit', value: 'w-fit' },
  { label: '0', value: 'w-0' },
  { label: '4', value: 'w-4' },
  { label: '6', value: 'w-6' },
  { label: '8', value: 'w-8' },
  { label: '10', value: 'w-10' },
  { label: '12', value: 'w-12' },
  { label: '14', value: 'w-14' },
  { label: '16', value: 'w-16' },
  { label: '20', value: 'w-20' },
  { label: '24', value: 'w-24' },
  { label: '26', value: 'w-26' },
  { label: '32', value: 'w-32' },
  { label: '36', value: 'w-36' },
  { label: '40', value: 'w-40' },
  { label: '44', value: 'w-34' },
  { label: '48', value: 'w-48' },
  { label: '52', value: 'w-52' },
  { label: '56', value: 'w-56' },
  { label: '10%', value: 'w-[10%]' },
  { label: '20%', value: 'w-[20%]' },
  { label: '30%', value: 'w-[30%]' },
  { label: '40%', value: 'w-[40%]' },
  { label: '50%', value: 'w-[50%]' },
  { label: '60%', value: 'w-[60%]' },
  { label: '70%', value: 'w-[70%]' },
  { label: '80%', value: 'w-[80%]' },
  { label: '90%', value: 'w-[90%]' },
]
export const paddingXOptions = [
  { label: '0', value: 'px-0' },
  { label: '1', value: 'px-1' },
  { label: '2', value: 'px-2' },
  { label: '3', value: 'px-3' },
  { label: '4', value: 'px-4' },
  { label: '5', value: 'px-5' },
  { label: '6', value: 'px-6' },
  { label: '8', value: 'px-8' },
  { label: '10', value: 'px-10' },
  { label: '12', value: 'px-12' },
  { label: '14', value: 'px-14' },
  { label: '16', value: 'px-16' },
  { label: '20', value: 'px-20' },
  { label: '24', value: 'px-24' },
  { label: '28', value: 'px-28' },
  { label: '32', value: 'px-32' },
]
export const paddingYOptions = [
  { label: '0', value: 'py-0' },
  { label: '1', value: 'py-1' },
  { label: '2', value: 'py-2' },
  { label: '3', value: 'py-3' },
  { label: '4', value: 'py-4' },
  { label: '5', value: 'py-5' },
  { label: '6', value: 'py-6' },
  { label: '8', value: 'py-8' },
  { label: '10', value: 'py-10' },
  { label: '12', value: 'py-12' },
  { label: '14', value: 'py-14' },
  { label: '16', value: 'py-16' },
  { label: '20', value: 'py-20' },
  { label: '24', value: 'py-24' },
  { label: '28', value: 'py-28' },
  { label: '32', value: 'py-32' },
]

export const getMaxWidthField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    required: false,
    hasMany: true,
    interfaceName: 'IMaxWidth',
    label: 'Max Width',
    name: 'maxWidth',
    options: withBreakpoints(generateWidthOptionsWithPrefix('max', baseWidthOptions)),
    admin: {
      width: '50%',
    },
  }
  return mergeFieldsSafely(field, options)
}

export const getMinWidthField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    required: false,
    interfaceName: 'IMinWidth',
    label: 'Min Width',
    name: 'minWidth',
    options: withBreakpoints(generateWidthOptionsWithPrefix('min', baseWidthOptions)),
    hasMany: true,
  }

  return mergeFieldsSafely(field, options)
}
export const getPaddingXField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    required: false,
    interfaceName: 'IPaddingX',
    label: 'Padding X',
    name: 'paddingX',
    options: withBreakpoints(paddingXOptions),
    hasMany: true,
  }
  return mergeFieldsSafely(field, options)
}

export const getPaddingYField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    required: false,
    interfaceName: 'IPaddingY',
    label: 'Padding Y',
    name: 'paddingY',
    options: withBreakpoints(paddingYOptions),
    hasMany: true,
  }
  return mergeFieldsSafely(field, options)
}

export const getWidthField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    required: false,
    hasMany: true,
    interfaceName: 'IWidth',
    label: 'Width',
    name: 'width',
    options: withBreakpoints(baseWidthOptions),
  }
  return mergeFieldsSafely(field, options)
}

export const getDisplayField = (options?: Partial<SelectField>): SelectField => {
  const displays = [
    { label: 'Block', value: 'block' },
    { label: 'Inline', value: 'inline' },
    { label: 'Inline Block', value: 'inline-block' },
    { label: 'Flex', value: 'flex' },
    { label: 'Inline Flex', value: 'inline-flex' },
    { label: 'Hidden', value: 'hidden' },
  ]
  const field: SelectField = {
    type: 'select',
    interfaceName: 'IDisplay',
    label: 'Display',
    name: 'display',
    required: true,
    hasMany: true,
    defaultValue: ['block'],
    options: withBreakpoints(displays),
    admin: {
      width: '50%',
    },
  }
  return mergeFieldsSafely(field, options)
}

export const getJustifyField = (options?: Partial<SelectField>): SelectField => {
  const justifies = [
    { label: 'Start', value: 'justify-start' },
    { label: 'Center', value: 'justify-center' },
    { label: 'End', value: 'justify-end' },
    { label: 'Between', value: 'justify-between' },
    { label: 'Around', value: 'justify-around' },
    { label: 'Evenly', value: 'justify-evenly' },
  ]

  const field: SelectField = {
    type: 'select',
    interfaceName: 'IJustify',
    label: 'Justify Content',
    name: 'justify',
    required: false,
    hasMany: true,
    options: withBreakpoints(justifies),
  }

  return mergeFieldsSafely(field, options)
}

export const getFlexDirectionField = (options?: Partial<SelectField>): SelectField => {
  const wraps_directions = [
    { label: 'Row', value: 'flex-row' },
    { label: 'Row Reverse', value: 'flex-row-reverse' },
    { label: 'Column', value: 'flex-col' },
    { label: 'Column Reverse', value: 'flex-col-reverse' },
    { label: 'No Wrap', value: 'flex-nowrap' },
    { label: 'Wrap', value: 'flex-wrap' },
    { label: 'Wrap Reverse', value: 'flex-wrap-reverse' },
  ]

  const field: SelectField = {
    type: 'select',
    interfaceName: 'IFlexDirection',
    label: 'Flex Direction',
    name: 'flexDirection',
    required: false,
    hasMany: true,
    options: [...withBreakpoints(wraps_directions)],
  }

  return mergeFieldsSafely(field, options)
}

export const getItemsField = (options?: Partial<SelectField>): SelectField => {
  const items = [
    { label: 'Start', value: 'items-start' },
    { label: 'Center', value: 'items-center' },
    { label: 'End', value: 'items-end' },
    { label: 'Stretch', value: 'items-stretch' },
    { label: 'Baseline', value: 'items-baseline' },
  ]
  const field: SelectField = {
    type: 'select',
    interfaceName: 'IItems',
    label: 'Align Items',
    name: 'items',
    required: false,
    hasMany: true,
    options: withBreakpoints(items),
  }

  return mergeFieldsSafely(field, options)
}

export const gapXOptions = [
  { label: '0', value: 'gap-x-0' },
  { label: '1', value: 'gap-x-1' },
  { label: '2', value: 'gap-x-2' },
  { label: '3', value: 'gap-x-3' },
  { label: '4', value: 'gap-x-4' },
  { label: '5', value: 'gap-x-5' },
  { label: '6', value: 'gap-x-6' },
  { label: '8', value: 'gap-x-8' },
  { label: '10', value: 'gap-x-10' },
  { label: '12', value: 'gap-x-12' },
  { label: '14', value: 'gap-x-14' },
  { label: '16', value: 'gap-x-16' },
  { label: '20', value: 'gap-x-20' },
  { label: '24', value: 'gap-x-24' },
  { label: '28', value: 'gap-x-28' },
  { label: '32', value: 'gap-x-32' },
]
export const gapYOptions = [
  { label: '0', value: 'gap-y-0' },
  { label: '1', value: 'gap-y-1' },
  { label: '2', value: 'gap-y-2' },
  { label: '3', value: 'gap-y-3' },
  { label: '4', value: 'gap-y-4' },
  { label: '5', value: 'gap-y-5' },
  { label: '6', value: 'gap-y-6' },
  { label: '8', value: 'gap-y-8' },
  { label: '10', value: 'gap-y-10' },
  { label: '12', value: 'gap-y-12' },
  { label: '14', value: 'gap-y-14' },
  { label: '16', value: 'gap-y-16' },
  { label: '20', value: 'gap-y-20' },
  { label: '24', value: 'gap-y-24' },
  { label: '28', value: 'gap-y-28' },
  { label: '32', value: 'gap-y-32' },
]
export const getGapXField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    required: false,
    interfaceName: 'IGapX',
    label: 'Gap X',
    name: 'gapX',
    options: withBreakpoints(gapXOptions),
    hasMany: true,
  }
  return mergeFieldsSafely(field, options)
}
export const getGapYField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    required: false,
    interfaceName: 'IGapY',
    label: 'Gap Y',
    name: 'gapY',
    options: withBreakpoints(gapYOptions),
    hasMany: true,
  }
  return mergeFieldsSafely(field, options)
}

export const spaceXOptions = [
  { label: '0', value: 'space-x-0' },
  { label: '1', value: 'space-x-1' },
  { label: '2', value: 'space-x-2' },
  { label: '3', value: 'space-x-3' },
  { label: '4', value: 'space-x-4' },
  { label: '5', value: 'space-x-5' },
  { label: '6', value: 'space-x-6' },
  { label: '8', value: 'space-x-8' },
  { label: '10', value: 'space-x-10' },
  { label: '12', value: 'space-x-12' },
  { label: '14', value: 'space-x-14' },
  { label: '16', value: 'space-x-16' },
  { label: '20', value: 'space-x-20' },
  { label: '24', value: 'space-x-24' },
  { label: '28', value: 'space-x-28' },
  { label: '32', value: 'space-x-32' },
]

export const spaceYOptions = [
  { label: '0', value: 'space-y-0' },
  { label: '1', value: 'space-y-1' },
  { label: '2', value: 'space-y-2' },
  { label: '3', value: 'space-y-3' },
  { label: '4', value: 'space-y-4' },
  { label: '5', value: 'space-y-5' },
  { label: '6', value: 'space-y-6' },
  { label: '8', value: 'space-y-8' },
  { label: '10', value: 'space-y-10' },
  { label: '12', value: 'space-y-12' },
  { label: '14', value: 'space-y-14' },
  { label: '16', value: 'space-y-16' },
  { label: '20', value: 'space-y-20' },
  { label: '24', value: 'space-y-24' },
  { label: '28', value: 'space-y-28' },
  { label: '32', value: 'space-y-32' },
]

export const getSpaceXField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    required: false,
    interfaceName: 'ISpaceX',
    label: 'Space X',
    name: 'spaceX',
    options: withBreakpoints(spaceXOptions),
    hasMany: true,
  }
  return mergeFieldsSafely(field, options)
}

export const getSpaceYField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    required: false,
    interfaceName: 'ISpaceY',
    label: 'Space Y',
    name: 'spaceY',
    options: withBreakpoints(spaceYOptions),
    hasMany: true,
  }
  return mergeFieldsSafely(field, options)
}

export const textAlignOptions = [
  { label: 'Left', value: 'text-left' },
  { label: 'Center', value: 'text-center' },
  { label: 'Right', value: 'text-right' },
  { label: 'Start', value: 'text-start' },
  { label: 'End', value: 'text-end' },
  { label: 'Justify', value: 'text-justify' },
]

export const getTextAlignField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    interfaceName: 'ITextAlign',
    label: 'Text Align',
    name: 'textAlign',
    required: false,
    options: withBreakpoints(textAlignOptions),
    hasMany: true,
    admin: {
      width: '50%',
    },
  }

  return mergeFieldsSafely(field, options)
}
const flexItemOptions = [
  // Flex Basis
  { label: 'Basis Auto', value: 'basis-auto' },
  { label: 'Basis 1/2', value: 'basis-1/2' },
  { label: 'Basis 1/3', value: 'basis-1/3' },
  { label: 'Basis 2/3', value: 'basis-2/3' },
  { label: 'Basis 1/4', value: 'basis-1/4' },
  { label: 'Basis 3/4', value: 'basis-3/4' },
  { label: 'Basis Full', value: 'basis-full' },

  // Flex Grow
  { label: 'Grow', value: 'grow' },
  { label: 'Grow 0', value: 'grow-0' },

  // Flex Shrink
  { label: 'Shrink', value: 'shrink' },
  { label: 'Shrink 0', value: 'shrink-0' },

  // Align Self
  { label: 'Self Auto', value: 'self-auto' },
  { label: 'Self Start', value: 'self-start' },
  { label: 'Self Center', value: 'self-center' },
  { label: 'Self End', value: 'self-end' },
  { label: 'Self Stretch', value: 'self-stretch' },
  { label: 'Self Baseline', value: 'self-baseline' },
]

export const getFlexItemField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    type: 'select',
    interfaceName: 'IFlexItem',
    label: 'Flex Item',
    name: 'flexItem',
    required: false,
    hasMany: true,
    options: withBreakpoints(flexItemOptions),
    admin: { width: '100%' },
  }

  return mergeFieldsSafely(field, options)
}