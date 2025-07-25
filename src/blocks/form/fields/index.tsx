'use client'
import { IFormBlock } from '@/payload-types'
import { Fragment } from 'react'
import { TextField } from '@/blocks/form/fields/text'
import { EmailField } from '@/blocks/form/fields/email'
import { NumberField } from '@/blocks/form/fields/number'
import { TextareaField } from '@/blocks/form/fields/textarea'
import { SelectField } from '@/blocks/form/fields/select'
import { CountryField } from '@/blocks/form/fields/country'
import { StateField } from '@/blocks/form/fields/state'
import { DateField } from '@/blocks/form/fields/date'
import { PhoneField } from '@/blocks/form/fields/phone'
import { CheckboxField } from '@/blocks/form/fields/chackbox'
import { Width } from '@/blocks/form/width'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { FormField } from '@/components/ui/form'

type FieldProps = Omit<React.ComponentProps<typeof FormField>, 'render' | 'rules' | 'name'>

export function FormFields({ form, ...props }: { form: IFormBlock['form'] } & FieldProps) {
  if (!form || typeof form !== 'object') return null
  return (
    <>
      {form.fields?.map((field, index) => {
        return (
          <Fragment key={`field_${index}`}>
            {field.blockType === 'text' && <TextField {...props} {...field} />}
            {field.blockType === 'email' && <EmailField {...props} {...field} />}
            {field.blockType === 'number' && <NumberField {...props} {...field} />}
            {field.blockType === 'textarea' && <TextareaField {...props} {...field} />}
            {field.blockType === 'select' && <SelectField {...props} {...field} />}
            {field.blockType === 'country' && <CountryField {...props} {...field} />}
            {field.blockType === 'state' && <StateField {...props} {...field} />}
            {field.blockType === 'date' && <DateField {...props} {...field} />}
            {field.blockType === 'phone' && <PhoneField {...props} {...field} />}
            {field.blockType === 'checkbox' && <CheckboxField {...props} {...field} />}
            {field.blockType === 'message' && field.message && (
              <Width>
                <RichText className="text-sm" data={field.message} />
              </Width>
            )}
          </Fragment>
        )
      })}
    </>
  )
}
