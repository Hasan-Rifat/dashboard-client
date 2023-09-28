import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUser } from "../user/userSlice";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include" as const,
  }),

  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: `user/refresh-token`,
        // credentials: "include" as const,
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: `user/me`,
        // credentials: "include" as const,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            getUser({
              image: result.data.data.image,
              email: result.data.data.email,
              name: result.data.data.name,
              role: result.data.data.role,
              verified: result.data.data.verified,
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
