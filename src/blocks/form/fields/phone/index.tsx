'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PhoneFieldBlock } from '@/payload-types'
import { Width } from '@/blocks/form/width'
import { useCallback } from 'react'
import { PhoneInput } from '@/components/ui/phone-input'
import { getPhoneFieldSchema } from '@/blocks/form/fields/phone/zod-schema'

type FieldProps = Omit<React.ComponentProps<typeof FormField>, 'render' | 'rules'> & PhoneFieldBlock

export function PhoneField({
  name,
  control,
  defaultValue,
  shouldUnregister,
  disabled,
  description,
  label,
  placeholder,
  required,
  width,
  enabledCountries,
}: FieldProps) {
  const validator = useCallback(
    (value: unknown) => getPhoneFieldSchema(!!required).safeParse(value),
    [required],
  )
  return (
    <Width width={width}>
      <FormField
        defaultValue={''}
        shouldUnregister={shouldUnregister}
        disabled={disabled}
        rules={{
          validate: (value) => {
            const result = validator(value)
            return result.success || result.error.issues[0].message
          },
        }}
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem>
              {label && (
                <FormLabel>
                  {label}
                  {required && (
                    <span className="text-destructive">
                      * <span className="sr-only">(required)</span>
                    </span>
                  )}
                </FormLabel>
              )}
              <FormControl>
                <PhoneInput
                  countries={enabledCountries}
                  defaultCountry={defaultValue}
                  placeholder={placeholder ?? undefined}
                  {...field}
                />
              </FormControl>
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </Width>
  )
}
