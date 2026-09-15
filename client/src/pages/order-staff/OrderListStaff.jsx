import { useState } from "react";
import {
  Search,
  ShoppingBag,
  RefreshCw,
  Clock,
  CheckCircle2,
  Truck,
  CheckCheck,
  XCircle,
} from "lucide-react";
import { useGetStaffOrdersQuery } from "../../store/api/orderApi";
import OrderDetailModal from "../../components/order-staff/OrderDetailModal";
import UpdateOrderStatusModal from "../../components/order-staff/UpdateOrderStatusModal";
import { useEcho } from "@laravel/echo-react";
import Pagination_2 from "../../components/block/Pagination_2";
import OrderList from "../../components/order-staff/OrderList";

const STATUS_TABS = [
  { key: "", label: "Tất cả", icon: ShoppingBag },
  { key: "Chờ xử lý", label: "Chờ xử lý", icon: Clock },
  { key: "Đã xác nhận", label: "Đã xác nhận", icon: CheckCircle2 },
  { key: "Đang giao", label: "Đang giao", icon: Truck },
  { key: "Thành công", label: "Thành công", icon: CheckCheck },
  { key: "Đã hủy", label: "Đã hủy", icon: XCircle },
];

const OrderListStaff = () => {
  const [activeTab, setActiveTab] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState(null);
  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState(null);

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
  useEcho("orders", "order.created", () => {
    console.log("Có đơn mới:");
    refetch();
  });

  useEcho("orders", "order.updated", () => {
    console.log("Có đơn vừa cập nhật");
    refetch();
  });
  const meta = {
    current_page: ordersResponse?.current_page || page,
    last_page: ordersResponse?.last_page || 1,
    total: ordersResponse?.total || 0,
    from: ordersResponse?.from || 0,
    to: ordersResponse?.to || 0,
  };

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

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
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
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
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

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <OrderList
          isLoading={isLoading}
          meta={meta}
          orders={orders}
          setSelectedOrderForDetail={setSelectedOrderForDetail}
          setSelectedOrderForStatus={setSelectedOrderForStatus}
        />
        <Pagination_2 meta={meta} setPage={setPage} page={page} />
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
