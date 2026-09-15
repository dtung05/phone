import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductVariant } from "../../store/slices/productVariantSlice";
import { useAddCartMutation } from "../../store/api/cartApi";
import { showToast } from "../../store/slices/toastSlice";
import { formatPrice } from "../../utils/price";

export default function ProductInfo({ data }) {
  const { product_name, product_variants, discount_perventage } = data;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // xử lý đặt hàng
  const handleBuyNow = () => {
    if (!selectedVariant || (selectedVariant.stock_quantity ?? 0) <= 0) {
      dispatch(
        showToast({
          message: "Sản phẩm hiện đang tạm hết hàng!",
          type: "error",
        })
      );
      return;
    }
    dispatch(
      addProductVariant([
        {
          id: selectedVariant.id,
          quantity,
        },
      ]),
    );
    navigate("/checkout");
  };

  // xử lý thêm giỏ hàng
  const [addCart, { isLoading }] = useAddCartMutation();
  const handleAddCart = async () => {
    if (!selectedVariant || (selectedVariant.stock_quantity ?? 0) <= 0) {
      dispatch(
        showToast({
          message: "Sản phẩm hiện đang tạm hết hàng!",
          type: "error",
        })
      );
      return;
    }
    try {
      const result = await addCart({
        product_variant_id: selectedVariant.id,
        quantity,
      }).unwrap();
      dispatch(
        showToast({
          message: result.message || "Đã thêm sản phẩm vào giỏ hàng!",
          type: result.type || "success",
        }),
      );
    } catch (err) {
      dispatch(
        showToast({
          message: err?.data?.message || "Không thể thêm vào giỏ hàng!",
          type: "error",
        })
      );
    }
  };

  const getStorage = (v) =>
    v?.attributes?.storage || v?.attributes?.["Dung lượng"] || "Tiêu chuẩn";
  const getColor = (v) =>
    v?.attributes?.color || v?.attributes?.["Màu sắc"] || "Tiêu chuẩn";

  const storages = useMemo(() => {
    return [...new Set((product_variants || []).map((v) => getStorage(v)))];
  }, [product_variants]);

  const [selectedStorage, setSelectedStorage] = useState(storages[0]);
  const [selectedVariant, setSelectedVariant] = useState(
    () =>
      (product_variants || []).find((v) => getStorage(v) === storages[0]) ||
      product_variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);

  const colors = useMemo(() => {
    return (product_variants || []).filter(
      (v) => getStorage(v) === selectedStorage
    );
  }, [product_variants, selectedStorage]);

  const handleStorage = (storage) => {
    setSelectedStorage(storage);
    const variant = (product_variants || []).find(
      (v) => getStorage(v) === storage
    );
    setSelectedVariant(variant || product_variants?.[0]);
  };

  const handleColor = (variant) => {
    setSelectedVariant(variant);
  };

  useEffect(() => {
    if (selectedVariant && quantity > (selectedVariant.stock_quantity ?? 0)) {
      setQuantity(Math.max(1, selectedVariant.stock_quantity || 1));
    }
  }, [selectedVariant]);

  const increaseQuantity = () => {
    if (selectedVariant && quantity < (selectedVariant.stock_quantity ?? 0)) {
      setQuantity((prev) => prev + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const currentPrice = selectedVariant?.selling_price || 0;
  const discountRate = Number(discount_perventage) || 0;
  const hasDiscount = discountRate > 0;
  const originalPrice = hasDiscount
    ? Math.round(currentPrice / (1 - discountRate / 100))
    : currentPrice;
  const stockCount = selectedVariant?.stock_quantity ?? 0;
  const isOutOfStock = stockCount <= 0;

  return (
    <div className="flex-1 space-y-5">
      {/* TÊN SẢN PHẨM & MÃ */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
          {product_name}
        </h1>
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1.5">
          <span className="text-amber-500 font-medium">★★★★★</span>
          <span>|</span>
          <span>Mã sản phẩm: #{selectedVariant?.id || "N/A"}</span>
          <span>|</span>
          <span>
            Tình trạng:{" "}
            {isOutOfStock ? (
              <strong className="text-red-600">Hết hàng</strong>
            ) : (
              <strong className="text-green-600">Còn hàng</strong>
            )}
          </span>
        </div>
      </div>

      {/* KHỐI GIÁ */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 flex flex-wrap items-baseline gap-3">
        <span className="text-2xl sm:text-3xl font-bold text-red-600 font-mono">
          {formatPrice(currentPrice)}
        </span>

        {hasDiscount && (
          <>
            <span className="text-sm text-gray-400 line-through font-mono">
              {formatPrice(originalPrice)}
            </span>
            <span className="text-xs font-semibold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
              -{discountRate}%
            </span>
          </>
        )}
      </div>

      {/* CHỌN DUNG LƯỢNG */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
          Chọn dung lượng: <span className="text-gray-900">{selectedStorage}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {storages.map((storage) => {
            const isSelected = selectedStorage === storage;
            return (
              <button
                key={storage}
                type="button"
                onClick={() => handleStorage(storage)}
                className={`px-4 py-2 rounded text-xs font-medium border transition-colors cursor-pointer ${
                  isSelected
                    ? "border-red-600 text-red-600 bg-red-50/50 font-bold"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {storage}
              </button>
            );
          })}
        </div>
      </div>

      {/* CHỌN MÀU SẮC */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
          Chọn màu sắc: <span className="text-gray-900">{getColor(selectedVariant)}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((variant) => {
            const isSelected = selectedVariant?.id === variant.id;
            const colorName = getColor(variant);
            const variantStock = variant.stock_quantity ?? 0;

            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => handleColor(variant)}
                className={`px-4 py-2 rounded text-xs font-medium border transition-colors cursor-pointer ${
                  isSelected
                    ? "border-red-600 text-red-600 bg-red-50/50 font-bold"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                } ${variantStock <= 0 ? "opacity-60" : ""}`}
              >
                {colorName}
              </button>
            );
          })}
        </div>
      </div>

      {/* SỐ LƯỢNG & TỒN KHO */}
      <div className="flex items-center gap-4">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
          Số lượng:
        </label>
        <div className="inline-flex items-center border border-gray-300 rounded bg-white">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1 || isOutOfStock}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
          >
            -
          </button>
          <span className="w-10 text-center text-xs font-bold text-gray-800">
            {quantity}
          </span>
          <button
            type="button"
            onClick={increaseQuantity}
            disabled={quantity >= stockCount || isOutOfStock}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
          >
            +
          </button>
        </div>
        <span className="text-xs text-gray-500">
          ({stockCount} sản phẩm có sẵn)
        </span>
      </div>

      {/* NÚT MUA & THÊM GIỎ HÀNG */}
      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleBuyNow}
          className="w-full py-3 px-4 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wide transition shadow-sm disabled:opacity-50 cursor-pointer"
        >
          Mua ngay
        </button>

        <button
          type="button"
          disabled={isLoading || isOutOfStock}
          onClick={handleAddCart}
          className="w-full py-3 px-4 rounded border border-red-600 text-red-600 hover:bg-red-50 font-bold text-sm uppercase tracking-wide transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? "Đang xử lý..." : "Thêm vào giỏ hàng"}
        </button>
      </div>

      {/* CHÍNH SÁCH BÁN HÀNG TẠI CỬA HÀNG */}
      <div className="border border-gray-200 rounded-md p-3.5 bg-gray-50/50 text-xs text-gray-600 space-y-1.5">
        <p className="font-bold text-gray-800">Chính sách bán hàng & bảo hành:</p>
        <p>• Bảo hành chính hãng 12 tháng</p>
        <p>• Hư gì đổi nấy 30 ngày đầu nếu lỗi nhà sản xuất</p>
        <p>• Giao hàng tận nơi toàn quốc, kiểm tra hàng trước khi thanh toán</p>
      </div>
    </div>
  );
}
