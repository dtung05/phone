import { CheckCircle2, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCreateSupplierMutation } from "../../store/api/purchaseReceiptApi";
import { showToast } from "../../store/slices/toastSlice";
import { useDispatch } from "react-redux";
const SupplierFormCreate = ({ setIsSupplierModalOpen, setSupplierId }) => {
  const dispatch = useDispatch();
  const [createSupplier, { isLoading: isCreatingSupplier }] =
    useCreateSupplierMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company_name: "",
      phone_number: "",
      address: "",
    },
  });
  const handleCreateSupplier = async (data) => {
    try {
      const res = await createSupplier(data).unwrap();
      dispatch(
        showToast({
          message: res.message || "Thêm nhà cung cấp mới thành công!",
          type: "success",
        }),
      );
      if (res?.data?.id) {
        setSupplierId(res.data.id);
      }
      setIsSupplierModalOpen(false);
      reset();
    } catch (err) {
      dispatch(
        showToast({
          message: err?.data?.message || "Không thể tạo nhà cung cấp.",
          type: "error",
        }),
      );
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <h3 className="text-sm font-bold text-slate-800">
            Thêm nhà cung cấp mới
          </h3>
          <button
            type="button"
            onClick={() => setIsSupplierModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateSupplier)}
          className="p-5 space-y-3.5"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nhà phân phối <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("company_name", {
                required: "Vui lòng nhập tên nhà cung cấp",
              })}
              placeholder="VD: Công ty TNHH "
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-slate-600"
            />

            {errors.company_name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.company_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Số điện thoại liên hệ <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              maxLength={12}
              {...register("phone_number", {
                required: "Vui lòng nhập số điện thoại",
              })}
              placeholder="02838123456"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-slate-600"
            />
            {errors.phone_number && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Địa chỉ trụ sở / Kho <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("address", {
                required: "Vui lòng nhập địa chỉ",
              })}
              placeholder="Số 198 Cầu Giấy, Hà Nội"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-slate-600"
            />

            {errors.address && (
              <p className="text-xs text-red-500 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsSupplierModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              disabled={isCreatingSupplier}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              {isCreatingSupplier ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <CheckCircle2 size={14} />
              )}
              <span>Tạo nhà cung cấp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierFormCreate;
