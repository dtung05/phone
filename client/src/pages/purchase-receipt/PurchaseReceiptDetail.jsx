import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Printer, CheckCircle } from "lucide-react";
import { useGetPurchaseReceiptDetailQuery } from "../../store/api/purchaseReceiptApi";
import Loading from "../../components/block/Loading";
import PurchaseHead from "../../components/purchase/PurchaseHead";
import PurchaseTable from "../../components/purchase/PurchaseTable";
import PurchaseSig from "../../components/purchase/PurchaseSig";

const PurchaseReceiptDetail = () => {
  const { id } = useParams();
  const {
    data: receipt,
    isLoading,
    error,
  } = useGetPurchaseReceiptDetailQuery(id);
  const handlePrint = () => {
    window.print();
  };
  if (isLoading) {
    return (
      <div className="py-20">
        <Loading />
      </div>
    );
  }
  if (error || !receipt) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 bg-white border border-red-200 rounded-xl text-center space-y-3">
        <h2 className="text-lg font-bold text-red-600">
          Không tìm thấy phiếu nhập kho #{id}
        </h2>
        <p className="text-xs text-slate-500">
          Phiếu nhập kho này có thể đã bị xóa hoặc bạn không có quyền truy cập.
        </p>
        <Link
          to="/staff/purchase-receipts"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
        >
          <ArrowLeft size={14} /> Quay lại danh sách
        </Link>
      </div>
    );
  }

  const items = receipt.items || [];
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/staff/purchase-receipts"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-800">
                Chi Tiết Phiếu Nhập Kho #{String(receipt.id).padStart(4, "0")}
              </h1>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <CheckCircle size={12} /> Đã nhập kho
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Ngày nhập: {receipt.received_at} • Lập bởi:{" "}
              {receipt.employee?.full_name || "Nhân viên"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Printer size={15} />
            <span>In phiếu nhập kho</span>
          </button>
        </div>
      </div>

      <div className="printable-receipt bg-white border border-slate-200 shadow-md rounded-2xl p-8 sm:p-12 text-slate-900 font-sans">
        <PurchaseHead receipt={receipt} />
        <PurchaseTable items={items} receipt={receipt} />
        <PurchaseSig receipt={receipt} />
      </div>

      <style>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          /* Ẩn mọi thành phần ngoài phiếu in */
          aside, header, nav, footer, .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          .printable-receipt {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }
          @page {
            size: A4 portrait;
            margin: 15mm 15mm 15mm 15mm;
          }
        }
      `}</style>
    </div>
  );
};

export default PurchaseReceiptDetail;
