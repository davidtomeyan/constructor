import * as z from 'zod/v4-mini'
import { errorMessages } from '@/blocks/form/fields/errors'

export const getNumberFieldSchema = (required: boolean) =>
  z.string().check(
    z.minLength(required ? 1 : 0, { error: errorMessages.required }),
    z.refine(
      (value) => {
        if (!value && !required) return true
        return z.coerce.number().safeParse(value).success
      },
      { error: errorMessages.invalidNumber },
    ),
  )
