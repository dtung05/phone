import baseApi from "./baseApi";

const purchaseReceiptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Lấy tất cả NCC cho dropdown trong form
    getSuppliers: builder.query({
      query: () => ({
        url: "staff/suppliers?all=1",
        method: "GET",
      }),
      providesTags: ["Suppliers"],
    }),
    // Danh sách NCC phân trang & tìm kiếm cho trang Quản lý NCC
    getPaginatedSuppliers: builder.query({
      query: ({ search = "", page = 1, per_page = 10 } = {}) => ({
        url: `staff/suppliers?search=${encodeURIComponent(search)}&page=${page}&per_page=${per_page}`,
        method: "GET",
      }),
      providesTags: ["Suppliers"],
    }),
    getSupplierDetail: builder.query({
      query: (id) => ({
        url: `staff/suppliers/${id}`,
        method: "GET",
      }),
      providesTags: ["Suppliers"],
    }),
    createSupplier: builder.mutation({
      query: (data) => ({
        url: "staff/suppliers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Suppliers"],
    }),
    updateSupplier: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `staff/suppliers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Suppliers"],
    }),
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `staff/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Suppliers"],
    }),

    
    getStaffVariants: builder.query({
      query: ({ search = "" } = {}) => ({
        url: `staff/variants?search=${encodeURIComponent(search)}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getPurchaseReceipts: builder.query({
      query: ({
        search = "",
        supplier_id = "",
        from_date = "",
        to_date = "",
        page = 1,
      } = {}) => ({
        url: `staff/purchase-receipts?search=${encodeURIComponent(search)}&supplier_id=${supplier_id}&from_date=${from_date}&to_date=${to_date}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["PurchaseReceipts"],
    }),
    getPurchaseReceiptDetail: builder.query({
      query: (id) => ({
        url: `staff/purchase-receipts/${id}`,
        method: "GET",
      }),
      providesTags: ["PurchaseReceipts"],
    }),
    createPurchaseReceipt: builder.mutation({
      query: (data) => ({
        url: "staff/purchase-receipts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PurchaseReceipts", "Products"],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetPaginatedSuppliersQuery,
  useGetSupplierDetailQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
  useGetStaffVariantsQuery,
  useGetPurchaseReceiptsQuery,
  useGetPurchaseReceiptDetailQuery,
  useCreatePurchaseReceiptMutation,
} = purchaseReceiptApi;

export default purchaseReceiptApi;
