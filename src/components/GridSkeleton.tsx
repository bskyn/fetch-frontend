import { Skeleton } from './ui/skeleton';

const GridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="border rounded-lg p-4 shadow-md">
          <Skeleton className="w-full h-64 rounded-md mb-4" />
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
};

export default GridSkeleton;
