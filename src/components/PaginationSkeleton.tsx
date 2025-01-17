import { Skeleton } from './ui/skeleton';

const PaginationSkeleton = () => {
  return (
    <div className="mt-4 flex justify-center items-center space-x-4">
      <Skeleton className="w-24 h-10 rounded-md" />
      <Skeleton className="w-20 h-10 rounded-md" />
      <Skeleton className="w-24 h-10 rounded-md" />
    </div>
  );
};

export default PaginationSkeleton;
