import ReviewForm from './reviewForm'
import ReviewList from './reviewList'
import { changeFormVisibility } from '../reducers/formVisibilityReducer'
import { useReviewQuery } from '../hooks/reviewHooks'
import { useDispatch, useSelector } from 'react-redux'
import FavoriteButton from './favoriteButton'
import fix from '../utils/fix'
import Panel from './panel'

function Head({ location }) {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.formVisibility)
  const { id, name, description, kuvaUrl, rating, reviewCount } = location
  return (
    <>
      <div className="absolute left-2">
        <FavoriteButton id={id} />
      </div>
      <div>
        <img
          src={kuvaUrl}
          alt={`Image of ${name}`}
          className="h-20 w-full object-cover object-center"
        />
        <h2 className="text-xl font-bold">{name}</h2>
        <p>{description}</p>
        {reviewCount === 0 ? null : <p>{fix(rating, 1)} / 5</p>}
        <p className="text-gray-500">{reviewCount} reviews</p>
      </div>
      <h3 className="text-xl font-bold sticky mt-4">Reviews</h3>
      <button
        className={`bg-blue-300 border border-blue-900 rounded-sm p-1 mt-2 ${visible ? 'hidden' : 'block'}`}
        onClick={() => dispatch(changeFormVisibility(true))}
      >
        Post a review
      </button>
      <ReviewForm locationId={location.id} />
    </>
  )
}

export default function LocationPanel({ location }) {
  const req = useReviewQuery(location.id)

  if (req.isLoading) {
    return <div>Loading...</div>
  }

  const reviews = req.data

  return (
    <Panel
      head={<Head location={location} />}
      list={<ReviewList reviews={reviews} />}
    />
  )
}
