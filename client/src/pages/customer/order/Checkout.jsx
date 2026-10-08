import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCheckoutMutation } from "../../../store/api/orderApi";

import Loading from "../../../components/common/feedback/Loading";
import ProductCheckout from "../../../components/customer/order/ProductCheckout";
import FormRecipient from "../../../components/customer/order/FormRecipient";
import TotalPrice from "../../../components/customer/order/TotalPrice";
import { showToast } from "../../../store/slices/toastSlice";
import { ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";

const Checkout = () => {
  const dispatch = useDispatch();
  const productVariant = useSelector((state) => state.productVariant);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [checkout, { isLoading }] = useCheckoutMutation();

  useEffect(() => {
    if (!productVariant || productVariant.length === 0) {
      navigate("/");
      return;
    }
    const fetchCheckout = async () => {
      try {
        const result = await checkout(productVariant).unwrap();
        if (result.type === "error") {
          dispatch(
            showToast({
              message: result.message || "Không thể tải thông tin thanh toán",
              type: "error",
            }),
          );
          navigate(-1);
          return;
        }
        setProducts(result.products || []);
      } catch (error) {
        navigate("/");
      }
    };
    fetchCheckout();
  }, [productVariant, navigate, checkout, dispatch]);

  if (isLoading) return <Loading text="Đang chuẩn bị đơn hàng..." />;

  const idQuantities = products.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  const totalPrice = products.reduce(
    (sum, item) => sum + item.selling_price * item.quantity,
    0,
  );

  return (
    <div className="bg-[#f8faf9] min-h-screen py-5 sm:py-7">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap"
        >
          <Link to="/" className="hover:text-[#009b7a] transition-colors">
            Trang chủ
          </Link>
          <span className="text-gray-300">/</span>
          <Link to="/carts" className="hover:text-[#009b7a] transition-colors">
            Giỏ hàng
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-semibold">Thanh toán & Đặt hàng</span>
        </nav>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Đặt hàng & Thanh toán
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#d9f7eb] text-[#006b5a] border border-[#bbf0dc]">
              {products.length} sản phẩm
            </span>
          </div>

          <Link
            to="/carts"
            className="text-xs text-[#009b7a] hover:text-[#006b5a] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Quay lại giỏ hàng</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <FormRecipient idQuantities={idQuantities} />
          </div>

          <div className="lg:col-span-5 sticky top-20 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
                <span>Đơn hàng của bạn</span>
                <span className="text-xs text-gray-500 font-semibold">
                  {products.length} sản phẩm
                </span>
              </h2>
              <div className="divide-y divide-gray-100 max-h-[360px] overflow-y-auto pr-1">
                {products.map((item) => (
                  <ProductCheckout key={item.id} item={item} />
                ))}
              </div>
              <TotalPrice totalPrice={totalPrice} />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-2xs space-y-2.5 text-xs text-gray-600">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-[#009b7a] shrink-0" />
                <span>100% hàng chính hãng</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck size={16} className="text-[#009b7a] shrink-0" />
                <span>Giao hàng miễn phí toàn quốc, kiểm tra trước khi nhận</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw size={16} className="text-[#009b7a] shrink-0" />
                <span>1 đổi 1 trong 30 ngày nếu phát sinh lỗi nhà sản xuất</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
