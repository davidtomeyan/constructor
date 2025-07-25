import { useCallback, useState } from 'react'
import { submitForm } from '@/blocks/form/service'

export function useSubmitForm({ successCallback }: { successCallback?: () => void } = {}) {
  const [isLoading, setIsLoading] = useState<boolean>()
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<
    | {
        status?: number | string
        message: string
      }
    | undefined
  >(undefined)

  const submit = useCallback(
    async (formID: string | number, formData: Record<string, unknown>) => {
      setError(undefined)
      const dataToSend = Object.entries(formData).map(([name, value]) => ({
        field: name,
        value,
      }))
      setIsLoading(true)
      const res = await submitForm({ formID: formID, dataToSend })
      if (res.success) {
        setIsLoading(false)
        setError(undefined)
        setHasSubmitted(true)
        successCallback?.()
      }
      if (!res.success) {
        setError({ status: res.status, message: res.message })
        setIsLoading(false)
        setHasSubmitted(false)
      }
    },
    [successCallback],
  )
  return { isLoading, hasSubmitted, error, submit }
}
