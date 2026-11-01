import React from "react";
import { Eye, FileSpreadsheet, Package, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../../common/feedback/Loading";
import formatPrice from "../../../utils/price";
import { ButtonLink } from "../../common/form/Button";

const PurchaseList = ({ isLoading, receipts = [] }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
      {isLoading ? (
        <div className="py-20 text-center">
          <Loading />
        </div>
      ) : receipts.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center px-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
            <FileSpreadsheet size={24} strokeWidth={1.5} />
          </div>
          <p className="text-xs font-semibold text-slate-800">
            Chưa có phiếu nhập kho nào
          </p>
          <p className="text-xs text-slate-400 mt-0.5 max-w-sm">
            Bấm "Lập phiếu nhập kho" để ghi nhận đợt hàng mới vào hệ thống
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-medium text-slate-500">
                <th className="py-2.5 px-4 w-28 text-center font-normal">Mã phiếu</th>
                <th className="py-2.5 px-4 min-w-[200px]">Nhà cung cấp</th>
                <th className="py-2.5 px-4">Người lập</th>
                <th className="py-2.5 px-4">Ngày nhập</th>
                <th className="py-2.5 px-4 text-center">SL mặt hàng</th>
                <th className="py-2.5 px-4 text-right">Tổng tiền nhập</th>
                <th className="py-2.5 px-4 text-right pr-5">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {receipts.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  {/* Mã phiếu */}
                  <td className="py-3 px-4 text-center">
                    <Link
                      to={`/staff/purchase-receipts/${item.id}`}
                      className="font-mono font-medium text-slate-900 hover:underline"
                    >
                      #PNK-{String(item.id).padStart(4, "0")}
                    </Link>
                  </td>

                  {/* Nhà cung cấp */}
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-900 block">
                      {item.supplier?.company_name || "Nhập nội bộ / Khác"}
                    </span>
                    {item.supplier?.phone_number && (
                      <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <Phone size={10} className="text-slate-400" />
                        {item.supplier.phone_number}
                      </span>
                    )}
                  </td>

                  {/* Người lập */}
                  <td className="py-3 px-4 text-slate-600">
                    {item.employee?.full_name || "Nhân viên"}
                  </td>

                  {/* Ngày nhập */}
                  <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                    {item.received_at || "—"}
                  </td>

                  {/* Số mặt hàng */}
                  <td className="py-3 px-4 text-center text-slate-600 font-mono">
                    {item.items?.length || 0} dòng
                  </td>

                  {/* Tổng tiền */}
                  <td className="py-3 px-4 text-right font-mono font-semibold text-slate-900">
                    {formatPrice(item.total_amount)}
                  </td>

                  {/* Thao tác */}
                  <td className="py-3 px-4 text-right pr-5">
                    <ButtonLink
                      to={`/staff/purchase-receipts/${item.id}`}
                      variant="secondary"
                      size="xs"
                      icon={Eye}
                    >
                      Chi tiết
                    </ButtonLink>
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
