import { apiClient } from '@/utils/api.client';
import { useQuery } from '@tanstack/react-query';
import { DOG_SEARCH_URL } from '@/constants/api.constants';
import { ISearchDogsResponse, ISearchParams } from '@/interfaces';

const searchDogs = async (
  params: ISearchParams | null
): Promise<ISearchDogsResponse | null> => {
  if (!params) return null;

  const { data } = await apiClient.get(DOG_SEARCH_URL, {
    params: {
      ...(params.breeds && params.breeds.length > 0
        ? { breeds: params.breeds }
        : {}),
      ...(params.zipCodes && params.zipCodes.length > 0
        ? { zipCodes: params.zipCodes }
        : {}),
      ...(params.ageMin ? { ageMin: params.ageMin } : {}),
      ...(params.ageMax ? { ageMax: params.ageMax } : {}),
      ...(params.size ? { size: params.size } : {}),
      ...(params.from ? { from: params.from } : {}),
      ...(params.sort ? { sort: params.sort } : {}),
    },
  });
  return data;
};

const useSearchDogs = ({
  params,
  enabled,
}: {
  params: ISearchParams | null;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['search_dogs', params],
    queryFn: () => searchDogs(params),
    enabled,
  });
};

export default useSearchDogs;
