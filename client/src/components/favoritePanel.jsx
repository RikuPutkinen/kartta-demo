import { useSelector } from 'react-redux'
import LocationList from './locationList'
import { useLocationQuery } from '../hooks/locationHooks'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import Panel from './panel'

function Head() {
  return (
    <>
      <h2 className="text-2xl font-bold">Favorites</h2>
    </>
  )
}

export default function FavoritePanel() {
  const favoriteLocations = useSelector(state => state.favoriteLocations)
  const result = useLocationQuery()

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  const locations = result.data

  const favorites = favoriteLocations.map(id =>
    locations.find(l => l.id === id)
  )

  return <Panel head={<Head />} list={<LocationList locations={favorites} />} />
}
