import { Edit2, Phone, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const SupplierTable = ({ suppliers, handleOpenEdit, setDeleteTarget }) => {
  return suppliers.map((sup) => (
    <tr
      key={sup.id}
      className="hover:bg-slate-50/50 transition-colors"
    >
      <td className="py-2.5 px-4 text-center font-mono text-slate-400">
        #{sup.id}
      </td>

      <td className="py-2.5 px-4">
        <span className="font-medium text-slate-900 block">
          {sup.company_name}
        </span>
        <span className="text-[11px] text-slate-400 block mt-0.5">
          Cập nhật:{" "}
          {new Date(sup.updated_at || sup.created_at).toLocaleDateString(
            "vi-VN"
          )}
        </span>
      </td>

      <td className="py-2.5 px-4 text-slate-600 font-mono">
        {sup.phone_number ? (
          <a
            href={`tel:${sup.phone_number}`}
            className="hover:text-slate-900 hover:underline"
          >
            {sup.phone_number}
          </a>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </td>

      <td className="py-2.5 px-4 text-slate-600 max-w-[260px]">
        <span className="line-clamp-1" title={sup.address}>
          {sup.address || "—"}
        </span>
      </td>

      <td className="py-2.5 px-4 text-center">
        {sup.purchase_receipts_count > 0 ? (
          <Link
            to={`/staff/purchase-receipts?supplier_id=${sup.id}`}
            className="text-slate-700 hover:text-emerald-700 hover:underline font-medium"
          >
            {sup.purchase_receipts_count} đợt
          </Link>
        ) : (
          <span className="text-slate-400 font-mono">0</span>
        )}
      </td>

      <td className="py-2.5 px-4 text-right pr-4">
        <div className="inline-flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => handleOpenEdit(sup)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
            title="Sửa thông tin"
          >
            <Edit2 size={13} />
          </button>
          <button
            type="button"
            onClick={() => setDeleteTarget(sup)}
            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
            title="Xóa đối tác"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  ));
};

export default SupplierTable;
