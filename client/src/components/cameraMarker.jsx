import { Marker, Popup } from 'react-leaflet'
import { CameraIcon } from '../utils/icons'

export default function CameraMarker({ data }) {
  console.log(data)
  const [lng, lat] = data.geometry.coordinates.slice(0, 2)
  console.log(lat, lng)
  return <Marker position={{ lat, lng }} icon={CameraIcon}></Marker>
}
