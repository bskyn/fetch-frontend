import useFetchDogBreeds from '@/hooks/useFetchDogBreeds';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MultipleSelector } from '@/components/ui/multipleSelector';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { searchSchema } from '@/validation/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ISort } from '@/interfaces';
import { SortDirection, SortField } from '@/enum';

type SearchFormValues = z.infer<typeof searchSchema>;

const SearchBar = ({
  onSearch,
}: {
  onSearch: (params: {
    breed: string[];
    zipCode: string[];
    ageMin: number | '';
    ageMax: number | '';
    sort: ISort;
  }) => void;
}) => {
  const { data: breeds } = useFetchDogBreeds();

  const options = breeds?.map((breed) => ({
    label: breed,
    value: breed,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      breed: [],
      zipCode: '',
      ageMin: undefined,
      ageMax: undefined,
      sort: { field: SortField.BREED, direction: SortDirection.ASC },
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    const zipCodes = data.zipCode
      ? data.zipCode.split(',').map((zip) => zip.trim())
      : [];

    // slight delay to show loading animation for better ux
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve(
            onSearch({
              breed: data.breed || [],
              zipCode: zipCodes,
              ageMin: data.ageMin || '',
              ageMax: data.ageMax || '',
              sort: data.sort,
            })
          ),
        100
      );
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-2 rounded-lg p-4 shadow-md border-slate-400"
    >
      <div className="text-lg font-semibold mb-4">
        ⭐ Find for your fav doggo! ⭐
      </div>

      <div className="flex-1 mb-4">
        <label className="block text-sm font-medium mb-1">Breeds</label>
        <Controller
          name="breed"
          control={control}
          render={({ field }) => (
            <MultipleSelector
              options={options}
              placeholder="Select breeds"
              onChange={(val) =>
                field.onChange(val.map((breed) => breed.value))
              }
            />
          )}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Zip Code</label>
          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Enter zipcode, comma separated if multiple (optional)"
                {...field}
              />
            )}
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.zipCode.message}
            </p>
          )}
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Min Age</label>
          <Controller
            name="ageMin"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                placeholder="Min Age (optional)"
                {...field}
              />
            )}
          />
          {errors.ageMin && (
            <p className="text-red-500 text-sm mt-1">{errors.ageMin.message}</p>
          )}
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Max Age</label>
          <Controller
            name="ageMax"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                placeholder="Max Age (optional)"
                {...field}
              />
            )}
          />
          {errors.ageMax && (
            <p className="text-red-500 text-sm mt-1">{errors.ageMax.message}</p>
          )}
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Sort By</label>
          <Controller
            name="sort.field"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange(value as SortField)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Field (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SortField.BREED}>Breed</SelectItem>
                  <SelectItem value={SortField.NAME}>Name</SelectItem>
                  <SelectItem value={SortField.AGE}>Age</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Sort Order</label>
          <Controller
            name="sort.direction"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) =>
                  field.onChange(value as SortDirection)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select direction (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SortDirection.ASC}>Ascending</SelectItem>
                  <SelectItem value={SortDirection.DESC}>Descending</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-24"
          variant="secondary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div>
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            'Search'
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
