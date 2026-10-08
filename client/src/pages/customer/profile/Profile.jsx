import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  KeyRound,
  Mail,
  ShoppingBag,
  ShieldCheck,
  Calendar,
  ChevronRight,
  PhoneCall,
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
    return <Loading text="Đang tải thông tin tài khoản..." />;
  }

  const userInitial =
    profile?.full_name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#f8faf9] py-5 sm:py-7">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap"
        >
          <Link to="/" className="hover:text-[#009b7a] transition-colors">
            Trang chủ
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-semibold">Tài khoản cá nhân</span>
        </nav>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 lg:p-7 shadow-2xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#009b7a] text-white text-2xl sm:text-3xl font-extrabold flex items-center justify-center shadow-xs">
                  {userInitial}
                </div>
                <span className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-2xs text-[#009b7a]">
                  <ShieldCheck className="w-4 h-4 fill-[#009b7a] text-white" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    {profile?.full_name || "Khách hàng"}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#d9f7eb] text-[#006b5a] border border-[#bbf0dc]">
                    {profile?.role === "admin"
                      ? "Quản trị viên"
                      : "Thành viên thân thiết"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#009b7a]" />
                  <span>{profile?.email || "Chưa có email"}</span>
                </p>

                {profile?.created_at && (
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 pt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Tham gia từ: {profile.created_at}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                to="/orders"
                className="flex-1 md:flex-initial flex items-center justify-between md:justify-start gap-3.5 px-4 py-3 rounded-xl border border-gray-200/80 bg-[#f8fafc] hover:bg-[#eefbf6] hover:border-[#009b7a]/40 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-[#d9f7eb] text-[#006b5a] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5 text-[#009b7a]" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-medium">
                    Đơn hàng của bạn
                  </p>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-[#009b7a] transition-colors">
                    {profile?.order_count || 0} đơn hàng
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#009b7a] group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200/80 p-3 sm:p-3.5 shadow-2xs space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab("info")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "info"
                    ? "bg-[#eefbf6] text-[#006b5a] border border-[#d9f7eb] shadow-2xs font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <User
                    className={`w-4 h-4 ${
                      activeTab === "info" ? "text-[#009b7a]" : "text-gray-400"
                    }`}
                  />
                  <span>Thông tin cá nhân</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 ${
                    activeTab === "info" ? "text-[#009b7a]" : "text-gray-300"
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("password")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "password"
                    ? "bg-[#eefbf6] text-[#006b5a] border border-[#d9f7eb] shadow-2xs font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <KeyRound
                    className={`w-4 h-4 ${
                      activeTab === "password"
                        ? "text-[#009b7a]"
                        : "text-gray-400"
                    }`}
                  />
                  <span>Đổi mật khẩu</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 ${
                    activeTab === "password"
                      ? "text-[#009b7a]"
                      : "text-gray-300"
                  }`}
                />
              </button>

              <Link
                to="/orders"
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all border border-transparent group"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-gray-400 group-hover:text-[#009b7a] transition-colors" />
                  <span>Quản lý đơn hàng</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-semibold group-hover:bg-[#d9f7eb] group-hover:text-[#006b5a] transition-colors">
                  {profile?.order_count || 0}
                </span>
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-100 pb-2.5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#009b7a]" />
                <span>Bảo mật & Hỗ trợ</span>
              </h3>
              <ul className="text-xs text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#009b7a] font-bold">✓</span>
                  <span>Mọi thông tin cá nhân đều được mã hóa an toàn</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                <p className="flex items-center gap-1.5 text-gray-700 font-medium">
                  <PhoneCall className="w-3.5 h-3.5 text-[#009b7a]" />
                  <span>Tổng đài hỗ trợ:</span>
                  <a
                    href="tel:19002091"
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

          {/* CỘT PHẢI (8 CỘT): FORM NỘI DUNG TƯƠNG ỨNG */}
          <div className="lg:col-span-8">
            {activeTab === "info" && <InfoUser profile={profile} />}
            {activeTab === "password" && <ChangePassword />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
