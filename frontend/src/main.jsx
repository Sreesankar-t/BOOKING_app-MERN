import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/client/AuthContext.jsx'
import { AdminAuthContextProvider } from './context/admin/AdminContext.jsx'
import { HotelAuthContextProvider } from './context/hotel/HotelContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HotelAuthContextProvider>
    <AdminAuthContextProvider>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </AdminAuthContextProvider>
    </HotelAuthContextProvider>
  </React.StrictMode>,
)
