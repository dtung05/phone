import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/price";
import { getImageUrl } from "@/utils/image";

const ListCart = ({
  selectedIds,
  items,
  toggleSelectAll,
  updateQuantity,
  toggleSelect,
  removeItem,
}) => {
  const isAllSelected = selectedIds.length === items.length && items.length > 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
      <div className="hidden md:grid grid-cols-12 gap-4 items-center bg-[#fbfdfc] px-6 py-4 border-b border-gray-100 text-xs font-bold text-gray-700 uppercase tracking-wider">
        <div className="col-span-6 flex items-center gap-3">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleSelectAll}
            className="w-4 h-4 accent-[#009b7a] rounded cursor-pointer"
          />
          <span>Sản phẩm ({items.length})</span>
        </div>
        <div className="col-span-2 text-center">Đơn giá</div>
        <div className="col-span-2 text-center">Số lượng</div>
        <div className="col-span-2 text-right pr-2">Số tiền</div>
      </div>

      <div className="md:hidden flex items-center justify-between px-4 py-3.5 bg-[#fbfdfc] border-b border-gray-100">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleSelectAll}
            className="w-4 h-4 accent-[#009b7a] rounded cursor-pointer"
          />
          <span className="text-xs font-bold text-gray-800">
            Chọn tất cả ({items.length})
          </span>
        </label>
        <span className="text-xs text-gray-400 font-medium">
          Đã chọn {selectedIds.length}/{items.length}
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item) => {
          const variant = item.product_variant;
          const product = variant?.product;
          const attrs = variant?.attributes || {};
          const checked = selectedIds.includes(item.id);
          const unitPrice = variant?.selling_price || 0;
          const rowTotal = unitPrice * item.quantity;
          const stock = variant?.stock_quantity ?? 9999;
          const isMaxQty = item.quantity >= stock;
          const isMinQty = item.quantity <= 1;

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 transition-colors ${
                checked
                  ? "bg-[#fcfdfd] border-l-4 border-l-[#009b7a]"
                  : "bg-white border-l-4 border-l-transparent hover:bg-gray-50/40"
              }`}
            >
              <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6 flex items-center gap-3.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSelect(item.id)}
                    className="w-4 h-4 accent-[#009b7a] rounded cursor-pointer shrink-0"
                  />

                  <Link
                    to={product?.slug ? `/products/${product.slug}` : "#"}
                    className="w-18 h-18 shrink-0 rounded-xl border border-gray-100 bg-[#f8fafc] p-1.5 flex items-center justify-center hover:border-gray-300 transition-colors"
                  >
                    <img
                      src={getImageUrl(product?.thumbnail)}
                      alt={product?.product_name || "Sản phẩm"}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/100x100?text=No+Img";
                      }}
                    />
                  </Link>

                  <div className="min-w-0 flex-1 space-y-1">
                    <Link
                      to={product?.slug ? `/products/${product.slug}` : "#"}
                      className="font-bold text-gray-900 text-xs sm:text-sm hover:text-[#009b7a] transition-colors line-clamp-2 leading-snug"
                    >
                      {product?.product_name}
                    </Link>

                    {Object.keys(attrs).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {Object.entries(attrs).map(([key, value]) => (
                          <span
                            key={key}
                            className="text-[11px] bg-[#d9f7eb] text-[#006b5a] font-semibold px-2 py-0.5 rounded-md"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    )}

                    {stock <= 5 && stock > 0 && (
                      <p className="text-[10px] text-amber-600 font-medium">
                        Chỉ còn {stock} sản phẩm trong kho
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 font-mono">
                    {formatPrice(unitPrice)}
                  </span>
                </div>

                <div className="col-span-2 flex justify-center">
                  <div className="inline-flex items-center border border-gray-200 rounded-xl bg-white shadow-2xs overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={isMinQty}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      disabled={isMaxQty}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <div className="col-span-2 text-right pr-2 space-y-1">
                  <p className="text-sm sm:text-base font-extrabold text-red-600 font-mono">
                    {formatPrice(rowTotal)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} />
                    <span>Xóa</span>
                  </button>
                </div>
              </div>

              <div className="md:hidden space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSelect(item.id)}
                    className="w-4 h-4 accent-[#009b7a] rounded cursor-pointer shrink-0 mt-1"
                  />

                  <Link
                    to={product?.slug ? `/products/${product.slug}` : "#"}
                    className="w-16 h-16 shrink-0 rounded-xl border border-gray-100 bg-[#f8fafc] p-1 flex items-center justify-center"
                  >
                    <img
                      src={getImageUrl(product?.thumbnail)}
                      alt={product?.product_name || "Sản phẩm"}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/80x80?text=No+Img";
                      }}
                    />
                  </Link>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={product?.slug ? `/products/${product.slug}` : "#"}
                        className="font-bold text-gray-900 text-xs hover:text-[#009b7a] transition-colors line-clamp-2 leading-snug"
                      >
                        {product?.product_name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-600 p-1 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

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
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50 pl-7">
                  <div>
                    <span className="text-xs text-gray-400 font-mono block">
                      Đơn giá: {formatPrice(unitPrice)}
                    </span>
                    <span className="text-sm font-extrabold text-red-600 font-mono">
                      {formatPrice(rowTotal)}
                    </span>
                  </div>

                  <div className="inline-flex items-center border border-gray-200 rounded-xl bg-white shadow-2xs overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={isMinQty}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="w-7 text-center text-xs font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      disabled={isMaxQty}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#fafbfb] px-5 sm:px-6 py-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium">
          Đang chọn:{" "}
          <strong className="text-[#006b5a] font-bold">
            {selectedIds.length}
          </strong>{" "}
          / {items.length} sản phẩm
        </span>
        <Link
          to="/products"
          className="text-[#009b7a] hover:text-[#006b5a] hover:underline font-semibold"
        >
          + Thêm sản phẩm khác
        </Link>
      </div>
    </div>
  );
};

export default ListCart;
