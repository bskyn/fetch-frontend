import { useContext } from 'react';
import AuthContext, { IAuthContext } from '@/context/auth.context';

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used in the AuthProvider');
  }

  return context;
};

export default useAuth;
