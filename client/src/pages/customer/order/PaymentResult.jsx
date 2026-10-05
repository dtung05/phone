import { useSearchParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  RefreshCw,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const status = searchParams.get("status");
  const isSuccess = status === "success";

  const formattedDate = new Date().toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50/40 px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 text-center shadow-xl shadow-emerald-900/5 border border-emerald-100">
        <div className="mb-5 flex justify-center">
          {isSuccess ? (
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-30" />
              <div className="relative rounded-full bg-emerald-500 p-4 text-white shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="h-12 w-12 stroke-[2.5]" />
              </div>
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <div className="rounded-full bg-red-500 p-4 text-white shadow-lg shadow-red-500/30">
                <XCircle className="h-12 w-12 stroke-[2.5]" />
              </div>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại"}
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          {isSuccess
            ? "Giao dịch của bạn đã hoàn tất. Cảm ơn bạn đã tin tưởng dịch vụ!"
            : "Rất tiếc, giao dịch không thể thực hiện. Vui lòng thử lại."}
        </p>

        <div className="mb-6 rounded-xl bg-gray-50/80 p-5 border border-gray-100 text-left space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Trạng thái</span>
            <span
              className={`font-semibold px-2.5 py-0.5 rounded-full text-xs ${
                isSuccess
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isSuccess ? "Thành công" : "Thất bại"}
            </span>
          </div>
          {orderId && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Mã đơn hàng</span>
              <span className="font-mono font-bold text-gray-800">
                #{orderId}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Thời gian</span>
            <span className="font-medium text-gray-700">{formattedDate}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Về trang chủ
          </Link>

          <Link
            to={`/orders`}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-[0.98]"
          >
            <ShoppingBag className="h-4 w-4" />
            Xem đơn hàng
          </Link>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Giao dịch được bảo mật </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
