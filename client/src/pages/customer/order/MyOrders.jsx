import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useCancelOrderMutation,
  useGetOrdersQuery,
} from "../../../store/api/orderApi";
import Loading from "../../../components/common/feedback/Loading";
import Pagination from "../../../components/common/pagination/Pagination";
import OrderStatusTabs from "../../../components/customer/order/OrderStatusTabs";
import OrderList from "../../../components/customer/order/OrderList";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/slices/toastSlice";
import {
  PackageOpen,
  ShoppingBag,
  ArrowLeft,
  User,
  Package,
  Truck,
  ChevronRight,
  ShoppingCart,
  ShieldCheck,
  PhoneCall,
  Clock,
} from "lucide-react";
import NoResult from "@/components/common/feedback/NoResult";

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
  const [cannelOrder, { isLoading: isLoadingCancel }] =
    useCancelOrderMutation();
  const dispatch = useDispatch();

  if (isLoading) return <Loading text="Đang tải danh sách đơn hàng..." />;

  if (error)
    return (
      <div className="bg-[#f8faf9] min-h-screen py-8">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="p-8 text-center bg-white rounded-2xl border border-red-200 text-red-600 text-sm shadow-2xs max-w-md mx-auto">
            Có lỗi xảy ra khi tải dữ liệu đơn hàng. Vui lòng thử lại sau!
          </div>
        </div>
      </div>
    );

  const orders = response?.data || [];
  const total = response?.total || 0;
  const lastPage = response?.last_page || 1;

  const handleCancelOrder = async (orderId) => {
    if (window.confirm(`Xác nhận hủy đơn hàng #${orderId}?`)) {
      try {
        const result = await cannelOrder(orderId).unwrap();
        dispatch(
          showToast({
            message: result.message,
            type: result.type,
          }),
        );
        if (result.type === "success") {
          setStatus("Đã hủy");
        }
      } catch (err) {
        dispatch(
          showToast({
            message: err?.data?.message || "Không thể hủy đơn hàng",
            type: "error",
          }),
        );
      }
    }
  };

  return (
    <div className="bg-[#f8faf9] min-h-screen py-5 sm:py-7">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap"
        >
          <Link to="/" className="hover:text-[#009b7a] transition-colors">
            Trang chủ
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-semibold">Đơn hàng của tôi</span>
        </nav>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Đơn hàng của tôi
            </h1>
            {total > 0 && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#d9f7eb] text-[#006b5a] border border-[#bbf0dc]">
                {total} đơn hàng
              </span>
            )}
          </div>

          <Link
            to="/products"
            className="text-xs text-[#009b7a] hover:text-[#006b5a] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Tiếp tục mua hàng</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-4">
            <OrderStatusTabs
              statusTab={STATUS_TABS}
              status={status}
              setStatus={setStatus}
              setPage={setPage}
            />

            {orders.length === 0 ? (
              <NoResult
                title="Chưa có đơn hàng nào."
                content="Khám phá các dòng điện thoại mới cùng nhiều hấp dẫn ưu đãi ngay nhé."
                action={
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-[#009b7a] hover:bg-[#006b5a] rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    <span>Khám phá sản phẩm ngay</span>
                  </Link>
                }
              />
            ) : (
             
              <OrderList
                orders={orders}
                handleCancelOrder={handleCancelOrder}
              />
            )}

            <Pagination
              currentPage={page}
              lastPage={lastPage}
              onPageChange={setPage}
            />
          </div>

          <div className="lg:col-span-4 sticky top-20 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-[#009b7a]" />
                <span>Trung tâm đơn hàng</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50 text-gray-700">
                  <span className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-[#009b7a]" />
                    <span>Tổng đơn trong danh mục:</span>
                  </span>
                  <span className="font-bold text-gray-900 font-mono text-sm">
                    {total}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50 text-gray-700">
                  <span className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#009b7a]" />
                    <span>Vận chuyển:</span>
                  </span>
                  <span className="font-semibold text-[#006b5a]">
                    Miễn phí toàn quốc
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 space-y-1.5">
                <Link
                  to="/profile"
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-[#eefbf6] hover:text-[#006b5a] transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#009b7a]" />
                    <span>Tài khoản của tôi</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#009b7a]" />
                </Link>

                <Link
                  to="/carts"
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-[#eefbf6] hover:text-[#006b5a] transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#009b7a]" />
                    <span>Giỏ hàng hiện tại</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#009b7a]" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-3.5 text-xs text-gray-600">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2.5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#009b7a]" />
                <span>Quyền lợi mua sắm</span>
              </h3>

              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#d9f7eb] text-[#006b5a] flex items-center justify-center shrink-0 text-[10px] font-bold">
                    ✓
                  </span>
                  <span>Đồng kiểm sản phẩm trước khi thanh toán nhận hàng</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#d9f7eb] text-[#006b5a] flex items-center justify-center shrink-0 text-[10px] font-bold">
                    ✓
                  </span>
                  <span>
                    1 đổi 1 trong 30 ngày nếu phát sinh lỗi nhà sản xuất
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#d9f7eb] text-[#006b5a] flex items-center justify-center shrink-0 text-[10px] font-bold">
                    ✓
                  </span>
                  <span>Hỗ trợ kỹ thuật và tra cứu đơn hàng 24/7</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                <p className="flex items-center gap-1.5 text-gray-700 font-medium">
                  <PhoneCall className="w-3.5 h-3.5 text-[#009b7a]" />
                  <span>Tổng đài CSKH:</span>
                  <a
                    href="tel:0862527719"
                    className="text-[#009b7a] font-bold hover:underline"
                  >
                    086.252.7719
                  </a>
                </p>
                <p className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>08:00 - 21:30 hàng ngày</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
