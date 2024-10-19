import TournamentManagement from "../Admin/Items/Tournament/TournamentManagement";
import AdminContact from "../Admin/Items/Contact/AdminContact";
import TournamentForm from "../Admin/Items/Tournament/TournamentForm";
import TeamTable from "../Admin/Items/Team/TeamTable";
import { element } from "prop-types";
import ScheduleManagment from "../Admin/Items/Schedule/ScheduleManagment";
import EditTeamForm from "../Admin/Items/Team/EditTeamForm";
import PlayerManagement from "../Admin/Items/Player/playerManagment";
import TiesheetGenerator from "../Admin/Items/Schedule/TiesheetGenerator";
import MatchManagment from "../Admin/Items/Match/MatchManagment";

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
          path: 'editTeamForm/:teamId',
          element: <EditTeamForm />
     },
     {
          path: 'playerManagement',
          element: <PlayerManagement />,
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
          path: 'scheduleManagment',
          element: <ScheduleManagment />,
     },
     {
          path: 'matchManagment',
          element: <MatchManagment />,
     },
     {
          path: 'tiesheetGenerator/:tournamentId',
          element: <TiesheetGenerator />,
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
