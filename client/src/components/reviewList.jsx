import Review from './review'

export default function ReviewList({ reviews }) {
  return (
    <ul>
      {reviews.map(r => (
        <Review review={r} key={r.id} />
      ))}
    </ul>
  )
}
