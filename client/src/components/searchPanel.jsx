import { useState } from 'react'
import Panel from './panel'
import { useLocationQuery } from '../hooks/locationHooks'
import LocationList from './locationList'

function Head({ query, setQuery }) {
  return (
    <>
      <h2 className="text-2xl font-bold">Search</h2>
      <form>
        <input
          type="text"
          name="search"
          id="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border border-blue-950 p-1 rounded-md focus:outline-blue-500 focus:outline focus:outline-2 focus:border-transparent"
          placeholder="Search"
        />
      </form>
    </>
  )
}

export default function SearchPanel() {
  const [query, setQuery] = useState('')
  const res = useLocationQuery()

  if (res.isLoading) {
    return <div>Loading...</div>
  }

  if (res.isError) {
    return <div>Error connecting to server</div>
  }

  const locations = res.data
  const filteredLocations = locations.filter(l =>
    l.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Panel
      head={<Head query={query} setQuery={setQuery} />}
      list={<LocationList locations={filteredLocations} />}
    />
  )
}
