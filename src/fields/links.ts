import { ArrayField, Field } from 'payload'

export type LinkVariants = 'default' | 'outline' | "ghost" | "secondary" | "link"

export const variantOptions: Record<LinkVariants, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
  ghost: {
    label: 'Ghost',
    value: 'ghost',
  },
  secondary: {
    label: 'Secondary',
    value: 'secondary',
  },
  link: {
    label: 'Link',
    value: 'link',
  },
}

const linkTypes: Field[] = [
  {
    name: 'reference',
    type: 'relationship',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'reference',
    },
    label: 'Document to link to',
    relationTo: ["pages","posts"],
    required: true,
  },
  {
    name: 'url',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'custom',
    },
    label: 'Custom URL',
    required: true,
  },
]

export const links: ArrayField = {
  type: 'array',
  name: 'links',
  label: 'Links',
  interfaceName:"CMSLinks",
  maxRows:2,
  admin: {
    initCollapsed: true,
  },
  fields: [
    {
      name: 'link',
      type: 'group',
      interfaceName:"CMSLink",
      admin: {
        hideGutter: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'radio',
              dbName: 'link_type',
              admin: {
                layout: 'horizontal',
                width: '50%',
              },
              defaultValue: 'reference',
              options: [
                {
                  label: 'Internal link',
                  value: 'reference',
                },
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
              ],
            },
            {
              name: 'newTab',
              type: 'checkbox',
              admin: {
                style: {
                  alignSelf: 'flex-end',
                },
                width: '50%',
              },
              label: 'Open in new tab',
            }
          ],
        },
        {
          name: 'variant',
          type: 'select',
          dbName: 'link_variant',
          admin: {
            description: 'Choose how the link should be rendered.',
          },
          defaultValue: 'default',
          options: [variantOptions.default,variantOptions.outline,variantOptions.secondary,variantOptions.ghost,variantOptions.link],
        },
        {
          type: 'row',
          fields: [
            ...linkTypes,
            {
              name: 'label',
              type: 'text',
              admin: {
                width: '50%',
              },
              label: 'Label',
              required: true,
            },
          ],
        },
        {
          name: 'showBlocksInDropdown',
          type: 'checkbox',
          label: 'Show Page Blocks in Menu',
          admin: {
            description:
              "Enable this only if the link is used in the navbar. If checked, and the link is an internal page, its labeled blocks (sections) will appear as dropdown items.",
            style: {
              alignSelf: 'flex-end',
            },
            width: '50%',
            condition: (_, siblingData) => siblingData?.type === 'reference',
          },
        }
      ],
    },
  ],
}
