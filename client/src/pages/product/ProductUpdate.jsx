import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useProductDetailQuery,
  useUpdateProductMutation,
} from "../../store/api/product";
import ProductForm from "../../components/product/ProductForm";
import Loading from "../../components/block/Loading";
import { ArrowLeft } from "lucide-react";

const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProductDetailQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  if (isLoading) {
    return <Loading />;
  }
  const handleOnsub = (data) => {
    return updateProduct({ id, data }).unwrap();
  };
  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 bg-white border border-red-200 rounded-xl text-center shadow-sm">
        <h2 className="text-lg font-bold text-red-600 mb-2">
          Không tìm thấy thông tin sản phẩm!
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Sản phẩm có thể đã bị xóa hoặc đường dẫn không hợp lệ.
        </p>
        <button
          onClick={() => navigate("/staff/products")}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft size={16} /> Quay lại danh sách
        </button>
      </div>
    );
  }

  const defaultValues = {
    name: product.product_name || "",
    category_id: product.category_id || "",
    brand_id: product.brand_id || "",
    review_video: product.review_video || "",
    discount_percentage:
      product.discount_perventage ?? product.discount_percentage ?? 0,
    specifications:
      typeof product.specifications === "object"
        ? JSON.stringify(product.specifications, null, 2)
        : product.specifications || "{}",
    variants:
      product.product_variants && product.product_variants.length > 0
        ? product.product_variants.map((v) => ({
            id: v.id,
            selling_price: v.selling_price || "",
            attributes_json:
              typeof v.attributes === "object"
                ? JSON.stringify(v.attributes, null, 2)
                : v.attributes || "{}",
          }))
        : [
            {
              selling_price: "",
              attributes_json: '{\n  "storage": "128GB",\n  "color": "Đen"\n}',
            },
          ],
  };

  return (
    <ProductForm
      key={product.id}
      defaultValues={defaultValues}
      handleOnsub={handleOnsub}
      isLoading={isUpdating}
      isEdit={true}
      initialThumbnail={product.thumbnail}
      initialImages={Array.isArray(product.images) ? product.images : []}
    />
  );
};

export default ProductUpdate;
