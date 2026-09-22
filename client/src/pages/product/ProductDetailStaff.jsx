import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Package,
  Layers,
  MessageSquare,
  Flame,
  AlertCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useGetStaffProductDetailQuery } from "../../store/api/product";

import Loading from "../../components/block/Loading";
import ProductSpecification from "../../components/product/staff/ProductSpecification";
import ProductReview from "../../components/product/staff/ProductReview";
import ProductVariant from "../../components/product/staff/ProductVariant";
import ProductOveriewStats from "../../components/product/staff/ProductOveriewStats";

const ProductDetailStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("variants");

  const [activeReplyBox, setActiveReplyBox] = useState(null);

  const { data: product, isLoading, error } = useGetStaffProductDetailQuery(id);

  if (isLoading) return <Loading />;
  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white border border-slate-200 rounded-2xl text-center shadow-sm">
        <AlertCircle size={40} className="mx-auto text-red-500 mb-3" />
        <h2 className="text-base font-bold text-slate-800">
          Không tìm thấy thông tin sản phẩm #{id}
        </h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          Sản phẩm có thể đã bị xóa hoặc đường dẫn không hợp lệ.
        </p>
        <button
          onClick={() => navigate("/staff/products")}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={15} /> Quay lại danh sách sản phẩm
        </button>
      </div>
    );
  }

  const variants = product.product_variants || [];
  const reviews = product.reviews || [];

  const unrepliedCount = product.unreplied_reviews_count ?? 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1.5">
            <Link
              to="/staff/products"
              className="hover:text-emerald-600 transition-colors"
            >
              Sản phẩm
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">
              {product.product_name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              {product.product_name}
            </h1>
            <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
              #{product.id}
            </span>
            {String(product.is_sale) === "1" && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                <Flame size={12} className="fill-red-600" /> Đang Sale
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/staff/products"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <ArrowLeft size={14} /> Danh sách
          </Link>
          <a
            href={`/products/${product.slug || product.id}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <ExternalLink size={14} /> Xem trên Web
          </a>
          <Link
            to={`/staff/products/${product.id}/edit`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors"
          >
            <Edit size={14} /> Chỉnh sửa
          </Link>
        </div>
      </div>

      <ProductOveriewStats
        product={product}
        variants={variants}
        unrepliedCount={unrepliedCount}
      />

      <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab("variants")}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === "variants"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Layers size={16} />
          <span>Biến thể & Giá vốn tồn kho ({variants.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === "reviews"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <MessageSquare size={16} />
          <span>Đánh giá & Bình luận khách hàng ({reviews.length})</span>
          {unrepliedCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-black">
              {unrepliedCount} mới
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("specs")}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === "specs"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Package size={16} />
          <span>Thông số kỹ thuật & Media</span>
        </button>
      </div>

      {activeTab === "variants" && <ProductVariant variants={variants} />}

      {activeTab === "reviews" && (
        <ProductReview
          reviews={reviews}
          unrepliedCount={unrepliedCount}
          activeReplyBox={activeReplyBox}
          setActiveReplyBox={setActiveReplyBox}
        />
      )}
      {activeTab === "specs" && <ProductSpecification product={product} />}
    </div>
  );
};

export default ProductDetailStaff;
