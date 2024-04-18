import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { CameraIcon } from '../utils/icons'
import { useState } from 'react'
import { useWeatherCamera } from '../hooks/weatherCameraHooks'

function CameraContainer({ id }) {
  const res = useWeatherCamera(id)
  console.log('fetching...')

  if (res.isLoading) {
    return <div>Loading...</div>
  }
  if (!res.isSuccess) {
    return <div>Error :(</div>
  }
  console.log(res.data)
  return <div>Success :)</div>
}

export default function CameraMarker({ data }) {
  const [lng, lat] = data.geometry.coordinates.slice(0, 2)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Marker
      position={{ lat, lng }}
      icon={CameraIcon}
      eventHandlers={{
        popupopen: () => setIsOpen(true),
        popupclose: () => setIsOpen(false),
      }}
    >
      <Popup>{isOpen && <CameraContainer id={data.id} />}</Popup>
    </Marker>
  )
}
