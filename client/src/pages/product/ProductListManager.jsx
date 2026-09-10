import { Link } from "react-router-dom";
import { Edit, Layers } from "lucide-react";
import { formatPrice } from "../../utils/price";
import { getImageUrl } from "../../utils/image";
export const ProductListManager = ({ products }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <th className="py-3 px-4 w-16 text-center">Mã</th>
            <th className="py-3 px-4">Sản phẩm</th>
            <th className="py-3 px-4">Phân loại</th>
            <th className="py-3 px-4">Giá khởi điểm</th>
            <th className="py-3 px-4">Biến thể & Kho</th>
            <th className="py-3 px-4 text-center w-28">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
          {products.map((item) => {
            console.log(item);
            const hasDiscount = Number(item.discount_perventage) > 0;
            const totalStock = item.total_stock ?? 0;
            const variantsCount =
              item.variants_count ?? item.product_variants?.length ?? 0;
            return (
              <tr
                key={item.id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-500 text-[11px]">
                  #{item.id}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={getImageUrl(item.thumbnail)}
                      alt={item.product_name}
                      className="w-12 h-12 object-contain rounded-lg border border-slate-200 bg-white shrink-0 p-1"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/80x80?text=No+Img";
                      }}
                    />
                    <div className="min-w-0 max-w-xs sm:max-w-md">
                      <p className="font-bold text-slate-900 truncate hover:text-emerald-700 transition-colors">
                        {item.product_name}
                      </p>
                      <p className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
                        slug: {item.slug}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex flex-col gap-1 items-start">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                      {item.category?.name || "Chưa phân loại"}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                      {item.brand?.name || "Hãng khác"}
                    </span>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-red-600 text-sm">
                      {formatPrice(item.min_price || 0)}
                    </span>
                    {hasDiscount && (
                      <span className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        -{item.discount_perventage}%
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-slate-600 font-medium">
                      <Layers size={13} className="text-slate-400" />
                      <span>{variantsCount} biến thể</span>
                    </div>
                    <div>
                      {totalStock > 0 ? (
                        <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                          Kho: {totalStock}
                        </span>
                      ) : (
                        <span className="inline-block text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          Hết hàng
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <Link
                    to={`/staff/products/${item.id}/edit`}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-sm transition-all"
                  >
                    <Edit size={13} />
                    <span>Sửa</span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
