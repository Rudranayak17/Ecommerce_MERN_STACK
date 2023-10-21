/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated ) {
    return <Navigate to={"/login"} />;
  }
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to={"/login"} />;
  }


return  (loading===false&&(children ? children : <Outlet />))
 
};

export default ProtectedRoute;
