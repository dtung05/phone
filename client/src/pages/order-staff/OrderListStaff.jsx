import React, { useEffect, useState } from "react";
import {
  Search,
  Eye,
  Edit3,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Clock,
  CheckCircle2,
  Truck,
  CheckCheck,
  XCircle,
} from "lucide-react";
import { useGetStaffOrdersQuery } from "../../store/api/orderApi";
import { formatPrice } from "../../utils/price";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
  PaymentMethodBadge,
} from "../../components/order-staff/OrderStatusBadge";
import OrderDetailModal from "../../components/order-staff/OrderDetailModal";
import UpdateOrderStatusModal from "../../components/order-staff/UpdateOrderStatusModal";
import { useEcho, useEchoPublic } from "@laravel/echo-react";

const STATUS_TABS = [
  { key: "", label: "Tất cả", icon: ShoppingBag },
  { key: "Chờ xử lý", label: "Chờ xử lý", icon: Clock },
  { key: "Đã xác nhận", label: "Đã xác nhận", icon: CheckCircle2 },
  { key: "Đang giao", label: "Đang giao", icon: Truck },
  { key: "Thành công", label: "Thành công", icon: CheckCheck },
  { key: "Đã hủy", label: "Đã hủy", icon: XCircle },
];

const OrderListStaff = () => {
  // State for server-side query params
  const [activeTab, setActiveTab] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Modal states
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState(null);
  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState(null);

  // Fetch orders from server
  const {
    data: ordersResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetStaffOrdersQuery({
    search: searchTerm,
    order_status: activeTab,
    payment_status: paymentFilter,
    page,
    per_page: perPage,
  });
  const orders = ordersResponse?.data || [];
  useEchoPublic("orders", "OrderCreated", () => {
    console.log("Có đơn mới:");
    refetch();
  });
  const meta = {
    current_page: ordersResponse?.current_page || page,
    last_page: ordersResponse?.last_page || 1,
    total: ordersResponse?.total || 0,
    from: ordersResponse?.from || 0,
    to: ordersResponse?.to || 0,
  };

  // Reset page to 1 when filters change
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput.trim());
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    setPage(1);
  };

  const handlePaymentFilterChange = (e) => {
    setPaymentFilter(e.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
  
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            <span>Quản lý đơn hàng</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tra cứu, kiểm soát tiến trình vận chuyển, duyệt trạng thái và đồng
            bộ tồn kho
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isFetching ? "animate-spin text-emerald-600" : ""}`}
            />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* STATUS TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {STATUS_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-t-lg text-xs font-semibold transition-all whitespace-nowrap border-b-2 -mb-[2px] cursor-pointer ${
                isActive
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full md:w-96 relative flex items-center"
        >
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm theo Mã đơn (#), Tên người nhận, SĐT..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-20 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="text-[11px] text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded cursor-pointer"
              >
                Xóa
              </button>
            )}
            <button
              type="submit"
              className="px-2.5 py-1 bg-emerald-600 text-white rounded-md text-[11px] font-semibold hover:bg-emerald-700 transition cursor-pointer"
            >
              Tìm
            </button>
          </div>
        </form>

        {/* Filters and PerPage */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
          {/* Payment filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Thanh toán:
            </span>
            <select
              value={paymentFilter}
              onChange={handlePaymentFilterChange}
              className="text-xs font-medium px-2.5 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="">Tất cả</option>
              <option value="Paid">Đã thanh toán (Paid)</option>
              <option value="Unpaid">Chưa thanh toán (Unpaid)</option>
            </select>
          </div>

          {/* Per Page */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Hiển thị:
            </span>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="text-xs font-medium px-2 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
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
                    ? new Date(order.created_at).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
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

                      {/* TÓM TẮT SẢN PHẨM */}
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

                      {/* TỔNG TIỀN */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                        {formatPrice(order.total_amount ?? order.total_price)}
                      </td>

                      {/* THANH TOÁN */}
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

        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            Hiển thị{" "}
            <strong className="text-slate-800">
              {meta.total === 0 ? 0 : meta.from}
            </strong>{" "}
            -{" "}
            <strong className="text-slate-800">
              {meta.total === 0 ? 0 : meta.to}
            </strong>{" "}
            trên tổng số{" "}
            <strong className="text-slate-800">{meta.total}</strong> đơn hàng
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Trước</span>
            </button>

            {/* Page indicator */}
            <span className="px-3 py-1.5 font-medium text-slate-700">
              Trang {meta.current_page} / {meta.last_page}
            </span>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))}
              disabled={page >= meta.last_page}
              className="px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
            >
              <span>Sau</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <OrderDetailModal
        isOpen={Boolean(selectedOrderForDetail)}
        onClose={() => setSelectedOrderForDetail(null)}
        order={selectedOrderForDetail}
        onOpenUpdateStatus={(order) => setSelectedOrderForStatus(order)}
      />

      <UpdateOrderStatusModal
        isOpen={Boolean(selectedOrderForStatus)}
        onClose={() => setSelectedOrderForStatus(null)}
        order={selectedOrderForStatus}
        onSuccess={() => {
          refetch();
          if (selectedOrderForDetail?.id === selectedOrderForStatus?.id) {
            setSelectedOrderForDetail(null);
          }
        }}
      />
    </div>
  );
};

export default OrderListStaff;
