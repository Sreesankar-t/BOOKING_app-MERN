import { createContext, useEffect, useReducer } from "react";


const adminJSON= localStorage.getItem("admin")
const INITIAL_STATE = {
  
 
   admin: adminJSON !== 'undefined' ? JSON.parse(adminJSON) :null,
  loading: false,
  error: null,
};

export const AdminUthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        admin:null,
       
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        admin:action.payload,
       
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        admin:null,
  
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("admin")
      return {
        admin:null,
       
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AdminAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {

    localStorage.setItem("admin", JSON.stringify(state.admin));
  }, [state.admin]);

  return (
    <AdminUthContext.Provider
      value={{
        admin:state.admin,
       
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AdminUthContext.Provider>
  );
};