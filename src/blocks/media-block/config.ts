import { Block, FieldHook, Condition } from 'payload'
import {
  getImageSizeField,
  getObjectFitField,
  getObjectPositionField,
  getRatioField,
  getRoundedFitField,
} from '@/fields/image-styles'
import {
  getDisplayField,
  getFlexDirectionField,
  getItemsField,
  getJustifyField,
  getMaxWidthField,
  getMinWidthField,
  getWidthField,
  getPaddingXField,
  getPaddingYField,
  getGapXField,
  getGapYField,
  getSpaceXField,
  getSpaceYField,
  getTextAlignField,
  getFlexItemField,
} from '@/fields/styles'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { getBackgroundVariants } from '@/fields/background-variants'

const beforeValidateFlex: FieldHook = ({ blockData, value }) => {
  return blockData?.display?.some?.((v: string) => v.includes('flex')) ? value : null
}
const hideFieldIfNonFlex: Condition = (_, __, { blockData }) => {
  return blockData?.display?.some?.((v: string) => v.includes('flex'))
}

const beforeValidateNotFlex: FieldHook = ({ blockData, value }) => {
  return blockData?.display?.some?.((v: string) => !v.includes('flex')) ? value : null
}
const hideFieldIfFlex: Condition = (_, __, { blockData }) => {
  return blockData?.display?.some?.((v: string) => !v.includes('flex'))
}

