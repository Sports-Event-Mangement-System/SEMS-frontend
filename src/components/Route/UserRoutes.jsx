import PrivateRoute from './PrivateRoute';
import Account from '../Account/Account';
import Profile from '../User/Profile';

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
