"use client"
import '@smastrom/react-rating/style.css'
import { Rating, RoundedStar} from '@smastrom/react-rating';


export function ReadOnlyRating({rating}: {rating: number}) {
  return (
    <Rating
      orientation="horizontal"
      readOnly
      itemStyles={{itemShapes:RoundedStar,activeFillColor: '#f59e0b', inactiveFillColor: '#ffedd5'}}
      value={rating}
      className="max-w-30"
    />
  )
}