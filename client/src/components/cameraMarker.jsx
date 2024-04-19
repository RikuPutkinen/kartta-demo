import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { CameraIcon } from '../utils/icons'
import { useState } from 'react'
import { useWeatherCamera } from '../hooks/weatherCameraHooks'
import { Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function CameraContainer({ id }) {
  const res = useWeatherCamera(id)

  if (res.isLoading) {
    return <div>Loading...</div>
  }
  if (!res.isSuccess) {
    return <div>Error :(</div>
  }

  const { dataUpdatedTime, names, presets } = res.data.properties
  console.log(presets)
  console.log(dataUpdatedTime)
  const lastUpdated = new Date(dataUpdatedTime)
  return (
    <div>
      <Carousel slide={false} indicators={false} interval={null}>
        {presets.map(p => {
          return (
            <Carousel.Item key={p.id}>
              <div>
                <img src={p.imageUrl} />
              </div>
              <Carousel.Caption>
                <h4>{p.presentationName}</h4>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
      </Carousel>
      <h3 className="text-base font-bold">{names.en}</h3>
      <p>Last updated: {lastUpdated.toString()}</p>
    </div>
  )
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
      <Popup>
        <div className="w-64">{isOpen && <CameraContainer id={data.id} />}</div>
      </Popup>
    </Marker>
  )
}
