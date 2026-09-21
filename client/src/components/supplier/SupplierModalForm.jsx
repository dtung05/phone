import { useState, useEffect } from "react";
import { X, Building2, Phone, MapPin, Loader2, Save } from "lucide-react";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/toastSlice";
import {
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} from "../../store/api/purchaseReceiptApi";

const SupplierModalForm = ({ isOpen, onClose, supplier = null }) => {
  const dispatch = useDispatch();
  const isEditing = Boolean(supplier?.id);

  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const [createSupplier, { isLoading: isCreating }] = useCreateSupplierMutation();
  const [updateSupplier, { isLoading: isUpdating }] = useUpdateSupplierMutation();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (supplier) {
      setCompanyName(supplier.company_name || "");
      setPhoneNumber(supplier.phone_number || "");
      setAddress(supplier.address || "");
    } else {
      setCompanyName("");
      setPhoneNumber("");
      setAddress("");
    }
    setErrors({});
  }, [supplier, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!companyName.trim()) {
      errs.company_name = "Vui lòng nhập tên công ty / nhà cung cấp";
    }
    if (!phoneNumber.trim()) {
      errs.phone_number = "Vui lòng nhập số điện thoại liên hệ";
    } else if (!/^[0-9+\-\s]{8,15}$/.test(phoneNumber.trim())) {
      errs.phone_number = "Số điện thoại không hợp lệ (8 - 15 ký tự số)";
    }
    if (!address.trim()) {
      errs.address = "Vui lòng nhập địa chỉ trụ sở / kho hàng";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEditing) {
        await updateSupplier({
          id: supplier.id,
          company_name: companyName.trim(),
          phone_number: phoneNumber.trim(),
          address: address.trim(),
        }).unwrap();
        dispatch(
          showToast({
            type: "success",
            message: "Cập nhật thông tin nhà cung cấp thành công!",
          })
        );
      } else {
        await createSupplier({
          company_name: companyName.trim(),
          phone_number: phoneNumber.trim(),
          address: address.trim(),
        }).unwrap();
        dispatch(
          showToast({
            type: "success",
            message: "Thêm nhà cung cấp mới thành công!",
          })
        );
      }
      onClose();
    } catch (err) {
      const apiMessage =
        err?.data?.message ||
        (isEditing
          ? "Cập nhật nhà cung cấp thất bại!"
          : "Thêm nhà cung cấp thất bại!");
      dispatch(showToast({ type: "error", message: apiMessage }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100 animate-scaleUp">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                {isEditing ? "Chỉnh sửa nhà cung cấp" : "Thêm nhà cung cấp mới"}
              </h3>
              <p className="text-xs text-slate-500">
                {isEditing
                  ? `Cập nhật thông tin mã NCC #${supplier.id}`
                  : "Điền thông tin đối tác cung ứng vào hệ thống"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tên công ty / Nhà cung cấp <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="VD: Công ty TNHH Apple Việt Nam"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.company_name
                    ? "border-red-300 focus:ring-red-500 bg-red-50/20"
                    : "border-slate-200 focus:ring-emerald-500 focus:bg-white"
                }`}
              />
            </div>
            {errors.company_name && (
              <p className="text-xs text-red-500 mt-1 font-medium">
                {errors.company_name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Số điện thoại liên hệ <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="VD: 02838221234 hoặc 0987654321"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.phone_number
                    ? "border-red-300 focus:ring-red-500 bg-red-50/20"
                    : "border-slate-200 focus:ring-emerald-500 focus:bg-white"
                }`}
              />
            </div>
            {errors.phone_number && (
              <p className="text-xs text-red-500 mt-1 font-medium">
                {errors.phone_number}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Địa chỉ trụ sở / Kho xuất hàng <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <textarea
                rows={3}
                placeholder="VD: Tầng 15, Toà nhà Vietcombank, Quận 1, TP. Hồ Chí Minh"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.address
                    ? "border-red-300 focus:ring-red-500 bg-red-50/20"
                    : "border-slate-200 focus:ring-emerald-500 focus:bg-white"
                }`}
              />
            </div>
            {errors.address && (
              <p className="text-xs text-red-500 mt-1 font-medium">
                {errors.address}
              </p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? "Lưu thay đổi" : "Tạo nhà cung ứng"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierModalForm;
