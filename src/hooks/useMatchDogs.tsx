import { apiClient } from '@/utils/api.client';
import { useMutation } from '@tanstack/react-query';
import { DOG_MATCH_URL } from '@/constants/api.constants';

interface IMatchDogResponse {
  match: string;
}

const matchDogs = async (dogIds: string[]): Promise<IMatchDogResponse> => {
  const { data } = await apiClient.post(DOG_MATCH_URL, dogIds);
  return data;
};

const useMatch = () => {
  return useMutation({
    mutationKey: ['match_dogs'],
    mutationFn: (dogIds: string[]) => matchDogs(dogIds),
  });
};

export default useMatch;
