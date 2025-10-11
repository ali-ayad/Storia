import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Stories', 'Authors'],
  endpoints: () => ({}), // 👈 empty for now — we’ll inject others
})
