import { useSelector } from 'react-redux'
import FavoriteList from './favoriteList'
import { useLocationQuery } from '../hooks/locationHooks'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

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

  return (
    <div className="min-h-full w-96 bg-white left-0 top-0 bottom-0 p-2 drop-shadow-lg z-[2000]">
      <div className=" absolute right-2 hover:bg-gray-200 rounded-full">
        <Link to={'/'}>
          <Icon path={mdiClose} size={1.5} className="text-gray-800" />
        </Link>
      </div>
      <h2 className="text-2xl font-bold">Favorites</h2>
      <FavoriteList favorites={favorites} />
    </div>
  )
}