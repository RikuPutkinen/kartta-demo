import axios from 'axios'

export async function createMarker(markerData) {
  const res = await axios.post(
    '/api/markers',
    {
      name: markerData.name,
      location: {
        coordinates: [markerData.longitude, markerData.latitude],
      },
      description: markerData.description,
      imageUrl: markerData.imageUrl,
    },
    {
      headers: {
        'Content-Type': 'Application/JSON',
      },
    }
  )
  return res.data
}
