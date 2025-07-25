"use client"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { StateFieldBlock } from '@/payload-types'
import { getSelectFieldSchema } from '@/blocks/form/fields/select/zod-schema'
import { Width } from '@/blocks/form/width'
import { useCallback } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CircleX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { stateOptions } from '@/blocks/form/fields/state/options'

type FieldProps = Omit<React.ComponentProps<typeof FormField>, 'render' | 'rules'> &
  StateFieldBlock

export function StateField({
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
    (value: unknown) =>
      getSelectFieldSchema(
        !!required,
        stateOptions.map((i) => i.value),
      ).safeParse(value),
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
            <Select key={field.value} onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <div className="relative h-fit w-full">
                  <FormControl>
                    <SelectTrigger disabled={field.disabled} className="w-full">
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  {field.value && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        field.onChange('')
                      }}
                      className="absolute opacity-70 top-1/2 -translate-1/2 right-2"
                    >
                      <CircleX />
                    </Button>
                  )}
                </div>
              </FormControl>
              <SelectContent>
                {stateOptions?.map((option, index) => (
                  <SelectItem key={`${name}-option-${index}`} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </Width>
  )
}
