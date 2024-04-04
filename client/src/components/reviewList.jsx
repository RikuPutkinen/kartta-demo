import Review from './review'

export default function ReviewList({ reviews }) {
  return (
    <ul className="p-2">
      {reviews.map(r => (
        <Review review={r} key={r.id} />
      ))}
    </ul>
  )
}
