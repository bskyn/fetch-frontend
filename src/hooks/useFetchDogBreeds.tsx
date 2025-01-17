import { DOG_BREEDS_URL } from '@/constants/api.constants';
import { apiClient } from '@/utils/api.client';
import { useQuery } from '@tanstack/react-query';

const fetchDogBreeds = async (): Promise<string[]> => {
  const { data } = await apiClient.get(DOG_BREEDS_URL);
  return data;
};

const useFetchDogBreeds = () => {
  return useQuery({
    queryKey: ['dog_breeds'],
    queryFn: () => fetchDogBreeds(),
  });
};

export default useFetchDogBreeds;
