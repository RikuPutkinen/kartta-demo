import { useState } from 'react'
import { changeFormVisibility } from '../reducers/formVisibilityReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function reviewForm({ location }) {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.formVisibility)

  const { id } = location
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    rating: '1',
    nickname: '',
  })

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    console.log(formData)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit} className={`${visible ? 'block' : 'hidden'}`}>
      <fieldset className="grid grid-cols-[max-content_1fr]">
        <legend className="text-lg">Write a review</legend>
        <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleFormChange}
            className="border border-blue-950"
            required
          />
        </div>
        <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
          <p>Rating</p>
          <div className="flex justify-around items-stretch">
            <div className="flex items-center gap-1">
              <label htmlFor="rating1">1</label>
              <input
                type="radio"
                value={1}
                name="rating"
                id="rating1"
                onChange={handleFormChange}
                className="border border-blue-950"
                required
              />
            </div>
            <div className="flex items-center gap-1">
              <label htmlFor="rating2">2</label>
              <input
                type="radio"
                value={2}
                name="rating"
                id="rating2"
                onChange={handleFormChange}
                className="border border-blue-950"
                required
              />
            </div>
            <div className="flex items-center gap-1">
              <label htmlFor="rating3">3</label>
              <input
                type="radio"
                value={3}
                name="rating"
                id="rating3"
                onChange={handleFormChange}
                className="border border-blue-950"
                required
              />
            </div>
            <div className="flex items-center gap-1">
              <label htmlFor="rating4">4</label>
              <input
                type="radio"
                value={4}
                name="rating"
                id="rating4"
                onChange={handleFormChange}
                className="border border-blue-950"
                required
              />
            </div>
            <div className="flex items-center gap-1">
              <label htmlFor="rating5">5</label>
              <input
                type="radio"
                value={5}
                name="rating"
                id="rating5"
                onChange={handleFormChange}
                className="border border-blue-950"
                required
              />
            </div>
          </div>
        </div>
        <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
          <label htmlFor="text">Text</label>
          <textarea
            name="text"
            id="text"
            onChange={handleFormChange}
            className="border border-blue-950"
            required
          />
        </div>
        <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            onChange={handleFormChange}
            className="border border-blue-950"
            required
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
          onClick={() => dispatch(changeFormVisibility(false))}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
