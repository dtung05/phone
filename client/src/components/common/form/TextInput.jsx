import React from "react";

const TextInput = ({ onChange, name, value, type, error, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder= {placeholder}
      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 focus:ring-2 ${
        error
          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
          : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-100"
      }`}
    />
  );
};

export default TextInput;
