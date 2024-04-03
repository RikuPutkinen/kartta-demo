import { createSlice } from '@reduxjs/toolkit'

const favoriteLocationSlice = createSlice({
  name: 'favoriteLocations',
  initialState: [],
  reducers: {
    addToFavorites(state, action) {
      return [...state, action.payload]
    },
    removeFromFavorites(state, action) {
      return state.filter(item => item !== action.payload)
    },
  },
})

export const { addToFavorites, removeFromFavorites } =
  favoriteLocationSlice.actions
export default favoriteLocationSlice.reducer
