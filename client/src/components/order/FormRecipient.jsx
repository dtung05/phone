import React from "react";
import FormField from '../FormField';
import TextInput from "../inputs/TextInput";
import Select from "../inputs/Select";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";



const FormRecipient = () => {
  const { handleSubmit, control, setError, register } = useForm({
    defaultValues: {
      recipient_address: "",
      recipient_phone: "",
      recipient_name: "",
      payment_method: "cod",
    },
  });
  return (
    <form className="w-[50%]">
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
        <button type="submit" className="mr-7 p-4">
          Đặt hàng
        </button>
        <Link to="/">Hủy</Link>
      </div>
    </form>
  );
};

export default FormRecipient;
