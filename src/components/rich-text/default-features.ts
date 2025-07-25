import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  TextStateFeature,
} from '@payloadcms/richtext-lexical'
import { colors } from './converters/colors'

export const textSizes = {
  'text-xs': {
    label: 'XS',
    css: {
      'font-size': '0.75rem',
      'line-height': '1rem',
    },
  },
  'text-sm': {
    label: 'SM',
    css: {
      'font-size': '0.875rem',
      'line-height': '1.25rem',
    },
  },
  'text-base': {
    label: 'Base',
    css: {
      'font-size': '1rem',
      'line-height': '1.5rem',
    },
  },
  'text-lg': {
    label: 'LG',
    css: {
      'font-size': '1.125rem',
      'line-height': '1.75rem',
    },
  },
  'text-xl': {
    label: 'XL',
    css: {
      'font-size': '1.25rem',
      'line-height': '1.75rem',
    },
  },
  'text-2xl': {
    label: '2XL',
    css: {
      'font-size': '1.5rem',
      'line-height': '2rem',
    },
  },
  'text-3xl': {
    label: '3XL',
    css: {
      'font-size': '1.875rem',
      'line-height': '2.25rem',
    },
  },
  'text-4xl': {
    label: '4XL',
    css: {
      'font-size': '2.25rem',
      'line-height': '2.5rem',
    },
  },
  'text-5xl': {
    label: '5XL',
    css: {
      'font-size': '3rem',
      'line-height': '1',
    },
  },
  'text-6xl': {
    label: '6XL',
    css: {
      'font-size': '3.75rem',
      'line-height': '1',
    },
  },
  'text-7xl': {
    label: '7XL',
    css: {
      'font-size': '4.5rem',
      'line-height': '1',
    },
  },
  'text-8xl': {
    label: '8XL',
    css: {
      'font-size': '6rem',
      'line-height': '1',
    },
  },
  'text-9xl': {
    label: '9XL',
    css: {
      'font-size': '8rem',
      'line-height': '1',
    },
  },
}

export const defaultFeatures = [
  HeadingFeature(),
  ParagraphFeature(),
  BoldFeature(),
  AlignFeature(),
  InlineCodeFeature(),
  SubscriptFeature(),
  SuperscriptFeature(),
  StrikethroughFeature(),
  UnderlineFeature(),
  ItalicFeature(),
  IndentFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  ChecklistFeature(),
  LinkFeature({ enabledCollections: ['pages', 'posts'] }),
  BlockquoteFeature(),
  HorizontalRuleFeature(),
  InlineToolbarFeature(),
  FixedToolbarFeature(),
  BoldFeature(),
  TextStateFeature({
    // prettier-ignore
    state: {
      ...colors,
      color: {
        galaxy: { label: 'Galaxy', css: { background: 'linear-gradient(to right, #0000ff, #ff0000)', color: 'white' } },
      },
      size: textSizes,
    },
  }),
]
