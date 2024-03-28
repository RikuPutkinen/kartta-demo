import React from 'react'
import {
  MapContainer,
  ScaleControl,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import MarkerForm from './markerForm'
import LocationMarker from './locationMarker'

import { useLocationQuery } from '../hooks/locationHooks'

function MyMap() {
  const result = useLocationQuery()

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  const locations = result.data

  return (
    <MapContainer
      center={[62.6, 29.76]}
      zoom={15}
      zoomControl={false}
      className="h-full w-full"
    >
      <ScaleControl position="bottomright" />
      <ZoomControl position="bottomright" />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerForm />
      {locations.map(marker => (
        <LocationMarker key={marker.id} data={marker} />
      ))}
    </MapContainer>
  )
}
export default MyMap
