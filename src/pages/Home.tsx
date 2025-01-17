import DogsGrid from '@/components/DogsGrid';
import GridSkeleton from '@/components/GridSkeleton';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import useFetchDogs from '@/hooks/useFetchDogs';
import useSearchDogs from '@/hooks/useSearchDogs';
import { ISearchParams, ISort } from '@/interfaces';
import { useEffect, useState } from 'react';
import Header from './Header';

const DEFAULT_SIZE = 25;

const Home = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [dogIds, setDogIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const { data: searchData, isFetching: isFetchingSearch } = useSearchDogs({
    params: {
      ...searchParams,
      size: DEFAULT_SIZE,
      from: (page - 1) * DEFAULT_SIZE,
    },
    enabled: !!searchParams,
  });

  const {
    data: dogs,
    isLoading: isDogsLoading,
    isFetching: isDogsFetching,
  } = useFetchDogs({
    dogIds,
    enabled: !!dogIds.length,
  });

  const handleSearch = (params: {
    breed: string[];
    zipCode: string[];
    ageMin: number | '';
    ageMax: number | '';
    sort: ISort;
  }) => {
    setSearchParams({
      breeds: params.breed,
      zipCodes: params.zipCode,
      ageMin: params.ageMin || undefined,
      ageMax: params.ageMax || undefined,
      sort: `${params.sort.field}:${params.sort.direction}`,
      size: DEFAULT_SIZE,
    });
    setPage(1);
  };

  useEffect(() => {
    if (searchData?.resultIds) {
      setDogIds(searchData.resultIds);
    }
  }, [searchData?.resultIds]);

  return (
    <div className="p-6">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {isDogsLoading && <GridSkeleton />}
      {dogs && <DogsGrid dogs={dogs} isLoading={isFetchingSearch} />}
      {dogs && (
        <Pagination
          page={page}
          size={DEFAULT_SIZE}
          searchData={searchData}
          setPage={setPage}
          isLoading={isDogsFetching}
        />
      )}
    </div>
  );
};

export default Home;
