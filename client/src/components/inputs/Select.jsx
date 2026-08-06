import React from "react";

const Select = ({ label, children, ...props }) => {
  return (
    <>
      {label && (
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <select
        {...props}
        className=" w-full
    rounded-lg
    border
    border-gray-300
    px-4
    py-2.5
    transition-all
    duration-200
    hover:border-emerald-500
    focus:border-emerald-600
    focus:ring-2
    focus:ring-emerald-100"
      >
        {children}
      </select>
    </>
  );
};

export default Select;
