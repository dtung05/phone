import React from "react";

const ProductCheckout = ({item}) => {
  return (
    <>
     <h2 className="mb-5 text-xl font-bold">Sản phẩm đã chọn</h2>
       <div
      key={item.id}
      className="flex items-center gap-4 border-b py-4 last:border-b-0"
    >
      <img
        src={item.product.thumbnail}
        alt={item.product.product_name}
        className="h-24 w-24 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.product.product_name}</h3>

        <ul className="mt-2 text-sm text-gray-500">
          {Object.entries(item.attributes).map(([key, value]) => (
            <li key={key}>
              <span className="font-medium capitalize">{key}</span>: {value}
            </li>
          ))}
        </ul>

        <p className="mt-2 text-sm">
          Số lượng:
          <span className="ml-1 font-semibold">{item.quantity}</span>
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-500">Đơn giá</p>

        <p className="font-medium">
          {item.selling_price.toLocaleString("vi-VN")}₫
        </p>

        <p className="mt-3 text-sm text-gray-500">Thành tiền</p>

        <p className="text-lg font-bold text-red-600">
          {(item.selling_price * item.quantity).toLocaleString("vi-VN")}₫
        </p>
      </div>
    </div>
    </>
  
  );
};

export default ProductCheckout;
