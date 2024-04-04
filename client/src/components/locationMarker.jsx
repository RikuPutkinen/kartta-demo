import { Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import fix from '../utils/fix'
import FavoriteButton from './favoriteButton'

export default function LocationMarker({ data }) {
  const { id, name, description, kuvaUrl, location, rating, reviewCount } = data
  const [lng, lat] = location.coordinates
  return (
    <Marker position={{ lat, lng }}>
      <Popup>
        <div className="absolute left-2">
          <FavoriteButton id={id} />
        </div>
        <img
          src={kuvaUrl}
          alt={`Image of ${name}`}
          className="h-20 w-40 object-cover object-center"
          width={160}
        />
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-500">
          {fix(lat, 6)}&deg;, {fix(lng, 6)}&deg;
        </p>
        <p>{description}</p>
        {reviewCount === 0 ? null : <p>{fix(rating, 1)} / 5</p>}
        <p className="text-gray-500">{reviewCount} reviews</p>
        <p className="text-blue-600">
          <Link to={`/locations/${id}`}>Read reviews</Link>
        </p>
      </Popup>
    </Marker>
  )
}
