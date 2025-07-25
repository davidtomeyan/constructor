import { envPublic } from '@/lib/env'

interface SubmitFormProps {
  formID: string | number
  dataToSend: Record<string, any>
}

type SubmitFormResponse =
  | {
      success: true
    }
  | { success: false; status?: number | string ; message: string  }

export async function submitForm({
  formID,
  dataToSend,
}: SubmitFormProps): Promise<SubmitFormResponse> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const req = await fetch(`${envPublic.cmsUrl}/api/form-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: formID,
        submissionData: dataToSend,
      }),
    })

    const res = await req.json()
    console.log(res)
    if (req.status >= 400) {
      return {
        success: false,
        message: res.errors?.[0]?.message || 'Internal Server Error',
        status: res.status,
      }
    }
    return {
      success: true,
    }
  } catch (err) {
    console.warn(err)
    return {
      status: 500,
      success: false,
      message: 'Something went wrong.',
    }
  }
}
