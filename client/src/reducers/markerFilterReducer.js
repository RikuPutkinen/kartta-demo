import { createSlice } from '@reduxjs/toolkit'

const markerFilterSlice = createSlice({
  name: 'markerFilter',
  initialState: { type: 'all' },
  reducers: {
    changeFilter(state, action) {
      return action.payload
    },
  },
})

export const { changeFilter } = markerFilterSlice.actions
export default markerFilterSlice.reducer
