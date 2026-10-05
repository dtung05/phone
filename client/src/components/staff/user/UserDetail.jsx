import {
  X,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  XCircle,
  ShoppingBag,
  Calendar,
} from "lucide-react";
import { useGetUserDetailQuery } from "../../../store/api/userApi";
import Loading from "../../common/feedback/Loading";
import Error from "../../common/feedback/Error";

const UserDetail = ({ userId, onClose }) => {
  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserDetailQuery(userId, {
    skip: !userId,
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">
                Chi tiết tài khoản #{userId}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 text-xs pr-1">
          {isLoading ? (
            <Loading text="Đang tải thông tin tài khoản" />
          ) : isError || !user ? (
            <Error />
          ) : (
            <>
              {/* User Overview */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-emerald-500/20">
                    {user.full_name
                      ? user.full_name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">
                      {user.full_name}
                    </h4>
                    <p className="text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold ${
                      user.role === "Quản trị viên"
                        ? "bg-purple-100 text-purple-800"
                        : user.role === "Nhân viên sale"
                          ? "bg-blue-100 text-blue-800"
                          : user.role === "Nhân viên kho"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    <Shield className="w-3 h-3" />
                    {user.role}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold ${
                      user.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {user.status === "Active" ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        Hoạt động
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 text-rose-500" />
                        Đã khóa
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-3">
                <h5 className="font-semibold text-gray-700">
                  Thông tin liên hệ & Giao hàng
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                    <Phone className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] text-gray-400">Số điện thoại</p>
                      <p className="font-medium text-gray-700 mt-0.5">
                        {user.shipping_address?.phone_number ||
                          user.shippingAddress?.phone_number ||
                          "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                    <Calendar className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] text-gray-400">Ngày tham gia</p>
                      <p className="font-medium text-gray-700 mt-0.5">
                        {formatDate(user.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2 flex items-start gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                    <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] text-gray-400">
                        Địa chỉ giao hàng mặc định
                      </p>
                      <p className="font-medium text-gray-700 mt-0.5">
                        {user.shipping_address?.address ||
                          user.shippingAddress?.address ||
                          "Chưa thiết lập địa chỉ giao hàng"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    Lịch sử đơn hàng gần đây
                  </h5>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                    Tổng cộng: {user.orders_count || 0} đơn
                  </span>
                </div>

                {!user.orders || user.orders.length === 0 ? (
                  <div className="py-6 text-center text-gray-400 italic bg-gray-50 rounded-xl">
                    Người dùng chưa phát sinh đơn hàng nào.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-medium text-[11px]">
                          <th className="pb-2">Mã đơn</th>
                          <th className="pb-2">Ngày đặt</th>
                          <th className="pb-2">Tổng tiền</th>
                          <th className="pb-2">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {user.orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50/50">
                            <td className="py-2.5 font-mono font-semibold text-gray-700">
                              #{order.id}
                            </td>
                            <td className="py-2.5 text-gray-500">
                              {formatDate(order.created_at)}
                            </td>
                            <td className="py-2.5 font-semibold text-emerald-600">
                              {formatCurrency(order.total_amount)}
                            </td>
                            <td className="py-2.5">
                              <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-medium">
                                {order.order_status || "Chờ xử lý"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
