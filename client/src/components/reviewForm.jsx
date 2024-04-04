import { useEffect, useState } from 'react'
import { changeFormVisibility } from '../reducers/formVisibilityReducer'
import { createReview } from '../requests/reviewRequests'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

function Radio({ value, name, state, handleChange }) {
  return (
    <div className="flex items-center gap-1">
      <label htmlFor="rating1">{value}</label>
      <input
        type="radio"
        value={value}
        name={name}
        id={`${name}${value}`}
        checked={state[name] == value}
        onChange={handleChange}
        className="border border-blue-950"
        required
      />
    </div>
  )
}

export default function reviewForm({ locationId }) {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.formVisibility)
  const location = useLocation()
  const radioOptions = [1, 2, 3, 4, 5]

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    rating: 1,
    userName: '',
  })

  function closeForm() {
    dispatch(changeFormVisibility(false))
    setFormData({
      title: '',
      text: '',
      rating: 1,
      userName: '',
    })
  }

  useEffect(() => {
    closeForm()
  }, [location])

  const queryClient = useQueryClient()
  const newReviewMutation = useMutation({
    mutationFn: ({ locationId, data }) => createReview(locationId, data),
    onSuccess: data => {
      const reviews = queryClient.getQueryData(['reviews', locationId])
      queryClient.setQueryData(['reviews', locationId], [...reviews, data])

      closeForm()
    },
  })

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    newReviewMutation.mutate({ locationId: locationId, data: formData })
  }

  return (
    <form onSubmit={handleSubmit} className={`${visible ? 'block' : 'hidden'}`}>
      <fieldset className="grid grid-cols-[max-content_1fr]">
        <legend className="text-lg">Write a review</legend>
        <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleFormChange}
            className="border border-blue-950"
            required
          />
        </div>
        <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
          <p>Rating *</p>
          <div className="flex justify-around items-stretch">
            {radioOptions.map(opt => (
              <Radio
                key={opt}
                value={opt}
                name={'rating'}
                state={formData}
                handleChange={handleFormChange}
              />
            ))}
          </div>
        </div>
        <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
          <label htmlFor="text">Text *</label>
          <textarea
            name="text"
            id="text"
            value={formData.text}
            onChange={handleFormChange}
            className="border border-blue-950"
            required
          />
        </div>
        <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={formData.userName}
            onChange={handleFormChange}
            className="border border-blue-950"
          />
        </div>
        <div className="my-2 grid col-span-2">
          <button
            type="submit"
            className="bg-blue-300 border border-blue-800 rounded-sm p-1"
          >
            Send
          </button>
        </div>
      </fieldset>
      <div className="my-2 grid col-span-2">
        <button
          type="button"
          className="border border-blue-950 rounded-sm p-1"
          onClick={closeForm}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
