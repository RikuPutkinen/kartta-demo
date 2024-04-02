const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
})

function Review({ review }) {
  const { title, text, rating, dateAdded, userName, score, likes, dislikes } =
    review

  const date = new Date(dateAdded)

  return (
    <li className="border border-blue-200 p-2 my-3">
      <h4 className="flex text-lg font-medium">
        {rating}/5, {title}
      </h4>
      <p className="text-sm">{dateFormatter.format(date)}</p>
      <p className="my-1">{text}</p>
      <p>{userName || 'Anonymous'}</p>
    </li>
  )
}

export default function ReviewList({ reviews }) {
  return (
    <ul>
      {reviews.map(r => (
        <Review review={r} key={r.id} />
      ))}
    </ul>
  )
}