const rowWidth = { admin: { width: '50%' } }
export const MediaBlock: Block = {
  slug: 'media-block',
  interfaceName: 'IMediaBlock',
  fields: [
    {
      type: 'group',
      label: 'Container',
      fields: [
        {
          type: 'row',
          fields: [
            getSpaceXField({
              name: 'containerSpaceX',
              hooks: {
                beforeValidate: [beforeValidateNotFlex],
              },
              admin: {
                ...rowWidth.admin,
                condition: hideFieldIfFlex,
              },
            }),
            getSpaceYField({
              name: 'containerSpaceY',
              hooks: {
                beforeValidate: [beforeValidateNotFlex],
              },
              admin: {
                ...rowWidth.admin,
                condition: hideFieldIfFlex,
              },
            }),
            getBackgroundVariants({ name: 'container-background', ...rowWidth, required: false }),
            getDisplayField({ ...rowWidth }),
            getMaxWidthField({ name: 'container-max-width', ...rowWidth }),
            getMinWidthField({ name: 'container-min-width', ...rowWidth }),
            getWidthField({ name: 'container-width', ...rowWidth }),
            getPaddingXField({ name: 'container-padding-x', ...rowWidth }),
            getPaddingYField({ name: 'container-padding-y', ...rowWidth }),
            getJustifyField({
              hooks: {
                beforeValidate: [beforeValidateFlex],
              },
              admin: {
                ...rowWidth.admin,
                condition: hideFieldIfNonFlex,
              },
            }),
            getItemsField({
              hooks: {
                beforeValidate: [beforeValidateFlex],
              },
              admin: {
                ...rowWidth.admin,
                condition: hideFieldIfNonFlex,
              },
            }),
            getFlexDirectionField({
              hooks: {
                beforeValidate: [beforeValidateFlex],
              },
              admin: {
                ...rowWidth.admin,
                condition: hideFieldIfNonFlex,
              },
            }),
            getGapXField({
              name: 'container-gap-x',
              hooks: {
                beforeValidate: [beforeValidateFlex],
              },
              admin: {
                ...rowWidth.admin,
                condition: hideFieldIfNonFlex,
              },
            }),
            getGapYField({
              name: 'container-gap-y',
              hooks: {
                beforeValidate: [beforeValidateFlex],
              },
              admin: {
                ...rowWidth.admin,
                condition: hideFieldIfNonFlex,
              },
            }),
            { type: 'checkbox', name: 'isBordered', ...rowWidth.admin },
            { type: 'checkbox', name: 'isRounded', ...rowWidth.admin },
          ],
        },
      ],
    },
    {
      type: 'group',
      label: 'Content Container',
      fields: [
        {
          type: 'row',
          fields: [
            getDisplayField({ ...rowWidth, name: 'contentDisplay' }),
            getFlexDirectionField({
              admin: {
                ...rowWidth.admin,
                condition: (_, __, { blockData }) => {
                  return blockData?.contentDisplay?.some?.((v: string) => v.includes('flex'))
                },
              },
              name: 'contentFlexDirection',
              hooks: {
                beforeValidate: [
                  ({ blockData, value }) => {
                    return blockData?.contentDisplay?.some?.((v: string) => v.includes('flex'))
                      ? value
                      : null
                  },
                ],
              },
            }),
            getJustifyField({
              admin: {
                ...rowWidth.admin,
                condition: (_, __, { blockData }) => {
                  return blockData?.contentDisplay?.some?.((v: string) => v.includes('flex'))
                },
              },
              name: 'content-Justify',
              hooks: {
                beforeValidate: [
                  ({ blockData, value }) => {
                    return blockData?.contentDisplay?.some?.((v: string) => v.includes('flex'))
                      ? value
                      : null
                  },
                ],
              },
            }),
            getItemsField({
              admin: {
                ...rowWidth.admin,
                condition: (_, __, { blockData }) => {
                  return blockData?.contentDisplay?.some?.((v: string) => v.includes('flex'))
                },
              },
              name: 'content-align-items',
              hooks: {
                beforeValidate: [
                  ({ blockData, value }) => {
                    return blockData?.contentDisplay?.some?.((v: string) => v.includes('flex'))
                      ? value
                      : null
                  },
                ],
              },
            }),
            getFlexItemField({
              name: 'content-flex-item',
              hooks: {
                beforeValidate: [beforeValidateFlex],
              },
              admin: {
                ...rowWidth.admin,
                condition: hideFieldIfNonFlex,
              },
            }),
            getTextAlignField(),
            getGapYField({
              admin: {
                ...rowWidth.admin,
                condition: (_, __, { blockData }) => {
                  return blockData?.contentDisplay?.some?.((v: string) => v.includes('flex'))
                },
              },
              name: 'content-gap-y',
              hooks: {
                beforeValidate: [
                  ({ blockData, value }) => {
                    return blockData?.contentDisplay?.some?.((v: string) => v.includes('flex'))
                      ? value
                      : null
                  },
                ],
              },
            }),
            getBackgroundVariants({ name: 'content-background', required: false, ...rowWidth }),
            getMaxWidthField({ name: 'content-max-width', ...rowWidth }),
            getMinWidthField({ name: 'content-min-width', ...rowWidth }),
            getWidthField({ name: 'content-width', ...rowWidth }),
            getPaddingXField({ name: 'content-padding-x', ...rowWidth }),
            getPaddingYField({ name: 'content-padding-y', ...rowWidth }),
            { type: 'checkbox', name: 'isBorderedContentContainer', ...rowWidth.admin },
            { type: 'checkbox', name: 'isRoundedContentContainer', ...rowWidth.admin },
          ],
        },
      ],
    },
    {
      type: 'group',
      label: 'Media Container',
      fields: [
        {
          type: 'row',
          fields: [
            getFlexItemField({
              name: 'media-flex-item',
              hooks: {
                beforeValidate: [beforeValidateFlex],
              },
              admin: {
                ...rowWidth.admin,
                condition: hideFieldIfNonFlex,
              },
            }),
            getMaxWidthField({ name: 'media-max-width', ...rowWidth }),
            getMinWidthField({ name: 'media-min-width', ...rowWidth }),
            getWidthField({ name: 'media-width', ...rowWidth }),
            getPaddingXField({ name: 'media-padding-x', ...rowWidth }),
            getPaddingYField({ name: 'media-padding-y', ...rowWidth }),
            { type: 'checkbox', name: 'isBorderedMediaContainer', ...rowWidth.admin },
          ],
        },
      ],
    },
    {
      type: 'group',
      label: 'Media options',
      fields: [
        { ...getImageSizeField({ label: 'Size' }), options: ['auto', 'aspect-ratio'], ...rowWidth },
        {
          type: 'row',
          fields: [
            getRoundedFitField({ name: 'media-rounded' }),
            getObjectFitField(),
            getObjectPositionField(),
            getRatioField({
              admin: {
                condition: (_, __, { blockData }) => {
                  return blockData?.imageSize === 'aspect-ratio'
                },
              },
            }),
          ],
        },
      ],
    },
    {
      type: 'upload',
      relationTo: 'media',
      name: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: defaultFeatures,
      }),
    },
  ],
}
