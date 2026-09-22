import { Layers, MessageSquare, Package, Star } from "lucide-react";

const ProductOveriewStats = ( {product,variants,unrepliedCount }) => {
  const totalStock = product.total_stock ?? 0;
  const avgRating = Number(product.average_rating || 0).toFixed(1);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
          <Package size={20} />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Tổng tồn kho
          </p>
          <h3 className="text-lg font-black text-slate-900">
            {totalStock}{" "}
            <span className="text-xs font-normal text-slate-500">chiếc</span>
          </h3>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
          <Layers size={20} />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Số biến thể
          </p>
          <h3 className="text-lg font-black text-slate-900">
            {variants.length}{" "}
            <span className="text-xs font-normal text-slate-500">
              phiên bản
            </span>
          </h3>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
          <Star size={20} className="fill-amber-400 text-amber-500" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Điểm đánh giá
          </p>
          <h3 className="text-lg font-black text-slate-900">
            {avgRating}{" "}
            <span className="text-xs font-normal text-slate-400">
              / 5★ ({product.reviews_count} lượt)
            </span>
          </h3>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3.5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
            unrepliedCount > 0
              ? "bg-red-50 text-red-600"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          <MessageSquare size={20} />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Bình luận cần trả lời
          </p>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
            {unrepliedCount}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductOveriewStats;
