import { Link } from 'react-router-dom'
import FavoriteButton from './favoriteButton'

function Favorite({ location }) {
  const { id, name, description, kuvaUrl, rating, reviewCount } = location
  return (
    <li className="grid grid-cols-[6rem_1fr] gap-2 h-24 border border-blue-400">
      <div>
        <img src={kuvaUrl} alt={`Image of ${name}`} />
      </div>
      <div className="flex">
        <Link to={`/locations/${id}`} className="block flex-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p>{description}</p>
        </Link>
        <FavoriteButton id={id} />
      </div>
    </li>
  )
}

export default function FavoriteList({ favorites }) {
  return (
    <ul className="mt-4">
      {favorites.map(l => (
        <Favorite location={l} key={l.id} />
      ))}
    </ul>
  )
}