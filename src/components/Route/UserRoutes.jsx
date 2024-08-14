import PrivateRoute from './PrivateRoute';
import Account from '../Account/Account';
import Profile from '../Account/Account';

const userRoutes = [
  {
    path: '/account',
    element: (
      <PrivateRoute requiredRole="user">
        <Account />
      </PrivateRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute requiredRole="user">
        <Profile />
      </PrivateRoute>
    ),
  },
];

export default userRoutes;
