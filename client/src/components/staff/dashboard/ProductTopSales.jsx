import { getImageUrl } from "@/utils/image";
import formatPrice from "@/utils/price";

const ProductTopSales = ({ topProducts }) => {
  return (
    <div className="bg-white p-4 rounded-md border border-slate-200">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
          Sản phẩm bán chạy nhất
        </h3>
        <span className="text-xs text-slate-400">Theo doanh thu & lợi nhuận</span>
      </div>

      {topProducts.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400 text-xs">
          Chưa có sản phẩm nào phát sinh doanh thu trong kỳ này
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {topProducts.map((p, idx) => (
            <div
              key={idx}
              className="py-2.5 flex items-center justify-between gap-3 text-xs hover:bg-slate-50/50 rounded px-1 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-5 text-center font-mono font-medium text-slate-400 shrink-0">
                  {idx + 1}.
                </span>
                {p.product_thumbnail && (
                  <img
                    src={getImageUrl(p.product_thumbnail)}
                    alt={p.product_name}
                    className="w-9 h-9 object-contain rounded border border-slate-200 shrink-0 p-0.5"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 truncate">
                    {p.product_name}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Đã bán: <span className="font-mono text-slate-700">{p.sold_quantity}</span> chiếc
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-mono font-medium text-slate-900">
                  {formatPrice(p.revenue)}
                </p>
                <p className="text-[11px] text-emerald-700 font-mono">
                  Lãi: +{formatPrice(p.profit)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductTopSales;
