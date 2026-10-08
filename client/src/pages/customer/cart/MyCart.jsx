import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useDestroyCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "../../../store/api/cartApi";
import Loading from "../../../components/common/feedback/Loading";
import { ShoppingCart, ChevronRight, ArrowLeft } from "lucide-react";
import { addProductVariant } from "../../../store/slices/productVariantSlice";
import { useDispatch } from "react-redux";
import ListCart from "../../../components/customer/cart/ListCart";
import ConfirmCart from "../../../components/customer/cart/ConfirmCart";
import { showToast } from "../../../store/slices/toastSlice";
import NoResult from "@/components/common/feedback/NoResult";

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
  if (isLoading) return <Loading text="Đang tải giỏ hàng..." />;
  if (error)
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-red-200/80 p-8 max-w-md mx-auto shadow-2xs space-y-3">
          <p className="text-sm font-semibold text-red-600">
            Có lỗi xảy ra khi tải dữ liệu giỏ hàng.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#009b7a] text-white rounded-xl text-xs font-bold hover:bg-[#006b5a] transition cursor-pointer"
          >
            Tải lại trang
          </button>
        </div>
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
    if (!confirm("Xác nhận xóa sản phẩm khỏi giỏ hàng?")) {
      return;
    }
    try {
      const result = await destroyCart(id).unwrap();
      dispatch(
        showToast({
          message: result.message || "Đã xóa sản phẩm khỏi giỏ!",
          type: result.type || "success",
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
      <NoResult
        Icon={ShoppingCart}
        title="Giỏ hàng của bạn đang trống"
        content="Chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá và mua sắm ngay!"
        action={
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#009b7a] hover:bg-[#006b5a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
          >
            <span>Khám phá sản phẩm ngay</span>
            <ChevronRight size={16} />
          </button>
        }
      />
     
    );
  }

  return (
    <div className="bg-[#f8faf9] min-h-screen py-5 sm:py-7">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap"
        >
          <Link to="/" className="hover:text-[#009b7a] transition-colors">
            Trang chủ
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-semibold">Giỏ hàng của tôi</span>
        </nav>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Giỏ hàng
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#d9f7eb] text-[#006b5a] border border-[#bbf0dc]">
              {items.length} sản phẩm
            </span>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="text-xs text-[#009b7a] hover:text-[#006b5a] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Tiếp tục mua hàng</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <ListCart
              selectedIds={selectedIds}
              items={items}
              toggleSelectAll={toggleSelectAll}
              updateQuantity={updateQuantity}
              toggleSelect={toggleSelect}
              removeItem={removeItem}
            />
          </div>
          <div className="lg:col-span-4">
            <ConfirmCart
              handleCheckout={handleCheckout}
              selectedItems={selectedItems}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
