// https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates#365853

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180
}

export default function calculateDistance(location, center) {
  let [lon1, lat1] = location.location.coordinates
  let { lat: lat2, lng: lon2 } = center

  const earthRadiusKm = 6371

  const dLat = degreesToRadians(lat2 - lat1)
  const dLon = degreesToRadians(lon2 - lon1)

  lat1 = degreesToRadians(lat1)
  lat2 = degreesToRadians(lat2)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadiusKm * c
}
