import React from "react";
import { Trash2, DollarSign, Tag } from "lucide-react";
import { Controller, useWatch } from "react-hook-form";
import formatPrice from "../../../utils/price";

const VariantFields = ({
  variantFields,
  removeVariant,
  register,
  control,
  errors,
}) => {
  const discountRate =
    Number(useWatch({ control, name: "discount_percentage" })) || 0;

  if (!variantFields || variantFields.length === 0) {
    return (
      <div className="py-6 text-center bg-gray-50/60 rounded-lg border border-dashed border-gray-200">
        <p className="text-xs text-gray-500 font-medium">
          Chưa có biến thể nào. Nhấn <span className="text-[#009b7a] font-bold">"Thêm biến thể"</span> để bắt đầu.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
      {/* Tiêu đề cột cố định */}
      <div className="grid grid-cols-[36px_180px_1fr_36px] gap-2 px-3 py-2 bg-gray-100/75 border-b border-gray-200 text-[11px] font-bold text-gray-600 select-none">
        <span className="text-center">#</span>
        <span className="flex items-center gap-1">
          <span>Giá niêm yết (VNĐ)</span>
          <span className="text-rose-500">*</span>
          {discountRate > 0 && (
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 rounded font-normal">
              (-{discountRate}%)
            </span>
          )}
        </span>
        <span>Thuộc tính </span>
        <span className="text-center">Xóa</span>
      </div>

      {/* Mỗi biến thể nằm đúng trên 1 hàng */}
      <div className="max-h-[340px] overflow-y-auto divide-y divide-gray-100 divide-dashed">
        {variantFields.map((field, index) => {
          const priceError = errors?.variants?.[index]?.selling_price;
          const attrError = errors?.variants?.[index]?.attributes_json;

          return (
            <div
              key={field.id}
              className="grid grid-cols-[36px_180px_1fr_36px] gap-2 px-3 py-2 items-center hover:bg-gray-50/80 transition-colors"
            >
              {/* Cột 1: STT */}
              <div className="flex justify-center">
                <span className="w-5 h-5 rounded-full bg-[#009b7a]/10 text-[#009b7a] flex items-center justify-center text-[10px] font-mono font-bold">
                  {index + 1}
                </span>
              </div>

              {/* Cột 2: Giá bán nhập VNĐ */}
              <div className="space-y-0.5">
                <div className="relative">
                  <DollarSign size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  {control ? (
                    <Controller
                      control={control}
                      name={`variants.${index}.selling_price`}
                      rules={{
                        required: "Vui lòng nhập giá",
                        validate: (v) => Number(v) >= 0 || "Giá phải >= 0",
                      }}
                      render={({ field: { onChange, value } }) => {
                        const numVal = Number(value) || 0;
                        const displayVal =
                          value !== undefined && value !== null && value !== ""
                            ? Number(value).toLocaleString("vi-VN")
                            : "";

                        return (
                          <div>
                            <input
                              type="text"
                              inputMode="numeric"
                              placeholder="VD: 25.000.000"
                              value={displayVal}
                              onChange={(e) => {
                                const raw = e.target.value.replace(/\D/g, "");
                                onChange(raw ? Number(raw) : "");
                              }}
                              className={`w-full border rounded-lg pl-7 pr-2 py-1 text-xs font-mono font-semibold text-gray-900 outline-none transition-all ${
                                priceError
                                  ? "border-rose-400 bg-rose-50/30"
                                  : "border-gray-200 focus:border-[#009b7a] bg-white"
                              }`}
                              title={priceError?.message}
                            />
                            {discountRate > 0 && numVal > 0 && (
                              <div className="text-[10px] text-emerald-600 font-mono pl-1 pt-0.5 flex items-center gap-1 font-medium truncate">
                                <span>Sau giảm:</span>
                                <strong className="font-bold">
                                  {formatPrice(
                                    Math.round(
                                      numVal * (1 - discountRate / 100)
                                    )
                                  )}
                                </strong>
                              </div>
                            )}
                          </div>
                        );
                      }}
                    />
                  ) : (
                    <input
                      type="number"
                      min="0"
                      placeholder="VD: 25000000"
                      {...register(`variants.${index}.selling_price`, {
                        required: "Nhập giá bán",
                        min: { value: 0, message: "Giá >= 0" },
                      })}
                      className="w-full border rounded-lg pl-7 pr-2 py-1 text-xs font-mono font-semibold"
                    />
                  )}
                </div>
              </div>

              {/* Cột 3: Thuộc tính JSON */}
              <div className="relative">
                <Tag size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder='{"color": "Xanh", "storage": "256GB"}'
                  {...register(`variants.${index}.attributes_json`, {
                    validate: (val) => {
                      if (!val) return true;
                      try {
                        JSON.parse(val);
                        return true;
                      } catch (e) {
                        return "JSON không hợp lệ";
                      }
                    },
                  })}
                  className={`w-full border rounded-lg pl-7 pr-2 py-1 text-xs font-mono text-gray-800 outline-none truncate transition-all ${
                    attrError
                      ? "border-rose-400 bg-rose-50/30"
                      : "border-gray-200 focus:border-[#009b7a] bg-white"
                  }`}
                  title={attrError?.message}
                />
              </div>

              {/* Cột 4: Nút xóa */}
              <div className="flex justify-center">
                {variantFields.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="p-1 text-gray-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Xóa biến thể này"
                  >
                    <Trash2 size={14} />
                  </button>
                ) : (
                  <span className="w-3.5" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VariantFields;
