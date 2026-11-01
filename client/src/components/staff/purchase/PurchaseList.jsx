import { Building2, Calendar, Eye, FileText, User } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../../common/feedback/Loading";
import formatPrice from "../../../utils/price";

const PurchaseList = ({ isLoading, receipts }) => {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-xs overflow-hidden font-sans">
      {isLoading ? (
        <div className="py-20">
          <Loading />
        </div>
      ) : !receipts || receipts.length === 0 ? (
        <div className="py-20 px-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto text-gray-300 border border-gray-100">
            <FileText size={28} className="stroke-[1.5]" />
          </div>
          <p className="text-sm font-bold text-gray-800">
            Chưa có phiếu nhập kho nào
          </p>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Bấm nút <span className="text-[#009b7a] font-semibold">"Lập phiếu nhập kho"</span> để bắt đầu nhập lô hàng mới.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-28 text-center">Số phiếu</th>
                <th className="py-3.5 px-4">Nhà cung cấp</th>
                <th className="py-3.5 px-4">Người lập phiếu</th>
                <th className="py-3.5 px-4">Ngày nhập</th>
                <th className="py-3.5 px-4 text-center">Số mặt hàng</th>
                <th className="py-3.5 px-4 text-right">Tổng tiền nhập</th>
                <th className="py-3.5 px-4 text-center w-32">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {receipts.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/60 transition-colors group"
                >
                  {/* Số phiếu: Dùng font-mono, màu thương hiệu nổi bật */}
                  <td className="py-4 px-4 text-center font-mono font-bold text-[#009b7a] text-xs">
                    #PNK-{String(item.id).padStart(4, "0")}
                  </td>

                  {/* Nhà cung cấp */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-[#009b7a]/10 group-hover:text-[#009b7a] transition-colors">
                        <Building2 size={15} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                          {item.supplier?.company_name || "Nhập nội bộ / Khác"}
                        </p>
                        {item.supplier?.phone_number && (
                          <p className="text-[11px] text-gray-400 font-mono mt-0.5 tracking-wide">
                            {item.supplier.phone_number}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Người lập */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <User size={14} className="text-gray-400 shrink-0" />
                      <span className="text-xs text-gray-800">{item.employee?.full_name || "Nhân viên"}</span>
                    </div>
                  </td>

                  {/* Ngày nhập */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-gray-500 font-mono text-[11px]">
                      <Calendar size={14} className="text-gray-400 shrink-0" />
                      <span>{item.received_at}</span>
                    </div>
                  </td>

                  {/* Số mặt hàng */}
                  <td className="py-4 px-4 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-gray-100 text-gray-700 font-mono border border-gray-200/60">
                      {item.items?.length || 0} dòng
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right font-mono font-bold text-xs sm:text-sm text-gray-900 tracking-tight">
                    <span className=" px-2.5 py-1 rounded-lg ">
                      {formatPrice(item.total_amount)}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <Link
                      to={`/staff/purchase-receipts/${item.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-[#009b7a] bg-gray-100 hover:bg-[#009b7a]/10 rounded-xl transition-colors cursor-pointer shadow-2xs"
                    >
                      <Eye size={14} />
                      <span>Chi tiết</span>
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