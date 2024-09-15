import TournamentManagement from "../Admin/Items/Tournament/TournamentManagement";
import TeamManagement from "../Admin/Items/TeamManagement";
import AdminContact from "../Admin/Items/Contact/AdminContact";
import TournamentForm from "../Admin/Items/Tournament/TournamentForm";

const adminRoutes = [
     {
          path: 'tournamentManagement',
          element: <TournamentManagement />,
     },
     {
          path: 'teamManagement',
          element: <TeamManagement />,
     },
     {
          path: 'adminContact',
          element: <AdminContact />,
     },
     {
          path: 'addTournamentForm',
          element: <TournamentForm />
     }

];

// const adminRoutes = () => {
//      return (
//           <BrowserRouter>
//           <AdminSidebar>
//                {/* <Routes>
//                     <Route path="/admin" element={<AdminPage />}>
//                          <Route path="/dashboard" element={<Dashboard />} />
//                          <Route path="/apps" element={<Apps />} />  
//                     </Route>
//                </Routes> */}
//           </AdminSidebar>
//           </BrowserRouter>
//      )
// }

export default adminRoutes;
