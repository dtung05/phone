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
    <div className="border border-gray-200 rounded-lg bg-white p-5">
      <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2.5 mb-3">
        Thông số kỹ thuật
      </h2>

      <div className="border border-gray-200 rounded text-xs divide-y divide-gray-200">
        {visibleEntries.map(([key, value], index) => (
          <div
            key={key}
            className={`flex items-center justify-between p-2.5 ${
              index % 2 === 0 ? "bg-gray-50/70" : "bg-white"
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
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition cursor-pointer py-1"
          >
            {isExpanded ? "Thu gọn thông số ▲" : "Xem thêm cấu hình chi tiết ▼"}
          </button>
        </div>
      )}
    </div>
  );
}
