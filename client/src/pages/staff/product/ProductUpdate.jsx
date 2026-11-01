import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useProductDetailQuery,
  useUpdateProductMutation,
} from "../../../store/api/product";
import ProductForm from "../../../components/staff/product/ProductForm";
import Loading from "../../../components/common/feedback/Loading";
import { ArrowLeft } from "lucide-react";
import { mapProductFormUpdate, normalizeImages } from "../../../utils/product";
import NoResult from "@/components/common/feedback/NoResult";

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
      <NoResult
        title="Không tìm thấy thông tin sản phẩm."
        content="Sản phẩm có thể đã bị xóa hoặc đường dẫn kh hợp lệ"
        action={
          <button
            onClick={() => navigate("/staff/products")}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft size={16} /> Quay lại danh sách
          </button>
        }
      />
    );
  }

  const defaultValues = mapProductFormUpdate(product);
  return (
    <ProductForm
      key={product.id}
      defaultValues={defaultValues}
      handleOnsub={handleOnsub}
      isLoading={isUpdating}
      isEdit={true}
      initialThumbnail={product.thumbnail}
      initialImages={normalizeImages(product.images)}
    />
  );
};

export default ProductUpdate;
