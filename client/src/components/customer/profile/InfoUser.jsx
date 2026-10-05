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
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100/80">
      <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-emerald-600" />
        Cập nhật thông tin nhận hàng
      </h2>
      <p className="text-xs text-gray-400 mb-6">
        Thông tin này sẽ được tự động điền khi bạn đặt hàng lần sau.
      </p>

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
              <User className="w-3.5 h-3.5 text-emerald-600" />
              Họ và tên
            </label>
            <input
              type="text"
              {...registerInfo("full_name", {
                required: "Họ và tên không được để trống!",
                validate: (value) =>
                  value.trim() !== "" || "Họ và tên không được để trống!",
              })}
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              Email (Không thể thay đổi)
            </label>
            <input
              type="email"
              value={profile?.email || ""}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            Số điện thoại nhận hàng
          </label>
          <input
            type="tel"
            {...registerInfo("phone_number")}
            placeholder="0912345678"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Địa chỉ giao hàng mặc định
          </label>
          <textarea
            rows={3}
            {...registerInfo("address")}
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-95 transition-all disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfoUser;
