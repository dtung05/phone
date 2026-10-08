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
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-7 lg:p-8 shadow-2xs space-y-6">
      <div className="border-b border-gray-100 pb-3.5">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#009b7a]" />
          <span>Đổi mật khẩu tài khoản</span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Để bảo vệ tài khoản tốt nhất, vui lòng sử dụng mật khẩu mạnh và không chia sẻ cho người khác.
        </p>
      </div>

      <div className="bg-[#eefbf6] border border-[#d9f7eb] rounded-xl p-3.5 text-xs text-[#006b5a] flex items-start gap-2.5">
        <Shield className="w-4 h-4 text-[#009b7a] shrink-0 mt-0.5" />
        <span>
          Mật khẩu mới phải có ít nhất 6 ký tự. Nên kết hợp chữ cái viết hoa, viết thường, chữ số và ký tự đặc biệt để tài khoản an toàn hơn.
        </span>
      </div>

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
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">
            Mật khẩu hiện tại <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showCurrentPass ? "text" : "password"}
              {...registerPassword("current_password", {
                required: "Vui lòng nhập mật khẩu hiện tại.",
              })}
              placeholder="Nhập mật khẩu hiện tại của bạn"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#009b7a]/20 focus:border-[#009b7a] transition-all pr-10 bg-white"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPass(!showCurrentPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#009b7a] transition-colors cursor-pointer"
            >
              {showCurrentPass ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">
            Mật khẩu mới (tối thiểu 6 ký tự) <span className="text-red-500">*</span>
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
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#009b7a]/20 focus:border-[#009b7a] transition-all pr-10 bg-white"
            />
            <button
              type="button"
              onClick={() => setShowNewPass(!showNewPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#009b7a] transition-colors cursor-pointer"
            >
              {showNewPass ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">
            Xác nhận mật khẩu mới <span className="text-red-500">*</span>
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
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#009b7a]/20 focus:border-[#009b7a] transition-all pr-10 bg-white"
            />
            <button
              type="button"
              onClick={() => setShowNewPass(!showNewPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#009b7a] transition-colors cursor-pointer"
            >
              {showNewPass ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isChangingPassword}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#009b7a] text-white rounded-xl font-bold text-xs uppercase tracking-wide hover:bg-[#006b5a] shadow-xs active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>{isChangingPassword ? "Đang cập nhật..." : "Cập nhật mật khẩu"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
