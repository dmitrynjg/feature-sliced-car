import { baseQuery, RootResponse } from '@/shared';
import { createApi } from '@reduxjs/toolkit/query/react';
import { mapCarItem, mapCars } from '../lib';
import { CarResponseType } from './carType';
import { CarsHookType } from '../model';
import { ICar } from '../model';
import { Pagination } from '@/shared';

export const carApi = createApi({
  reducerPath: 'car-api',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    cars: builder.query<CarsHookType, { list: ICar[]; pagination: Pagination | {} }>({
      query: (params) => ({
        url: '/api/cars',
        params,
        method: 'GET',
        transformResponse: (dataStr: 'string') => {
          const { data, meta }: RootResponse<CarResponseType[]> = JSON.parse(dataStr);
          return { list: mapCars(data), pagination: meta && meta.pagination ? meta.pagination : {} };
        },
      }),
    }),
    car: builder.query<ICar, { id: number; params: object }>({
      query: ({ id, params }) => ({
        url: `/api/cars/${id}`,
        params,
        method: 'GET',
        transformResponse: (dataStr: 'string') => {
          const { data }: RootResponse<CarResponseType> = JSON.parse(dataStr);
          return mapCarItem(data);
        },
      }),
    }),
    carColors: builder.query<string[], void>({
      query: () => '/api/car/colors',
    }),
    carCreate: builder.mutation<RootResponse<CarResponseType>, ICar>({
      query: (car) => ({
        url: '/api/cars',
        data: { data: car },
        method: 'POST',
      }),
    }),
    carBrands: builder.query<string[], void>({
      query: () => '/api/car/brands',
    }),
  }),
});

export const {
  useCarsQuery,
  useCarQuery,
  useCarCreateMutation,
  useCarColorsQuery,
  useCarBrandsQuery,
  endpoints,
  reducerPath: carReducerPath,
  reducer: carReducerApi,
  middleware: carMiddleware,
} = carApi;
