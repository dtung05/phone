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
import { useGetStaffProductDetailQuery } from "../../../store/api/product";
import Loading from "../../../components/common/feedback/Loading";
import ProductSpecification from "../../../components/staff/product/ProductSpecification";
import ProductReview from "../../../components/staff/product/ProductReview";
import ProductVariant from "../../../components/staff/product/ProductVariant";
import ProductOveriewStats from "../../../components/staff/product/ProductOveriewStats";

const ProductDetailStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("variants");
  const [activeReplyBox, setActiveReplyBox] = useState(null);

  const { data: product, isLoading, error } = useGetStaffProductDetailQuery(id);

  if (isLoading) return <Loading />;
  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white border border-gray-200/80 rounded-2xl text-center shadow-sm">
        <AlertCircle size={40} className="mx-auto text-rose-500 mb-3" />
        <h2 className="text-sm sm:text-base font-bold text-gray-900">
          Không tìm thấy thông tin sản phẩm #{id}
        </h2>
        <p className="text-xs text-gray-500 mt-1 mb-5">
          Sản phẩm có thể đã bị xóa hoặc đường dẫn không hợp lệ.
        </p>
        <button
          onClick={() => navigate("/staff/products")}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors shadow-xs cursor-pointer"
        >
          <ArrowLeft size={14} /> Quay lại danh sách sản phẩm
        </button>
      </div>
    );
  }

  const variants = product.product_variants || [];
  const reviews = product.reviews || [];
  const unrepliedCount = product.unreplied_reviews_count ?? 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-sm">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-normal">
            <Link
              to="/staff/products"
              className="hover:text-[#009b7a] transition-colors"
            >
              Sản phẩm
            </Link>
            <ChevronRight size={13} className="text-gray-400 shrink-0" />
            <span className="text-gray-800 font-medium truncate max-w-xs sm:max-w-md">
              {product.product_name}
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              {product.product_name}
            </h1>
            <span className="font-mono text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
              #{product.id}
            </span>
            {String(product.is_sale) === "1" && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-full">
                <Flame size={12} className="fill-rose-600" /> Đang Sale
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <Link
            to="/staff/products"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Danh sách
          </Link>
          <a
            href={`/products/${product.slug || product.id}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ExternalLink size={14} /> Xem trên Web
          </a>
          <Link
            to={`/staff/products/${product.id}/edit`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#009b7a] hover:bg-[#008266] rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Edit size={14} /> Chỉnh sửa
          </Link>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <ProductOveriewStats
        product={product}
        variants={variants}
        unrepliedCount={unrepliedCount}
      />

      {/* Tabs chuyển đổi nội dung */}
      <div className="bg-white px-6 rounded-2xl border border-gray-200/80 shadow-sm">
        <div className="flex border-b border-gray-100 gap-6 text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("variants")}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "variants"
                ? "border-[#009b7a] text-[#009b7a]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Layers size={16} />
            <span>Biến thể & Giá vốn tồn kho ({variants.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "reviews"
                ? "border-[#009b7a] text-[#009b7a]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <MessageSquare size={16} />
            <span>Đánh giá & Bình luận khách hàng ({reviews.length})</span>
            {unrepliedCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                {unrepliedCount} mới
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "specs"
                ? "border-[#009b7a] text-[#009b7a]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Package size={16} />
            <span>Thông số kỹ thuật & Media</span>
          </button>
        </div>
      </div>

      <div className="transition-all">
        {activeTab === "variants" && (
          <ProductVariant
            variants={variants}
            discount_perventage={product.discount_perventage}
          />
        )}

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
    </div>
  );
};

export default ProductDetailStaff;
