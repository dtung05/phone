import React from "react";
import { Link } from "react-router-dom"; // Hoặc "react-router-dom" tùy cấu hình dự án của bạn

function Footer() {
  const paymentLogos = [
    "visa.png",
    "mastercard.png",
    "jcb.png",
    "samsung-pay.png",
    "vnpay.png",
    "zalopay.png",
    "apple-pay.png",
    "kredivo.png",
    "spay.png",
  ];

  const socialLogos = [
    { name: "Facebook", file: "facebook.png" },
    { name: "TikTok", file: "tiktok.png" },
    { name: "YouTube", file: "youtube.png" },
    { name: "Instagram", file: "instagram.png" },
    { name: "Threads", file: "threads.png" },
  ];

  return (
    <footer className="bg-[#005247] text-emerald-50 text-sm">
      {/* Container chính */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Cột 1: Hotline & Đối tác */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-white mb-3">
                Tư vấn mua hàng
              </h3>
              <p className="text-lg font-extrabold text-amber-300 tracking-wide">
                1900.2091{" "}
                <span className="text-xs font-normal text-emerald-200">
                  (Nhánh 1)
                </span>
              </p>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                (Từ 8h30 - 21h30)
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-white mb-3">
                Bảo hành - Hỗ trợ kỹ thuật
              </h3>
              <p className="text-lg font-extrabold text-amber-300 tracking-wide">
                1900.2091{" "}
                <span className="text-xs font-normal text-emerald-200">
                  (Nhánh 2)
                </span>
              </p>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                (Từ 8h30 - 21h30)
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-2.5">
                Phương thức thanh toán
              </h3>
              <div className="grid grid-cols-3 gap-2 max-w-[280px]">
                {paymentLogos.map((image) => (
                  <div
                    key={image}
                    className="flex h-9 items-center justify-center rounded-md bg-white/95 p-1 transition-transform hover:scale-105 shadow-sm"
                  >
                    <img
                      src={`/images/payment/${image}`}
                      alt={image.replace(".png", "")}
                      className="max-h-6 max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-2.5">
                Hình thức vận chuyển
              </h3>
              <div className="flex gap-2">
                <div className="flex h-9 w-24 items-center justify-center rounded-md bg-white/95 p-1 transition-transform hover:scale-105 shadow-sm">
                  <img
                    src="/images/shipping/nhat-tin.png"
                    alt="Nhất Tín Logistics"
                    className="max-h-7 max-w-full object-contain"
                  />
                </div>
                <div className="flex h-9 w-24 items-center justify-center rounded-md bg-white/95 p-1 transition-transform hover:scale-105 shadow-sm">
                  <img
                    src="/images/shipping/vietnam-post.png"
                    alt="Vietnam Post"
                    className="max-h-7 max-w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cột 2: Hỗ trợ - Dịch vụ */}
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider text-white mb-4">
              Hỗ trợ - Dịch vụ
            </h3>
            <ul className="space-y-2.5">
              <li>
                <FooterLink text="Chính sách và hướng dẫn mua hàng trả góp" />
              </li>
              <li>
                <FooterLink text="Hướng dẫn mua hàng và chính sách vận chuyển" />
              </li>
              <li>
                <FooterLink text="Chính sách đổi mới và bảo hành" />
              </li>
              <li>
                <FooterLink text="Dịch vụ bảo hành mở rộng H-Care" />
              </li>
              <li>
                <FooterLink text="Chính Sách Bảo Mật Và Xử Lý Dữ Liệu Cá Nhân" />
              </li>
              <li>
                <FooterLink text="Chính sách giải quyết khiếu nại" />
              </li>
              <li>
                <FooterLink text="Quy chế hoạt động" />
              </li>
              <li>
                <FooterLink text="Chương trình Hoàng Hà Edu" />
              </li>
              <li>
                <FooterLink text="Quy định về hóa đơn GTGT" />
              </li>
              <li>
                <FooterLink text="Chính sách về hạng thành viên" />
              </li>
            </ul>
          </div>

          {/* Cột 3: Thông tin liên hệ */}
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider text-white mb-4">
              Thông tin liên hệ
            </h3>
            <ul className="space-y-2.5">
              <li>
                <FooterLink
                  text="Giới thiệu về Hoàng Hà Mobile"
                  to="/ductung"
                />
              </li>
              <li>
                <FooterLink text="Thông tin các trang TMĐT" />
              </li>
              <li>
                <FooterLink text="Chăm sóc khách hàng" />
              </li>
              <li>
                <FooterLink text="Dịch vụ sửa chữa Hoàng Hà Care" />
              </li>
              <li>
                <FooterLink text="Khách hàng doanh nghiệp (B2B)" />
              </li>
              <li>
                <FooterLink text="Tuyển dụng" />
              </li>
              <li>
                <FooterLink text="Tra cứu đơn hàng" />
              </li>
              <li>
                <FooterLink text="Tra cứu bảo hành" />
              </li>
              <li>
                <FooterLink text="Tìm siêu thị (118 cửa hàng)" />
              </li>
              <li>
                <FooterLink text="Tra cứu lịch sử mua hàng" />
              </li>
              <li>
                <FooterLink text="Tra cứu hóa đơn điện tử" />
              </li>
            </ul>
          </div>

          {/* Cột 4: Kết nối & Website thành viên */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-white mb-3">
                Kết nối với chúng tôi
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {socialLogos.map((item) => (
                  <a
                    href="#"
                    key={item.file}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all hover:-translate-y-0.5"
                    title={item.name}
                  >
                    <img
                      src={`/images/social/${item.file}`}
                      alt={item.name}
                      className="h-5 w-5 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-white mb-3">
                Website thành viên
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-emerald-200/90 mb-1.5 font-medium">
                    Hệ thống bán lẻ di động toàn quốc
                  </p>
                  <MemberWebsite
                    image="hoanghamobile.png"
                    alt="Hoàng Hà Mobile"
                  />
                </div>

                <div>
                  <p className="text-xs text-emerald-200/90 mb-1.5 font-medium">
                    Hệ thống bảo hành & chăm sóc ĐT - Máy tính
                  </p>
                  <MemberWebsite image="hoanghacare.png" alt="Hoàng Hà Care" />
                </div>

                <div>
                  <p className="text-xs text-emerald-200/90 mb-1.5 font-medium">
                    Tuyển dụng - Cơ hội việc làm
                  </p>
                  <MemberWebsite
                    image="hoanghacareers.png"
                    alt="Hoàng Hà Careers"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bản quyền & Thông tin pháp lý */}
      <div className="border-t border-emerald-800/60 bg-[#00473e] py-6 text-xs text-emerald-200/80">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 text-center leading-relaxed space-y-1">
          <p>
            © 2020. CÔNG TY CỔ PHẦN XÂY DỰNG VÀ ĐẦU TƯ THƯƠNG MẠI HOÀNG HÀ. MST:
            0106713191.
          </p>
          <p>
            (Đăng ký lần đầu: Ngày 15/12/2014, Đăng ký thay đổi ngày 10/07/2025)
          </p>
          <p>GP số 426/GP-TTĐT do Sở TTTT Hà Nội cấp ngày 22/01/2021</p>
          <p className="pt-1">
            Địa chỉ: Số 89 Đường Tam Trinh, Phường Vĩnh Tuy, Thành Phố Hà Nội,
            Việt Nam. Điện thoại: 1900.2091.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Component link phụ trợ
function FooterLink({ text, to = "#" }) {
  return (
    <Link
      to={to}
      className="text-emerald-100/90 hover:text-amber-300 transition-colors duration-150 inline-block hover:translate-x-0.5 transform"
    >
      {text}
    </Link>
  );
}

// Component hiển thị website thành viên
function MemberWebsite({ image, alt }) {
  return (
    <div className="flex h-10 w-full max-w-[220px] items-center justify-center rounded-md bg-white/95 p-1.5 shadow-sm transition-transform hover:scale-[1.02]">
      <img
        src={`/images/member/${image}`}
        alt={alt || image}
        className="max-h-7 max-w-full object-contain"
      />
    </div>
  );
}

export default Footer;
