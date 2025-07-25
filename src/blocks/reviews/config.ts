import { Block } from 'payload'

export const ReviewsBlock: Block = {
  slug: 'reviews-block',
  interfaceName: 'IReviewsBlock',
  fields: [
    { type: 'relationship', name: 'reviews', relationTo: 'reviews', hasMany: true, maxRows: 15
    },
  ],
}
