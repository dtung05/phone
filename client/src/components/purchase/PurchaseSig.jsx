
const PurchaseSig = ({receipt}) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-center text-xs mt-10 pt-4">
      <div>
        <p className="font-bold text-slate-900 uppercase">Người lập phiếu</p>
        <p className="text-[11px] italic text-slate-500 mt-0.5">(Ký, họ tên)</p>
        <div className="h-20 flex items-end justify-center font-semibold text-slate-800">
          {receipt.employee?.full_name || "Nhân viên kho"}
        </div>
      </div>

      <div>
        <p className="font-bold text-slate-900 uppercase">Người giao hàng</p>
        <p className="text-[11px] italic text-slate-500 mt-0.5">(Ký, họ tên)</p>
        <div className="h-20 flex items-end justify-center font-semibold text-slate-500">
          ....................................
        </div>
      </div>

      <div>
        <p className="font-bold text-slate-900 uppercase">Bên cung cấp</p>
        <p className="text-[11px] italic text-slate-500 mt-0.5">(Ký, họ tên)</p>
        <div className="h-20 flex items-end justify-center font-semibold text-slate-500">
          ....................................
        </div>
      </div>
    </div>
  );
};

export default PurchaseSig;
