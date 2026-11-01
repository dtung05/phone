import { Layers, PackageX } from "lucide-react";
import formatPrice from "../../../utils/price";

const ProductVariant = ({ variants = [], discount_perventage = 0 }) => {
  const discountPercent = Number(discount_perventage) || 0;

  const totalCapitalValue = Array.isArray(variants)
    ? variants.reduce(
        (sum, v) =>
          sum + (Number(v.stock_quantity) || 0) * (Number(v.average_cost) || 0),
        0,
      )
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden space-y-4 font-sans">
      <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <h3 className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-2">
          <Layers size={16} className="text-[#009b7a]" />
          <span>Bảng giá bán & Giá vốn từng biến thể</span>
        </h3>
        <span className="text-xs text-gray-500 font-normal">
          Tổng giá trị vốn kho:{" "}
          <strong className="text-emerald-700 font-mono text-xs sm:text-sm font-bold">
            {formatPrice(totalCapitalValue)}
          </strong>
        </span>
      </div>

      {!Array.isArray(variants) || variants.length === 0 ? (
        <div className="py-12 px-6 text-center space-y-3">
          <PackageX size={36} className="mx-auto text-gray-300" />
          <p className="text-xs font-medium text-gray-500">
            Sản phẩm này hiện chưa có biến thể nào được thiết lập.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-16 text-center">ID</th>
                <th className="py-3 px-4">Biến thể / Thuộc tính</th>
                <th className="py-3 px-4 text-right">Giá niêm yết</th>
                {discountPercent > 0 && (
                  <th className="py-3 px-4 text-right">Giá sau giảm</th>
                )}
                <th className="py-3 px-4 text-right">
                  Giá vốn nhập về
                </th>
                <th className="py-3 px-4 text-center">Tồn kho</th>
                <th className="py-3 px-4 text-right">Tổng vốn tồn kho</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {variants.map((v) => {
                let attrs = v.attributes;
                if (typeof attrs === "string") {
                  try {
                    attrs = JSON.parse(attrs);
                  } catch (e) {
                    attrs = {};
                  }
                }
                const stock = Number(v.stock_quantity) || 0;
                const cost = Number(v.average_cost) || 0;
                const itemCapital = stock * cost;

                const originalPrice = Number(v.selling_price) || 0;
                const finalPrice =
                  discountPercent > 0
                    ? originalPrice * (1 - discountPercent / 100)
                    : originalPrice;

                return (
                  <tr
                    key={v.id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-center font-mono text-gray-400 font-semibold">
                      #{v.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {attrs && Object.keys(attrs).length > 0 ? (
                          Object.entries(attrs).map(([key, val]) => (
                            <span
                              key={key}
                              className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 border border-gray-200/60 text-[11px]"
                            >
                              <span className="text-gray-400 mr-1 capitalize font-normal">
                                {key}:
                              </span>
                              <span className="font-semibold">
                                {String(val)}
                              </span>
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 italic font-normal">
                            Mặc định
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Giá niêm yết */}
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-gray-900">
                      <span
                        className={
                          discountPercent > 0
                            ? "line-through text-gray-400 font-normal"
                            : ""
                        }
                      >
                        {formatPrice(originalPrice)}
                      </span>
                    </td>

                    {/* Giá sau khi giảm (chỉ hiển thị khi discountPercent > 0) */}
                    {discountPercent > 0 && (
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-rose-600">
                        {formatPrice(finalPrice)}
                      </td>
                    )}

                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-700">
                      {cost > 0 ? (
                        formatPrice(cost)
                      ) : (
                        <span className="text-gray-400 font-normal italic">
                          Chưa có giá vốn
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block font-mono font-semibold px-2 py-0.5 rounded text-[11px] ${
                          stock > 5
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                            : stock > 0
                              ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                              : "bg-rose-50 text-rose-600 border border-rose-200/60"
                        }`}
                      >
                        {stock} chiếc {discountPercent}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-gray-700">
                      {formatPrice(itemCapital)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductVariant;
