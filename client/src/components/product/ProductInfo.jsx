import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductVariant } from "../../store/slices/productVariantSlice";
import { useAddCartMutation } from "../../store/api/cartApi";
import { showToast } from "../../store/slices/toastSlice";
export default function ProductInfo({ data }) {
  const { product_name, product_variants } = data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // xử lý đặt hàng
  const handleBuyNow = () => {
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
    const result = await addCart({
      product_variant_id: selectedVariant.id,
      quantity,
    }).unwrap();
    dispatch(
      showToast({
        message: result.message,
        type: result.type,
      }),
    );
  };

  const storages = useMemo(() => {
    return [...new Set(product_variants.map((v) => v.attributes.storage))];
  }, [product_variants]);
  const [selectedStorage, setSelectedStorage] = useState(storages[0]);
  const [selectedVariant, setSelectedVariant] = useState(() =>
    product_variants.find((v) => v.attributes.storage === storages[0]),
  );
  const [quantity, setQuantity] = useState(1);
  const colors = useMemo(() => {
    return product_variants.filter(
      (v) => v.attributes.storage === selectedStorage,
    );
  }, [product_variants, selectedStorage]);

  const handleStorage = (storage) => {
    setSelectedStorage(storage);

    const variant = product_variants.find(
      (v) => v.attributes.storage === storage,
    );

    setSelectedVariant(variant);
  };
  const handleColor = (variant) => {
    setSelectedVariant(variant);
  };
  useEffect(() => {
    if (quantity > selectedVariant.stock_quantity) {
      setQuantity(selectedVariant.stock_quantity || 1);
    }
  }, [selectedVariant]);
  const increaseQuantity = () => {
    if (quantity < selectedVariant.stock_quantity) {
      setQuantity((prev) => prev + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex-1 px-6">
      <h1 className="text-3xl font-bold">{product_name}</h1>

      <p className="mt-5 text-3xl font-bold text-red-600">
        {selectedVariant.selling_price.toLocaleString("vi-VN")}₫
      </p>

      <div className="mt-6">
        <h3 className="mb-2 font-semibold">Dung lượng</h3>

        <div className="flex flex-wrap gap-3">
          {storages.map((storage) => (
            <button
              key={storage}
              onClick={() => handleStorage(storage)}
              className={`rounded-lg border px-4 py-3 transition ${
                selectedStorage === storage
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              {storage}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-2 font-semibold">Màu sắc</h3>

        <div className="flex flex-wrap gap-3">
          {colors.map((variant) => (
            <button
              key={variant.id}
              onClick={() => handleColor(variant)}
              className={`rounded-lg border px-4 py-3 transition ${
                selectedVariant.id === variant.id
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              {variant.attributes.color}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="mb-2 font-semibold">Số lượng</h3>

        <div className="flex w-fit items-center overflow-hidden rounded-lg border">
          <button
            onClick={decreaseQuantity}
            className="h-10 w-10 text-lg hover:bg-gray-100"
          >
            −
          </button>

          <span className="flex h-10 w-12 items-center justify-center border-x">
            {quantity}
          </span>

          <button
            onClick={increaseQuantity}
            className="h-10 w-10 text-lg hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <p className="mt-6 text-gray-600">
        Còn lại:
        <span className="ml-2 font-bold">
          {selectedVariant.stock_quantity}
        </span>{" "}
        sản phẩm
      </p>

      <div className="mt-8 flex gap-3">
        <button
          className="rounded-xl bg-red-600 px-8 py-4 font-medium text-white hover:bg-red-700"
          onClick={() => {
            handleBuyNow();
          }}
        >
          Mua ngay
        </button>

        <button
          disabled={isLoading}
          onClick={handleAddCart}
          className="rounded-xl border px-8 py-4 font-medium hover:bg-gray-100 disabled:opacity-50"
        >
          {isLoading ? "Đang thêm..." : "Thêm giỏ hàng"}
        </button>
      </div>
    </div>
  );
}
