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
          <label htmlFor="title">Score</label>
          <input
            type="number"
            min={1}
            max={5}
            name="score"
            id="score"
            onChange={handleFormChange}
            className="border border-blue-950"
            required
          />
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
