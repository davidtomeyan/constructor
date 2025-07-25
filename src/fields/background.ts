import { Field } from 'payload'
import { getBackgroundVariants } from '@/fields/background-variants'

export const backgroundType: Field = {
  type: 'select',
  name: 'backgroundType',
  label: 'Background Type',
  required: true,
  options: ['image', 'variant', 'effect'],
  defaultValue: 'variant',
  admin: {
    width: '50%',
    isClearable: false,
  },
}

export const backgroundEffect: Field = {
  type: 'select',
  name: 'backgroundEffect',
  label: 'Background Effect',
  required: true,
  options: [
    'particles',
    'interactive-grid-pattern',
    'animated-grid-pattern',
    'glow-effect',
    'meteors',
  ],
  defaultValue: 'particles',
  admin: {
    width: '50%',
    condition: (__, _, { blockData }) => {
      return blockData?.backgroundType === 'effect'
    },
    isClearable: false,
  },
  hooks: {
    beforeValidate: [
      ({ blockData }) => {
        if (blockData?.backgroundType !== 'effect') {
          return null
        }
      },
    ],
  },
}
const backgroundVariant = {
  ...getBackgroundVariants({
    admin: {
      width: '50%',
      condition: (__, _, { blockData }) => {
        return blockData?.backgroundType === 'variant'
      },
      isClearable: false,
    },
    hooks: {
      beforeValidate: [
        ({ blockData }) => {
          if (blockData?.backgroundType !== 'variant') {
            return null
          }
        },
      ],
    },
  }),
}

export const imageBackground: Field = {
  label: 'Image Background',
  type: 'upload',
  name: 'imageBackground',
  relationTo: 'media',
  admin: {
    width: '50%',
    condition: (_, __, { blockData }) => {
      return blockData?.backgroundType === 'image'
    },
  },
  required: true,
  hooks: {
    beforeValidate: [
      ({ blockData }) => {
        if (blockData?.backgroundType !== 'image') {
          return null
        }
      },
    ],
  },
}
export const background: Field[] = [
  backgroundType,
  imageBackground,
  backgroundVariant,
  backgroundEffect,
]
