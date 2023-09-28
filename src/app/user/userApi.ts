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
        credentials: "include" as const,
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
      query: (id: string) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
    }),

    // login user
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: `user/login`,
        method: "POST",
        body,
        // credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const data = (await queryFulfilled).data;
          localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(data.refreshToken)
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // logout user
    logoutUser: builder.mutation({
      query: () => ({
        url: `user/logout`,
        method: "POST",
        credentials: "include",
      }),
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
  useLogoutUserMutation,
  useRefreshTokenQuery,
} = userApiSlice;
