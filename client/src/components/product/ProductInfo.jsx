import { useState } from "react";

export default function ProductInfo({ data }) {
  const { product_name, product_variants } = data;

  const [selectedVariant, setSelectedVariant] = useState(product_variants[0]);

  return (
    <div className="flex-1 px-6">
      {/* Tên */}
      <h1 className="text-3xl font-bold">{product_name}</h1>

      {/* Đánh giá */}
      <div className="flex items-center gap-4 mt-3 text-gray-600">
        <span>⭐ 4.8</span>
        {/* <span>{reviews.length} đánh giá</span> */}
      </div>

      <div className="mt-5">
        <span className="text-3xl font-bold text-red-600">
          {selectedVariant.selling_price.toLocaleString("vi-VN")}₫
        </span>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Dung lượng</h3>

        <div className="flex gap-3">
          <div className="border border-blue-500 px-4 py-2 rounded-lg">
            {selectedVariant.attributes.storage}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Màu sắc</h3>
        <div className="flex gap-3 flex-wrap">
          {product_variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              className={`border rounded-lg px-4 py-3 transition
                ${
                  selectedVariant.id === variant.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
            >
              {variant.attributes.color}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 text-gray-600">
        Còn lại:
        <span className="font-bold ml-2">{selectedVariant.stock_quantity}</span>
        sản phẩm
      </div>

      <div className="mt-8 flex gap-3">
        <button className="bg-red-600 text-white px-8 py-4 rounded-xl">
          Mua ngay
        </button>

        <button className="border px-8 py-4 rounded-xl">Thêm giỏ hàng</button>
      </div>
    </div>
  );
}
