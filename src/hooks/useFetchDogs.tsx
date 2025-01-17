import { apiClient } from '@/utils/api.client';
import { useQuery } from '@tanstack/react-query';
import { DOG_DETAILS_URL } from '@/constants/api.constants';
import { IDog } from '@/interfaces';

const fetchDogs = async (dogIds: string[]): Promise<IDog[]> => {
  const { data } = await apiClient.post(DOG_DETAILS_URL, dogIds);
  return data;
};

const useFetchDogs = ({
  dogIds,
  enabled,
}: {
  dogIds: string[];
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['fetch_dogs', dogIds],
    queryFn: () => fetchDogs(dogIds),
    enabled,
  });
};

export default useFetchDogs;
