import { useState } from 'react'
import ReviewForm from './reviewForm'
import { Link } from 'react-router-dom'
import { changeFormVisibility } from '../reducers/formVisibilityReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function SidePanel({ location }) {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.formVisibility)
  const { name, description, kuvaUrl, score, reviewCount } = location

  return (
    <div className="min-h-full w-96 bg-white left-0 top-0 bottom-0 p-2 drop-shadow-lg">
      <div className="flex justify-end">
        <Link to={'/'}>X</Link>
      </div>
      <div>
        <img
          src={kuvaUrl}
          alt={`Image of ${name}`}
          className="h-20 w-full object-cover object-center"
        />
        <h2 className="text-xl font-bold">{name}</h2>
        <p>{description}</p>
        {reviewCount === 0 ? null : <p>{score} / 5</p>}
        <p className="text-gray-500">{reviewCount} reviews</p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Reviews</h3>
        <button
          className={`bg-blue-300 border border-blue-900 rounded-sm p-1 ${visible ? 'hidden' : 'block'}`}
          onClick={() => dispatch(changeFormVisibility(true))}
        >
          Post a review
        </button>
        <ReviewForm location={location} visible={visible} />
      </div>
    </div>
  )
}
