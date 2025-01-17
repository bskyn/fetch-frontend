import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import useFetchDogs from '@/hooks/useFetchDogs';
import GridSkeleton from './GridSkeleton';

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  match,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  match: string;
}) => {
  const { data, isLoading } = useFetchDogs({
    dogIds: [match],
    enabled: !!match,
  });

  console.log('data', data);

  if (isLoading) {
    return <GridSkeleton />;
  }

  if (!data) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-1">Your Match</DialogTitle>
          <DialogDescription>
            <div className="w-full aspect-w-4 aspect-h-3 rounded-md overflow-hidden">
              <img
                src={data[0].img}
                alt={data[0].name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-bold mt-2">{data[0].name}</div>
              <p className="text-sm">Breed: {data[0].breed}</p>
              <p className="text-sm">Age: {data[0].age}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
