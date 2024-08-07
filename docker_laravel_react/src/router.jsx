import { createBrowserRouter } from 'react-router-dom';
import Login from './views/Login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import Users from './views/users.jsx';
import UserForm from './views/UserForm.jsx';
import CurrencyRates from './views/CurrencyRates.jsx';
import { checkAdminAccess } from './authGuard.js'; // Import the guard function

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/users',
        element: <Users />,
        loader: checkAdminAccess, // Apply the guard
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />,
        loader: checkAdminAccess, // Apply the guard
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />,
        loader: checkAdminAccess, // Apply the guard
      },
      {
        path: '/rates',
        element: <CurrencyRates />,
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      }
    ]
  },
]);

export default router;
