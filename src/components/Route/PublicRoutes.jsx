import Home from '../Home/Home';
import About from '../About Us/About';
import Tournaments from '../Tournaments/Tournaments';
import Gallery from '../Gallery/Gallery';
import Contact from '../Contact Us/Contact';
import LogIn from '../Account/LogIn';
import SignUp from '../Account/SignUp';
import PrivateRoute from './PrivateRoute';
import TournamentCardDetails from '../Tournaments/TournamentCardDetails';
import TeamForm from "../Team/TeamForm";


const publicRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/tournaments',
    element: <Tournaments />,
  },
  {
    path: '/tournamentDetails/:id',
    element: <TournamentCardDetails />,
  },
  {
    path: '/gallery',
    element: <Gallery />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/logIn',
    element: (
      <PrivateRoute redirectAuthenticated={true}>
        <LogIn />
      </PrivateRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <PrivateRoute redirectAuthenticated={true}>
        <SignUp />
      </PrivateRoute>
    ),
  },
  {
    path: '/tournamentDetails/:id/addTeamForm',
    element: <TeamForm />
  },
];

export default publicRoutes;
