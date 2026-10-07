import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductVariant } from "../../../store/slices/productVariantSlice";
import { useAddCartMutation } from "../../../store/api/cartApi";
import { showToast } from "../../../store/slices/toastSlice";
import { formatPrice } from "../../../utils/price";
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function ProductInfo({ data = {} }) {
  const { product_name, product_variants = [], discount_perventage, avg_rating, reviews_count } = data;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getStorage = (v) =>
    v?.attributes?.storage || v?.attributes?.["Dung lượng"] || "Tiêu chuẩn";
  const getColor = (v) =>
    v?.attributes?.color || v?.attributes?.["Màu sắc"] || "Tiêu chuẩn";

  const storages = useMemo(() => {
    return [...new Set(product_variants.map((v) => getStorage(v)))];
  }, [product_variants]);

  const [selectedStorage, setSelectedStorage] = useState(storages[0]);
  const [selectedVariant, setSelectedVariant] = useState(
    () =>
      product_variants.find((v) => getStorage(v) === storages[0]) ||
      product_variants[0]
  );
  const [quantity, setQuantity] = useState(1);

  const colors = useMemo(() => {
    return product_variants.filter(
      (v) => getStorage(v) === selectedStorage
    );
  }, [product_variants, selectedStorage]);

  const handleStorage = (storage) => {
    setSelectedStorage(storage);
    const variant = product_variants.find(
      (v) => getStorage(v) === storage
    );
    setSelectedVariant(variant || product_variants[0]);
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
      ])
    );
    navigate("/checkout");
  };

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
        })
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

  const currentPrice = selectedVariant?.selling_price || 0;
  const discountRate = Number(discount_perventage) || 0;
  const hasDiscount = discountRate > 0;
  const originalPrice = hasDiscount
    ? Math.round(currentPrice / (1 - discountRate / 100))
    : currentPrice;
  const stockCount = selectedVariant?.stock_quantity ?? 0;
  const isOutOfStock = stockCount <= 0;

  return (
    <div className="w-full space-y-4">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-snug">
          {product_name}
        </h1>
        
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2">
          {Number(reviews_count) > 0 && avg_rating ? (
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span>{Number(avg_rating).toFixed(1)}</span>
              <span className="text-gray-400 font-normal">
                ({reviews_count} đánh giá)
              </span>
            </div>
          ) : (
            <span className="text-gray-400">Chưa có đánh giá</span>
          )}

          <span className="text-gray-300">•</span>
          <span>Mã sản phẩm: #{selectedVariant?.id || "N/A"}</span>
          <span className="text-gray-300">•</span>
          
          <div className="flex items-center gap-1">
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                <XCircle size={13} />
                <span>Tạm hết hàng</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[#006b5a] font-semibold">
                <CheckCircle2 size={13} className="text-[#009b7a]" />
                <span>Còn hàng ({stockCount})</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-4 flex flex-wrap items-baseline gap-3">
        <span className="text-2xl sm:text-3xl font-extrabold text-red-600">
          {formatPrice(currentPrice)}
        </span>

        {hasDiscount && (
          <>
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>
            <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-lg">
              -{discountRate}%
            </span>
          </>
        )}
      </div>

      {storages.length > 0 && (
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
            Chọn dung lượng: <span className="text-gray-900 font-extrabold">{selectedStorage}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {storages.map((storage) => {
              const isSelected = selectedStorage === storage;
              return (
                <button
                  key={storage}
                  type="button"
                  onClick={() => handleStorage(storage)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#009b7a] text-[#006b5a] bg-[#eefbf6] font-bold shadow-2xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {storage}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
            Chọn màu sắc: <span className="text-gray-900 font-extrabold">{getColor(selectedVariant)}</span>
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
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#009b7a] text-[#006b5a] bg-[#eefbf6] font-bold shadow-2xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  } ${variantStock <= 0 ? "opacity-50" : ""}`}
                >
                  {colorName}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 pt-1">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
          Số lượng:
        </label>
        <div className="inline-flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden shadow-2xs">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1 || isOutOfStock}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 cursor-pointer font-bold transition-colors"
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
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 cursor-pointer font-bold transition-colors"
          >
            +
          </button>
        </div>
        <span className="text-xs text-gray-500">
          ({stockCount} sản phẩm có sẵn)
        </span>
      </div>

      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleBuyNow}
          className="w-full py-3 px-4 rounded-xl bg-[#009b7a] hover:bg-[#008366] text-white font-bold text-xs uppercase tracking-wide transition shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>MUA NGAY</span>
        </button>

        <button
          type="button"
          disabled={isLoading || isOutOfStock}
          onClick={handleAddCart}
          className="w-full py-3 px-4 rounded-xl border border-[#009b7a] text-[#006b5a] hover:bg-[#eefbf6] font-bold text-xs uppercase tracking-wide transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <ShoppingBag size={15} />
          <span>{isLoading ? "Đang xử lý..." : "Thêm vào giỏ"}</span>
        </button>
      </div>

      <div className="border border-gray-200/80 rounded-xl p-3.5 bg-[#f8fafc] text-xs text-gray-600 space-y-1.5">
        <p className="font-bold text-gray-800 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-[#009b7a]" />
          <span>Chính sách bán hàng & bảo hành:</span>
        </p>
        <p className="flex items-center gap-1.5 text-gray-600">
          <span className="text-[#009b7a]">✓</span> Bảo hành chính hãng 12 tháng tại trung tâm ủy quyền
        </p>
        <p className="flex items-center gap-1.5 text-gray-600">
          <span className="text-[#009b7a]">✓</span> Đổi mới trong 30 ngày nếu phát sinh lỗi nhà sản xuất
        </p>
        <p className="flex items-center gap-1.5 text-gray-600">
          <span className="text-[#009b7a]">✓</span> Miễn phí vận chuyển toàn quốc cho đơn hàng
        </p>
      </div>
    </div>
  );
}
