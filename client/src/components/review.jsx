import Icon from '@mdi/react'
import { mdiThumbUp, mdiThumbDown, mdiAccount } from '@mdi/js'
import dateFormatter from '../utils/dateFormatter'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateReview } from '../requests/reviewRequests'

export default function Review({ review }) {
  const queryClient = useQueryClient()
  const { title, text, rating, dateAdded, userName, likes, dislikes } = review
  const locationId = review.markerId
  const date = new Date(dateAdded)

  const reviewUpdateMutation = useMutation({
    mutationFn: updateReview,
    onSuccess: data => {
      queryClient.setQueryData(['reviews', locationId], old =>
        old.map(r => (r.id === data.id ? data : r))
      )
    },
  })

  function handleUpdate(type) {
    const reviewToUpdate = {
      ...review,
    }

    switch (type) {
      case 'like':
        reviewToUpdate.likes = reviewToUpdate.likes + 1
        break
      case 'dislike':
        reviewToUpdate.dislikes = reviewToUpdate.dislikes + 1
        break
      default:
        break
    }

    reviewUpdateMutation.mutate(reviewToUpdate)
  }

  return (
    <li className="border border-blue-400 p-2 my-3">
      <h4 className="flex text-lg font-medium">
        {rating}/5, {title}
      </h4>
      <p className="text-sm">{dateFormatter.format(date)}</p>
      <p className="my-1">{text}</p>
      <div className="flex justify-between items-center">
        <p className="flex gap-1">
          <Icon path={mdiAccount} size={1} className="text-gray-800" />
          <span>{userName || 'Anonymous'}</span>
        </p>
        <div className="flex gap-3">
          <div className="flex gap-1 items-center">
            <button
              onClick={() => handleUpdate('like')}
              className="hover:bg-gray-200 p-1 rounded-full"
            >
              <Icon path={mdiThumbUp} size={1} className="text-gray-800" />
            </button>
            <span>{likes}</span>
          </div>
          <div className="flex gap-1 items-center">
            <button
              onClick={() => handleUpdate('dislike')}
              className="hover:bg-gray-200 p-1 rounded-full"
            >
              <Icon path={mdiThumbDown} size={1} className="text-gray-800" />
            </button>
            <span>{dislikes}</span>
          </div>
        </div>
      </div>
    </li>
  )
}
