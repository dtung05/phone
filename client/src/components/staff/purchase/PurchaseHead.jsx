const PurchaseHead = ({ receipt}) => {
  const dateObj = new Date(receipt.received_at || receipt.created_at);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-slate-800 pb-5 gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase">
            HỆ THỐNG CỬA HÀNG ĐIỆN THOẠI
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Địa chỉ: Cầu Giấy, Hà Nội, Việt Nam
          </p>
          <p className="text-xs text-slate-600">
            Hotline: 0862527719 <br></br>Email: ductunng05@gmail.com Website:
            www.phonestore.vn
          </p>
        </div>

        <div className="sm:text-right shrink-0">
          <p className="text-xs font-mono font-bold text-slate-700">
            Mẫu số: 01 - VT
          </p>
          <p className="text-[11px] text-slate-500">
            (Ban hành theo TT số 200/2014/TT-BTC)
          </p>
          <p className="text-xs font-mono font-bold text-emerald-800 mt-1">
            Số phiếu: #{String(receipt.id).padStart(4, "0")}
          </p>
        </div>
      </div>
      <div className="text-center my-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-wide">
          PHIẾU NHẬP KHO
        </h1>
        <p className="text-xs italic text-slate-500 mt-1">
          Ngày {day} tháng {month} năm {year}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-xs text-slate-700 my-6 bg-slate-50 p-4 rounded-xl border border-slate-100 print:bg-transparent print:p-0 print:border-none">
        <div>
          <p className="mb-1">
            <span className="font-semibold text-slate-900">
              Người lập phiếu:
            </span>{" "}
            {receipt.employee?.full_name || "Nhân viên kho"}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Nhập tại kho:</span>{" "}
            Kho tổng thiết bị điện thoại
          </p>
        </div>

        <div>
          <p className="mb-1">
            <span className="font-semibold text-slate-900">Nhà cung cấp:</span>{" "}
            <strong>
              {receipt.supplier?.company_name || "Nhập điều chuyển nội bộ"}
            </strong>
          </p>
          {receipt.supplier?.phone_number && (
            <p className="mb-1">
              <span className="font-semibold text-slate-900">
                Điện thoại liên hệ:
              </span>{" "}
              {receipt.supplier.phone_number}
            </p>
          )}
          {receipt.supplier?.address && (
            <p>
              <span className="font-semibold text-slate-900">Địa chỉ:</span>{" "}
              {receipt.supplier.address}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PurchaseHead;
