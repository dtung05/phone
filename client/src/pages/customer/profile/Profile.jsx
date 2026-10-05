import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  KeyRound,
  Mail,
  ShoppingBag,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useGetProfileQuery } from "../../../store/api/authApi";
import InfoUser from "../../../components/customer/profile/InfoUser";
import ChangePassword from "@/components/customer/profile/ChangePassword";
import Loading from "@/components/common/feedback/Loading";

const Profile = () => {
  const { data: profile, isLoading } = useGetProfileQuery();

  const [activeTab, setActiveTab] = useState("info");

  if (isLoading) {
    return <Loading text="Đang tải thông tin tài khoản." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 via-gray-50/50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-emerald-500/20">
              {profile?.full_name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <span className="absolute -bottom-1 -right-1 p-1.5 bg-emerald-500 text-white rounded-full shadow border-2 border-white">
              <CheckCircle className="w-4 h-4" />
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left z-10 space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                {profile?.full_name || "Khách hàng"}
              </h1>
              <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {profile?.role || "Thành viên"}
              </span>
            </div>

            <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-4 h-4 text-emerald-600" />
              {profile?.email}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-600">
              {profile?.created_at && (
                <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  Tham gia từ: {profile?.created_at}
                </span>
              )}
              <Link
                to="/orders"
                className="flex items-center gap-1 bg-emerald-50 text-emerald-700 font-medium px-3 py-1 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {profile?.order_count || 0} đơn hàng
              </Link>
            </div>
          </div>
        </div>

        {/* nút bấm hiển thị thông tin */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === "info"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <User className="w-4 h-4" />
            Thông tin cá nhân
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === "password"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <KeyRound className="w-4 h-4" />
            Đổi mật khẩu
          </button>
        </div>
        {/* Đổi thông tin người dùng */}
        {activeTab === "info" && <InfoUser profile={profile} />}
        {/* Đổi mật khẩu */}
        {activeTab === "password" && <ChangePassword />}
      </div>
    </div>
  );
};

export default Profile;
