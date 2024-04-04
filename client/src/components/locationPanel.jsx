import ReviewForm from './reviewForm'
import ReviewList from './reviewList'
import { Link } from 'react-router-dom'
import { changeFormVisibility } from '../reducers/formVisibilityReducer'
import { useReviewQuery } from '../hooks/reviewHooks'
import { useDispatch, useSelector } from 'react-redux'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import FavoriteButton from './favoriteButton'
import fix from '../utils/fix'

export default function LocationPanel({ location }) {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.formVisibility)
  const { id, name, description, kuvaUrl, rating, reviewCount } = location

  const req = useReviewQuery(id)

  if (req.isLoading) {
    return <div>Loading...</div>
  }

  const reviews = req.data

  return (
    <div className="max-h-screen w-96 bg-white left-0 top-0 bottom-0 drop-shadow-lg z-[2000] relative overflow-x-auto">
      <div className="bg-white sticky top-0 pb-2 drop-shadow-md p-2">
        <div className="absolute left-2">
          <FavoriteButton id={id} />
        </div>
        <div className=" absolute right-2 hover:bg-gray-200 rounded-full">
          <Link to={'/'}>
            <Icon path={mdiClose} size={1.5} className="text-gray-800" />
          </Link>
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
      </div>
      <ReviewList reviews={reviews} />
    </div>
  )
}
