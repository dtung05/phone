import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Plus,
  Search,
  FileText,
  Loader2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import {
  useGetPaginatedSuppliersQuery,
} from "../../store/api/purchaseReceiptApi";
import SupplierModalForm from "../../components/supplier/SupplierModalForm";
import Loading from "../../components/block/Loading";
import NoResult from "../../components/block/NoResult";
import SupplierTable from "../../components/supplier/SupplierTable";
import DeleteTager from "../../components/supplier/DeleteTager";

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
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
    <div className="p-4 bg-slate-100 min-h-screen text-slate-800 text-xs font-sans">
      <div className="bg-white border border-slate-300 p-3 mb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-sm shadow-none">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-0.5">
            <Link
              to="/staff/products"
              className="hover:underline hover:text-emerald-700"
            >
              Quản lý kho
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-700">
              Danh mục nhà cung ứng
            </span>
          </div>
          <h1 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
            <Building2 className="w-4 h-4 text-emerald-700" />
            Danh sách Nhà Cung Ứng
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            title="Tải lại dữ liệu"
            className="p-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-sm"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`}
            />
          </button>

          <Link
            to="/staff/purchase-receipts"
            className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1.5 rounded-sm"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            Phiếu nhập kho
          </Link>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold flex items-center gap-1.5 rounded-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Thêm NCC mới
          </button>
        </div>
      </div>
      <div className="bg-white border border-slate-300 border-b-0 p-2 flex flex-col sm:flex-row items-center justify-between gap-2 rounded-t-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Tìm theo tên NCC, SĐT, địa chỉ..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-8 pr-7 py-1 bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-sm"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
          {isFetching && (
            <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin absolute right-2 top-1/2 -translate-y-1/2" />
          )}
        </div>

        <div className="text-[11px] text-slate-600 font-mono">
          Hiển thị dòng{" "}
          <span className="font-bold">{pagination.from || 0}</span> -{" "}
          <span className="font-bold">{pagination.to || 0}</span> / Tổng{" "}
          <span className="font-bold">{pagination.total}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-300 overflow-x-auto rounded-b-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-200/70 border-b border-slate-300 text-[11px] font-bold text-slate-700 uppercase">
              <th className="py-2 px-3 w-12 text-center border-r border-slate-300">
                ID
              </th>
              <th className="py-2 px-3 border-r border-slate-300">
                Tên Nhà Cung Cấp
              </th>
              <th className="py-2 px-3 w-40 border-r border-slate-300">
                Điện thoại
              </th>
              <th className="py-2 px-3 border-r border-slate-300">
                Địa chỉ kinh doanh
              </th>
              <th className="py-2 px-3 w-32 text-center border-r border-slate-300">
                Tổng phiếu nhập
              </th>
              <th className="py-2 px-3 w-20 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center bg-white">
                  <Loading />
                </td>
              </tr>
            ) : suppliers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center bg-white">
                  <NoResult
                    title="Không tìm thấy nhà cung cấp tương ứng"
                    content=" "
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

        {pagination.last_page > 1 && (
          <div className="p-2 bg-slate-50 border-t border-slate-300 flex items-center justify-between">
            <span className="text-[11px] text-slate-600">
              Trang <span className="font-bold">{pagination.current_page}</span>{" "}
              / {pagination.last_page}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-2 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 rounded-sm"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {Array.from(
                { length: pagination.last_page },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`px-2.5 py-1 text-xs font-mono font-bold rounded-sm border ${
                    p === page
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                disabled={page >= pagination.last_page}
                onClick={() =>
                  setPage((p) => Math.min(pagination.last_page, p + 1))
                }
                className="px-2 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 rounded-sm"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <SupplierModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        supplier={editingSupplier}
      />
      <DeleteTager deleteTarget = {deleteTarget } setDeleteTarget = {setDeleteTarget} />
    </div>
  );
};

export default SupplierManager;
