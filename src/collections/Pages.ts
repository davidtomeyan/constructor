import type { Block, CollectionConfig, Field } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { HeroBlock } from '@/blocks/hero/config'
import { revalidatePath } from 'next/cache'
import { slug } from '@/fields/slug'
import { ContentBlock } from '@/blocks/content/config'
import { HorizontalHeroBlock } from '@/blocks/horizontal-hero/config'
import { MediaBlock } from '@/blocks/media-block/config'
import { authenticated, authenticatedOrPublished } from '@/lib/utils/hooks/auth'
import { RichTextBlock } from '@/blocks/rich-text-block/config'

const MediaBlockWithLAbel:Block = {...MediaBlock,
  interfaceName:"IMediaBlockWithLabel",
  fields: [
  {
    type: 'text',
    name: 'label',
    label: 'Label',
    required: false,
    admin: {
      width: '50%',
      description: 'The name shown in navigation links that point to this block.',
    },
  },
  {
    ...slug('label', 'block',false),
  },
  ...MediaBlock.fields
],
}

const tab: Field = {
  type: 'tabs',
  tabs: [
    {
      label: 'layout',
      name: 'layout',
      fields: [
        {
          name: 'blocks',
          label: 'Block',
          type: 'blocks',
          blocks: [HeroBlock, ContentBlock, HorizontalHeroBlock, MediaBlockWithLAbel,RichTextBlock],
        },
      ],
    },
    {
      name: 'meta',
      label: 'Seo',
      fields: [
        MetaImageField({
          relationTo: 'media',
          hasGenerateFn: false,
        }),

        MetaDescriptionField({
          hasGenerateFn: false,
        }),

        MetaTitleField({
          hasGenerateFn: true,
        }),

        PreviewField({
          hasGenerateFn: true,
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
        }),

        OverviewField({
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
          imagePath: 'meta.image',
        }),
      ],
    },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/', 'layout')
      },
    ],
    afterDelete: [
      () => {
        revalidatePath('/', 'layout')
      },
    ],
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'updatedAt'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            description: 'The name shown in navigation links that point to this page.',
          },
        },
        {
          ...slug('label', 'collection'),
        },
      ],
    },
    tab,
  ],
  defaultPopulate: {
    slug: true,
    label: true,
    layout: {
      blocks: {
        content: { label: true, slug: true },
        hero: { label: true, slug: true },
        'horizontal-hero': { label: true, slug: true },
        'media-block': { label: true, slug: true },
      },
    },
  },
}
