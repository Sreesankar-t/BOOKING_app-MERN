import { Navigate, Outlet, } from "react-router-dom";
import { AdminUthContext } from '../../context/admin/AdminContext'
import { useContext } from "react";


const AdminPrivateRoute = () => {
const { admin, loading } = useContext(AdminUthContext);

if (loading) {
  return <div>loading</div> ;
}

  return admin ? <Outlet/> : <Navigate to="/adminlogin" replace />;
};
export default AdminPrivateRoute;

