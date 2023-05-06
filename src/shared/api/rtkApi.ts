import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LS_USER_KEY } from '@/shared/const/localStorage'

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LS_USER_KEY) || ''
      if (token) {
        headers.set('Authorization', token)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({}),
})
