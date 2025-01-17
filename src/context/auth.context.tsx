import { DOG_BREEDS_URL } from '@/constants/api.constants';
import { HOME_ROUTE, LOGIN_ROUTE } from '@/constants/app.routes';
import { apiClient } from '@/utils/api.client';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

export interface IAuthContext {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = () => setIsLoggedIn(true);

  const logout = async () => {
    await apiClient.post('/auth/logout');
    setIsLoggedIn(false);
    navigate(LOGIN_ROUTE);
  };

  // ideally we could hit an /auth/status api to check if the user is authenticated, however
  // no api is provided, so we can do this in a more hacky way by just calling an auth'd api endpoint
  // (e.g. /dogs/breeds) if we get 401 unauthorized, we can assume the user is not logged in

  const checkAuthenticated = useCallback(async () => {
    {
      try {
        await apiClient.get(DOG_BREEDS_URL);
        setIsLoggedIn(true);
        navigate(HOME_ROUTE);
      } catch (err) {
        console.error('error', err);
        navigate(LOGIN_ROUTE);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    }
  }, [navigate]);

  useEffect(() => {
    checkAuthenticated();
  }, [checkAuthenticated]);

  if (isLoading) {
    return <div />;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthContext;
