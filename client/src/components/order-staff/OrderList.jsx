import { Edit3, Eye, RefreshCw, ShoppingBag } from "lucide-react";
import OrderStatusBadge, {
  PaymentMethodBadge,
  PaymentStatusBadge,
} from "./OrderStatusBadge";
import { formatPrice } from "../../utils/price";
import { formatDate } from "../../utils/date_time";

const OrderList = ({
  isLoading,
  meta,
  orders,
  setSelectedOrderForDetail,
  setSelectedOrderForStatus,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <th className="py-3 px-4 w-16 text-center">Mã đơn</th>
            <th className="py-3 px-4">Người nhận & Liên hệ</th>
            <th className="py-3 px-4">Sản phẩm</th>
            <th className="py-3 px-4 text-right">Tổng tiền</th>
            <th className="py-3 px-4 text-center">Thanh toán</th>
            <th className="py-3 px-4 text-center">Trạng thái đơn</th>
            <th className="py-3 px-4">Thời gian</th>
            <th className="py-3 px-4 text-center w-28">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
          {isLoading ? (
            <tr>
              <td colSpan="8" className="py-12 text-center text-slate-400">
                <div className="inline-flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>Đang tải danh sách đơn hàng...</span>
                </div>
              </td>
            </tr>
          ) : meta.total === 0 ? (
            <tr>
              <td colSpan="8" className="py-12 text-center text-slate-400">
                <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="font-semibold text-slate-600">
                  Không tìm thấy đơn hàng nào
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc
                </p>
              </td>
            </tr>
          ) : (
            orders.map((order) => {
              const items = order.order_items || [];
              const totalItemsCount = items.reduce(
                (sum, it) => sum + (Number(it.quantity) || 1),
                0,
              );
              const firstItem = items[0];
              const firstProductName =
                firstItem?.product_name ||
                firstItem?.product_variant?.product?.product_name ||
                firstItem?.product_variant?.product?.name ||
                "Sản phẩm";
              const moreItemsCount = Math.max(0, items.length - 1);

              const orderDate = order.created_at
                ? formatDate(order.created_at)
                : "—";

              return (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  {/* MÃ ĐƠN */}
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-600">
                    #{order.id}
                  </td>

                  {/* KHÁCH HÀNG & LIÊN HỆ */}
                  <td className="py-3.5 px-4">
                    <div className="min-w-0 max-w-[200px]">
                      <p className="font-bold text-slate-900 truncate">
                        {order.recipient_name}
                      </p>
                      <p className="text-[11px] font-mono text-emerald-700 truncate">
                        {order.recipient_phone}
                      </p>
                      <p
                        className="text-[11px] text-slate-400 truncate mt-0.5"
                        title={order.recipient_address}
                      >
                        {order.recipient_address}
                      </p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="min-w-0 max-w-[220px]">
                      <p className="font-medium text-slate-800 truncate">
                        {firstProductName}
                      </p>
                      {moreItemsCount > 0 ? (
                        <p className="text-[11px] text-slate-400">
                          và{" "}
                          <strong className="text-slate-600">
                            +{moreItemsCount}
                          </strong>{" "}
                          sản phẩm khác ({totalItemsCount} món)
                        </p>
                      ) : (
                        <p className="text-[11px] text-slate-400">
                          Số lượng: {totalItemsCount} món
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                    {formatPrice(order.total_amount ?? order.total_price)}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex flex-col items-center gap-1">
                      <PaymentStatusBadge status={order.payment_status} />
                      <PaymentMethodBadge method={order.payment_method} />
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <OrderStatusBadge status={order.order_status} />
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 text-[11px] font-mono whitespace-nowrap">
                    {orderDate}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedOrderForDetail(order)}
                        title="Xem chi tiết đơn hàng"
                        className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition hover:text-emerald-700 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedOrderForStatus(order)}
                        title="Cập nhật trạng thái"
                        className="p-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
