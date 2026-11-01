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
  X,
} from "lucide-react";
import Button from "../../common/form/Button";

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
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-full shadow-2xs">
      {/* SECTION HEADER */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Icon size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                {title}
              </h2>
              <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-600 rounded-full">
                {items?.length || 0}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
          </div>
        </div>

        {activeTab === "active" && (
          <Button
            type="button"
            onClick={onAdd}
            variant="primary"
            size="sm"
            icon={Plus}
          >
            Thêm {entityName}
          </Button>
        )}
      </div>

      {/* TABS & SEARCH BAR */}
      <div className="p-3.5 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="inline-flex items-center bg-slate-100 p-1 rounded-lg text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab("active");
              setSearchTerm("");
            }}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === "active"
                ? "bg-white text-emerald-700 shadow-2xs"
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
                ? "bg-white text-amber-700 shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Archive size={13} />
            Thùng rác ({trashedItems.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Tìm ${entityName}...`}
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-lg outline-none transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-x-auto min-h-[260px]">
        {isLoading ? (
          <div className="py-16 text-center text-xs text-slate-400">
            Đang tải dữ liệu {entityName}...
          </div>
        ) : isError ? (
          <div className="py-16 text-center text-xs text-red-500">
            Không thể tải dữ liệu {entityName}.
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400 text-xs text-center px-4">
            <Inbox size={32} className="text-slate-300 mb-2 stroke-[1.5]" />
            <p className="font-semibold text-slate-600">
              {searchTerm
                ? `Không tìm thấy ${entityName} khớp với "${searchTerm}"`
                : activeTab === "trashed"
                ? `Thùng rác trống.`
                : `Chưa có ${entityName} nào trong hệ thống.`}
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-4 w-16 text-center">Mã</th>
                <th className="py-2.5 px-4">Tên {entityName}</th>
                {activeTab === "active" ? (
                  <th className="py-2.5 px-4 text-center w-28">Số sản phẩm</th>
                ) : (
                  <th className="py-2.5 px-4 text-center w-36">Thời gian xóa</th>
                )}
                <th className="py-2.5 px-4 text-center w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-3 px-4 text-center font-mono text-slate-400">
                    #{item.id}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {item.name}
                  </td>
                  {activeTab === "active" ? (
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.products_count ?? 0} sản phẩm
                      </span>
                    </td>
                  ) : (
                    <td className="py-3 px-4 text-center text-slate-400 text-[11px] font-mono">
                      {item.deleted_at
                        ? new Date(item.deleted_at).toLocaleString("vi-VN", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "—"}
                    </td>
                  )}
                  <td className="py-3 px-4 text-center">
                    {activeTab === "active" ? (
                      <div className="inline-flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          title={`Sửa ${entityName}`}
                          className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(item)}
                          title={`Xóa ${entityName}`}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => onRestore(item)}
                        disabled={isRestoring}
                        variant="soft"
                        size="xs"
                        icon={RotateCcw}
                      >
                        Khôi phục
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="px-4 py-2.5 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
        <span>
          Tổng số: <strong>{filteredItems.length}</strong> / {currentList.length}{" "}
          {entityName}
        </span>
      </div>
    </div>
  );
};

export default EntityManageSection;
