import React from 'react'
import { Routes, Route, useMatch, Link } from 'react-router-dom'

import MapArea from './components/mapArea'
import { useLocationQuery } from './hooks/locationHooks'
import LocationPanel from './components/locationPanel'
import FavoritePanel from './components/favoritePanel'
import Icon from '@mdi/react'
import { mdiStar } from '@mdi/js'
function App() {
  const result = useLocationQuery()
  const match = useMatch('locations/:id')

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const locations = result.data
  const location = match ? locations.find(l => l.id === match.params.id) : null

  return (
    <div className="flex w-full min-h-dvh relative">
      <Routes>
        <Route
          path={'/locations/:id'}
          element={<LocationPanel location={location} />}
        />
        <Route path={'/favorites'} element={<FavoritePanel />} />
        <Route path={'/'} element={null} />
      </Routes>

      <MapArea />
      <div className="absolute left-1 top-1 z-[1000] bg-white rounded-md hover:bg-gray-100 ">
        <Link to={'/favorites'}>
          <Icon
            path={mdiStar}
            size={2}
            className="text-blue-500 rounded-full p-1"
          />
        </Link>
      </div>
    </div>
  )
}

export default App
