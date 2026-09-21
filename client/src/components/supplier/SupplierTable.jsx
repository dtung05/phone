import { Edit2, MapPin, Phone, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const SupplierTable = ({ suppliers, handleOpenEdit, setDeleteTarget }) => {
  return suppliers.map((sup, idx) => (
    <tr
      key={sup.id}
      className={`hover:bg-emerald-50/40 transition-colors ${
        idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
      }`}
    >
      <td className="py-2 px-3 text-center font-mono text-slate-500 border-r border-slate-200">
        {sup.id}
      </td>

      <td className="py-2 px-3 border-r border-slate-200">
        <div className="font-bold text-slate-900 leading-tight">
          {sup.company_name}
        </div>
        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
          Cập nhật:{" "}
          {new Date(sup.updated_at || sup.created_at).toLocaleDateString(
            "vi-VN",
          )}
        </div>
      </td>

      <td className="py-2 px-3 font-mono border-r border-slate-200">
        {sup.phone_number ? (
          <a
            href={`tel:${sup.phone_number}`}
            className="text-slate-800 hover:text-emerald-700 hover:underline flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-slate-400" />
            {sup.phone_number}
          </a>
        ) : (
          <span className="text-slate-400 italic">--</span>
        )}
      </td>

      <td className="py-2 px-3 text-slate-700 border-r border-slate-200">
        <div className="flex items-start gap-1">
          <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
          <span className="line-clamp-1">{sup.address || "--"}</span>
        </div>
      </td>

      <td className="py-2 px-3 text-center border-r border-slate-200">
        {sup.purchase_receipts_count > 0 ? (
          <Link
            to={`/staff/purchase-receipts?supplier_id=${sup.id}`}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold text-[11px] hover:bg-emerald-200"
          >
            {sup.purchase_receipts_count} phiếu
          </Link>
        ) : (
          <span className="font-mono text-slate-400">0</span>
        )}
      </td>

      <td className="py-2 px-3 text-center">
        <div className="inline-flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={() => handleOpenEdit(sup)}
            className="p-1 text-slate-600 hover:text-blue-700 hover:bg-slate-200 border border-transparent hover:border-slate-300 rounded-sm"
            title="Sửa"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDeleteTarget(sup)}
            className="p-1 text-slate-600 hover:text-red-700 hover:bg-slate-200 border border-transparent hover:border-slate-300 rounded-sm"
            title="Xóa"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  ));
};

export default SupplierTable;
