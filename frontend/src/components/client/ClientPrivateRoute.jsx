import { Navigate, Outlet, } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/client/AuthContext";


const ClientPrivateRoute = () => {
const { user, loading } = useContext(AuthContext);

if (loading) {
  return <div>loading</div> ;
}

  return user ? <Outlet/> : <Navigate to="/login" replace />;

  
};


export default ClientPrivateRoute;