import calculateDistance from './calculateDistance'

export default function addDistances(locations, center) {
  return locations.map(location => {
    const distance = calculateDistance(location, center)
    return { ...location, distance }
  })
}
