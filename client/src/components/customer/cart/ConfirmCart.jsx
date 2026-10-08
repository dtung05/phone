import { ChevronRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import React from "react";
import { formatPrice } from "../../../utils/price";

const ConfirmCart = ({
  handleCheckout,
  selectedItems = [],
  totalPrice = 0,
}) => {
  return (
    <div className="sticky top-20 space-y-4">
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xs border border-gray-200/80 space-y-4">
        <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
          <span>Xác nhận đơn hàng</span>
          <span className="text-xs font-semibold text-gray-500">
            {selectedItems.length} sản phẩm
          </span>
        </h2>

        <div className="space-y-2.5 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Số lượng đã chọn:</span>
            <span className="font-semibold text-gray-900">
              {selectedItems.length} sản phẩm
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500">Phí vận chuyển:</span>
            <span className="font-semibold text-[#006b5a] bg-[#d9f7eb] px-2 py-0.5 rounded text-xs">
              Miễn phí
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-3 border-t border-gray-100">
            <span className="font-bold text-gray-900">Tổng thanh toán:</span>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-extrabold text-red-600 font-mono">
                {formatPrice(totalPrice)}
              </span>
             
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={selectedItems.length === 0}
          className="w-full flex items-center justify-center gap-2 bg-[#009b7a] hover:bg-[#006b5a] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed active:scale-[0.99]"
        >
          <span>Tiến hành đặt hàng</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-gray-200/80 space-y-2.5 text-xs text-gray-600">
        <div className="flex items-center gap-2.5">
          <ShieldCheck size={16} className="text-[#009b7a] shrink-0" />
          <span>Cam kết 100% sản phẩm chính hãng</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Truck size={16} className="text-[#009b7a] shrink-0" />
          <span>Giao hàng miễn phí toàn quốc</span>
        </div>
        <div className="flex items-center gap-2.5">
          <RotateCcw size={16} className="text-[#009b7a] shrink-0" />
          <span>1 đổi 1 trong 30 ngày nếu có lỗi từ NSX</span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCart;
