import { baseQuery, ImageResponse } from '@/shared';
import { createApi } from '@reduxjs/toolkit/query/react';

export const uploadApi = createApi({
  reducerPath: 'upload-api',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    upload: builder.mutation<ImageResponse[], FormData>({
      query: (images) => ({
        url: '/api/upload',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: images,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useUploadMutation,
  endpoints,
  reducerPath: uploadReducerPath,
  reducer: uploadReducerApi,
  middleware: uploadMiddleware,
} = uploadApi;
