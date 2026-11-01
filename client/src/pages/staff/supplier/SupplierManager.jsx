import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  FileText,
  Loader2,
  RefreshCw,
  X,
} from "lucide-react";
import { useGetPaginatedSuppliersQuery } from "../../../store/api/purchaseReceiptApi";
import SupplierModalForm from "../../../components/staff/supplier/SupplierModalForm";
import Loading from "../../../components/common/feedback/Loading";
import NoResult from "../../../components/common/feedback/NoResult";
import SupplierTable from "../../../components/staff/supplier/SupplierTable";
import DeleteTager from "../../../components/staff/supplier/DeleteTager";
import Pagination from "../../../components/common/pagination/Pagination";
import Button, { ButtonLink } from "../../../components/common/form/Button";

const SupplierManager = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const {
    data: supplierData,
    isLoading,
    isFetching,
    refetch,
  } = useGetPaginatedSuppliersQuery({
    search: debouncedSearch,
    page,
    per_page: 15,
  });

  const suppliers = supplierData?.data || [];
  const pagination = {
    total: supplierData?.total || 0,
    current_page: supplierData?.current_page || 1,
    last_page: supplierData?.last_page || 1,
    from: supplierData?.from || 0,
    to: supplierData?.to || 0,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handleOpenCreate = () => {
    setEditingSupplier(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sup) => {
    setEditingSupplier(sup);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-3 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
            Quản lý nhà cung ứng
          </h1>
          <p className="text-xs text-slate-500">
            Tổng cộng {pagination.total} đối tác trong hệ thống
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => refetch()}
            variant="secondary"
            size="sm"
            title="Tải lại danh sách"
          >
            <RefreshCw
              size={13}
              className={isFetching ? "animate-spin text-slate-600" : ""}
            />
          </Button>

          <ButtonLink
            to="/staff/purchase-receipts"
            variant="secondary"
            size="sm"
            icon={FileText}
          >
            Lịch sử nhập kho
          </ButtonLink>

          <Button
            type="button"
            onClick={handleOpenCreate}
            variant="primary"
            size="sm"
            icon={Plus}
          >
            Thêm đối tác
          </Button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-md p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm theo tên đối tác, SĐT, địa chỉ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 hover:border-slate-300 focus:border-emerald-600 rounded text-xs text-slate-800 placeholder-slate-400 outline-none transition-colors"
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setDebouncedSearch("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={12} />
            </button>
          )}
          {isFetching && (
            <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          )}
        </div>

        <div className="text-xs text-slate-500">
          Hiển thị <strong>{pagination.from || 0}</strong> - <strong>{pagination.to || 0}</strong> / <strong>{pagination.total}</strong> đối tác
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-500">
                <th className="py-2.5 px-4 w-16 text-center font-normal">Mã</th>
                <th className="py-2.5 px-4 min-w-[200px]">Tên đối tác cung ứng</th>
                <th className="py-2.5 px-4 w-36">Điện thoại</th>
                <th className="py-2.5 px-4">Địa chỉ trụ sở / Kho</th>
                <th className="py-2.5 px-4 w-28 text-center">Đợt nhập</th>
                <th className="py-2.5 px-4 w-24 text-right pr-4">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <Loading />
                  </td>
                </tr>
              ) : suppliers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <NoResult
                      title="Không tìm thấy đối tác phù hợp"
                      content={
                        search
                          ? `Không có kết quả nào cho "${search}"`
                          : "Hiện chưa có đối tác cung ứng nào trong hệ thống."
                      }
                    />
                  </td>
                </tr>
              ) : (
                <SupplierTable
                  suppliers={suppliers}
                  handleOpenEdit={handleOpenEdit}
                  setDeleteTarget={setDeleteTarget}
                />
              )}
            </tbody>
          </table>
        </div>

        {pagination.last_page > 1 && (
          <div className="p-2.5 bg-slate-50/50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Trang <strong>{pagination.current_page}</strong> / {pagination.last_page}
            </span>
            <Pagination
              currentPage={pagination.current_page}
              lastPage={pagination.last_page}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      <SupplierModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        supplier={editingSupplier}
      />
      <DeleteTager
        deleteTarget={deleteTarget}
        setDeleteTarget={setDeleteTarget}
      />
    </div>
  );
};

export default SupplierManager;
