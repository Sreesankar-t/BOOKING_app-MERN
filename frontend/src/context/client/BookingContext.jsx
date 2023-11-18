import { createContext, useEffect, useReducer } from 'react'

const INITIAL_STATE = {
  dates: null,
  user: null,
  hotel: null,
  selectedRooms: null,
  totalAmount: null,
  alldates: null,
  data: null
}

export const BookingContext = createContext(INITIAL_STATE)

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'BOOKING':
      return action.payload
    case 'RESET_SEARCH':
      return INITIAL_STATE
    default:
      return state
  }
}

export const BookingProvider = ({ children }) => {
  const storedState = JSON.parse(localStorage.getItem('booking'))
  const [state, dispatch] = useReducer(
    bookingReducer,
    storedState || INITIAL_STATE
  )

  useEffect(() => {
    localStorage.setItem('booking', JSON.stringify(state))
  }, [state])

  return (
    <BookingContext.Provider
      value={{
        dates: state.dates,
        user: state.user,
        hotel: state.hotel,
        selectedRooms: state.selectedRooms,
        totalAmount: state.totalAmount,
        alldates: state.alldates,
        data: state.data,
        dispatch
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
