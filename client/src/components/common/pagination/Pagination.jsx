import React from "react";

export default function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) return null;
  return (
    <div className="flex justify-center items-center gap-1.5 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3.5 py-1.5 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
      >
        Trước
      </button>

      {Array.from({ length: lastPage }, (_, index) => {
        const page = index + 1;
        const isActive = currentPage === page;
        return (
          <button
            key={page}
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
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3.5 py-1.5 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
      >
        Sau
      </button>
    </div>
  );
}
