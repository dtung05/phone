import React from "react";

export const IntroduceLogin = () => {
  return (
    <div className="flex flex-col justify-between bg-gradient-to-br from-[#006b5c] to-[#004d42] p-8 text-white sm:p-12">
      <div>
        <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
          Thành viên mới
        </div>

        <h2 className="mt-6 text-2xl font-extrabold leading-tight sm:text-2xl">
          Bắt đầu hành trình của bạn ngay hôm nay.
        </h2>

        <p className="mt-4 text-sm text-emerald-100 leading-relaxed sm:text-base">
          Tham gia cộng đồng để trải nghiệm dịch vụ tuyệt vời và nhận hàng loạt
          ưu đãi hấp dẫn dành riêng cho hội viên.
        </p>
        <ul className="mt-8 space-y-4">
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
              ✓
            </div>
            <span className="text-sm sm:text-base">
              Truy cập không giới hạn vào tất cả các tính năng
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
              ✓
            </div>
            <span className="text-sm sm:text-base">
              Nhận thông báo ưu đãi & sự kiện đặc biệt sớm nhất
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
              ✓
            </div>
            <span className="text-sm sm:text-base">
              Hỗ trợ ưu tiên từ đội ngũ chăm sóc khách hàng 24/7
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6 text-xs text-emerald-200">
        © 2026 Thương hiệu của bạn. Bảo lưu mọi quyền.
      </div>
    </div>
  );
};
