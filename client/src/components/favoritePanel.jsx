import { useSelector, useDispatch } from 'react-redux'
import LocationList from './locationList'
import { useLocationQuery } from '../hooks/locationHooks'
import { changeFilter } from '../reducers/markerFilterReducer'
import Panel from './panel'
import { useEffect } from 'react'

function Head() {
  return (
    <>
      <h2 className="text-2xl font-bold">Favorites</h2>
    </>
  )
}

export default function FavoritePanel() {
  const favoriteLocations = useSelector(state => state.favoriteLocations)
  const res = useLocationQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeFilter({ type: 'favorites' }))
  }, [dispatch])

  if (res.isLoading) {
    return <div>Loading...</div>
  }

  if (res.isError) {
    return <div>Error connecting to server</div>
  }

  const locations = res.data
  const favorites = favoriteLocations.map(id =>
    locations.find(l => l.id === id)
  )

  return <Panel head={<Head />} list={<LocationList locations={favorites} />} />
}
