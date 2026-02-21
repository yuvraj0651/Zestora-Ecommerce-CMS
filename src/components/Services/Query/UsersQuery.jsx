import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UsersApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        fetchUsers: builder.query({
            query: () => "auth",
            providesTags: ["Users"],
        }),
        addUser: builder.mutation({
            query: (newUser) => ({
                url: "auth",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `auth/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: builder.mutation({
            query: ({ updatedData, id }) => ({
                url: `auth/${id}`,
                method: "PATCH",
                body: updatedData,
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const { useFetchUsersQuery,
    useAddUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation
} = UsersApi;

export default UsersApi.reducer;