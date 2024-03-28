import React, { useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMarker } from '../requests/locationRequests'

export default function MarkerForm() {
  const [position, setPosition] = useState(null)
  const [data, setData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  })
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
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

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        <form action="http://localhost:3001" onSubmit={handleSubmit}>
          <fieldset className="grid grid-cols-[max-content_30ch]">
            <legend className="text-lg">Lisää markkeri</legend>
            <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
              <label htmlFor="name">Nimi</label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="border border-blue-950"
                required
              />
            </div>
            <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
              <label htmlFor="name">Kuvaus</label>
              <input
                type="text"
                id="description"
                name="description"
                value={data.description}
                onChange={handleChange}
                className="border border-blue-950"
                required
              />
            </div>
            <div className="my-2 grid grid-cols-subgrid col-span-2 gap-2">
              <label htmlFor="name">Kuvan url</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={data.imageUrl}
                onChange={handleChange}
                className="border border-blue-950"
                required
              />
            </div>
            <div className="my-2 grid col-span-2">
              <input
                type="submit"
                className="bg-blue-300 border border-blue-800 rounded-sm p-1"
              />
            </div>
          </fieldset>
        </form>
      </Popup>
    </Marker>
  )
}
