import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { useDeleteSupplierMutation } from "../../store/api/purchaseReceiptApi";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/toastSlice";

const DeleteTager = ({ deleteTarget,setDeleteTarget }) => {
  const dispatch = useDispatch();
  const [deleteSupplier, { isLoading: isDeleting }] =
    useDeleteSupplierMutation();
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await deleteSupplier(deleteTarget.id).unwrap();
      dispatch(
        showToast({
          type: "success",
          message: res?.message || "Xóa nhà cung cấp thành công!",
        }),
      );
      setDeleteTarget(null);
    } catch (err) {
      const msg =
        err?.data?.message ||
        "Không thể xóa nhà cung cấp này do có ràng buộc dữ liệu!";
      dispatch(showToast({ type: "error", message: msg }));
      setDeleteTarget(null);
    }
  };
  return (
    <>
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white border-2 border-slate-400 w-full max-w-md shadow-lg p-4 rounded-sm">
            <div className="flex items-start gap-3 border-b border-slate-200 pb-3">
              <div className="p-1.5 bg-red-100 border border-red-300 text-red-700">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm uppercase">
                  Xác nhận xóa bản ghi
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Mã nhà cung cấp:{" "}
                  <span className="font-mono font-bold">
                    #{deleteTarget.id}
                  </span>
                </p>
              </div>
            </div>

            <div className="py-3 text-xs text-slate-700">
              Bạn có chắc chắn muốn xóa đối tác{" "}
              <strong className="text-slate-900">
                "{deleteTarget.company_name}"
              </strong>
              ?
              {deleteTarget.purchase_receipts_count > 0 && (
                <div className="mt-2 p-2 bg-amber-50 border border-amber-300 text-amber-900 font-semibold">
                  Cảnh báo: Đối tác này hiện liên kết với{" "}
                  {deleteTarget.purchase_receipts_count} phiếu nhập kho. Thao
                  tác xóa có thể thất bại do ràng buộc toàn vẹn dữ liệu.
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold rounded-sm"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-semibold flex items-center gap-1 rounded-sm disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    Xác nhận xóa
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteTager;
