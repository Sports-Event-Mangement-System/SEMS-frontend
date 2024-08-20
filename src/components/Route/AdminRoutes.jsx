import AdminPage from "../Admin/AdminPage";
import Dashboard from "../Admin/Items/Dashboard";
import Apps from "../Admin/Items/Apps";

const adminRoutes = [
 {
  path: '/admin',
  element: <AdminPage />
 },
 {
      path: '/dashboard',
      element: <Dashboard />
 },
 {
      paath: '/apps',
      element: <Apps />
 }
];

export default adminRoutes;
