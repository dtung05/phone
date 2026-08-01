import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormField from "../../FormField";
import TextInput from "../../inputs/TextInput";
import { useRegisterMutation } from "../../../store/api/authApi";
export const FormRegister = () => {
  const { handleSubmit, control, watch, setError } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    mode: "onTouched",
  });
  const [useRegister, { isLoading, error }] = useRegisterMutation();
  const password = watch("password");
  const onSubmit = async (data) => {
    try {
      const result = await useRegister(data).unwrap();
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
    <div className="flex flex-col justify-center p-8 sm:p-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Tạo tài khoản
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Bạn đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#006b5c] hover:underline"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormField
          control={control}
          label="Họ và tên"
          name="full_name"
          placeholder="Nguyễn Văn A"
          Component={TextInput}
          rules={{
            required: "Vui lòng nhập họ và tên",
            minLength: {
              value: 10,
              message: "Họ tên phải có ít nhất 2 ký tự",
            },
          }}
        />

        <FormField
          control={control}
          label="Địa chỉ Email"
          name="email"
          placeholder="example@gmail.com"
          Component={TextInput}
          rules={{
            required: "Vui lòng nhập email",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email không đúng định dạng",
            },
          }}
        />

        <FormField
          control={control}
          label="Mật khẩu"
          name="password"
          type="password"
          placeholder="••••••••"
          Component={TextInput}
          rules={{
            required: "Vui lòng nhập mật khẩu",
            minLength: {
              value: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự",
            },
          }}
        />

        <FormField
          control={control}
          label="Xác nhận mật khẩu"
          name="confirm_password"
          type="password"
          placeholder="••••••••"
          Component={TextInput}
          rules={{
            required: "Vui lòng xác nhận mật khẩu",
            validate: (value) =>
              value === password || "Mật khẩu xác nhận không trùng khớp",
          }}
        />

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-[#006b5c] py-3 text-sm font-bold text-white transition-all hover:bg-[#005247] hover:shadow-lg active:scale-[0.99]"
        >
          Tạo tài khoản
        </button>
      </form>
    </div>
  );
};
