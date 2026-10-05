import { Layers } from "lucide-react";
import formatPrice from "../../../utils/price";

const ProductVariant = ({variants }) => {
  const totalCapitalValue = variants.reduce(
    (sum, v) =>
      sum + (Number(v.stock_quantity) || 0) * (Number(v.average_cost) || 0),
    0,
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <Layers size={16} className="text-emerald-600" />
          Bảng giá bán & Giá vốn bình quân từng biến thể
        </h3>
        <span className="text-xs font-semibold text-slate-500">
          Tổng giá trị vốn kho:{" "}
          <strong className="text-emerald-700 font-mono text-sm">
            {formatPrice(totalCapitalValue)}
          </strong>
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 w-16 text-center">ID</th>
              <th className="py-3 px-4">Biến thể / Thuộc tính</th>
              <th className="py-3 px-4 text-right">Giá niêm yết</th>
              <th className="py-3 px-4 text-right">
                Giá vốn bình quân (Avg Cost)
              </th>
              <th className="py-3 px-4 text-center">Tồn kho</th>
              <th className="py-3 px-4 text-right">Tổng vốn tồn kho</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
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

              return (
                <tr
                  key={v.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-3.5 px-4 text-center font-mono text-slate-400 font-bold">
                    #{v.id}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {attrs && Object.keys(attrs).length > 0 ? (
                        Object.entries(attrs).map(([key, val]) => (
                          <span
                            key={key}
                            className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[11px]"
                          >
                            <span className="text-slate-400 mr-1 capitalize">
                              {key}:
                            </span>
                            <strong>{String(val)}</strong>
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic">Mặc định</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                    {formatPrice(v.selling_price)}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700">
                    {cost > 0 ? (
                      formatPrice(cost)
                    ) : (
                      <span className="text-slate-400 font-normal italic">
                        Chưa có giá vốn
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        stock > 5
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : stock > 0
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-red-50 text-red-600 border border-red-200"
                      }`}
                    >
                      {stock} chiếc
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-700">
                    {formatPrice(itemCapital)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductVariant;
