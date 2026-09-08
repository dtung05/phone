import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import Toast from "../components/block/Toast";

const Staff = () => {
  const profile = useSelector((state) => state.profile);
  const toast = useSelector((state) => state.toast);

  // Lấy chữ cái đầu của tên làm Avatar
  const getInitial = (name) => {
    if (!name) return "S";
    const parts = name.trim().split(" ");
    return parts[parts.length - 1].charAt(0).toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* SIDEBAR BÊN TRÁI */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* BRAND / LOGO AREA */}
          <div className="h-16 border-b border-slate-100 flex items-center px-6 gap-2">
            <div className="w-3 h-6 bg-emerald-600 rounded-sm"></div>
            <span className="font-bold text-base text-slate-800 tracking-tight">
              STAFF<span className="text-emerald-600">PORTAL</span>
            </span>
          </div>

          {/* THÔNG TIN NHÂN VIÊN */}
          <div className="p-4 mx-3 my-3 bg-slate-50 border border-slate-200/60 rounded-lg flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
              {getInitial(profile?.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-xs text-slate-900 truncate">
                {profile?.name || "Nhân viên"}
              </p>
              <p className="text-[11px] text-emerald-700 font-medium capitalize">
                {profile?.role || "Staff"}
              </p>
            </div>
          </div>

          {/* MENU ĐIỀU HƯỚNG */}
          <nav className="px-3 space-y-1 mt-2">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Quản lý danh mục
            </p>
            <NavLink
              to="/staff/products"
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded-md transition-all ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <span>Quản lý & Thêm sản phẩm</span>
            </NavLink>
          </nav>
        </div>

        {/* NÚT ĐĂNG XUẤT */}
        <div className="p-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              window.location.href = "/login";
            }}
            className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            Đăng xuất tài khoản
          </button>
        </div>
      </aside>

      {/* KHU VỰC NỘI DUNG BÊN PHẢI */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-600">
              Hệ thống hoạt động bình thường
            </span>
          </div>

          <div className="text-xs text-slate-500">
            Xin chào, <strong className="text-slate-800">{profile?.name || "Nhân viên"}</strong>
          </div>
        </header>

        {/* NỘI DUNG TRANG FORM / CHỨC NĂNG */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {toast?.message && <Toast />}
    </div>
  );
};

export default Staff;