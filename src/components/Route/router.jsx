  import { createBrowserRouter } from 'react-router-dom';
  import App from '../../App';
  import publicRoutes from './PublicRoutes';
  import adminRoutes from './AdminRoutes';
  import userRoutes from './UserRoutes';
import AdminPage from '../Admin/AdminPage';
import { element } from 'prop-types';
import Dashboard from '../Admin/Items/Dashboard';
import Apps from '../Admin/Items/Apps';

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
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'apps',
          element: <Apps />
        }
      ]
    }
  ]);

  export default router;
