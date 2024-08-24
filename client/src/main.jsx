import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


import App from './App.jsx';
import Homepage from './pages/Homepage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import KingRoom from './pages/KingRoom.jsx';
import Transaction from './pages/Transaction.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';

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
        path: 'rooms/king-room',
        element: <KingRoom />
      },
      {
        path: 'rooms/transaction',
        element: <Transaction />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
