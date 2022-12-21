import { apiSlice } from "../../app/api/apiSlice";

export const createNoteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: (credentials) => ({
        url: `/api/newnote/${credentials.author}`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    editNote: builder.mutation({
      query: (credentials) => ({
        url: `/api/${credentials.id}`,
        method: "PUT",
        body: {...credentials}
      }),
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/api/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateNoteMutation, useEditNoteMutation, useDeleteNoteMutation } =
  createNoteApiSlice;
