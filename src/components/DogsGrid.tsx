import { IDog } from '@/interfaces';
import GridSkeleton from './GridSkeleton';

const DogsGrid = ({
  dogs,
  isLoading,
}: {
  dogs: IDog[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <GridSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {dogs.map((dog) => (
        <div
          key={dog.id}
          className="border rounded-lg p-2 shadow-lg border-slate-500 cursor-pointer transition-transform duration-200 hover:scale-95 hover:shadow-lg"
        >
          <div className="w-full aspect-w-4 aspect-h-3 rounded-md overflow-hidden">
            <img
              src={dog.img}
              alt={dog.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col">
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
