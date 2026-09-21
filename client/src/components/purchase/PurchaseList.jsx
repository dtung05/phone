import { Building2, Calendar, Eye, FileText, User } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../block/Loading";
import formatPrice from "../../utils/price";

const PurchaseList = ({ isLoading, receipts }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {isLoading ? (
        <div className="py-16">
          <Loading />
        </div>
      ) : receipts.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <FileText size={24} />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Chưa có phiếu nhập kho nào
          </p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Bấm "Lập phiếu nhập kho" để nhập lô hàng mới
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-20 text-center">Số phiếu</th>
                <th className="py-3 px-4">Nhà cung cấp</th>
                <th className="py-3 px-4">Người lập phiếu</th>
                <th className="py-3 px-4">Ngày nhập</th>
                <th className="py-3 px-4 text-center">Số mặt hàng</th>
                <th className="py-3 px-4 text-right">Tổng tiền nhập</th>
                <th className="py-3 px-4 text-center w-28">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {receipts.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-700 text-[11px]">
                    #PNK-{String(item.id).padStart(4, "0")}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <Building2
                        size={15}
                        className="text-slate-400 shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-slate-900">
                          {item.supplier?.company_name || "Nhập nội bộ / Khác"}
                        </p>
                        {item.supplier?.phone_number && (
                          <p className="text-[11px] text-slate-400 font-mono">
                            {item.supplier.phone_number}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <User size={13} className="text-slate-400" />
                      <span>{item.employee?.full_name || "Nhân viên"}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar size={13} className="text-slate-400" />
                      <span>{item.received_at}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                      {item.items?.length || 0} dòng
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right font-bold text-sm text-slate-900 font-mono">
                    {formatPrice(item.total_amount)}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <Link
                      to={`/staff/purchase-receipts/${item.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      <Eye size={13} />
                      <span>Chi tiết / In</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchaseList;
