import { createBrowserRouter, RouterProvider } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
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
  return (
    <div className="max-w-[1440px] mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
