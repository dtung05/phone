import React from "react";

import { FormRegister } from "../../components/auth/register/FormRegister";
import { IntroductRegister } from "../../components/auth/register/IntroduceRegister";
export const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100 lg:grid-cols-2">
        <IntroductRegister />

        <FormRegister />
      </div>
    </div>
  );
};
