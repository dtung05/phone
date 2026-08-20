import React from "react";

const HeaderSearch = ({ name, total }) => {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Kết quả tìm kiếm
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Hiển thị kết quả cho:{" "}
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
            "{name}"
          </span>
        </p>
      </div>
      {total > 0 && (
        <span className="text-xs font-medium text-gray-400">
          Tìm thấy <strong className="text-gray-700">{total}</strong> sản phẩm
        </span>
      )}
    </div>
  );
};

export default HeaderSearch;
