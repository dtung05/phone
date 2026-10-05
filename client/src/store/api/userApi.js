import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  // lấy dữ liệu toàn bộ danh sách
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: "staff/users",
        method: "GET",
        params,
      }),
      providesTags: ["Users"],
    }),
    // chi tiết người dùng
    getUserDetail: builder.query({
      query: (id) => ({
        url: `staff/users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    // thêm tài khoản nhân viên
    createUser: builder.mutation({
      query: (data) => ({
        url: "staff/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    // sửa vai trò
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `staff/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    // khóa tài khoản
    toggleUserStatus: builder.mutation({
      query: (id) => ({
        url: `staff/users/${id}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserDetailQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useToggleUserStatusMutation,
} = userApi;
