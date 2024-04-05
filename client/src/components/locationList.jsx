import LocationListItem from './locationListItem'

export default function LocationList({ locations }) {
  return (
    <ul className="p-2">
      {locations.map(l => (
        <LocationListItem location={l} key={l.id} />
      ))}
    </ul>
  )
}
