import React from "react";
import { useSelector } from "react-redux";
import { FormLogin } from "../../components/auth/login/FormLogin";
import { IntroduceLogin } from "../../components/auth/login/IntroduceLogin";
import Toast from "../../components/block/Toast";

export const Login = () => {
  const toast = useSelector((state) => state.toast);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      {toast?.message && <Toast />}
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100 lg:grid-cols-2">
        <IntroduceLogin />

        <FormLogin />
      </div>
    </div>
  );
};
