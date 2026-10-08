import { useUpdateProfileMutation } from "@/store/api/authApi";
import { showToast } from "@/store/slices/toastSlice";
import { Mail, MapPin, Phone, Save, Sparkles, User } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const InfoUser = ({ profile }) => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    reset: resetInfo,
  } = useForm({
    defaultValues: {
      full_name: "",
      phone_number: "",
      address: "",
    },
  });

  useEffect(() => {
    if (profile) {
      resetInfo({
        full_name: profile.full_name || "",
        phone_number: profile.phone_number || "",
        address: profile.address || "",
      });
    }
  }, [profile]);
  const handleUpdateInfo = async (infoForm) => {
    try {
      const res = await updateProfile(infoForm).unwrap();
      dispatch(
        showToast({
          type: "success",
          message: res.message || "Cập nhật thông tin thành công!",
        }),
      );
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message:
            err?.data?.message ||
            "Cập nhật thất bại. Vui lòng kiểm tra lại thông tin.",
        }),
      );
    }
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-7 lg:p-8 shadow-2xs space-y-6">
      <div className="border-b border-gray-100 pb-3.5">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
          <User className="w-5 h-5 text-[#009b7a]" />
          <span>Thông tin tài khoản </span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Thông tin cá nhân
        </p>
      </div>

      <form
        onSubmit={handleSubmitInfo(handleUpdateInfo, (errors) =>
          dispatch(
            showToast({
              type: "error",
              message:
                Object.values(errors)[0]?.message ||
                "Vui lòng kiểm tra lại thông tin.",
            }),
          ),
        )}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#009b7a]" />
              <span>Họ và tên</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...registerInfo("full_name", {
                required: "Họ và tên không được để trống!",
                validate: (value) =>
                  value.trim() !== "" || "Họ và tên không được để trống!",
              })}
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#009b7a]/20 focus:border-[#009b7a] transition-all bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#009b7a]" />
                <span>Email tài khoản</span>
              </span>
              <span className="text-[10px] text-gray-400 font-normal">Cố định</span>
            </label>
            <input
              type="email"
              value={profile?.email || ""}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200/80 bg-gray-50/90 text-gray-500 text-sm cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#009b7a]" />
              <span>Số điện thoại nhận hàng</span>
            </label>
            <input
              type="tel"
              {...registerInfo("phone_number")}
              placeholder="0912345678"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#009b7a]/20 focus:border-[#009b7a] transition-all bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#009b7a]" />
              <span>Cấp bậc tài khoản</span>
            </label>
            <div className="w-full px-4 py-2.5 rounded-xl border border-gray-200/80 bg-gray-50/90 text-gray-700 text-sm flex items-center justify-between">
              <span className="font-semibold text-[#006b5a]">
                {profile?.role }
              </span>
              
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#009b7a]" />
            <span>Địa chỉ giao hàng mặc định</span>
          </label>
          <textarea
            rows={3}
            {...registerInfo("address")}
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#009b7a]/20 focus:border-[#009b7a] transition-all resize-none bg-white"
          />
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-gray-100">
         
          <button
            type="submit"
            disabled={isUpdating}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#009b7a] text-white rounded-xl font-bold text-xs uppercase tracking-wide hover:bg-[#006b5a] shadow-xs active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isUpdating ? "Đang lưu..." : "Lưu thay đổi"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfoUser;
