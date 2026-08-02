// import React from "react";
// import { useParams } from "react-router-dom";
// import { useProductDetailQuery } from "../../store/api/product";

// const ProductDetail = () => {
//   const { slug } = useParams();
//   useProductDetailQuery(slug);
//   return <div>ProductDetail {slug} </div>;
// };
// export default ProductDetail;

import { useState } from "react";

export default function ProductDetail() {
  const product = {
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    rating: 4.9,
    review: 126,
    sold: 356,

    price: 31990000,
    oldPrice: 35990000,

    images: [
      "https://placehold.co/600x600",
      "https://placehold.co/600x600?text=2",
      "https://placehold.co/600x600?text=3",
      "https://placehold.co/600x600?text=4",
    ],

    colors: ["Titan Black", "Titan Gray", "Titan Blue"],

    storages: ["256GB", "512GB", "1TB"],

    stock: 15,
  };

  const relatedProducts = [
    {
      id: 1,
      name: "Galaxy S25",
      price: 22990000,
      image: "https://placehold.co/120",
    },
    {
      id: 2,
      name: "Galaxy S25 Plus",
      price: 26990000,
      image: "https://placehold.co/120",
    },
    {
      id: 3,
      name: "Galaxy Z Fold 7",
      price: 41990000,
      image: "https://placehold.co/120",
    },
    {
      id: 4,
      name: "Galaxy Z Flip 7",
      price: 25990000,
      image: "https://placehold.co/120",
    },
  ];

  const [image, setImage] = useState(product.images[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [storage, setStorage] = useState(product.storages[0]);

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="grid grid-cols-12 gap-6">
        {/* ================= IMAGE ================= */}

        <div className="col-span-4">
          <div className="border rounded-xl overflow-hidden bg-white">
            <img src={image} className="w-full" alt="" />
          </div>

          <div className="grid grid-cols-4 gap-3 mt-4">
            {product.images.map((item) => (
              <button
                key={item}
                onClick={() => setImage(item)}
                className={`border rounded-lg overflow-hidden

                ${image === item ? "border-red-500" : "border-gray-300"}`}
              >
                <img src={item} alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* ================= INFO ================= */}

        <div className="col-span-5">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex gap-5 mt-3 text-gray-500">
            <span>⭐ {product.rating}</span>

            <span>{product.review} đánh giá</span>

            <span>Đã bán {product.sold}</span>
          </div>

          <div className="bg-red-50 rounded-xl p-5 mt-6 border">
            <div className="flex items-end gap-5">
              <span className="text-4xl font-bold text-red-600">
                {product.price.toLocaleString()}đ
              </span>

              <span className="line-through text-gray-500">
                {product.oldPrice.toLocaleString()}đ
              </span>
            </div>
          </div>

          <div className="mt-7">
            <h3 className="font-semibold mb-3">Màu sắc</h3>

            <div className="flex gap-3 flex-wrap">
              {product.colors.map((item) => (
                <button
                  key={item}
                  onClick={() => setColor(item)}
                  className={`px-5 py-2 rounded-lg border

                  ${
                    color === item
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <h3 className="font-semibold mb-3">Dung lượng</h3>

            <div className="flex gap-3">
              {product.storages.map((item) => (
                <button
                  key={item}
                  onClick={() => setStorage(item)}
                  className={`px-5 py-2 rounded-lg border

                  ${
                    storage === item
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 rounded-xl bg-gray-50 border p-5">
            <div className="flex justify-between">
              <span>Thương hiệu</span>

              <b>{product.brand}</b>
            </div>

            <div className="flex justify-between mt-3">
              <span>Tồn kho</span>

              <b className="text-green-600">{product.stock}</b>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-7">
            <button className="bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 font-bold">
              MUA NGAY
            </button>

            <button className="border-2 border-red-600 text-red-600 rounded-xl py-4 font-bold hover:bg-red-50">
              THÊM GIỎ HÀNG
            </button>
          </div>
        </div>

        {/* ================= RELATED ================= */}

        <div className="col-span-3">
          <div className="border rounded-xl bg-white p-5">
            <h2 className="text-xl font-bold mb-5">Sản phẩm liên quan</h2>

            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer mb-3"
              >
                <img src={item.image} className="w-20 h-20 rounded-lg" alt="" />

                <div>
                  <h3 className="font-medium line-clamp-2">{item.name}</h3>

                  <p className="text-red-600 font-bold mt-2">
                    {item.price.toLocaleString()}đ
                  </p>

                  <span className="text-yellow-500 text-sm">⭐ 4.9</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ================= ROW 2 ================= */}

      <div className="grid grid-cols-12 gap-6 mt-10">
        {/* SPECIFICATION */}

        <div className="col-span-8">
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Thông số kỹ thuật</h2>

            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="py-4 w-1/3 font-medium text-gray-500">
                    Màn hình
                  </td>

                  <td>Dynamic AMOLED 2X, 6.9 inch, 120Hz</td>
                </tr>

                <tr className="border-b">
                  <td className="py-4 font-medium text-gray-500">
                    Độ phân giải
                  </td>

                  <td>3120 × 1440 (QHD+)</td>
                </tr>

                <tr className="border-b">
                  <td className="py-4 font-medium text-gray-500">Chip</td>

                  <td>Snapdragon 8 Elite</td>
                </tr>

                <tr className="border-b">
                  <td className="py-4 font-medium text-gray-500">RAM</td>

                  <td>12GB LPDDR5X</td>
                </tr>

                <tr className="border-b">
                  <td className="py-4 font-medium text-gray-500">Bộ nhớ</td>

                  <td>256GB UFS 4.0</td>
                </tr>

                <tr className="border-b">
                  <td className="py-4 font-medium text-gray-500">Camera sau</td>

                  <td>200MP + 50MP + 50MP + 10MP</td>
                </tr>

                <tr className="border-b">
                  <td className="py-4 font-medium text-gray-500">
                    Camera trước
                  </td>

                  <td>12MP</td>
                </tr>

                <tr className="border-b">
                  <td className="py-4 font-medium text-gray-500">Pin</td>

                  <td>5000mAh</td>
                </tr>

                <tr className="border-b">
                  <td className="py-4 font-medium text-gray-500">Sạc nhanh</td>

                  <td>45W</td>
                </tr>

                <tr>
                  <td className="py-4 font-medium text-gray-500">
                    Hệ điều hành
                  </td>

                  <td>Android 16</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* VIDEO */}

        <div className="col-span-4">
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Video Review</h2>

            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/aqz-KE-bpKQ"
                title="Video Review"
                allowFullScreen
              />
            </div>

            <div className="mt-5">
              <h3 className="font-semibold text-lg">
                Samsung Galaxy S25 Ultra
              </h3>

              <p className="text-gray-500 mt-2 leading-7">
                Video đánh giá chi tiết về thiết kế, hiệu năng, camera, màn hình
                và thời lượng pin của sản phẩm.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ================= ROW 3 ================= */}

      <div className="grid grid-cols-12 gap-6 mt-10">
        {/* REVIEW FORM */}

        <div className="col-span-4">
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Viết đánh giá</h2>

            {/* Rating */}

            <div>
              <label className="block font-medium mb-2">Đánh giá</label>

              <div className="flex gap-2 text-3xl">
                {[1, 2, 3, 4, 5].map((item) => (
                  <button key={item} className="hover:scale-110 transition">
                    ⭐
                  </button>
                ))}
              </div>
            </div>


            {/* Content */}

            <div className="mt-6">
              <label className="block font-medium mb-2">Nội dung</label>

              <textarea
                rows={6}
                placeholder="Chia sẻ trải nghiệm của bạn..."
                className="w-full border rounded-lg p-3 resize-none outline-none focus:border-red-500"
              />
            </div>

            {/* Button */}

            <button
              className="
          w-full
          bg-red-600
          hover:bg-red-700
          text-white
          rounded-xl
          py-3
          font-bold
          mt-6
        "
            >
              Gửi đánh giá
            </button>
          </div>
        </div>

        {/* REVIEW LIST */}

        <div className="col-span-8">
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Đánh giá từ khách hàng</h2>

              <span className="text-gray-500">126 đánh giá</span>
            </div>

            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border-b py-6 last:border-none">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">Nguyễn Văn {item}</h3>

                    <div className="text-yellow-500 mt-1">⭐⭐⭐⭐⭐</div>
                  </div>

                  <span className="text-sm text-gray-400">02/08/2026</span>
                </div>
                <p className="text-gray-600 leading-7 mt-2">
                  Máy chạy cực kỳ mượt, màn hình đẹp, camera chụp rất nét. Pin
                  sử dụng thoải mái cả ngày, mình rất hài lòng với sản phẩm.
                </p>
              </div>
            ))}

            {/* Load more */}

            <div className="text-center mt-8">
              <button
                className="
            border
            border-red-600
            text-red-600
            px-8
            py-3
            rounded-xl
            hover:bg-red-50
          "
              >
                Xem thêm đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
