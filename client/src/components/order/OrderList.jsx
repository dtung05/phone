import React from "react";

const OrderList = ({ orders, handleCancelOrder }) => {
  return (
    <div className="space-y-3">
      {orders.map((order) => {
        const isCancelable = order.order_status === "Chờ xử lý";
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
                  <span className="text-xs text-gray-500 mr-2">Tổng tiền:</span>
                  <span className="text-base font-bold text-[#0f925f]">
                    {Number(order.total_amount).toLocaleString("vi-VN")}đ
                  </span>
                </div>

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
  );
};

export default OrderList;
