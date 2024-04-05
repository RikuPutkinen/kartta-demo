import { Link } from 'react-router-dom'
import FavoriteButton from './favoriteButton'

export default function LocationListItem({ location }) {
  const { id, name, description, kuvaUrl, rating, reviewCount } = location
  return (
    <li className="grid grid-cols-[6rem_1fr] gap-2 h-24 my-3 border border-blue-400">
      <div>
        <img src={kuvaUrl} alt={`Image of ${name}`} />
      </div>
      <div className="flex gap-2">
        <Link to={`/locations/${id}`} className="block flex-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p>{description}</p>
        </Link>
        <FavoriteButton id={id} />
      </div>
    </li>
  )
}
