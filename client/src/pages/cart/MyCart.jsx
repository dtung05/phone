import React, { useState, useMemo } from "react";
import {
  useDestroyCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "../../store/api/cartApi";
import Loading from "../../components/block/Loading";
import { ShoppingCart, ChevronRight, ArrowLeft } from "lucide-react";
import { addProductVariant } from "../../store/slices/productVariantSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListCart from "../../components/cart/ListCart";
import ConfirmCart from "../../components/cart/ConfirmCart";
import { showToast } from "../../store/slices/toastSlice";

const MyCart = () => {
  const updateTimer = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCartQuery();

  const cart = data?.[0];
  const initialItems = cart?.cart_items || [];

  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [destroyCart, { isLoading: isRemoveLoading, error: removeError }] =
    useDestroyCartMutation();
  React.useEffect(() => {
    setItems(initialItems);
    setSelectedIds(initialItems.map((i) => i.id));
  }, [data]);

  const selectedItems = useMemo(
    () => items.filter((i) => selectedIds.includes(i.id)),
    [items, selectedIds],
  );

  const totalPrice = useMemo(
    () =>
      selectedItems.reduce(
        (sum, item) =>
          sum + (item.product_variant?.selling_price || 0) * item.quantity,
        0,
      ),
    [selectedItems],
  );
  const [updateCart] = useUpdateCartMutation();
  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="text-center py-12 text-red-500 font-medium">
        Có lỗi xảy ra khi tải giỏ hàng.
      </div>
    );

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(
      selectedIds.length === items.length ? [] : items.map((i) => i.id),
    );
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = async (id, delta) => {
    const item = items.find((item) => item.id === id);
    if (!item) return;
    const newQty = Math.min(
      item.product_variant.stock_quantity,
      Math.max(1, item.quantity + delta),
    );
    // cập nhật UI ngay
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item,
      ),
    );
    // Hủy timer trước đó
    clearTimeout(updateTimer.current);

    // Chờ 2 giây kể từ lần click cuối
    updateTimer.current = setTimeout(() => {
      updateCart({
        id,
        quantity: newQty,
      }).unwrap();
    }, 300);
  };

  // xóa sản phẩm khỏi giỏ
  const removeItem = async (id) => {
    if (!confirm("Xác nhận xóa đơn hàng?")) {
      return;
    }
    try {
      const result = await destroyCart(id).unwrap();
      dispatch(
        showToast({
          message: result.message,
          type: result.type,
        }),
      );
    } catch (removeError) {
      dispatch(
        showToast({
          message: removeError.data?.message || "Xóa sản phẩm thất bại",
          type: removeError.data?.type || "error",
        }),
      );
    }
  };
  // Xử lý đặt hàng
  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    console.log(selectedItems);
    const payload = selectedItems.map(({ product_variant, quantity }) => ({
      id: product_variant.id,
      quantity,
    }));
    dispatch(addProductVariant(payload));
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-gray-50 min-h-screen">
        <ShoppingCart size={48} className="text-gray-400 mb-3" />
        <p className="text-gray-500 font-medium">Giỏ hàng của bạn đang trống</p>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Giỏ hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <ListCart
            selectedIds={selectedIds}
            items={items}
            toggleSelectAll={toggleSelectAll}
            updateQuantity={updateQuantity}
            toggleSelect={toggleSelect}
            removeItem={removeItem}
          />
          <ConfirmCart
            handleCheckout={handleCheckout}
            selectedItems={selectedItems}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default MyCart;
