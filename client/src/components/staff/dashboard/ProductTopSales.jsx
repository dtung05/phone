import formatPrice from "@/utils/price";
import { ArrowUpRight } from "lucide-react";

const ProductTopSales = ({ topProducts }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
        <ArrowUpRight className="w-4 h-4 text-emerald-600" />
        Top Sản phẩm Bán chạy & Hiệu quả nhất
      </h3>

      {topProducts.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400 text-xs">
          Chưa có sản phẩm nào bán ra trong khoảng thời gian này
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {topProducts.map((p, idx) => (
            <div
              key={idx}
              className="py-3 flex items-center justify-between gap-3 text-xs hover:bg-slate-50/60 rounded-lg px-2 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${
                    idx === 0
                      ? "bg-amber-100 text-amber-700"
                      : idx === 1
                        ? "bg-slate-200 text-slate-700"
                        : idx === 2
                          ? "bg-orange-100 text-orange-700"
                          : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {idx + 1}
                </span>
                {p.product_thumbnail && (
                  <img
                    src={p.product_thumbnail}
                    alt={p.product_name}
                    className="w-10 h-10 object-cover rounded-md border border-slate-200 shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 truncate">
                    {p.product_name}
                  </p>
                  <span className="text-[11px] text-slate-500">
                    Đã bán:{" "}
                    <strong className="text-slate-700 font-bold">
                      {p.sold_quantity}
                    </strong>{" "}
                    chiếc
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-bold text-slate-900">
                  {formatPrice(p.revenue)}
                </div>
                <div className="text-[11px] font-semibold text-emerald-700">
                  Lãi: +{formatPrice(p.profit)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductTopSales;
