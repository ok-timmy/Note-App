import { apiSlice } from "../../app/api/apiSlice";

export const noteApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      getnotes: builder.query({
        query: (userEmail) => `/api/my-notes/${userEmail}`,
        keepUnusedDataFor: 5,
      }),
    })
})

export const { useGetnotesQuery } = noteApiSlice;