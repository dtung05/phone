import React from "react";
import { formatPrice } from "../../../utils/price";
import { getImageUrl } from "@/utils/image";

const ProductCheckout = ({ item }) => {
  const attrs = item.attributes || {};
  const rowTotal = item.selling_price * item.quantity;

  return (
    <div className="flex items-start gap-3.5 py-3.5 border-b border-gray-100 last:border-b-0">
      <div className="w-16 h-16 shrink-0 rounded-xl border border-gray-100 bg-[#f8fafc] p-1.5 flex items-center justify-center">
        <img
          src={getImageUrl(item.product?.thumbnail)}
          alt={item.product?.product_name || "Sản phẩm"}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/100x100?text=No+Img";
          }}
        />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2">
          {item.product?.product_name}
        </h4>

        {Object.keys(attrs).length > 0 && (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {Object.entries(attrs).map(([key, value]) => (
              <span
                key={key}
                className="text-[10px] bg-[#d9f7eb] text-[#006b5a] font-semibold px-1.5 py-0.5 rounded"
              >
                {value}
              </span>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500">
          Số lượng: <span className="font-bold text-gray-800">x{item.quantity}</span>
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-extrabold text-red-600 font-mono">
          {formatPrice(rowTotal)}
        </p>
        <p className="text-[10px] text-gray-400">
          {formatPrice(item.selling_price)} / sp
        </p>
      </div>
    </div>
  );
};

export default ProductCheckout;
