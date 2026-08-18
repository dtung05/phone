import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import { formatPrice } from "../../utils/price";

const ListCart = ({
  selectedIds,
  items,
  toggleSelectAll,

  updateQuantity,
  toggleSelect,removeItem
}) => {
  return (
    <div className="lg:col-span-2 flex flex-col gap-3">
      <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
        <input
          type="checkbox"
          checked={selectedIds.length === items.length && items.length > 0}
          onChange={toggleSelectAll}
          className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
        />
        <span className="text-sm font-semibold text-gray-700">
          Chọn tất cả ({items.length})
        </span>
      </div>

      {items.map((item) => {
        const variant = item.product_variant;
        const product = variant?.product;
        const attrs = variant?.attributes || {};
        const checked = selectedIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border transition-all ${
              checked
                ? "border-blue-500 ring-1 ring-blue-100"
                : "border-gray-100"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggleSelect(item.id)}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />

            <img
              src={product?.thumbnail}
              alt={product?.product_name}
              className="w-16 h-16 object-contain rounded-lg border bg-gray-50"
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {product?.product_name}
              </h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {Object.entries(attrs).map(([key, value]) => (
                  <span
                    key={key}
                    className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                  >
                    {value}
                  </span>
                ))}
              </div>
              <p className="text-red-600 font-bold text-sm mt-1">
                {formatPrice(variant?.selling_price)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-lg bg-gray-50">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1.5 text-gray-600 hover:bg-gray-200 rounded-l-lg"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1.5 text-gray-600 hover:bg-gray-200 rounded-r-lg"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListCart;
