import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Forbidden from '../Forbidden/forbidden';

const PrivateRoute = ({ children, requiredRole, redirectAuthenticated = false }) => {
  const { user } = useSelector((state) => state.auth);

  if (user && redirectAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user && !redirectAuthenticated) {
    return <Navigate to="/logIn" replace />;
  }

  if (requiredRole && ![requiredRole].flat().includes(user.role)) {
    return <Forbidden />;
  }

  return children;
};

export default PrivateRoute;
