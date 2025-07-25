import * as z from 'zod/v4-mini'
import { errorMessages } from '@/blocks/form/fields/errors'

export const getDateFieldSchema = (required: boolean) =>
  z.string().check(
    z.minLength(required ? 1 : 0, { error: errorMessages.required }),
    z.refine(
      (value) => {
        if (!value && !required) return true
        return z.iso.date().safeParse(value).success
      },
      { error: errorMessages.invalidDateValue },
    ),
  )
