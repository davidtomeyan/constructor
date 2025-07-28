import { SelectField, RadioField,NumberField } from 'payload'
import { mergeFieldsSafely } from '@/lib/utils/merge-fields-safely'

export const getObjectPositionField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    name: 'objectPosition',
    type: 'select',
    options: [
      'object-center',
      'object-left',
      'object-left-top',
      'object-left-bottom',
      'object-right',
      'object-right-top',
      'object-right-bottom',
      'object-top',
      'object-top-left',
      'object-top-right',
      'object-bottom',
      'object-bottom-left',
      'object-bottom-right',
    ],
    defaultValue: 'object-center',
    required: true,
    admin: {
      width: '33%',
    },
  }

  return mergeFieldsSafely(field, options)
}

export const getObjectFitField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    name: 'objectFit',
    type: 'select',
    options: [
      { label: 'cover', value: 'object-cover' },
      { label: 'contain', value: 'object-contain' },
    ],
    defaultValue: 'object-cover',
    required: true,
    admin: {
      width: '33%',
    },
  }
  return mergeFieldsSafely(field, options)
}

export const getRoundedFitField = (options?: Partial<SelectField>): SelectField => {
  const field: SelectField = {
    name: 'rounded',
    type: 'select',
    options: ['rounded-none', 'rounded-lg','rounded-xl', 'rounded-full'],
    defaultValue: 'rounded-xl',
    required: true,
    admin: {
      width: '33%',
    },
  }
  return mergeFieldsSafely(field, options)
}

export const getImageSizeField = (options?: Partial<RadioField>): RadioField => {
  const field: RadioField = {
    type: 'radio',
    name: 'imageSize',
    options: ['auto', 'icon', 'aspect-ratio'],
    defaultValue: 'auto',
    admin: {
      width: '66%',
    },
  }
  return mergeFieldsSafely(field, options)
}

export const getRatioField = (options?: Partial<NumberField>): NumberField => {
  const field:NumberField = {
    type: 'number',
    name: 'ratio',
    defaultValue: 1,
    required: true,
    admin: {
      width: '33%',
    },
  }
  return mergeFieldsSafely(field, options)
}
