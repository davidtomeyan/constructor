import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { Block, Field } from 'payload'
import { fields as formFields } from '@payloadcms/plugin-form-builder'
import { countries } from '@/lib/utils/phone-number/countries'
import { mergeFieldsSafely } from '@/lib/utils/merge-fields-safely'
import {
  lexicalEditor,
  ParagraphFeature,
  LinkFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
}
const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  localized: true,
}
const description: Field = {
  name: 'description',
  type: 'text',
  label: 'Description',
  localized: true,
}
const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}
const width: Field = {
  name: 'width',
  type: 'number',
  label: 'Field Width (percentage)',
}
const placeholder: Field = {
  name: 'placeholder',
  type: 'text',
  label: 'Placeholder',
}
const richText: Field = {
  name: 'richText',
  type: 'richText',
  editor: lexicalEditor({
    features: () => [
      ParagraphFeature(),
      LinkFeature({ enabledCollections: ['pages'] }),
      FixedToolbarFeature(),
    ],
  }),
  localized: true,
}
const PhoneNumber: Block = {
  interfaceName: 'PhoneFieldBlock',
  slug: 'phone',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'select',
      name: 'enabledCountries',
      label: 'Enabled Country Codes',
      localized: true,
      options: countries.map((i) => ({ label: i, value: i })),
      defaultValue: countries,
      admin: { isClearable: true },
      hasMany: true,
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          type: 'select',
          name: 'defaultValue',
          label: 'Default Country Codes',
          options: countries.map((i) => ({ label: i, value: i })),
        },
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    description,
    required,
    placeholder,
  ],
}

export const formBuilder = formBuilderPlugin({
  fields: {
    text: mergeFieldsSafely(formFields.text, {
      fields: [placeholder, description],
      interfaceName: 'TextFieldBlock',
    }),
    textarea: mergeFieldsSafely(formFields.textarea, {
      fields: [placeholder, description],
      interfaceName: 'TextareaFieldBlock',
    }),
    select: mergeFieldsSafely(formFields.select, {
      fields: [description],
      interfaceName: 'SelectFieldBlock',
    }),
    email: mergeFieldsSafely(formFields.email, {
      fields: [placeholder, description],
      interfaceName: 'EmailFieldBlock',
    }),
    state: mergeFieldsSafely(formFields.state, {
      fields: [placeholder, description],
      interfaceName: 'StateFieldBlock',
    }),
    country: mergeFieldsSafely(formFields.country, {
      fields: [placeholder, description],
      interfaceName: 'CountryFieldBlock',
    }),
    checkbox: mergeFieldsSafely(formFields.checkbox, {
      fields: [richText, description],
      interfaceName: 'CheckboxFieldBlock',
    }),
    number: mergeFieldsSafely(formFields.number, {
      fields: [placeholder, description],
      interfaceName: 'NumberFieldBlock',
    }),
    message: mergeFieldsSafely(formFields.message, {
      interfaceName: 'MessageFieldBlock',
    }),
    date: mergeFieldsSafely(formFields.date, {
      fields: [
        placeholder,
        description,
        {
          name: 'disablePastDates',
          type: 'checkbox',
          label: 'Disable past dates',
          defaultValue: true,
        },
      ],
      interfaceName: 'DateFieldBlock',
    }),
    payment: false,
    phone: PhoneNumber,
  },
  formOverrides: {
    slug: 'forms',
    access: {
      read: ({ req: { user } }) => !!user,
      delete: ({ req: { user } }) => !!user,
      update: ({ req: { user } }) => !!user,
      create: ({ req: { user } }) => !!user,
    },
  },
  formSubmissionOverrides: {
    slug: 'form-submissions',
    fields: ({ defaultFields }) =>
      defaultFields.map((f) => {
        if (f.type === 'array' && f.name === 'submissionData') {
          return {
            ...mergeFieldsSafely(f, {
              admin: {
                components: {
                  // RowLabel: ArrayRowLabel,
                },
              },
            }),
          }
        }
        return f
      }),
  },
})
