import { SortDirection, SortField } from '@/enum';

export interface IDog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface ILocation {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface ICoordinates {
  lat: number;
  lon: number;
}

export interface ISort {
  field: SortField;
  direction: SortDirection;
}

export interface ISearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  sort?: string;
  from?: number;
  size?: number;
}

export interface ISearchDogsResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}
