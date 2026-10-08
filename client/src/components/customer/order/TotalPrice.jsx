import React from "react";
import { formatPrice } from "../../../utils/price";

const TotalPrice = ({ totalPrice = 0 }) => {
  return (
    <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs sm:text-sm">
      <div className="flex items-center justify-between text-gray-600">
        <span>Tạm tính tiền hàng:</span>
        <span className="font-semibold text-gray-800 font-mono">
          {formatPrice(totalPrice)}
        </span>
      </div>

      <div className="flex items-center justify-between text-gray-600">
        <span>Phí vận chuyển:</span>
        <span className="font-semibold text-[#006b5a] bg-[#d9f7eb] px-2 py-0.5 rounded text-xs">
          Miễn phí toàn quốc
        </span>
      </div>

      <div className="flex items-baseline justify-between pt-3 border-t border-gray-100">
        <div>
          <span className="text-sm sm:text-base font-bold text-gray-900 block">
            Tổng thanh toán:
          </span>
         
        </div>
        <span className="text-xl sm:text-2xl font-extrabold text-red-600 font-mono">
          {formatPrice(totalPrice)}
        </span>
      </div>
    </div>
  );
};

export default TotalPrice;
