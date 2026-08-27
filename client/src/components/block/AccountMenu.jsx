import { useState } from "react";
import { UserRound, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function AccountMenu() {
  const [open, setOpen] = useState(false);

  if (!localStorage.getItem("access_token")) {
    return (
      <div className="flex items-center gap-2">
        <UserRound size={22} />
        <Link to="/login">Đăng nhập</Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center gap-2 whitespace-nowrap"
      >
        <UserRound size={22} />
        <span>Tài khoản</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border bg-white py-2 shadow-lg">
          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
            Thông tin tài khoản
          </Link>

          <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
            Đơn hàng
          </Link>

          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => {
                localStorage.removeItem("access_token");
                window.location.href = "/";
            }}
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountMenu;
