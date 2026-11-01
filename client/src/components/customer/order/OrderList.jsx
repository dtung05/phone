import React from "react";
import { formatDate } from "../../../utils/date_time";
import { useLazyHandlePaymentQuery } from "../../../store/api/orderApi";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/slices/toastSlice";
import { getImageUrl } from "../../../utils/image";
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Truck,
  XCircle,
  CreditCard,
  Banknote,
} from "lucide-react";

const OrderList = ({ orders, handleCancelOrder }) => {
  const [handlePayment] = useLazyHandlePaymentQuery();
  const dispatch = useDispatch();

  const renderStatusPill = (orderStatus) => {
    switch (orderStatus) {
      case "Chờ xử lý":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Chờ xác nhận</span>
          </span>
        );
      case "Đã xác nhận":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Đã xác nhận</span>
          </span>
        );
      case "Đang giao":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200/60">
            <Truck size={13} className="shrink-0" />
            <span>Đang giao hàng</span>
          </span>
        );
      case "Đã giao":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <CheckCircle2 size={13} className="shrink-0 text-emerald-600" />
            <span>Giao thành công</span>
          </span>
        );
      case "Đã hủy":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200/60">
            <XCircle size={13} className="shrink-0" />
            <span>Đã hủy</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {orderStatus}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const isCancelable = order.order_status === "Chờ xử lý";

        return (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow transition-shadow overflow-hidden"
          >
            {/* Header đơn hàng */}
            <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-gray-50/70 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-semibold text-gray-900 text-sm">
                  #{order.id}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar size={12} className="text-gray-400" />
                  {formatDate(order.created_at)}
                </span>
                <span className="text-gray-300">•</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-600 uppercase">
                  {order.payment_method === "cod" ? (
                    <Banknote size={13} className="text-[#009b7a]" />
                  ) : (
                    <CreditCard size={13} className="text-[#009b7a]" />
                  )}
                  <span>{order.payment_method}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {order.payment_status === "Unpaid" && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-medium border border-amber-200/50">
                    Chưa thanh toán
                  </span>
                )}
                {renderStatusPill(order.order_status)}
              </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="px-4 sm:px-5 divide-y divide-gray-100">
              {order.order_items?.map((item) => (
                <div
                  key={item.id}
                  className="py-3.5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg bg-white border border-gray-200/60 p-1 flex items-center justify-center shrink-0">
                      <img
                        src={getImageUrl(item.product_thumbnail)}
                        alt={item.product_name}
                        className="w-full h-full object-contain rounded"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/100x100?text=No+Image";
                        }}
                      />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <h4 className="text-gray-900 text-xs sm:text-sm font-medium line-clamp-2 leading-snug">
                        {item.product_name}
                      </h4>

                      {item.variant_attributes && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {typeof item.variant_attributes === "object" ? (
                            Object.entries(item.variant_attributes).map(
                              ([key, val]) => (
                                <span
                                  key={key}
                                  className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-[11px]"
                                >
                                  {val}
                                </span>
                              ),
                            )
                          ) : (
                            <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                              {String(item.variant_attributes)}
                            </span>
                          )}
                        </div>
                      )}

                      <p className="text-xs text-gray-500">
                        x{item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-0.5">
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm font-mono">
                      {Number(
                        item.unit_price * item.quantity,
                      ).toLocaleString("vi-VN")}
                      ₫
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-[11px] text-gray-400 font-mono">
                        ({Number(item.unit_price).toLocaleString("vi-VN")}₫/sp)
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Địa chỉ nhận hàng */}
            <div className="px-4 sm:px-5 py-2.5 bg-gray-50/50 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <div className="truncate">
                <span className="font-medium text-gray-800">
                  {order.recipient_name}
                </span>
                <span className="mx-2 text-gray-300">|</span>
                <span>{order.recipient_phone}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-gray-500">{order.recipient_address}</span>
              </div>
            </div>

            {/* Tổng tiền & Hành động */}
            <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-white">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-gray-500">Thành tiền:</span>
                <span className="text-base sm:text-lg font-bold text-red-600 font-mono">
                  {Number(order.total_amount).toLocaleString("vi-VN")}₫
                </span>
              </div>

              <div className="flex items-center gap-2.5 ml-auto">
                {isCancelable && (
                  <button
                    type="button"
                    onClick={() => handleCancelOrder(order.id)}
                    className="px-4 py-2 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors cursor-pointer"
                  >
                    Hủy đơn hàng
                  </button>
                )}

                {order.payment_method !== "cod" &&
                  order.payment_status === "Unpaid" &&
                  order.order_status !== "Đã hủy" && (
                    <button
                      type="button"
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
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#009b7a] hover:bg-[#008266] rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      Thanh toán ngay
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