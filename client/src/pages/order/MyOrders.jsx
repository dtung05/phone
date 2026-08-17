import React, { useState } from "react";
import {
  useCancelOrderMutation,
  useGetOrdersQuery,
} from "../../store/api/orderApi";
import Loading from "../../components/block/Loading";
import Pagination from "../../components/block/Pagination";
import OrderStatusTabs from "../../components/order/OrderStatusTabs";
import OrderList from "../../components/order/OrderList";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/toastSlice";
const STATUS_TABS = [
  { label: "Tất cả", value: "all" },
  { label: "Chờ xác nhận", value: "Chờ xử lý" },
  { label: "Đã xác nhận", value: "Đã xác nhận" },
  { label: "Đang giao", value: "Đang giao" },
  { label: "Đã giao", value: "Đã giao" },
  { label: "Đã hủy", value: "Đã hủy" },
];

const MyOrders = () => {
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const {
    data: response,
    isLoading,
    error,
  } = useGetOrdersQuery({ status, page });
  const [cannelOrder, { isLoading: isLoadingCancel, error: errorCancel }] =
    useCancelOrderMutation();
  const dispatch = useDispatch();
  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="p-8 text-center text-red-600 bg-white border border-red-200 my-4 text-sm">
        Có lỗi xảy ra khi tải dữ liệu đơn hàng. Vui lòng thử lại!
      </div>
    );

  const orders = response?.data || [];
  const total = response?.total || 0;
  const lastPage = response?.last_page || 1;

  const handleCancelOrder = async (orderId) => {
    if (window.confirm(`Xác nhận hủy đơn hàng #${orderId}?`)) {
      try {
        const result = await cannelOrder(orderId).unwrap();
        console.log(result);
        dispatch(
          showToast({
            message: result.message,
            type: result.type,
          }),
        );
        if (result.type == "success") {
          setStatus("Đã hủy");
        }
      } catch (error) {
        
      }
    }
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen py-6 text-slate-800">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold uppercase text-slate-900 tracking-wide">
            Đơn hàng của tôi
          </h1>
        </div>
        <OrderStatusTabs
          statusTab={STATUS_TABS}
          status={status}
          setStatus={setStatus}
          setPage={setPage}
        />
        {orders.length === 0 ? (
          <div className="bg-white p-12 text-center border border-gray-200">
            <p className="text-gray-500 text-sm">
              Không tìm thấy đơn hàng phù hợp.
            </p>
          </div>
        ) : (
          <OrderList orders={orders} handleCancelOrder={handleCancelOrder} />
        )}
        <Pagination
          currentPage={page}
          lastPage={lastPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default MyOrders;
