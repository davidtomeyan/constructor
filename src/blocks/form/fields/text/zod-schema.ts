import * as z from 'zod/v4-mini'
import { errorMessages } from '@/blocks/form/fields/errors'

export const getTextFieldSchema = (
  required: boolean
) => z.string().check(z.minLength(required?1:0,errorMessages.required));
