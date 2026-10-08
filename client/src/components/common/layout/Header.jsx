import React from "react";
import {
  ShieldCheck,
  Repeat2,
  Phone,
  Truck,
  Package,
  ShoppingBag,
  PhoneCall,
} from "lucide-react";
import { Link } from "react-router-dom";
import FormSearch from "../../customer/product/FormSearch";
import AccountMenu from "./AccountMenu";
import BrandMenu from "./BrandMenu";

function Header() {
  return (
    <header className="w-full bg-white z-40">
      <div className="h-10 bg-[#eefbf6] border-b border-[#bbf0dc]/60 text-[#006b5a] text-xs sm:text-[13px]">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck size={16} className="text-[#009b7a] shrink-0" />
            <span className="truncate">Sản phẩm chính hãng 100%</span>
          </div>

          <div className="hidden md:flex items-center gap-2 font-medium">
            <Repeat2 size={16} className="text-[#009b7a] shrink-0" />
            <span>Cam kết 1 đổi 1 trong 30 ngày</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 font-medium">
            <Truck size={16} className="text-[#009b7a] shrink-0" />
            <span>Miễn phí giao hàng toàn quốc</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold">
            <Phone size={14} className="text-[#009b7a] shrink-0" />
            <span>Hotline tư vấn:</span>
            <a
              href="tel:0862527719"
              className="hover:underline text-[#009b7a] font-extrabold"
            >
              086.252.7719
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-2xs">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center gap-4 sm:gap-6 justify-between">
            {/* BRAND LOGO */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#009b7a] to-[#00c99e] text-white flex items-center justify-center font-black text-2xl shadow-xs group-hover:scale-105 transition-transform">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#006b5a] leading-none">
                  DIDONG<span className="text-[#009b7a]">.COM</span>
                </span>
                <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase mt-1">
                  Điện thoại chính hãng
                </span>
              </div>
            </Link>

            {/* SEARCH FORM */}
            <FormSearch />

            {/* ACTION ITEMS */}
            <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
              {/* HOTLINE DESKTOP */}
              <a
                href="tel:0862527719"
                className="hidden xl:flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-[#eefbf6] text-[#009b7a] flex items-center justify-center shrink-0">
                  <PhoneCall size={18} />
                </div>
                <div className="text-left leading-tight">
                  <span className="text-xs text-gray-400 block font-normal">
                    Tư vấn miễn phí
                  </span>
                  <span className="font-bold text-sm text-gray-900">
                    086.252.7719
                  </span>
                </div>
              </a>

              {/* TRA CỨU ĐƠN HÀNG */}
              <Link
                to="/orders"
                className="hidden md:flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:text-[#009b7a] hover:bg-gray-50 transition-colors"
              >
                <Package size={18} className="text-[#009b7a]" />
                <span>Tra cứu đơn</span>
              </Link>

              {/* ACCOUNT MENU */}
              <AccountMenu />

              {/* SHOPPING CART BUTTON */}
              <Link
                to="/carts"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#eefbf6] text-[#006b5a] hover:bg-[#d9f7eb] border border-[#bbf0dc] transition-all font-bold text-sm cursor-pointer shadow-2xs group"
              >
                <ShoppingBag
                  size={18}
                  className="text-[#009b7a] group-hover:scale-110 transition-transform"
                />
                <span className="hidden sm:inline">Giỏ hàng</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BRAND SUBMENU */}
      <BrandMenu />
    </header>
  );
}

export default Header;
