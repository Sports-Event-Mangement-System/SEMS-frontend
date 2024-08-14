import Home from '../Home/Home';
import About from '../About Us/About';
import Tournaments from '../Tournaments/Tournaments';
import Gallery from '../Gallery/Gallery';
import Contact from '../Contact Us/Contact';
import LogIn from '../Account/LogIn'; 
import SignUp from '../Account/SignUp';

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
    path: '/gallery',
    element: <Gallery />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/logIn',
    element: <LogIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
];

export default publicRoutes;
