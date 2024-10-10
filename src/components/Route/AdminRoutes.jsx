import TournamentManagement from "../Admin/Items/Tournament/TournamentManagement";
import AdminContact from "../Admin/Items/Contact/AdminContact";
import TournamentForm from "../Admin/Items/Tournament/TournamentForm";
import TeamTable from "../Admin/Items/Team/TeamTable";
import { element } from "prop-types";
import Schedule from "../Admin/Items/Schedule/ScheduleManagment";
import EditTeamForm from "../Admin/Items/Team/EditTeamForm";

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
          path: 'editTeamForm/:id',
          element: <EditTeamForm />
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
          path: 'schedule',
          element: <Schedule />,
     },

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
