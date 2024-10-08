import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Pss2CC5VCV0wby5OZ2mDA4Y7UXCzQZxp50KhC6wxYYcovcPV76x1eABHWwHU2DBr8BeFNoV5dVbLfA8d7418Pl400ncMpKkjH');


import App from './App.jsx';
import Homepage from './pages/Homepage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import KingRoom from './pages/KingRoom.jsx';
import Transaction from './pages/Transaction.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import Availability from './pages/Availability.jsx';
import SuccessPage from './pages/SuccessPage.jsx';
import ReservationsPage from './pages/ReservationsPage.jsx';
import Contact from './pages/Contact.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignupPage />
      },
      {
        path: 'availability',
        element: <Availability />
      },
      {
        path: 'rooms/king-room',
        element: <KingRoom />
      },
      {
        path: 'transaction',
        element: <Transaction />
      },
      {
        path: 'success',
        element: <SuccessPage />
      },
      {
        path: '/reservations',
        element: <ReservationsPage />
      },
      {
        path: '/contact',
        element: <Contact />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Elements stripe={stripePromise}>
    <RouterProvider router={router} />
  </Elements>
);
