import React from "react";

const TotalPrice = ({ totalPrice }) => {
  return (
    <div className="mt-6 border-t pt-5">
      <div className="mb-2 flex justify-between">
        <span>Tạm tính</span>
        <span className="font-medium">
          {totalPrice.toLocaleString("vi-VN")}₫
        </span>
      </div>
      <div className="mb-2 flex justify-between">
        <span>Phí vận chuyển</span>

        <span>Miễn phí</span>
      </div>
      <div className="mt-4 flex justify-between border-t pt-4 text-xl font-bold">
        <span>Tổng thanh toán</span>
        <span className="text-red-600">
          {totalPrice.toLocaleString("vi-VN")}₫
        </span>
      </div>
    </div>
  );
};

export default TotalPrice;
