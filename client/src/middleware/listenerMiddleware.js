import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import {
  addToFavorites,
  removeFromFavorites,
} from '../reducers/favoriteLocationReducer'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: isAnyOf(addToFavorites, removeFromFavorites),
  effect: (action, listenerApi) => {
    const favorites = listenerApi.getState().favoriteLocations
    localStorage.setItem('favorites', JSON.stringify(favorites))
  },
})
