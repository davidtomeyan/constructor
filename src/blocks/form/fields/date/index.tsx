'use client'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { DateFieldBlock } from '@/payload-types'
import { Width } from '@/blocks/form/width'
import { useCallback } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { DateLib, DropdownProps, TZDate } from 'react-day-picker'
import { formatISO, parseISO, set, addYears, subYears } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarIcon, CircleX } from 'lucide-react'
import { getDateFieldSchema } from '@/blocks/form/fields/date/zod-schema'

type FieldProps = Omit<React.ComponentProps<typeof FormField>, 'render' | 'rules'> & DateFieldBlock
const TIME_ZONE = 'UTC'

export function DateField({
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
  disablePastDates,
}: FieldProps) {
  const dateLib = new DateLib()

  const validator = useCallback(
    (value: unknown) => getDateFieldSchema(!!required).safeParse(value),
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
                <Popover
                  onOpenChange={(open) => {
                    if (!open) field.onBlur()
                  }}
                  modal
                >
                  <div className="relative h-fit w-full">
                    <PopoverTrigger className="w-full" asChild>
                      <FormControl>
                        <Button
                          data-has-value={!!field.value}
                          type="button"
                          disabled={field.disabled}
                          className={cn([
                            'justify-between dark:aria-invalid:border-destructive aria-invalid:border-destructive',
                            'data-[has-value=false]:text-muted-foreground!',
                          ])}
                          variant="outline"
                        >
                          <span className="font-normal">
                            {field.value ? dateLib.format(field.value, 'dd/MM/yyyy') : placeholder}
                          </span>
                          <CalendarIcon className="text-muted-foreground" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    {field.value && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          field.onChange('')
                        }}
                        className="absolute opacity-70 top-1/2 -translate-1/2 right-4"
                      >
                        <CircleX />
                      </Button>
                    )}
                  </div>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      timeZone={TIME_ZONE}
                      startMonth={subYears(new Date(), 100)}
                      endMonth={addYears(new Date(), 100)}
                      disabled={disablePastDates ? { before: new Date() } : undefined}
                      formatters={{
                        formatMonthDropdown: (month) => dateLib.format(month, 'LLL'),
                      }}
                      components={{ Dropdown: CustomSelectDropdown }}
                      selected={field.value ? parseISO(field.value) : field.value}
                      onSelect={(date, ...rest) => {
                        if (date) {
                          const dateAtNoonUTC = set(date, {
                            hours: 12,
                            minutes: 0,
                            seconds: 0,
                            milliseconds: 0,
                          })
                          field.onChange(
                            formatISO(new TZDate(dateAtNoonUTC, TIME_ZONE), {
                              representation: 'date',
                            }),
                            ...rest,
                          )
                        } else {
                          field.onChange(date, ...rest)
                        }
                      }}
                      mode="single"
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
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

function CustomSelectDropdown(props: DropdownProps) {
  const { options, value, onChange } = props

  const handleValueChange = (newValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          value: newValue,
        },
      } as React.ChangeEvent<HTMLSelectElement>
      onChange(syntheticEvent)
    }
  }

  return (
    <Select value={value?.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="z-10 min-w-22">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-96" align={'center'}>
        <SelectGroup>
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value.toString()}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
