import React from "react";
import { Controller } from "react-hook-form";

const FormField = ({
  control,
  label,
  name,
  Component,
  type = "text",
  rules = {},
  placeholder = "",
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => {
          return (
            <div>
              <Component
                type={type}
                onChange={onChange}
                value={value}
                name={name}
                error={error}
                placeholder={placeholder}
              />
              {/* Hiển thị câu thông báo lỗi nếu có */}
              {error && (
                <p className="mt-1 text-xs text-red-500">{error.message}</p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default FormField;
