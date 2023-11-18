import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/client/AuthContext.jsx'
import { AdminAuthContextProvider } from './context/admin/AdminContext.jsx'
import { HotelAuthContextProvider } from './context/hotel/HotelContext.jsx'
import { SearchContextProvider } from './context/client/SearchContext.jsx'
import { BookingProvider} from './context/client/BookingContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BookingProvider>
    <HotelAuthContextProvider>
      <AdminAuthContextProvider>
        <AuthContextProvider>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </AuthContextProvider>
      </AdminAuthContextProvider>
    </HotelAuthContextProvider>
    </BookingProvider>
  </React.StrictMode>
)
