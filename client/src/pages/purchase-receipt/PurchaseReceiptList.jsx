import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useGetPurchaseReceiptsQuery } from "../../store/api/purchaseReceiptApi";
import Pagination from "../../components/block/Pagination";
import PurchaseList from "../../components/purchase/PurchaseList";
import PurchaseSearch from "../../components/purchase/PurchaseSearch";

const PurchaseReceiptList = () => {
  const [search, setSearch] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: response, isLoading } = useGetPurchaseReceiptsQuery({
    search: debouncedSearch,
    supplier_id: supplierId,
    from_date: fromDate,
    to_date: toDate,
    page,
  });

  const receipts = response?.data || [];
  const total = response?.total || 0;
  const lastPage = response?.last_page || 1;
  const currentPage = response?.current_page || 1;
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Quản lý Phiếu nhập kho
            </h1>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              {total} phiếu nhập
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ghi nhận các đợt nhập hàng từ nhà cung cấp
          </p>
        </div>

        <Link
          to="/staff/purchase-receipts/create"
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <Plus size={16} />
          <span>Lập phiếu nhập kho</span>
        </Link>
      </div>

      <PurchaseSearch
        search={search}
        supplierId={supplierId}
        fromDate={fromDate}
        toDate={toDate}
        setSearch={setSearch}
        setSupplierId={setSupplierId}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
      <PurchaseList receipts={receipts} isLoading={isLoading} />
      {lastPage > 1 && (
        <div className="p-4 border-t border-slate-100 flex justify-end">
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default PurchaseReceiptList;
