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
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
      {/* SECTION HEADER */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
            <Icon size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                {title}
              </h2>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-600 rounded-full">
                {items?.length || 0}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
          </div>
        </div>

        {activeTab === "active" && (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm shrink-0"
          >
            <Plus size={15} /> Thêm {entityName}
          </button>
        )}
      </div>

      {/* TABS & SEARCH BAR */}
      <div className="p-3.5 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Toggle: Đang dùng vs Thùng rác */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab("active");
              setSearchTerm("");
            }}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === "active"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
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
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === "trashed"
                ? "bg-white text-amber-700 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Archive size={13} />
            Thùng rác ({trashedItems.length})
          </button>
        </div>

        {/* Search input */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Tìm ${entityName}...`}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600"
            >
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* TABLE DATA */}
      <div className="flex-1 overflow-x-auto min-h-[260px]">
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            Đang tải dữ liệu {entityName}...
          </div>
        ) : isError ? (
          <div className="py-16 text-center text-xs text-red-500">
            Không thể tải dữ liệu {entityName}. Vui lòng thử lại sau!
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400 text-xs text-center px-4">
            <Inbox size={36} className="text-slate-300 mb-2 stroke-[1.5]" />
            <p className="font-semibold text-slate-600">
              {searchTerm
                ? `Không tìm thấy ${entityName} nào khớp với "${searchTerm}"`
                : activeTab === "trashed"
                ? `Thùng rác trống. Không có ${entityName} nào bị xóa mềm.`
                : `Chưa có ${entityName} nào trong hệ thống`}
            </p>
            {activeTab === "active" && !searchTerm && (
              <p className="text-[11px] text-slate-400 mt-1">
                Bấm nút "Thêm {entityName}" ở trên để bắt đầu tạo mới.
              </p>
            )}
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-4 w-16">ID</th>
                <th className="py-2.5 px-4">Tên {entityName}</th>
                {activeTab === "active" ? (
                  <th className="py-2.5 px-4 text-center w-28">Số sản phẩm</th>
                ) : (
                  <th className="py-2.5 px-4 text-center w-36">Thời gian xóa</th>
                )}
                <th className="py-2.5 px-4 text-right w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="py-3 px-4 font-mono text-slate-400 font-semibold">
                    #{item.id}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {item.name}
                  </td>
                  {activeTab === "active" ? (
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${badgeBg}`}
                      >
                        {item.products_count ?? 0} sản phẩm
                      </span>
                    </td>
                  ) : (
                    <td className="py-3 px-4 text-center text-slate-400 text-[11px]">
                      {item.deleted_at
                        ? new Date(item.deleted_at).toLocaleString("vi-VN", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "Đã xóa mềm"}
                    </td>
                  )}
                  <td className="py-3 px-4 text-right">
                    {activeTab === "active" ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          title={`Sửa ${entityName}`}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(item)}
                          title={`Xóa ${entityName}`}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => onRestore(item)}
                          disabled={isRestoring}
                          title={`Bỏ xóa mềm / Khôi phục ${entityName}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors shadow-2xs"
                        >
                          <RotateCcw size={12} />
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

      {/* FOOTER STATS */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          {activeTab === "active" ? "Đang hoạt động" : "Trong thùng rác"}:{" "}
          <strong>{filteredItems.length}</strong> / {currentList.length}{" "}
          {entityName}
        </span>
        <span className="text-slate-400">Tự động đồng bộ</span>
      </div>
    </div>
  );
};

export default EntityManageSection;
