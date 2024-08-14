  import { createBrowserRouter } from 'react-router-dom';
  import App from '../../App';
  import publicRoutes from './PublicRoutes';
  import adminRoutes from './AdminRoutes';
  import userRoutes from './UserRoutes';

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        ...publicRoutes,
        ...userRoutes,
        ...adminRoutes,
      ],
    },
  ]);

  export default router;
