import { createBrowserRouter, RouterProvider } from 'react-router';
import Login from './components/Login';
import Home from './components/Home';
import { AuthProvider } from './context/auth.context';
import { HOME_ROUTE, LOGIN_ROUTE } from './constants/app.routes';

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        path: LOGIN_ROUTE,
        element: <Login />,
      },
      {
        path: HOME_ROUTE,
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
