import MatchDogs from '@/components/MatchDogs';
import { IDog } from '@/interfaces';

interface FavoriteSelectionProps {
  favorites: IDog[];
  handleGenerateMatch: () => void;
  isMatchLoading: boolean;
  clearFavorites: () => void;
}

const FavoriteSelection = ({
  favorites,
  handleGenerateMatch,
  isMatchLoading,
  clearFavorites,
}: FavoriteSelectionProps) => {
  return (
    <div className="border-2 rounded-lg p-4 shadow-md border-slate-400 w-full md:w-1/2 flex flex-col">
      <h3 className="text-lg font-semibold mb-2 text-slate-400">
        Selected Favorites
      </h3>
      <div className="flex flex-wrap gap-2 overflow-y-auto max-h-32 border rounded-md p-2 bg-slate-500">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="flex items-center gap-2 bg-cyan-200 text-blue-700 px-3 py-1 rounded-full"
            >
              <img
                src={favorite.img}
                alt={favorite.name}
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="text-sm">{favorite.name}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-200">No favorites selected</p>
        )}
      </div>

      <MatchDogs
        favorites={favorites}
        handleGenerateMatch={handleGenerateMatch}
        isMatchLoading={isMatchLoading}
        clearFavorites={clearFavorites}
      />
    </div>
  );
};

export default FavoriteSelection;
