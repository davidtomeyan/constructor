import { Block } from 'payload'

export const LogosBlock: Block = {
  slug: 'logos-block',
  interfaceName: 'LogosBlock',
  fields: [
    {
      interfaceName: 'LogoBlock',
      name: 'logos',
      type: 'array',
      fields: [
        {
          type: 'text',
          name: 'url',
          label: 'Url',
        },
        {
          required:true,
          type:"upload",
          name:"image",
          relationTo:"media",
        }
      ],
    },
  ],
}
