import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormField from "../../FormField";
import TextInput from "../../inputs/TextInput";
import { useLoginMutation } from "../../../store/api/authApi";
import { setProfile } from "../../../store/slices/profileSlice";
import { showToast } from "../../../store/slices/toastSlice";

export const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState("");

  const { handleSubmit, control, setError } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const [loginMutation, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const result = await loginMutation(data).unwrap();
      localStorage.setItem("access_token", result.access_token);

      // Cập nhật thông tin profile vào Redux
      if (result.user) {
        dispatch(setProfile(result.user));
      }

      dispatch(
        showToast({
          message: result.message || "Đăng nhập thành công!",
          type: "success",
        })
      );

      // Điều hướng theo vai trò (Khách hàng về trang chủ, Nhân viên về quản trị)
      const role = result.user?.role;
      if (role && role !== "Khách hàng") {
        navigate("/staff/products", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      const fieldErrors = err?.data?.errors;
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages[0],
          });
        });
      }

      const generalMessage =
        err?.data?.message ||
        err?.error ||
        "Tài khoản hoặc mật khẩu không chính xác.";
      setServerError(generalMessage);
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

      {serverError && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 font-medium">
          {serverError}
        </div>
      )}

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
          disabled={isLoading}
          className="mt-2 w-full rounded-lg bg-[#006b5c] py-3 text-sm font-bold text-white transition-all hover:bg-[#005247] hover:shadow-lg active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};
