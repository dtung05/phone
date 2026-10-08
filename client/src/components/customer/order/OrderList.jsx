import React from "react";
import { formatDate } from "../../../utils/date_time";
import { useLazyHandlePaymentQuery } from "../../../store/api/orderApi";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/slices/toastSlice";
import { getImageUrl } from "../../../utils/image";
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  CreditCard,
  Banknote,
  Package,
} from "lucide-react";

const OrderList = ({ orders, handleCancelOrder }) => {
  const [handlePayment] = useLazyHandlePaymentQuery();
  const dispatch = useDispatch();

  const renderStatusPill = (orderStatus) => {
    switch (orderStatus) {
      case "Chờ xử lý":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Chờ xác nhận</span>
          </span>
        );
      case "Đã xác nhận":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Đã xác nhận</span>
          </span>
        );
      case "Đang giao":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20">
            <Truck size={13} className="shrink-0" />
            <span>Đang giao hàng</span>
          </span>
        );
      case "Đã giao":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#eefbf6] text-[#006b5a] ring-1 ring-inset ring-[#009b7a]/30">
            <CheckCircle2 size={13} className="shrink-0 text-[#009b7a]" />
            <span>Giao thành công</span>
          </span>
        );
      case "Đã hủy":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20">
            <XCircle size={13} className="shrink-0" />
            <span>Đã hủy</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-200">
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
            className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-2xs hover:border-gray-300 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#009b7a]/10 text-[#009b7a] flex items-center justify-center font-bold shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-extrabold text-gray-900 text-sm sm:text-base">
                      #{order.id}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={12} className="text-gray-400" />
                      {formatDate(order.created_at)}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 uppercase">
                      {order.payment_method === "cod" ? (
                        <Banknote size={12} className="text-[#009b7a]" />
                      ) : (
                        <CreditCard size={12} className="text-[#009b7a]" />
                      )}
                      <span>{order.payment_method}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                {order.payment_status === "Unpaid" && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20">
                    Chưa thanh toán
                  </span>
                )}
                {renderStatusPill(order.order_status)}
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {order.order_items?.map((item) => (
                <div
                  key={item.id}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-[#f8fafc] border border-gray-100 p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={getImageUrl(item.product_thumbnail)}
                        alt={item.product_name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/100x100?text=No+Image";
                        }}
                      />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-1 leading-snug hover:text-[#009b7a] transition-colors">
                        {item.product_name}
                      </h4>

                      {item.variant_attributes && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {typeof item.variant_attributes === "object" ? (
                            Object.entries(item.variant_attributes).map(
                              ([key, val]) => (
                                <span
                                  key={key}
                                  className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium text-[11px]"
                                >
                                  {val}
                                </span>
                              ),
                            )
                          ) : (
                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium text-[11px]">
                              {String(item.variant_attributes)}
                            </span>
                          )}
                        </div>
                      )}

                      <p className="text-xs text-gray-400">
                        Số lượng:{" "}
                        <strong className="text-gray-700 font-bold">
                          x{item.quantity}
                        </strong>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-extrabold text-gray-900 text-xs sm:text-sm font-mono">
                      {Number(
                        item.unit_price * item.quantity,
                      ).toLocaleString("vi-VN")}
                      ₫
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                        {Number(item.unit_price).toLocaleString("vi-VN")}₫ / sp
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-gray-50/80 px-3.5 py-2.5 text-xs text-gray-600 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#009b7a] shrink-0" />
              <div className="truncate text-xs">
                <span className="font-semibold text-gray-800">
                  {order.recipient_name}
                </span>
                <span className="text-gray-400 mx-1.5">•</span>
                <span className="text-gray-600">{order.recipient_phone}</span>
                <span className="text-gray-400 mx-1.5">•</span>
                <span className="text-gray-500">{order.recipient_address}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-semibold text-gray-500">
                  Tổng thanh toán:
                </span>
                <span className="text-lg sm:text-xl font-black text-red-600 font-mono tracking-tight">
                  {Number(order.total_amount).toLocaleString("vi-VN")}₫
                </span>
              </div>

              <div className="flex items-center gap-2.5 ml-auto">
                {isCancelable && (
                  <button
                    type="button"
                    onClick={() => handleCancelOrder(order.id)}
                    className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-gray-200 hover:border-rose-200 transition-all cursor-pointer shadow-2xs active:scale-95"
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
                      className="px-5 py-2 text-xs font-bold text-white bg-[#009b7a] hover:bg-[#008266] rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
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
