  import { createBrowserRouter } from 'react-router-dom';
  import App from '../../App';
  import publicRoutes from './PublicRoutes';
  import userRoutes from './UserRoutes';
  import adminRoutes from './AdminRoutes';
  import AdminPage from '../Admin/AdminPage';
  import PrivateRoute from './PrivateRoute';

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
      element: (
        <PrivateRoute requiredRole="admin">
             <AdminPage />
        </PrivateRoute>
      ),
      children: [
        ...adminRoutes,
      ]
    }
  ]);

  export default router;
