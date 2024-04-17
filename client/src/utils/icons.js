import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { Icon } from 'leaflet'
import cameraIconPng from '../assets/camera-icon.png'

export const MarkerIcon = new Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export const CameraIcon = new Icon({
  iconUrl: cameraIconPng,
  iconSize: [25, 25],
  iconAnchor: [12, 12],
})
