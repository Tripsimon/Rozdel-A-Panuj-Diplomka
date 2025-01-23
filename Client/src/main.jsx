import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import {PersistGate} from "redux-persist/es/integration/react"
import persistStore from 'redux-persist/es/persistStore'

import App from './App.jsx'
import store from './store/store.js'
import './index.css'

let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
  </StrictMode>
)
