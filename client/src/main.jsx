import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

import formVisibilityReducer from './reducers/formVisibilityReducer'
import favoriteLocationReducer from './reducers/favoriteLocationReducer.js'
import markerFilterReducer from './reducers/markerFilterReducer.js'
import { listenerMiddleware } from './middleware/listenerMiddleware.js'

const reducer = {
  formVisibility: formVisibilityReducer,
  favoriteLocations: favoriteLocationReducer,
  markerFilter: markerFilterReducer,
}
const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
