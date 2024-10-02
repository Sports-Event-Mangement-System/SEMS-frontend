import TournamentManagement from "../Admin/Items/Tournament/TournamentManagement";
import TeamForm from "../Admin/Items/Team/TeamForm";
import AdminContact from "../Admin/Items/Contact/AdminContact";
import TournamentForm from "../Admin/Items/Tournament/TournamentForm";
import TeamTable from "../Admin/Items/Team/TeamTable";
import { element } from "prop-types";

const adminRoutes = [
     {
          path: 'tournamentManagement',
          element: <TournamentManagement />,
     },
     {
          path: 'teamManagement',
          element: <TeamTable />,
     },
     {
          path: 'adminContact',
          element: <AdminContact />,
     },
     {
          path: 'addTournamentForm',
          element: <TournamentForm />
     },
     {
          path: 'editTournamentForm/:id',
          element: <TournamentForm />, // For editing tournaments
     },
     {
          path: 'addTeamForm',
          element: <TeamForm />
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
