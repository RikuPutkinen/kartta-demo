import React from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'

import MapArea from './components/mapArea'
import SidePanel from './components/sidePanel'
import { useLocationQuery } from './hooks/locationHooks'

function App() {
  const result = useLocationQuery()
  const match = useMatch('locations/:id')

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const locations = result.data
  const location = match ? locations.find(l => l.id === match.params.id) : null

  return (
    <div className="flex w-full min-h-dvh">
      <Routes>
        <Route
          path={'/locations/:id'}
          element={<SidePanel location={location} />}
        />
        <Route path={'/'} element={null} />
      </Routes>
      <MapArea />
    </div>
  )
}

export default App
