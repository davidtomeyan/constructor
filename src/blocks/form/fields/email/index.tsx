"use client"

import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { EmailFieldBlock } from '@/payload-types'
import { getEmailFieldSchema } from '@/blocks/form/fields/email/zod-schema'
import { Width } from '@/blocks/form/width'
import { useCallback } from 'react'

type FieldProps = Omit<React.ComponentProps<typeof FormField>, 'render' | 'rules'> & EmailFieldBlock

export function EmailField({
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
}: FieldProps) {
  const validator = useCallback(
    (value: unknown) => getEmailFieldSchema(!!required).safeParse(value),
    [required],
  )
  return (
    <Width width={width}>
      <FormField
        defaultValue={defaultValue ?? ''}
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
        render={({ field }) => (
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
              <Input placeholder={placeholder ?? undefined} {...field} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </Width>
  )
}
