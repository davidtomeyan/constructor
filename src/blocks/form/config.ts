import { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'form-block',
  interfaceName: 'IFormBlock',
  labels: {
    singular: 'Form Block',
    plural: 'Form Blocks',
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    }
  ],
}
