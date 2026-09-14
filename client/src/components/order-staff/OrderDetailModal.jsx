import React from "react";
import {
  X,
  User,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Package,
  Layers,
  Edit3,
} from "lucide-react";
import { formatPrice } from "../../utils/price";
import { getImageUrl } from "../../utils/image";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
  PaymentMethodBadge,
} from "./OrderStatusBadge";

const renderAttributes = (attrs) => {
  if (!attrs) return <span className="text-slate-400 italic">Mặc định</span>;

  if (Array.isArray(attrs) && attrs.length > 0) {
    return (
      <div className="flex flex-wrap gap-1">
        {attrs.map((av, idx) => (
          <span
            key={idx}
            className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
          >
            {av.attribute?.name || av.name || "Thuộc tính"}: {av.value}
          </span>
        ))}
      </div>
    );
  }

  if (typeof attrs === "object" && Object.keys(attrs).length > 0) {
    return (
      <div className="flex flex-wrap gap-1">
        {Object.entries(attrs).map(([key, val]) => (
          <span
            key={key}
            className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
          >
            <span className="capitalize">{key}</span>: {val}
          </span>
        ))}
      </div>
    );
  }

  return <span className="text-slate-400 italic">Mặc định</span>;
};

const OrderDetailModal = ({
  isOpen,
  onClose,
  order,
  onOpenUpdateStatus,
}) => {
  if (!isOpen || !order) return null;

  const items = order.order_items || [];
  const createdAt = order.created_at
    ? new Date(order.created_at).toLocaleString("vi-VN")
    : "—";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              #{order.id}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                Chi tiết đơn hàng #{order.id}
              </h2>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Ngày đặt: {createdAt}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* TRẠNG THÁI HIỆN TẠI & THANH TOÁN */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200/70">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Trạng thái đơn hàng
              </p>
              <OrderStatusBadge status={order.order_status} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Trạng thái thanh toán
              </p>
              <PaymentStatusBadge status={order.payment_status} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Phương thức thanh toán
              </p>
              <PaymentMethodBadge method={order.payment_method} />
            </div>
          </div>

          {/* THÔNG TIN KHÁCH HÀNG & GIAO HÀNG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 space-y-2.5">
              <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Thông tin người nhận
              </h3>
              <div className="space-y-1.5 text-slate-600">
                <p>
                  <strong className="text-slate-800">Họ tên:</strong>{" "}
                  {order.recipient_name || "—"}
                </p>
                <p className="flex items-center gap-1">
                  <strong className="text-slate-800">SĐT:</strong>{" "}
                  <a
                    href={`tel:${order.recipient_phone}`}
                    className="text-emerald-700 hover:underline font-mono"
                  >
                    {order.recipient_phone || "—"}
                  </a>
                </p>
                <p>
                  <strong className="text-slate-800">Địa chỉ:</strong>{" "}
                  {order.recipient_address || "—"}
                </p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 space-y-2.5">
              <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-emerald-600" />
                Tài khoản đặt hàng
              </h3>
              {order.user ? (
                <div className="space-y-1.5 text-slate-600">
                  <p>
                    <strong className="text-slate-800">Họ tên:</strong>{" "}
                    {order.user.full_name || "—"}
                  </p>
                  <p>
                    <strong className="text-slate-800">Email:</strong>{" "}
                    {order.user.email || "—"}
                  </p>
                  <p>
                    <strong className="text-slate-800">Mã KH:</strong>{" "}
                    <span className="font-mono">#{order.user.id}</span>
                  </p>
                </div>
              ) : (
                <p className="text-slate-400 italic">Khách vãng lai / Không có tài khoản</p>
              )}
            </div>
          </div>

          {/* DANH SÁCH MẶT HÀNG TRONG ĐƠN */}
          <div>
            <h3 className="font-bold text-slate-800 text-xs mb-3 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-emerald-600" />
              Danh sách sản phẩm ({items.length})
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Sản phẩm</th>
                    <th className="py-2.5 px-3">Biến thể</th>
                    <th className="py-2.5 px-3 text-right">Đơn giá</th>
                    <th className="py-2.5 px-3 text-center">SL</th>
                    <th className="py-2.5 px-3 text-right">Tạm tính</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => {
                    const productName =
                      item.product_name ||
                      item.product_variant?.product?.product_name ||
                      item.product_variant?.product?.name ||
                      "Sản phẩm";
                    const thumbnail =
                      item.product_thumbnail ||
                      item.product_variant?.product?.thumbnail;
                    const unitPrice = item.unit_price ?? item.price ?? 0;
                    const itemTotal =
                      item.total_amount ?? Number(unitPrice) * Number(item.quantity);
                    const attrs =
                      item.variant_attributes ||
                      item.product_variant?.attribute_values ||
                      item.product_variant?.attributes;

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={getImageUrl(thumbnail)}
                              alt={productName}
                              className="w-10 h-10 object-contain rounded border border-slate-200 bg-white p-0.5 shrink-0"
                              onError={(e) => {
                                e.target.src = "https://placehold.co/60x60?text=No+Img";
                              }}
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-slate-800 truncate">
                                {productName}
                              </p>
                              <p className="text-[11px] text-slate-400 font-mono">
                                Mã biến thể: #{item.product_variant_id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          {renderAttributes(attrs)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-medium">
                          {formatPrice(unitPrice)}
                        </td>
                        <td className="py-3 px-3 text-center font-bold">
                          x{item.quantity}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                          {formatPrice(itemTotal)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* TỔNG TIỀN */}
              <div className="bg-slate-50/80 px-4 py-3 border-t border-slate-200 flex justify-between items-center">
                <span className="font-semibold text-slate-600">Tổng cộng đơn hàng:</span>
                <span className="text-base font-bold font-mono text-emerald-700">
                  {formatPrice(order.total_amount ?? order.total_price)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenUpdateStatus) onOpenUpdateStatus(order);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-xs cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Cập nhật trạng thái</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
