import { useState, useEffect } from "react";
import { X, Building2, Phone, MapPin } from "lucide-react";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/slices/toastSlice";
import {
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} from "../../../store/api/purchaseReceiptApi";
import Button from "../../common/form/Button";

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
      errs.company_name = "Vui lòng nhập tên công ty / đối tác";
    }
    if (!phoneNumber.trim()) {
      errs.phone_number = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9+\-\s]{8,15}$/.test(phoneNumber.trim())) {
      errs.phone_number = "Số điện thoại không hợp lệ";
    }
    if (!address.trim()) {
      errs.address = "Vui lòng nhập địa chỉ trụ sở / kho";
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
            message: "Cập nhật đối tác thành công!",
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
            message: "Thêm đối tác mới thành công!",
          })
        );
      }
      onClose();
    } catch (err) {
      const apiMessage =
        err?.data?.message ||
        (isEditing ? "Cập nhật đối tác thất bại!" : "Thêm đối tác thất bại!");
      dispatch(showToast({ type: "error", message: apiMessage }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
      <div className="bg-white rounded-md w-full max-w-md shadow-lg overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
            {isEditing ? "Cập nhật thông tin đối tác" : "Thêm đối tác cung ứng mới"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Tên công ty / Đối tác <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="VD: Công ty TNHH Phân Phối FPT Synnex"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={`w-full pl-8 pr-3 py-1.5 bg-white border rounded text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-slate-400 transition-colors ${
                  errors.company_name ? "border-red-400" : "border-slate-200"
                }`}
              />
            </div>
            {errors.company_name && (
              <p className="text-[11px] text-red-500 mt-1">{errors.company_name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="VD: 02838221234 hoặc 0987654321"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`w-full pl-8 pr-3 py-1.5 bg-white border rounded text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-slate-400 transition-colors ${
                  errors.phone_number ? "border-red-400" : "border-slate-200"
                }`}
              />
            </div>
            {errors.phone_number && (
              <p className="text-[11px] text-red-500 mt-1">{errors.phone_number}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Địa chỉ trụ sở / Kho hàng <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <textarea
                rows={3}
                placeholder="VD: Số 123 Đường Nguyễn Huệ, Quận 1, TP.HCM"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full pl-8 pr-3 py-1.5 bg-white border rounded text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-slate-400 transition-colors ${
                  errors.address ? "border-red-400" : "border-slate-200"
                }`}
              />
            </div>
            {errors.address && (
              <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <Button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              variant="secondary"
              size="sm"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              variant="primary"
              size="sm"
            >
              {isEditing ? "Lưu thay đổi" : "Tạo đối tác"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierModalForm;
