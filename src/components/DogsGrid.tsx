import { IDog } from '@/interfaces';
import { FaStar } from 'react-icons/fa';
import GridSkeleton from './GridSkeleton';

const DogsGrid = ({
  dogs,
  isLoading,
  favorites,
  toggleFavorite,
}: {
  dogs: IDog[];
  isLoading: boolean;
  favorites: IDog[];
  toggleFavorite: (dog: IDog) => void;
}) => {
  if (isLoading) {
    return <GridSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {dogs.map((dog) => (
        <div
          key={dog.id}
          className="relative border rounded-lg border-purple-500 cursor-pointer transition-transform duration-200 hover:scale-95 hover:shadow-lg"
          onClick={() => toggleFavorite(dog)}
        >
          <div className="absolute top-3 right-3 z-50">
            <FaStar
              className={`h-7 w-7 ${
                favorites.some((favorite) => favorite.id === dog.id)
                  ? 'text-purple-600'
                  : 'text-gray-400'
              }`}
            />
          </div>
          <div className="w-full aspect-w-4 aspect-h-3 rounded-md overflow-hidden">
            <img
              src={dog.img}
              alt={dog.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col p-2 text-slate-400">
            <div className="text-lg font-bold mt-2">{dog.name}</div>
            <p className="text-sm">Breed: {dog.breed}</p>
            <p className="text-sm">Age: {dog.age}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DogsGrid;
