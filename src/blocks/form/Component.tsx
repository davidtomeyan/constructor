'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { IFormBlock } from '@/payload-types'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FormFields } from '@/blocks/form/fields'
import { useSubmitForm } from '@/blocks/form/use-submit-form'
import { Spinner } from '@/components/ui/spinner'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { linkJSXConverter } from '@/components/rich-text/converters/link'
import { internalDocToHref } from '@/components/rich-text/converters/internal-doc-to-href'
import { InViewElement } from '@/components/in-view-element'
import { hasText } from '@payloadcms/richtext-lexical/shared'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export function FormBlock(props?: IFormBlock) {
  const formMethods = useForm({ mode: 'onTouched' })
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const router = useRouter()
  const { submit, isLoading, hasSubmitted, error } = useSubmitForm({
    successCallback: formMethods.reset,
  })
  useEffect(() => {
    if (!isLoading && hasSubmitted && !error && typeof props?.form === 'object') {
      if (props?.form.confirmationType === 'redirect' && props?.form.redirect?.url) {
        router.replace(props?.form.redirect.url)
      }
      if (props?.form.confirmationType && hasText(props.form.confirmationMessage)) {
        setOpenDialog(true)
      }
    }
  }, [hasSubmitted, error, router, props?.form, isLoading])
  if (!props || typeof props.form !== 'object' || !props.form.fields?.length) return null

  const { form } = props
  const { submitButtonLabel, confirmationType, confirmationMessage, id: formID } = form

  return (
    <InViewElement
      asChild
      className="opacity-0 translate-y-10 duration-400 transition-[opacity,translate] data-[inview=true]:translate-y-0 data-[inview=true]:opacity-100"
    >
      <div className="text-start w-full max-w-xl min-w-0">
        <Form {...formMethods}>
          <form
            id={`${formID}`}
            onSubmit={formMethods.handleSubmit(async (data) => {
              await submit(formID, data)
            })}
          >
            <div className="space-y-5">
              <FormFields form={props.form} disabled={isLoading} control={formMethods.control} />
            </div>
            <div className="px-1.5 mt-10 flex justify-center">
              <Button disabled={isLoading} className="w-full sm:max-w-xs" type="submit">
                {isLoading && <Spinner />} {submitButtonLabel}
              </Button>
            </div>
          </form>
        </Form>
        {confirmationType === 'message' && (
          <Dialog onOpenChange={setOpenDialog} open={openDialog}>
            <DialogContent aria-describedby={undefined}>
              <DialogHeader className="sr-only">
                <DialogTitle>
                  <VisuallyHidden>Confirmation</VisuallyHidden>
                </DialogTitle>
              </DialogHeader>
              {confirmationMessage && (
                <RichText
                  className="prose prose-base prose-violet dark:prose-invert"
                  converters={({ defaultConverters }) => ({
                    ...defaultConverters,
                    ...linkJSXConverter({ internalDocToHref }),
                  })}
                  data={confirmationMessage}
                />
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </InViewElement>
  )
}
