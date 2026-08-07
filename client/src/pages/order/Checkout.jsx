import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCheckoutMutation } from "../../store/api/orderApi";

import Loading from "../../components/block/Loading";
import ProductCheckout from "../../components/order/ProductCheckout";
import FormRecipient from "../../components/order/FormRecipient";
import TotalPrice from "../../components/order/TotalPrice";
import { showToast } from "../../store/slices/toastSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const productVariant = useSelector((state) => state.productVariant);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [checkout, { isLoading, error }] = useCheckoutMutation();
  if (!productVariant) {
    navigate("/");
  }
  const idQuantities = products.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
    };
  });
  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const result = await checkout(productVariant).unwrap();
        if (result.type == "error") {
          dispatch(
            showToast({
              message: result.message,
              type: "error",
            }),
          );
        }
        setProducts(result.products);
      } catch (error) {
        navigate("/");
      }
    };
    fetchCheckout();
  }, [productVariant]);

  if (isLoading) return <Loading />;

  const totalPrice = products.reduce(
    (sum, item) => sum + item.selling_price * item.quantity,
    0,
  );
  return (
    <div className="flex pl-30 pr-30 gap-2  ">
      <div className="w-[70%] rounded-xl border bg-white p-6 shadow-sm">
        {products.map((item) => (
          <ProductCheckout key={item.id} item={item} />
        ))}
        <TotalPrice totalPrice={totalPrice} />
      </div>
      <FormRecipient idQuantities={idQuantities} />
    </div>
  );
};

export default Checkout;
