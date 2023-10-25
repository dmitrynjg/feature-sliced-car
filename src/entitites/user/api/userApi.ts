import { baseQuery } from '@/shared';
import { createApi } from '@reduxjs/toolkit/query/react';
import { User, UserResponse, LoginRequest, RegisterRequest } from './userType';

export const userApi = createApi({
  reducerPath: 'user-api',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    register: builder.mutation<UserResponse, RegisterRequest>({
      query: (user) => ({
        url: '/api/auth/local/register',
        data: user,
        method: 'POST',
      }),
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (user) => ({
        url: '/api/auth/local',
        data: user,
        method: 'POST',
      }),
    }),
    getUser: builder.query<User, void>({
      query: () => '/api/users/me',
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  endpoints,
  reducerPath: userReducerPath,
  reducer: userReducerApi,
  middleware: userMiddleware,
} = userApi;
