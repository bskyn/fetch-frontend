import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { IDog } from '@/interfaces';

const MatchDogs = ({
  favorites,
  handleGenerateMatch,
  isMatchLoading,
  clearFavorites,
}: {
  favorites: IDog[];
  handleGenerateMatch: () => void;
  isMatchLoading: boolean;
  clearFavorites: () => void;
}) => {
  return (
    <div className="flex justify-start my-4">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger
            onClick={handleGenerateMatch}
            className={cn(
              `text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-grey-500 w-full`,
              `${favorites.length === 0 ? 'cursor-not-allowed' : ''}`
            )}
            disabled={favorites.length === 0 || isMatchLoading}
          >
            {isMatchLoading ? 'Matching...' : 'Match ⭐'}
          </TooltipTrigger>
          <TooltipContent>
            <span>You can only generate a match if you select a favorite.</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button className="w-full" type="button" onClick={clearFavorites}>
        Clear Favorites
      </Button>
    </div>
  );
};

export default MatchDogs;
