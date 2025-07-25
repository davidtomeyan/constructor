import { Field } from 'payload'
import slugify from 'slugify'
import { isObject } from '@/lib/utils'

export const slug = (key: string,createFor:"block" | "collection",required:boolean=true): Field => ({
  required: required,
  unique: true,
  type: 'text',
  name: 'slug',
  label: 'Slug',
  index: true,
  admin: {
    width: '50%',
    description:
     "Use \"home\" for the homepage slug. All other slugs will be generated automatically."
  },
  hooks: {
    beforeValidate: [
      ({ data, value, blockData }) => {
      const obj = createFor === "block" ? blockData : data

        if (value && typeof value === 'string') {
          return slugify(value, {
            replacement: '-',
            locale: 'en',
            trim: true,
            lower: true,
            strict: true,
          })
        }
        const str = isObject(obj) ? obj?.[key] : value
        if (str && typeof str === 'string') {
          return slugify(str, {
            replacement: '-',
            locale: 'en',
            trim: true,
            lower: true,
            strict: true,
          })
        }
      },
    ],
  },
})
