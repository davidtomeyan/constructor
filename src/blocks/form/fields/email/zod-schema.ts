import * as z from 'zod/v4-mini'
import { errorMessages } from '@/blocks/form/fields/errors'

export const getEmailFieldSchema = (required: boolean) =>
  z.string().check(
    z.minLength(required ? 1 : 0, errorMessages.required),
    z.refine(
      (value) => {
        if (!required && !value) return true
        return z.email().safeParse(value).success
      },
      { error: errorMessages.invalidEmail },
    ),
  )
