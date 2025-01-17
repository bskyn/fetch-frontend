import { useMutation } from '@tanstack/react-query';
import { LOGIN_URL } from '@/constants/api.constants';
import { apiClient } from '@/utils/api.client';

interface ILogin {
  name: string;
  email: string;
}

const login = async (payload: ILogin): Promise<void> => {
  return await apiClient.post(LOGIN_URL, payload);
};

const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export default useLogin;
