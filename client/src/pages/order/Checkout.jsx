import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCheckoutMutation } from "../../store/api/orderApi";

import Loading from "../../components/block/Loading";
import ProductCheckout from "../../components/order/ProductCheckout";
import FormRecipient from "../../components/order/FormRecipient";
import TotalPrice from "../../components/order/TotalPrice";
const Checkout = () => {
  const productVariant = useSelector((state) => state.productVariant);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [checkout, { isLoading, error }] = useCheckoutMutation();
  if (!productVariant) {
    navigate("/");
  }
  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const result = await checkout(productVariant).unwrap();
        setProducts(result);
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
          <ProductCheckout item={item} />
        ))}

        <TotalPrice totalPrice={totalPrice} />
      </div>
      <FormRecipient />
    </div>
  );
};

export default Checkout;
