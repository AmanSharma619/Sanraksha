import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const SecureDashboard = () => {
  const user = useSelector((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default SecureDashboard;
