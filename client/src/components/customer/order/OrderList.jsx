import { formatDate } from "../../../utils/date_time";
import { useLazyHandlePaymentQuery } from "../../../store/api/orderApi";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/slices/toastSlice";

const OrderList = ({ orders, handleCancelOrder }) => {
  const [handlePayment] = useLazyHandlePaymentQuery();
  const dispatch = useDispatch();
  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const isCancelable = order.order_status === "Chờ xử lý";
        return (
          <div
            key={order.id}
            className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md"
          >
            {/* Header đơn hàng */}
            <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-emerald-50/40 border-b border-emerald-100/60 gap-3">
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm">
                <span className="font-bold text-gray-900 tracking-wide">
                  ĐƠN HÀNG #{order.id}
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">
                  {formatDate(order.created_at)}
                </span>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                <span className="bg-white border border-gray-200 text-gray-700 px-2.5 py-1 rounded-md shadow-2xs">
                  {order.payment_method?.toUpperCase()}
                </span>

                <span
                  className={`px-2.5 py-1 rounded-md ${
                    isCancelable
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : order.order_status === "Đã giao"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : order.order_status === "Đã hủy"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {order.order_status}
                </span>

                <span
                  className={`px-2.5 py-1 rounded-md ${
                    order.payment_status === "Unpaid"
                      ? "bg-orange-50 text-orange-700 border border-orange-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
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
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-start space-x-3.5">
                    <img
                      src={item.product_thumbnail}
                      alt={item.product_name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain border border-gray-100 rounded-lg p-1 bg-white flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1 hover:text-[#0f925f] cursor-pointer transition-colors">
                        {item.product_name}
                      </h4>
                      {item.variant_attributes && (
                        <p className="text-xs text-gray-500 mt-1">
                          Phân loại: {item.variant_attributes.color},{" "}
                          {item.variant_attributes.storage}
                        </p>
                      )}
                      <p className="text-xs text-gray-600 mt-1.5 font-medium">
                        x{item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-800 text-sm sm:text-base">
                      {Number(item.unit_price).toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer thông tin người nhận & Tổng tiền */}
            <div className="px-5 py-4 bg-emerald-50/20 border-t border-emerald-100/60 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Thông tin giao hàng */}
              <div className="text-xs text-gray-600 leading-relaxed bg-white/80 p-3 rounded-xl border border-gray-100">
                <div className="font-medium text-gray-800">
                  Người nhận:{" "}
                  <span className="font-semibold">{order.recipient_name}</span>{" "}
                  ({order.recipient_phone})
                </div>
                <div className="text-gray-500 mt-0.5 truncate max-w-md">
                  Đ/c: {order.recipient_address}
                </div>
              </div>

              {/* Tổng tiền & Nút thao tác */}
              <div className="flex flex-wrap items-center justify-between md:justify-end gap-4">
                <div className="text-right">
                  <span className="text-xs text-gray-500 mr-2">
                    Tổng thanh toán:
                  </span>
                  <span className="text-lg font-bold text-[#0f925f]">
                    {Number(order.total_amount).toLocaleString("vi-VN")}đ
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isCancelable && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-4 py-2 text-xs font-semibold text-rose-600 border border-rose-300 rounded-xl hover:bg-rose-50 transition-all active:scale-95"
                    >
                      Hủy đơn
                    </button>
                  )}
                  {order.payment_method !== "cod" &&
                    order.payment_status === "Unpaid" &&
                    order.order_status !== "Đã hủy" && (
                      <button
                        onClick={async () => {
                          const payment = order.payment_method;
                          const id = order.id;
                          const result = await handlePayment({
                            payment,
                            id,
                          }).unwrap();
                          if (result.type === "success") {
                            window.location.href = result.url;
                          } else {
                            dispatch(
                              showToast({
                                type: result.type,
                                message: result.message,
                              }),
                            );
                          }
                        }}
                        className="px-5 py-2 text-xs font-semibold text-white bg-[#0f925f] hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                      >
                        Thanh toán ngay
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
