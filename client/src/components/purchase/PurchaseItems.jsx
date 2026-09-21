import { Trash2 } from "lucide-react";
import { getImageUrl } from "../../utils/image";
import { formatPrice } from "../../utils/price";

const PurchaseItems = ({fields ,watchItems,register  }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <th className="py-2.5 px-3 w-10 text-center">STT</th>
            <th className="py-2.5 px-3">Sản phẩm & Biến thể</th>
            <th className="py-2.5 px-3 text-center">Tồn cũ</th>
            <th className="py-2.5 px-3 w-28 text-center">SL Nhập</th>
            <th className="py-2.5 px-3 w-36 text-right">Đơn giá vốn</th>
            <th className="py-2.5 px-3 text-right">Thành tiền</th>
            <th className="py-2.5 px-3 w-10 text-center">Xóa</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs">
          {fields.map((field, idx) => {
            const v = field.variant;
            const p = v?.product;
            const currentQty = Number(v?.stock_quantity) || 0;
            const importQty = Number(watchItems[idx]?.quantity) || 0;
            const importPrice = Number(watchItems[idx]?.unit_price) || 0;
            const itemTotal = importQty * importPrice;

            return (
              <tr
                key={field.id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-3 px-3 text-center font-mono font-bold text-slate-400 text-[11px]">
                  {idx + 1}
                </td>

                <td className="py-3 px-3">
                  <div className="flex items-center gap-2.5 min-w-[200px]">
                    <img
                      src={getImageUrl(p?.thumbnail)}
                      alt={p?.product_name}
                      className="w-10 h-10 object-contain rounded-md border border-slate-200 bg-white shrink-0 p-0.5"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/80x80?text=No+Img";
                      }}
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-xs">
                        {p?.product_name || `Sản phẩm #${v?.product_id}`}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {v?.attributes &&
                          typeof v.attributes === "object" &&
                          Object.entries(v.attributes).map(([key, val]) => (
                            <span
                              key={key}
                              className="inline-block px-1.5 py-0.2 bg-slate-100 border border-slate-200 text-[10px] text-slate-600 rounded"
                            >
                              {val}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-3 text-center font-mono text-slate-600">
                  {currentQty}
                </td>

                <td className="py-3 px-3">
                  <input
                    type="number"
                    min="1"
                    {...register(`items.${idx}.quantity`, {
                      required: `Dòng #${idx + 1}: Vui lòng nhập số lượng`,
                      min: {
                        value: 1,
                        message: `Dòng #${idx + 1}: Số lượng nhập phải lớn hơn 0!`,
                      },
                    })}
                    className="w-full text-center px-2 py-1.5 bg-slate-50 border border-slate-300 rounded font-bold text-xs text-slate-900 focus:bg-white focus:border-slate-600 outline-none"
                  />
                </td>

                <td className="py-3 px-3">
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    {...register(`items.${idx}.unit_price`, {
                      required: `Dòng #${idx + 1}: Vui lòng nhập đơn giá`,
                      min: {
                        value: 0,
                        message: `Dòng #${idx + 1}: Đơn giá vốn không hợp lệ!`,
                      },
                    })}
                    className="w-full text-right px-2 py-1.5 bg-slate-50 border border-slate-300 rounded font-bold text-xs text-slate-900 focus:bg-white focus:border-slate-600 outline-none font-mono"
                  />
                </td>

                <td className="py-3 px-3 text-right font-bold font-mono text-slate-900">
                  {formatPrice(itemTotal)}
                </td>

                <td className="py-3 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseItems;
