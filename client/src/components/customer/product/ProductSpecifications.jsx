import { useState } from "react";

export default function ProductSpecification({ specifications }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const entries =
    specifications && typeof specifications === "object"
      ? Object.entries(specifications)
      : [];

  if (entries.length === 0) {
    return null;
  }

  const visibleEntries = isExpanded ? entries : entries.slice(0, 8);
  const hasMore = entries.length > 8;

  return (
    <div className="border border-gray-200/80 rounded-2xl bg-white p-5 shadow-2xs">
      <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2.5 mb-3 flex items-center justify-between">
        <span>Thông số kỹ thuật</span>
      </h2>

      <div className="border border-gray-100 rounded-xl overflow-hidden text-xs divide-y divide-gray-100">
        {visibleEntries.map(([key, value], index) => (
          <div
            key={key}
            className={`flex items-center justify-between p-2.5 sm:px-3.5 ${
              index % 2 === 0 ? "bg-gray-50/60" : "bg-white"
            }`}
          >
            <span className="text-gray-600 font-medium w-2/5">{key}</span>
            <span className="text-gray-900 font-semibold w-3/5 text-right">
              {typeof value === "object" ? JSON.stringify(value) : String(value)}
            </span>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-3">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#009b7a] hover:text-[#006b5a] bg-[#eefbf6] hover:bg-[#d9f7eb] px-3.5 py-1.5 rounded-lg transition cursor-pointer"
          >
            {isExpanded ? "Thu gọn thông số ▲" : "Xem thêm cấu hình chi tiết ▼"}
          </button>
        </div>
      )}
    </div>
  );
}
