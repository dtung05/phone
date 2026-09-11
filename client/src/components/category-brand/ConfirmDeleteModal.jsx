import React from "react";
import { AlertTriangle, X, Loader2 } from "lucide-react";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  entityName = "",
  entityType = "mục",
  productsCount = 0,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const hasLinkedProducts = productsCount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] transition-opacity">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-red-50/40">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={18} />
            <h3 className="text-sm font-bold tracking-tight">
              Xác nhận xóa {entityType}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-600 leading-relaxed">
            Bạn có chắc chắn muốn xóa {entityType}{" "}
            <strong className="text-slate-900 font-semibold">
              "{entityName}"
            </strong>{" "}
            không?
          </p>

          {hasLinkedProducts ? (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 space-y-1">
              <p className="font-semibold flex items-center gap-1.5 text-amber-900">
                <AlertTriangle size={14} className="text-amber-600 shrink-0" />
                Cảnh báo liên kết dữ liệu!
              </p>
              <p>
                Hiện đang có{" "}
                <strong className="font-bold text-red-600">
                  {productsCount} sản phẩm
                </strong>{" "}
                thuộc {entityType} này. Hệ thống sẽ không cho phép xóa để bảo toàn
                tính toàn vẹn của sản phẩm.
              </p>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400">
              Hành động này có thể khôi phục lại từ thùng rác xóa mềm (Soft
              delete).
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 px-5 py-3.5 bg-slate-50 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading || hasLinkedProducts}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {isLoading && <Loader2 size={14} className="animate-spin" />}
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
