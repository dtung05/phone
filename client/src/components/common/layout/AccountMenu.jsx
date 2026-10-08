import React, { useState, useRef, useEffect } from "react";
import {
  UserRound,
  ChevronDown,
  User,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeProfile } from "../../../store/slices/profileSlice";

function AccountMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!token) {
    return (
      <Link
        to="/login"
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-bold text-gray-700 hover:text-[#009b7a] hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap"
      >
        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
          <UserRound size={18} />
        </div>
        <div className="hidden sm:block text-left leading-tight">
          <span className="text-xs text-gray-400 block font-normal">
            Tài khoản
          </span>
          <span className="font-bold text-sm">Đăng nhập</span>
        </div>
      </Link>
    );
  }

  const displayName = profile?.name || profile?.full_name || "Tài khoản";
  const initial = displayName.trim().charAt(0).toUpperCase() || "U";

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(removeProfile());
    setOpen(false);
    navigate("/login");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap group"
      >
        <div className="w-9 h-9 rounded-xl bg-[#009b7a] text-white flex items-center justify-center text-sm font-extrabold shadow-2xs">
          {initial}
        </div>
        <div className="hidden sm:block text-left leading-tight">
          <span className="text-xs text-gray-400 block font-normal">
            Xin chào,
          </span>
          <span className="font-bold text-sm text-gray-800 group-hover:text-[#009b7a] transition-colors truncate max-w-[120px] block">
            {displayName}
          </span>
        </div>
        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-gray-100 bg-white p-2.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2.5 border-b border-gray-100 bg-[#fbfdfc] rounded-xl mb-1.5">
            <p className="text-sm font-bold text-gray-900 truncate">
              {displayName}
            </p>
            {profile?.email && (
              <p className="text-xs text-gray-400 truncate mt-0.5">
                {profile.email}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#eefbf6] hover:text-[#006b5a] transition-colors"
            >
              <User size={16} className="text-[#009b7a]" />
              <span>Thông tin tài khoản</span>
            </Link>

            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#eefbf6] hover:text-[#006b5a] transition-colors"
            >
              <ShoppingBag size={16} className="text-[#009b7a]" />
              <span>Đơn hàng của tôi</span>
            </Link>
          </div>

          <div className="pt-1.5 mt-1.5 border-t border-gray-100">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountMenu;
