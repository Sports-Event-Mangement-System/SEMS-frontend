import PrivateRoute from './PrivateRoute';
import Account from '../Account/Account';
import Profile from '../User/Profile';
import ChangePassword from '../User/ChangePassword'; // Import the ChangePassword component

const userRoutes = [
  {
    path: '/account',
    element: (
      <PrivateRoute requiredRole={['user', 'admin']}>
        <Account />
      </PrivateRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute requiredRole={['user', 'admin']}>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: '/changepassword',
    element: (
      <PrivateRoute requiredRole={['user', 'admin']}>
        <ChangePassword />
      </PrivateRoute>
    ),
  },
];

export default userRoutes;
