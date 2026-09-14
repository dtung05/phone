import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  X,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Loader2,
  PackageCheck,
  PackageX,
} from "lucide-react";
import { useUpdateStaffOrderStatusMutation } from "../../store/api/orderApi";
import { showToast } from "../../store/slices/toastSlice";

const ORDER_STATUSES = [
  "Chờ xử lý",
  "Đã xác nhận",
  "Đang giao",
  "Thành công",
  "Đã hủy",
];

const PAYMENT_STATUSES = [
  { value: "Unpaid", label: "Chưa thanh toán (Unpaid)" },
  { value: "Paid", label: "Đã thanh toán (Paid)" },
];

const UpdateOrderStatusModal = ({ isOpen, onClose, order, onSuccess }) => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");

  const [updateStatus, { isLoading }] = useUpdateStaffOrderStatusMutation();

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.order_status || "Chờ xử lý");
      setSelectedPaymentStatus(order.payment_status || "Unpaid");
    }
  }, [order, isOpen]);

  if (!isOpen || !order) return null;

  const isCancelling =
    order.order_status !== "Đã hủy" && selectedStatus === "Đã hủy";
  const isUncancelling =
    order.order_status === "Đã hủy" && selectedStatus !== "Đã hủy";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateStatus({
        id: order.id,
        order_status: selectedStatus,
        payment_status: selectedPaymentStatus,
      }).unwrap();

      dispatch(
        showToast({
          message: res?.message || "Cập nhật trạng thái đơn hàng thành công!",
          type: "success",
        })
      );
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      const errMsg =
        err?.data?.message ||
        err?.error ||
        "Có lỗi xảy ra khi cập nhật trạng thái đơn hàng!";
      dispatch(
        showToast({
          message: errMsg,
          type: "error",
        })
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Cập nhật trạng thái đơn #{order.id}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Khách hàng: {order.recipient_name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* CHỌN TRẠNG THÁI ĐƠN HÀNG */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Trạng thái đơn hàng <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
            >
              {ORDER_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* CHỌN TRẠNG THÁI THANH TOÁN */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Trạng thái thanh toán
            </label>
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
            >
              {PAYMENT_STATUSES.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* CẢNH BÁO TỒN KHO KHI HỦY HOẶC HOÀN HỦY */}
          {isCancelling && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-800 animate-fadeIn">
              <PackageCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Lưu ý khi Hủy đơn:</strong>
                <span>
                  Hệ thống sẽ tự động <strong>hoàn lại (cộng lại) tồn kho</strong> cho toàn bộ các sản phẩm/biến thể trong đơn hàng này.
                </span>
              </div>
            </div>
          )}

          {isUncancelling && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2.5 text-xs text-blue-800 animate-fadeIn">
              <PackageX className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Lưu ý khi Phục hồi đơn đã hủy:</strong>
                <span>
                  Hệ thống sẽ tự động <strong>trừ tồn kho</strong> lại tương ứng. Nếu bất kỳ mặt hàng nào không đủ tồn kho, thao tác sẽ bị chặn và báo lỗi.
                </span>
              </div>
            </div>
          )}

          {/* NÚT THAO TÁC */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-xs disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Xác nhận cập nhật</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrderStatusModal;
