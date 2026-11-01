import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useGetPurchaseReceiptsQuery } from "../../../store/api/purchaseReceiptApi";
import Pagination from "../../../components/common/pagination/Pagination";
import PurchaseList from "../../../components/staff/purchase/PurchaseList";
import PurchaseSearch from "../../../components/staff/purchase/PurchaseSearch";

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
      setPage(1); 
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [supplierId, fromDate, toDate]);

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
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200/85 p-5 sm:p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
              Phiếu nhập kho
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 font-mono border border-gray-200">
              {total} phiếu
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Quản lý và theo dõi lịch sử các đợt nhập hàng từ nhà cung cấp
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/staff/purchase-receipts/create"
            className="inline-flex items-center justify-center gap-2 bg-[#009b7a] hover:bg-[#008267] active:bg-[#007057] text-white px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Lập phiếu nhập kho</span>
          </Link>
        </div>
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

      <div className="space-y-4">
        <PurchaseList receipts={receipts} isLoading={isLoading} />

        {lastPage > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 px-1">
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Trang <strong className="text-gray-900 font-bold">{currentPage}</strong> trên <strong className="text-gray-900 font-bold">{lastPage}</strong>
            </p>
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseReceiptList;