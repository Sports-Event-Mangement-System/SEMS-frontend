import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Forbidden from '../Forbidden/forbidden';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/logIn" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default PrivateRoute;
