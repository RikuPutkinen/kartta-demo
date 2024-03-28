import { createSlice } from '@reduxjs/toolkit'

const formVisibilitySlice = createSlice({
  name: 'formVisibility',
  initialState: false,
  reducers: {
    changeFormVisibility(state, action) {
      return action.payload
    },
  },
})

export const { changeFormVisibility } = formVisibilitySlice.actions
export default formVisibilitySlice.reducer
