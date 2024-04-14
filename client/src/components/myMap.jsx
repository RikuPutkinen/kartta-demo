import {
  MapContainer,
  ScaleControl,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import NewMarker from './markerForm'
import LocationMarker from './locationMarker'
import { changeFilter } from '../reducers/markerFilterReducer'

import { useLocationQuery } from '../hooks/locationHooks'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import addDistances from '../utils/addDistances'

function MyMap() {
  const result = useLocationQuery()
  const favoriteLocations = useSelector(state => state.favoriteLocations)
  const markerFilter = useSelector(state => state.markerFilter)
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(changeFilter({ type: 'all' }))
    }
  }, [dispatch, location])

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  let locations = result.data

  if (markerFilter.type === 'favorites') {
    locations = locations.filter(l => favoriteLocations.includes(l.id))
  }
  if (markerFilter.type === 'radius') {
    locations = addDistances(locations, markerFilter.center)
    locations = locations.filter(l => l.distance <= markerFilter.radius)
  }

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
      <NewMarker />
      {locations.map(marker => (
        <LocationMarker key={marker.id} data={marker} />
      ))}
    </MapContainer>
  )
}
export default MyMap
