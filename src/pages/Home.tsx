import DogsGrid from '@/components/DogsGrid';
import GridSkeleton from '@/components/GridSkeleton';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import useFetchDogs from '@/hooks/useFetchDogs';
import useSearchDogs from '@/hooks/useSearchDogs';
import { IDog, ISearchParams, ISort } from '@/interfaces';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import useMatch from '@/hooks/useMatchDogs';
import Modal from '@/components/Modal';
import FavoriteSelection from '@/components/FavoriteSelection';
import { DEFAULT_SIZE } from '@/constants/pagination.constant';

const Home = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [dogIds, setDogIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const [favorites, setFavorites] = useState<IDog[]>([]);
  const [match, setMatch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const { mutate: matchDogs, isPending: isMatchLoading } = useMatch();

  console.log('dogs: ', dogs);

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

  const toggleFavorite = (dog: IDog) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((favorite) => favorite.id === dog.id)) {
        return prevFavorites.filter((favorite) => favorite.id !== dog.id);
      } else {
        return [...prevFavorites, dog];
      }
    });
  };

  const handleGenerateMatch = () => {
    const selectedFavoritesId = favorites.map((favorite) => favorite.id);

    matchDogs(selectedFavoritesId, {
      onSuccess: (data) => {
        setMatch(data.match);
        setIsModalOpen(true);
      },
      onError: (error) => {
        console.error('Error generating match:', error);
      },
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  useEffect(() => {
    if (searchData?.resultIds) {
      setDogIds(searchData.resultIds);
    }
  }, [searchData?.resultIds]);

  return (
    <div className="p-6">
      <Header />

      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar onSearch={handleSearch} />
        <FavoriteSelection
          favorites={favorites}
          clearFavorites={clearFavorites}
          handleGenerateMatch={handleGenerateMatch}
          isMatchLoading={isMatchLoading}
        />
      </div>

      {isDogsLoading && <GridSkeleton />}

      {dogs && dogs?.length > 0 && (
        <>
          <DogsGrid
            dogs={dogs}
            isLoading={isFetchingSearch}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
          <Pagination
            page={page}
            size={DEFAULT_SIZE}
            searchData={searchData}
            setPage={setPage}
            isLoading={isDogsFetching}
          />
        </>
      )}

      <Modal
        isModalOpen={isModalOpen}
        match={match}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Home;
