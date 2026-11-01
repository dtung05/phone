import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Package,
  Inbox,
  RotateCcw,
  Archive,
} from "lucide-react";

const EntityManageSection = ({
  title = "Danh mục",
  entityName = "danh mục",
  description = "Quản lý danh sách các mục",
  items = [],
  trashedItems = [],
  isLoading = false,
  isError = false,
  onAdd,
  onEdit,
  onDelete,
  onRestore,
  isRestoring = false,
  icon: Icon = Package,
  badgeBg = "bg-emerald-50 text-emerald-700 border-emerald-200",
}) => {
  const [activeTab, setActiveTab] = useState("active"); // 'active' | 'trashed'
  const [searchTerm, setSearchTerm] = useState("");

  const currentList = activeTab === "active" ? items : trashedItems;

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return currentList;
    const lower = searchTerm.toLowerCase();
    return currentList.filter((item) =>
      item.name?.toLowerCase().includes(lower)
    );
  }, [currentList, searchTerm]);

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-xs overflow-hidden flex flex-col h-full font-sans">
      <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-b from-gray-50/60 to-white">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-[#009b7a] flex items-center justify-center shrink-0 shadow-2xs">
            <Icon size={21} />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                {title}
              </h2>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-gray-100 text-gray-600 rounded-full font-mono">
                {items?.length || 0}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          </div>
        </div>

        {activeTab === "active" && (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#009b7a] rounded-xl hover:bg-[#008267] transition-all shadow-sm hover:shadow shrink-0 cursor-pointer"
          >
            <Plus size={16} /> Thêm {entityName}
          </button>
        )}
      </div>

      <div className="p-4 border-b border-gray-100 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center bg-gray-100/80 p-1 rounded-xl text-xs shrink-0 self-start sm:self-auto border border-gray-200/60">
          <button
            type="button"
            onClick={() => {
              setActiveTab("active");
              setSearchTerm("");
            }}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === "active"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Đang hoạt động ({items.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("trashed");
              setSearchTerm("");
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === "trashed"
                ? "bg-white text-amber-700 shadow-xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Archive size={13} />
            Thùng rác ({trashedItems.length})
          </button>
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Tìm ${entityName}...`}
            className="w-full pl-9 pr-8 py-2 text-xs bg-gray-50/60 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#009b7a] focus:ring-2 focus:ring-[#009b7a]/10 transition-all font-medium text-gray-900"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 hover:text-gray-600 px-1.5 py-0.5 rounded bg-gray-200/60 cursor-pointer"
            >
              Xóa
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-x-auto min-h-[280px]">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400 text-xs">
            <div className="w-7 h-7 border-2 border-[#009b7a] border-t-transparent rounded-full animate-spin mb-2.5"></div>
            Đang tải dữ liệu {entityName}...
          </div>
        ) : isError ? (
          <div className="py-20 text-center text-xs text-rose-500 font-medium">
            Không thể tải dữ liệu {entityName}. Vui lòng thử lại sau!
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400 text-xs text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 mb-3 border border-gray-100">
              <Inbox size={28} className="stroke-[1.5]" />
            </div>
            <p className="font-semibold text-gray-700 text-sm">
              {searchTerm
                ? `Không tìm thấy ${entityName} nào khớp với "${searchTerm}"`
                : activeTab === "trashed"
                ? `Thùng rác trống. Không có ${entityName} nào bị xóa mềm.`
                : `Chưa có ${entityName} nào trong hệ thống`}
            </p>
            {activeTab === "active" && !searchTerm && (
              <p className="text-xs text-gray-400 mt-1">
                Bấm nút "Thêm {entityName}" ở trên để bắt đầu tạo mới.
              </p>
            )}
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200/80 bg-gray-50/70 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-16 text-center">ID</th>
                <th className="py-3 px-4">Tên {entityName}</th>
                {activeTab === "active" ? (
                  <th className="py-3 px-4 text-center w-32">Số sản phẩm</th>
                ) : (
                  <th className="py-3 px-4 text-center w-40">Thời gian xóa</th>
                )}
                <th className="py-3 px-4 text-right w-28">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/70 transition-colors group"
                >
                  <td className="py-3.5 px-4 text-center font-mono text-gray-400 font-semibold">
                    #{item.id}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-900">
                    {item.name}
                  </td>
                  {activeTab === "active" ? (
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium border font-mono ${badgeBg}`}
                      >
                        {item.products_count ?? 0} sản phẩm
                      </span>
                    </td>
                  ) : (
                    <td className="py-3.5 px-4 text-center text-gray-400 text-[11px] font-mono">
                      {item.deleted_at
                        ? new Date(item.deleted_at).toLocaleString("vi-VN", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "Đã xóa mềm"}
                    </td>
                  )}
                  <td className="py-3.5 px-4 text-right">
                    {activeTab === "active" ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          title={`Sửa ${entityName}`}
                          className="p-1.5 text-gray-400 hover:text-[#009b7a] hover:bg-[#009b7a]/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(item)}
                          title={`Xóa ${entityName}`}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => onRestore(item)}
                          disabled={isRestoring}
                          title={`Khôi phục ${entityName}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl transition-colors shadow-2xs cursor-pointer"
                        >
                          <RotateCcw size={13} />
                          <span>Khôi phục</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="px-5 py-3 bg-gray-50/80 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
        <span>
          {activeTab === "active" ? "Đang hoạt động" : "Trong thùng rác"}:{" "}
          <strong className="text-gray-800 font-bold">{filteredItems.length}</strong> / {currentList.length}{" "}
          {entityName}
        </span>
       
      </div>
    </div>
  );
};

export default EntityManageSection;