import { useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMarker } from '../requests/locationRequests'
import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/markerFilterReducer'
import Icon from '@mdi/react'
import { mdiMapMarkerPlusOutline, mdiCrosshairs } from '@mdi/js'
import { useNavigate } from 'react-router-dom'
import MarkerIcon from '../utils/icon'

function MarkerForm({ position }) {
  const [data, setData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  })

  const queryClient = useQueryClient()
  const newMarkerMutation = useMutation({
    mutationFn: createMarker,
    onSuccess: data => {
      const locations = queryClient.getQueryData(['locations'])
      queryClient.setQueryData(['locations'], [...locations, data])
    },
  })

  async function handleSubmit(e) {
    e.preventDefault()
    newMarkerMutation.mutate({
      name: data.name,
      longitude: position.lng,
      latitude: position.lat,
      description: data.description,
      imageUrl: data.imageUrl,
    })
  }

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="grid grid-cols-[max-content_30ch]">
        <legend className="text-lg text-center w-full">Add marker</legend>
        <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
          <label htmlFor="name" className="self-center text-base">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="border border-blue-950 p-1 rounded-md focus:outline-blue-500 focus:outline focus:outline-2 focus:border-transparent"
            required
          />
        </div>
        <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
          <label htmlFor="name" className="self-center text-base">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="border border-blue-950 p-1 rounded-md focus:outline-blue-500 focus:outline focus:outline-2 focus:border-transparent"
            required
          />
        </div>
        <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
          <label htmlFor="name" className="self-center text-base">
            Image url
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={data.imageUrl}
            onChange={handleChange}
            className="border border-blue-950 p-1 rounded-md focus:outline-blue-500 focus:outline focus:outline-2 focus:border-transparent"
            required
          />
        </div>
        <div className="my-2 grid col-span-2">
          <button
            type="submit"
            className="bg-blue-300 border border-blue-800 rounded-sm p-1"
          >
            Add
          </button>
        </div>
      </fieldset>
    </form>
  )
}

function SearchForm({ position }) {
  const [radius, setRadius] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(
      changeFilter({
        type: 'radius',
        radius: radius,
        center: {
          lat: position.lat,
          lng: position.lng,
        },
      })
    )
    navigate('/results')
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="grid grid-cols-[max-content_30ch]">
        <legend className="text-lg text-center w-full">Search Nearby</legend>
        <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
          <label htmlFor="radius" className="self-center text-base">
            Radius
          </label>
          <div className="flex gap-1">
            <input
              id="radius"
              value={radius}
              onChange={e => setRadius(e.target.value)}
              min={0}
              className="border border-blue-950 p-1 rounded-md focus:outline-blue-500 focus:outline focus:outline-2 focus:border-transparent"
            />
            <span className="text-base">km</span>
          </div>
        </div>
        <div className="my-2 grid col-span-2">
          <button
            type="submit"
            className="bg-blue-300 border border-blue-800 rounded-sm p-1"
          >
            Search
          </button>
        </div>
      </fieldset>
    </form>
  )
}

function Options({ setTab }) {
  function handleClick(e, num) {
    e.stopPropagation()
    setTab(num)
  }

  return (
    <div className="text-blue-500 flex">
      <button
        className="flex flex-col items-center self-end p-2 w-32 hover:bg-blue-50 rounded-md"
        onClick={e => handleClick(e, 1)}
      >
        <Icon path={mdiMapMarkerPlusOutline} size={2} />
        <p>Add marker</p>
      </button>
      <div className="border-r border-blue-500"></div>
      <button
        className="flex flex-col items-center p-2 w-32 hover:bg-blue-50 rounded-md"
        onClick={e => handleClick(e, 2)}
      >
        <Icon path={mdiCrosshairs} size={2} />
        <p>Search Nearby</p>
      </button>
    </div>
  )
}

export default function NewMarker() {
  const [position, setPosition] = useState(null)
  const [tab, setTab] = useState(0)

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
      setTab(0)
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={MarkerIcon}>
      <Popup>
        {tab === 0 ? (
          <Options setTab={setTab} />
        ) : tab === 1 ? (
          <MarkerForm position={position} />
        ) : (
          <SearchForm position={position} />
        )}
      </Popup>
    </Marker>
  )
}
