import { Trash2 } from "lucide-react";

const VariantFields = ({ variantFields, removeVariant, errors, register }) => {
  return (
    <div className="space-y-3">
      {variantFields.map((variant, index) => (
        <div
          key={variant.id}
          className="p-4 border border-slate-200 rounded-md bg-slate-50/50 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
              Biến thể #{index + 1}
            </span>
            {variantFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-slate-400 hover:text-red-600 p-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Giá bán (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register(`variants.${index}.selling_price`, {
                  required: "Nhập giá bán",
                })}
                placeholder="24990000"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs font-medium text-slate-900 outline-none focus:border-slate-600 bg-white"
              />
              {errors.variants?.[index]?.selling_price && (
                <p className="text-red-500 text-[11px] mt-1">
                  {errors.variants[index].selling_price.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Thuộc tính (JSON)
              </label>
              <textarea
                {...register(`variants.${index}.attributes_json`, {
                  validate: (val) => {
                    if (!val) return true;
                    try {
                      JSON.parse(val);
                      return true;
                    } catch (e) {
                      return "Cú pháp JSON không hợp lệ!";
                    }
                  },
                })}
                rows={2}
                className="w-full font-mono border border-slate-300 rounded p-2 text-xs bg-white outline-none focus:border-slate-600"
              />
              {errors.variants?.[index]?.attributes_json && (
                <p className="text-red-500 text-[11px] mt-1">
                  {errors.variants[index].attributes_json.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariantFields;
