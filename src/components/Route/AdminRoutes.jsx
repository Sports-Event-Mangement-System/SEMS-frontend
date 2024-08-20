import AdminPage from "../Admin/AdminPage";
import Dashboard from "../Admin/Items/Dashboard";
import Apps from "../Admin/Items/Apps";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";

const adminRoutes = () => {
     return (
          <BrowserRouter>
          <AdminSidebar>
               {/* <Routes>
                    <Route path="/admin" element={<AdminPage />}>
                         <Route path="/dashboard" element={<Dashboard />} />
                         <Route path="/apps" element={<Apps />} />  
                    </Route>
               </Routes> */}
          </AdminSidebar>
          </BrowserRouter>
     )
}

export default adminRoutes;
