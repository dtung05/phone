import React from "react";
import { Link } from "react-router-dom";
import { PhoneCall, Mail, Clock, CreditCard, Banknote } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#eefbf6] text-gray-700 text-xs sm:text-[13px] border-t border-[#bbf0dc]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-4 space-y-3.5">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#009b7a] to-[#00c99e] text-white flex items-center justify-center font-black text-xl shadow-xs group-hover:scale-105 transition-transform">
                T
              </div>
              <span className="text-xl font-black tracking-tight text-[#006b5a]">
                DIDONG<span className="text-[#009b7a]">.COM</span>
              </span>
            </Link>

            <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed max-w-sm">
              Hệ thống bán lẻ điện thoại chính hãng, bảo hành uy tín và hỗ trợ
              khách hàng tận tâm trên toàn quốc.
            </p>

            <div className="space-y-2 pt-1 text-xs sm:text-[13px] text-gray-700">
              <div className="flex items-center gap-2">
                <PhoneCall size={15} className="text-[#009b7a] shrink-0" />
                <span>
                  Hotline tư vấn:{" "}
                  <a
                    href="tel:0862527719"
                    className="font-bold text-[#009b7a] hover:underline"
                  >
                    086.252.7719
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-[#009b7a] shrink-0" />
                <span>Thời gian hỗ trợ: 08:00 - 21:30 hàng ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-[#009b7a] shrink-0" />
                <span>Email hỗ trợ: ductunng05@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-[#006b5a] uppercase tracking-wider border-b border-[#bbf0dc] pb-2">
              Địa chỉ cửa hàng
            </h3>
            <div className="w-80 h-60 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.94346510358!2d105.78643107476934!3d21.034947987566945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab49933f54f1%3A0x4233bfd8474bd829!2zNDQgVHLhuqduIFRow6FpIFTDtG5nLCBsw6BuZyBWw7JuZywgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWkgMTAwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1791477479171!5m2!1svi!2s"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-[#006b5a] uppercase tracking-wider border-b border-[#bbf0dc] pb-2">
              Tài khoản
            </h3>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-[#009b7a] transition-colors inline-block hover:translate-x-1 duration-150"
                >
                  Hồ sơ cá nhân
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="text-gray-600 hover:text-[#009b7a] transition-colors inline-block hover:translate-x-1 duration-150"
                >
                  Lịch sử mua hàng
                </Link>
              </li>
              <li>
                <Link
                  to="/products/sale"
                  className="text-gray-600 hover:text-[#009b7a] transition-colors inline-block hover:translate-x-1 duration-150"
                >
                  Sản phẩm đang giảm giá
                </Link>
              </li>
              <li>
                <Link
                  to="/carts"
                  className="text-gray-600 hover:text-[#009b7a] transition-colors inline-block hover:translate-x-1 duration-150"
                >
                  Giỏ hàng của bạn
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-[#006b5a] uppercase tracking-wider border-b border-[#bbf0dc] pb-2">
              Hình thức thanh toán
            </h3>
            <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
              Hỗ trợ các phương thức thanh toán an toàn và tiện lợi khi đặt mua
              hàng:
            </p>
            <div className="space-y-2 pt-0.5">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#bbf0dc] bg-white text-gray-800 shadow-2xs">
                <Banknote size={18} className="text-[#009b7a] shrink-0" />
                <div>
                  <span className="font-bold text-xs sm:text-[13px] block text-gray-900">
                    Thanh toán khi nhận hàng
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Kiểm tra máy rồi thanh toán tiền mặt
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#bbf0dc] bg-white text-gray-800 shadow-2xs">
                <CreditCard size={18} className="text-[#009b7a] shrink-0" />
                <div>
                  <span className="font-bold text-xs sm:text-[13px] block text-gray-900">
                    Thanh toán trực tuyến VNPAY
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Quét mã VNPAY-QR, thẻ ATM & Visa
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#bbf0dc] bg-[#dcf5ea] py-4 text-xs text-[#006b5a]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()}{" "}
            <strong className="text-[#005a4b] font-bold">DIDONG.COM</strong>. Hệ
            thống bán lẻ điện thoại chính hãng.
          </p>
          <p className="text-[#006b5a]/80 text-[11px]">
            Cam kết chất lượng chính hãng · Bảo hành chu đáo
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
