import React from "react";
import FormField from "../FormField";
import TextInput from "../inputs/TextInput";
import Select from "../inputs/Select";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAddOrderMutation } from "../../store/api/orderApi";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/toastSlice";
const FormRecipient = ({ idQuantities }) => {
  // Xử lý hook form
  const { handleSubmit, control, setError, register } = useForm({
    defaultValues: {
      recipient_address: "",
      recipient_phone: "",
      recipient_name: "",
      payment_method: "cod",
    },
  });
  // Xử lý tạo đơn hàng
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [addOrder, { isLoading, error }] = useAddOrderMutation();
  const onSubmit = async (data) => {
    try {
      const order = {
        ...data,
        idQuantities,
      };
      const result = await addOrder(order).unwrap();
      dispatch(showToast({ message: result.message, type: result.type }));
      if (result.type == "success") {
        navigate("/orders");
      } else {
        navigate("/");
      }
    } catch (error) {
      const errors = error?.data?.errors;
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };
  return (
    <form className="w-[50%]" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1>Thông tin địa chỉ nhận hàng</h1>
      <FormField
        Component={TextInput}
        control={control}
        label={"Họ Tên người nhận"}
        name={"recipient_name"}
        placeholder="Nhập vào họ tên người nhận"
        rules={{
          required: "Nhập đầy đủ họ tên",
        }}
      />
      <FormField
        Component={TextInput}
        control={control}
        label={"Số điện thoại"}
        name={"recipient_phone"}
        placeholder="0862527719"
        type="number"
        rules={{
          required: "Nhập đầy đủ số điện thoại",
        }}
      />
      <Select
        label={"Chọn hình thức thanh toán"}
        {...register("payment_method")}
      >
        <option value="cod">COD</option>
        <option value="momo">MOMO</option>
      </Select>
      <FormField
        Component={TextInput}
        control={control}
        label={"Địa chỉ nhận hàng"}
        name={"recipient_address"}
        placeholder="Nhập vào địa chỉ người nhận"
        rules={{
          required: "Nhập vào địa chỉ nhận hàng",
        }}
      />
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="mr-7 p-4 disabled:opacity-50"
        >
          {isLoading ? "Đang đặt..." : "Đặt hàng"}
        </button>
        <Link to="/">Hủy</Link>
      </div>
    </form>
  );
};

export default FormRecipient;
