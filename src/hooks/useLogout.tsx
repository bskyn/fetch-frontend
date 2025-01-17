import { useMutation } from '@tanstack/react-query';
import { LOGOUT_URL } from '@/constants/api.constants';
import { apiClient } from '@/utils/api.client';

const logout = async (): Promise<void> => {
  return await apiClient.post(LOGOUT_URL);
};

const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export default useLogout;
