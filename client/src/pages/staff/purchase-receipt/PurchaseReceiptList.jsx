import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useGetPurchaseReceiptsQuery } from "../../../store/api/purchaseReceiptApi";
import Pagination from "../../../components/common/pagination/Pagination";
import PurchaseList from "../../../components/staff/purchase/PurchaseList";
import PurchaseSearch from "../../../components/staff/purchase/PurchaseSearch";
import { ButtonLink } from "../../../components/common/form/Button";

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
    }, 400);

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
    <div className="space-y-5 pb-10">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Quản lý phiếu nhập kho
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {total} phiếu nhập
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ghi nhận và quản lý các đợt nhập hàng từ đối tác nhà cung cấp
          </p>
        </div>

        <ButtonLink
          to="/staff/purchase-receipts/create"
          variant="primary"
          size="md"
          icon={Plus}
        >
          Lập phiếu nhập kho
        </ButtonLink>
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-xs text-slate-500">
            Trang <strong>{currentPage}</strong> trên <strong>{lastPage}</strong>
          </p>
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
