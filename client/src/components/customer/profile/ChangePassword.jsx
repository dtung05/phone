import { useChangePasswordMutation } from "@/store/api/authApi";
import { showToast } from "@/store/slices/toastSlice";
import { Eye, EyeOff, KeyRound, Shield } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    watch,
  } = useForm({
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const handleChangePassword = async (passwordForm) => {
    try {
      const res = await changePassword(passwordForm).unwrap();
      dispatch(
        showToast({
          type: "success",
          message: res.message || "Đổi mật khẩu thành công!",
        }),
      );
      resetPassword();
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message:
            err?.data?.message ||
            "Đổi mật khẩu thất bại. Mật khẩu hiện tại không đúng.",
        }),
      );
    }
  };
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100/80">
      <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
        <Shield className="w-5 h-5 text-emerald-600" />
        Đổi mật khẩu tài khoản
      </h2>
      <p className="text-xs text-gray-400 mb-6">
        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác.
      </p>

      <form
        onSubmit={handleSubmitPassword(handleChangePassword, (errors) =>
          dispatch(
            showToast({
              type: "error",
              message:
                Object.values(errors)[0]?.message ||
                "Vui lòng kiểm tra lại mật khẩu.",
            }),
          ),
        )}
        className="space-y-5 max-w-lg"
      >
        {/* Mật khẩu hiện tại */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">
            Mật khẩu hiện tại
          </label>
          <div className="relative">
            <input
              type={showCurrentPass ? "text" : "password"}
              {...registerPassword("current_password", {
                required: "Vui lòng nhập mật khẩu hiện tại.",
              })}
              placeholder="Nhập mật khẩu hiện tại"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPass(!showCurrentPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPass ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mật khẩu mới */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">
            Mật khẩu mới (tối thiểu 6 ký tự)
          </label>
          <div className="relative">
            <input
              type={showNewPass ? "text" : "password"}
              {...registerPassword("new_password", {
                required: "Vui lòng nhập mật khẩu mới.",
                minLength: {
                  value: 6,
                  message: "Mật khẩu mới phải có ít nhất 6 ký tự.",
                },
              })}
              placeholder="Nhập mật khẩu mới"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPass(!showNewPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPass ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <input
              type={showNewPass ? "text" : "password"}
              {...registerPassword("new_password_confirmation", {
                required: "Vui lòng xác nhận mật khẩu mới.",
                validate: (value) =>
                  value === watch("new_password") ||
                  "Xác nhận mật khẩu mới không khớp!",
              })}
              placeholder="Nhập lại mật khẩu mới"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPass(!showNewPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPass ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={isChangingPassword}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-95 transition-all disabled:opacity-60"
          >
            <KeyRound className="w-4 h-4" />
            {isChangingPassword ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
