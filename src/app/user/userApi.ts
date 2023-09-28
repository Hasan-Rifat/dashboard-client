import { RegistrationResponse } from "../../types/IUser";
import { apiSlice } from "../api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all users
    getAllUser: builder.query({
      query: () => `user/`,
    }),
    // get user by id
    getUserById: builder.query({
      query: (id) => `user/${id}`,
    }),
    // create user
    createUser: builder.mutation<RegistrationResponse, {}>({
      query: (body) => ({
        url: `user/create-user`,
        method: "POST",
        body,
      }),
    }),

    // update user
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `user/${id}`,
        method: "PATCH",
        body,
      }),
    }),

    // delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
    }),

    // login user
    loginUser: builder.mutation({
      query: (body) => ({
        url: `user/login`,
        method: "POST",
        body,
        credentials: "include",
      }),
    }),

    // logout user
    logoutUser: builder.query({
      query: () => `user/logout`,
    }),

    // refresh token
    refreshToken: builder.query({
      query: () => `user/refresh-token`,
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginUserMutation,
  useLogoutUserQuery,
  useRefreshTokenQuery,
} = userApiSlice;
