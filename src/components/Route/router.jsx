  import { createBrowserRouter } from 'react-router-dom';
  import App from '../../App';
  import publicRoutes from './PublicRoutes';
  import userRoutes from './UserRoutes';
  import AdminPage from '../Admin/AdminPage';
  import TournamentManagement from '../Admin/Items/TournamentManagement'
  import TeamManagement from '../Admin/Items/TeamManagement'
  import AdminContact from '../Admin/Items/AdminContact';

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        ...publicRoutes,
        ...userRoutes,
      ],
    },
    {
      path: '/admin',
      element: <AdminPage />,
      children: [
        {
          path: 'tournamentManagement',
          element: <TournamentManagement />
        },
        {
          path: 'teamManagement',
          element: <TeamManagement />
        },
        {
          path: 'adminContact',
          element: <AdminContact />
        }
      ]
    }
  ]);

  export default router;
