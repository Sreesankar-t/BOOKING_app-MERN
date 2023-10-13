import { createContext, useEffect, useReducer } from "react";
const hotelJSON = localStorage.getItem("hotel");

const INITIAL_STATE = {
  
   hotel : hotelJSON !== 'undefined' ? JSON.parse(hotelJSON) : null,
   loading: false,
   error: null,
};

export const HotelAuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
      
        hotel: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        
        hotel: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
    
        hotel: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("hotel")
      localStorage.removeItem('toastShown');
      return {
    
        hotel: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const HotelAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("hotel", JSON.stringify(state.hotel));
    
  }, [state.hotel]);

  return (
    <HotelAuthContext.Provider
      value={{
        
        hotel: state.hotel,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </HotelAuthContext.Provider>
  );
};