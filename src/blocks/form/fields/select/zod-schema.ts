import * as z from 'zod/v4-mini'
import { errorMessages } from '@/blocks/form/fields/errors'

export const getSelectFieldSchema = (required: boolean, values: string[]) =>
  z.string().check(
    z.minLength(required ? 1 : 0, { error: errorMessages.required }),
    z.refine((value) => {
      if (!value && !required) return true
      return z.literal(values).safeParse(value).success
    },{error:errorMessages.invalidSelectedValue}),
  )

