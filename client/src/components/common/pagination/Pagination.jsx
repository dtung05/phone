import React from "react";
// Pagination with Ellipsis  mẫu phân trang rút gọn
export default function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) return null;

  const getPageNumbers = () => {
    if (lastPage <= 7) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", lastPage];
    }

    if (currentPage >= lastPage - 3) {
      return [
        1,
        "...",
        lastPage - 4,
        lastPage - 3,
        lastPage - 2,
        lastPage - 1,
        lastPage,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      lastPage,
    ];
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-wrap justify-center items-center gap-1.5 mt-8 select-none">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3.5 py-1.5 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
      >
        Trước
      </button>

      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-8 h-8 flex items-center justify-center text-xs text-gray-400 font-bold"
            >
              ...
            </span>
          );
        }

        const isActive = currentPage === page;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              isActive
                ? "bg-[#009b7a] text-white shadow-xs"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-2xs"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3.5 py-1.5 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
      >
        Sau
      </button>
    </div>
  );
}
