import PaginationSkeleton from './PaginationSkeleton';

const Pagination = ({
  searchData,
  page,
  setPage,
  size,
  isLoading,
}: {
  searchData: any;
  page: number;
  setPage: (value: number) => void;
  size: number;
  isLoading: boolean;
}) => {
  const handlePrevious = () => {
    setPage(Math.max(page - 1, 1));
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  if (isLoading) {
    return <PaginationSkeleton />;
  }

  if (!searchData) return null;

  const totalPage = Math.ceil(searchData.total / size);

  return (
    <div className="mt-4 flex justify-center items-center space-x-6">
      <button
        disabled={page === 1}
        onClick={handlePrevious}
        className="px-2 py-1 text-sm bg-gray-200 text-gray-800 rounded-md disabled:opacity-30"
      >
        Previous
      </button>
      <span className="text-md font-medium">
        Page {page} of {totalPage}
      </span>
      <button
        disabled={page === totalPage}
        onClick={handleNext}
        className="px-2 py-1 text-sm bg-gray-200 text-gray-800 rounded-md disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
