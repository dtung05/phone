import {
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Repeat2,
  Phone,
  Package,
  MapPin,
  UserRound,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import FormSearch from "../product/FormSearch";

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
            <FormSearch />
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
