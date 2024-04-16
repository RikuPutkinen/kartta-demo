import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { Icon } from 'leaflet'

const MarkerIcon = new Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export default MarkerIcon
