import PrivateRoute from './PrivateRoute';
import Account from '../Account/Account';
import Profile from '../User/Profile';
import ChangePassword from '../User/ChangePassword'; // Import the ChangePassword component
import TeamForm from "../Team/TeamForm";


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
  {
    path: '/tournamentDetails/:id/addTeam',
    element: (
      <PrivateRoute requiredRole={['user', 'admin']}>
        <TeamForm />
      </PrivateRoute>
    ),
  },
];

export default userRoutes;
