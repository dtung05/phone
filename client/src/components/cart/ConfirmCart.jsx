import { ChevronRight } from "lucide-react";
import React from "react";
import { formatPrice } from "../../utils/price";

const ConfirmCart = ({
  handleCheckout,
  selectedItems,
  totalPrice,
  
}) => {
  return (
    <div className="lg:col-span-1 lg:sticky lg:top-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-3">
        Xác nhận đơn hàng
      </h2>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex justify-between">
          <span>Số lượng đã chọn:</span>
          <span className="font-semibold text-gray-800">
            {selectedItems.length} sản phẩm
          </span>
        </div>
        <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t">
          <span>Tổng tiền:</span>
          <span className="text-red-600">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={selectedItems.length === 0}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md"
      >
        <span>Đặt hàng</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default ConfirmCart;
