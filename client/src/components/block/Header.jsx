import {
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Repeat2,
  Phone,
  Package,
  Search,
  MapPin,
  UserRound,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full">
      <div className="h-[50px] bg-[#d9f7eb]">
        <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-5 text-[#009b7a]">
          <ChevronLeft size={28} />

          <div className="flex items-center gap-3">
            <BadgeCheck size={28} />
            <span className="font-semibold">SẢN PHẨM CHÍNH HÃNG</span>
          </div>

          <div className="flex items-center gap-3">
            <Repeat2 size={28} />
            <span className="font-semibold">CAM KẾT LỖI ĐỔI LIỀN (*)</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={26} />
            <span className="font-semibold">HOTLINE 1900.2091</span>
          </div>

          <div className="flex items-center gap-3">
            <Package size={27} />
            <span className="font-semibold">MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC</span>
          </div>

          <ChevronRight size={28} />
        </div>
      </div>
      <div className="border-b border-gray-100 bg-white pl-13 pr-13">
        <div className="mx-auto max-w-[1500px] px-5">
          <div className="flex h-[78px] items-center gap-4">
            <div className="flex w-[285px] shrink-0 items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#009b7a] text-2xl font-black italic text-white">
                T
              </div>

              <span className="ml-2 text-[20px] font-extrabold tracking-wide text-[#006b5a]">
                <Link to="/">DIDONG.COM</Link>
              </span>
            </div>
            <div className="flex h-[52px] flex-1 max-w-[755px] items-center rounded-xl border border-gray-200">
              <input
                type="text"
                placeholder="Hôm nay bạn muốn tìm kiếm gì?"
                className="h-full flex-1 rounded-xl px-5 text-sm outline-none placeholder:text-gray-400"
              />
              <button className="flex h-[30px] items-center gap-2 border-l border-gray-200 px-5 text-[#009b7a]">
                <Search size={22} />
                <span className="text-base">Tìm kiếm</span>
              </button>
            </div>
            <div className="ml-auto flex items-center gap-8 text-[#009b7a]">
              <div className="flex cursor-pointer items-center gap-2 whitespace-nowrap">
                <MapPin size={23} />
                <span>Tìm siêu thị</span>
              </div>

              <div className="flex cursor-pointer items-center gap-2 whitespace-nowrap">
                <UserRound size={22} />
                <Link to="register">Tài khoản</Link>
              </div>

              <div className="flex cursor-pointer items-center gap-2 whitespace-nowrap">
                <ShoppingBag size={22} />
                <Link to="/carts">Giỏ hàng</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
