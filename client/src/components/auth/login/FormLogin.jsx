import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../FormField";
import TextInput from "../../inputs/TextInput";
import { useLoginMutation } from "../../../store/api/authApi";
export const FormLogin = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, watch, setError } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });
  const [useLogin, { isLoading, error }] = useLoginMutation();
  const password = watch("password");
  const onSubmit = async (data) => {
    try {
      const result = await useLogin(data).unwrap();
      localStorage.setItem("access_token", result.access_token);
      window.location.href = "/";
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
          Đăng nhập
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Bạn chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#006b5c] hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-[#006b5c] py-3 text-sm font-bold text-white transition-all hover:bg-[#005247] hover:shadow-lg active:scale-[0.99]"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};
