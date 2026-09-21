import { useGetSuppliersQuery } from "../../store/api/purchaseReceiptApi";

const SupplierSelect = ({ register, name = "supplier_id", error }) => {
  const { data: suppliers, isLoading } = useGetSuppliersQuery();

  return (
    <div className="w-full space-y-1">
      <select
        {...register(name)}
        disabled={isLoading}
        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-slate-600 disabled:opacity-60"
      >
        <option value="">
          {isLoading ? "-- Đang tải danh sách..." : "-- Chọn nhà cung cấp"}
        </option>
        {suppliers?.map((s) => (
          <option key={s.id} value={s.id}>
            {s.company_name} ({s.phone_number})
          </option>
        ))}
      </select>
      {error && (
        <span className="text-[11px] text-red-500 block">{error.message}</span>
      )}
    </div>
  );
};

export default SupplierSelect;