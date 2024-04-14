import Panel from './panel'
import { useLocationQuery } from '../hooks/locationHooks'
import LocationList from './locationList'
import { useSelector } from 'react-redux'
import addDistances from '../utils/addDistances'

function Head() {
  return <h2 className="text-2xl font-bold">Results</h2>
}

export default function ResultPanel() {
  const res = useLocationQuery()
  const markerFilter = useSelector(state => state.markerFilter)

  if (res.isLoading) {
    return <div>Loading...</div>
  }

  const locations = res.data

  const locationsWithDistances = addDistances(locations, markerFilter.center)

  const filteredLocations = locationsWithDistances.filter(
    l => l.distance <= markerFilter.radius
  )

  return (
    <Panel
      head={<Head />}
      list={<LocationList locations={filteredLocations} />}
    />
  )
}
