import React, { useEffect } from "react";
import FormField from "../../common/form/FormField";
import TextInput from "../../common/form/TextInput";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAddOrderMutation } from "../../../store/api/orderApi";
import { useGetProfileQuery } from "../../../store/api/authApi";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/slices/toastSlice";
import {
  MapPin,
  User,
  Phone,
  CreditCard,
  Banknote,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

const FormRecipient = ({ idQuantities }) => {
  const { data: profile } = useGetProfileQuery();

  const { handleSubmit, control, setError, register, watch, setValue } =
    useForm({
      defaultValues: {
        recipient_address: "",
        recipient_phone: "",
        recipient_name: "",
        payment_method: "cod",
      },
    });

  const selectedPayment = watch("payment_method");

  useEffect(() => {
    if (profile) {
      if (profile.full_name) setValue("recipient_name", profile.full_name);
      if (profile.phone_number)
        setValue("recipient_phone", profile.phone_number);
      if (profile.address) setValue("recipient_address", profile.address);
    }
  }, [profile, setValue]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addOrder, { isLoading }] = useAddOrderMutation();

  const onSubmit = async (data) => {
    try {
      const order = {
        ...data,
        idQuantities,
      };
      const result = await addOrder(order).unwrap();
      dispatch(showToast({ message: result.message, type: result.type }));
      if (result.type == "success") {
        if (result.paymentMethod == "cod") {
          navigate("/orders");
          return;
        }
        window.location.href = result.urlPay;
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-7 shadow-2xs space-y-4">
        <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#009b7a]" />
            <span>Thông tin người nhận hàng</span>
          </h2>
          <span className="text-[11px] text-gray-400 font-normal">
            * Bắt buộc
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#009b7a]" />
              <span>Họ và tên người nhận</span>
              <span className="text-red-500">*</span>
            </label>
            <FormField
              Component={TextInput}
              control={control}
              name={"recipient_name"}
              placeholder="Ví dụ: Nguyễn Văn A"
              rules={{
                required: "Vui lòng nhập họ tên người nhận",
              }}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#009b7a]" />
              <span>Số điện thoại nhận hàng</span>
              <span className="text-red-500">*</span>
            </label>
            <FormField
              Component={TextInput}
              control={control}
              name={"recipient_phone"}
              placeholder="Ví dụ: 0912345678"
              type="tel"
              rules={{
                required: "Vui lòng nhập số điện thoại",
              }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#009b7a]" />
            <span>Địa chỉ nhận hàng chi tiết</span>
            <span className="text-red-500">*</span>
          </label>
          <FormField
            Component={TextInput}
            control={control}
            name={"recipient_address"}
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
            rules={{
              required: "Vui lòng nhập địa chỉ nhận hàng",
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-7 shadow-2xs space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#009b7a]" />
            <span>Phương thức thanh toán</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Vui lòng lựa chọn hình thức thanh toán thuận tiện nhất với bạn.
          </p>
        </div>

        <div className="space-y-3">
          <label
            className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
              selectedPayment === "cod"
                ? "border-[#009b7a] bg-[#eefbf6]/50 ring-1 ring-[#009b7a]/30 shadow-2xs"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              value="cod"
              {...register("payment_method")}
              className="w-4 h-4 accent-[#009b7a] mt-0.5 cursor-pointer shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Banknote className="w-4 h-4 text-[#009b7a]" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">
                  Thanh toán khi nhận hàng
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Bạn chỉ thanh toán tiền mặt khi nhận hàng.
              </p>
            </div>
          </label>

          <label
            className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
              selectedPayment === "vnpay"
                ? "border-[#009b7a] bg-[#eefbf6]/50 ring-1 ring-[#009b7a]/30 shadow-2xs"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              value="vnpay"
              {...register("payment_method")}
              className="w-4 h-4 accent-[#009b7a] mt-0.5 cursor-pointer shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <CreditCard className="w-4 h-4 text-[#009b7a]" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">
                  Thanh toán trực tuyến qua VnPay
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Hỗ trợ quét mã VNPAY-QR từ ứng dụng ngân hàng, thẻ ATM nội địa
                hoặc thẻ tín dụng quốc tế.
              </p>
            </div>
          </label>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <Link
            to="/carts"
            className="text-xs text-gray-500 hover:text-[#009b7a] font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Quay lại giỏ hàng</span>
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#009b7a] hover:bg-[#006b5a] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            <CheckCircle2 size={16} />
            <span>
              {isLoading ? "Đang xử lý đặt hàng..." : "Xác nhận đặt hàng ngay"}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormRecipient;
