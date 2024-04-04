import { useDispatch, useSelector } from 'react-redux'
import Icon from '@mdi/react'
import { mdiStarPlusOutline, mdiStarMinus } from '@mdi/js'
import {
  addToFavorites,
  removeFromFavorites,
} from '../reducers/favoriteLocationReducer'

export default function FavoriteButton({ id }) {
  const dispatch = useDispatch()
  const favoriteLocations = useSelector(state => state.favoriteLocations)
  const isFavorite = favoriteLocations.includes(id)

  function toggleFavorite() {
    if (isFavorite) {
      dispatch(removeFromFavorites(id))
    } else {
      dispatch(addToFavorites(id))
    }
  }

  return (
    <div>
      <button onClick={toggleFavorite}>
        <Icon
          path={isFavorite ? mdiStarMinus : mdiStarPlusOutline}
          size={1.5}
          className="text-blue-500 hover:bg-blue-100 rounded-full"
        />
      </button>
    </div>
  )
}
