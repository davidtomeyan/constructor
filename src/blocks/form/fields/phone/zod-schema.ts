import * as z from 'zod/v4-mini'
import { errorMessages } from '@/blocks/form/fields/errors'
import { isValidPhoneNumber } from 'react-phone-number-input'

export const getPhoneFieldSchema = (required: boolean) =>
  z.string().check(
    z.minLength(required ? 1 : 0, errorMessages.required),
    z.refine(
      (value) => {
        if (!value && !required) return true
        return isValidPhoneNumber(value)
      },
      { error:errorMessages.invalidPhoneValue },
    ),
  )
