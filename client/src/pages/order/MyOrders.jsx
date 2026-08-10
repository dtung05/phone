import React, { useState } from "react";
import { useGetOrdersQuery } from "../../store/api/orderApi";
import Loading from "../../components/block/Loading";

const STATUS_TABS = [
  { label: "Tất cả", value: "all" },
  { label: "Chờ xác nhận", value: "Chờ xử lý" },
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

  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Xác nhận hủy đơn hàng #${orderId}?`)) {
      console.log("Hủy đơn hàng:", orderId);
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
        <div className="bg-white border-b border-gray-200 mb-4 sticky top-0 z-10 shadow-sm">
          <div className="flex overflow-x-auto no-scrollbar">
            {STATUS_TABS.map((tab) => {
              const isActive = status === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => {
                    setStatus(tab.value);
                    setPage(1);
                  }}
                  className={`flex-1 min-w-[110px] py-3.5 px-4 text-sm font-semibold transition-all whitespace-nowrap border-b-2 text-center ${
                    isActive
                      ? "border-[#0f925f] text-[#0f925f] bg-emerald-50/30"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        {orders.length === 0 ? (
          <div className="bg-white p-12 text-center border border-gray-200">
            <p className="text-gray-500 text-sm">
              Không tìm thấy đơn hàng phù hợp.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const isCancelable =
                order.order_status === "Chờ xử lý" ||
                order.order_status === "Chờ xác nhận";

              return (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 text-sm"
                >
                  {/* Header Đơn Hàng */}
                  <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200 gap-2">
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="font-bold text-gray-900">
                        ĐƠN HÀNG #{order.id}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-500">
                        {new Date(order.created_at).toLocaleString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-semibold">
                      <span
                        className={`px-2 py-0.5 ${
                          isCancelable
                            ? "bg-amber-100 text-amber-800"
                            : order.order_status === "Đã giao"
                              ? "bg-emerald-100 text-emerald-800"
                              : order.order_status === "Đã hủy"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.order_status}
                      </span>
                      <span className="bg-gray-200 text-gray-700 px-2 py-0.5">
                        {order.payment_status === "Unpaid"
                          ? "Chưa thanh toán"
                          : "Đã thanh toán"}
                      </span>
                    </div>
                  </div>

                  {/* Danh sách sản phẩm */}
                  <div className="divide-y divide-gray-100">
                    {order.order_items?.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start space-x-3">
                          <img
                            src={item.product_thumbnail}
                            alt={item.product_name}
                            className="w-16 h-16 object-contain border border-gray-200 p-1 bg-white flex-shrink-0"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm line-clamp-1 hover:text-[#0f925f] cursor-pointer">
                              {item.product_name}
                            </h4>
                            {item.variant_attributes && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                Phân loại: {item.variant_attributes.color},{" "}
                                {item.variant_attributes.storage}
                              </p>
                            )}
                            <p className="text-xs text-gray-600 mt-1 font-semibold">
                              x{item.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-slate-800">
                            {Number(item.unit_price).toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Đơn Hàng */}
                  <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-xs text-gray-600">
                      <span>Người nhận: </span>
                      <span className="font-semibold text-gray-800">
                        {order.recipient_name}
                      </span>
                      <span> ({order.recipient_phone})</span>
                      <span className="block text-gray-500">
                        Đ/c: {order.recipient_address}
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <span className="text-xs text-gray-500 mr-2">
                          Tổng tiền:
                        </span>
                        <span className="text-base font-bold text-[#0f925f]">
                          {Number(order.total_amount).toLocaleString("vi-VN")}đ
                        </span>
                      </div>

                      {/* NÚT HỦY ĐƠN HÀNG - Phong cách nút hình chữ nhật vuông vắn chuẩn E-commerce */}
                      {isCancelable && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="px-4 py-1.5 text-xs font-semibold text-red-600 border border-red-500 hover:bg-red-600 hover:text-white transition-all uppercase tracking-wider"
                        >
                          Hủy đơn
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Phân trang */}
        {lastPage > 1 && (
          <div className="flex justify-center items-center space-x-1 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3 py-1 bg-white border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40"
            >
              Trang trước
            </button>
            <span className="px-3 py-1 text-xs text-gray-600">
              {page} / {lastPage}
            </span>
            <button
              disabled={page === lastPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 bg-white border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40"
            >
              Trang sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
