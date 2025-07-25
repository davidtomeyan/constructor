'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CheckboxFieldBlock } from '@/payload-types'
import { Width } from '@/blocks/form/width'
import { Checkbox } from '@/components/ui/checkbox'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { hasText } from '@payloadcms/richtext-lexical/shared'
import { linkJSXConverter } from '@/components/rich-text/converters/link'
import { internalDocToHref } from '@/components/rich-text/converters/internal-doc-to-href'

type FieldProps = Omit<React.ComponentProps<typeof FormField>, 'render' | 'rules'> &
  CheckboxFieldBlock

export function CheckboxField({
  name,
  control,
  defaultValue,
  shouldUnregister,
  disabled,
  description,
  richText,
  label,
  required,
  width,
}: FieldProps) {
  return (
    <Width width={width}>
      <FormField
        defaultValue={!!defaultValue}
        shouldUnregister={shouldUnregister}
        disabled={disabled}
        rules={{
          required: !!required,
        }}
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex gap-4">
            <FormControl>
              <Checkbox disabled={field.disabled} checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="grid gap-1">
              {(label || hasText(richText)) && (
                <FormLabel className="grid">
                  <span className="sr-only">(required)</span>
                  {label && <p>{label}</p>}
                  {richText && hasText(richText) && (
                    <RichText
                      converters={({ defaultConverters }) => ({
                        ...defaultConverters,
                        ...linkJSXConverter({ internalDocToHref }),
                      })}
                      className="prose leading-normal  prose-sm pt-0 dark:prose-invert prose-violet [&_a]:underline [&_a]:underline-offset-2"
                      data={richText}
                    />
                  )}
                </FormLabel>
              )}
              {description && <FormDescription>{description}</FormDescription>}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </Width>
  )
}
