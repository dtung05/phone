import React from "react";
import ProductForm from "../../components/product/ProductForm";
import { useCreateProductMutation } from "../../store/api/product";

const ProductCreate = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const handleOnsub = (data) => {
    return createProduct(data).unwrap();
  };
  const defaultValues = {
    category_id: "",
    brand_id: "",
    name: "",
    thumbnail: null,
    review_video: "",
    discount_percentage: 0,
    images: [],
    specifications:
      '{\n  "RAM": "8GB",\n  "Bộ nhớ trong": "128GB",\n  "Pin": "5000 mAh"\n}',
    variants: [
      {
        selling_price: "",
        attributes_json: '{\n  "storage": "128GB",\n  "color": "Đen"\n}',
      },
    ],
  };
  return (
    <ProductForm
      handleOnsub={handleOnsub}
      defaultValues={defaultValues}
      isLoading={isLoading}
    />
  );
};

export default ProductCreate;
