import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCreateUserMutation } from "../../../store/api/userApi";
import { showToast } from "../../../store/slices/toastSlice";

const CreateUser = ({ setIsCreateModalOpen }) => {
  const dispatch = useDispatch();

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreateForm,
    formState: { errors: createErrors },
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      role: "Nhân viên sale",
    },
  });

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreate = async (formData) => {
    try {
      const res = await createUser(formData).unwrap();
      dispatch(
        showToast({
          type: "success",
          message: res.message || "Tạo tài khoản thành công!",
        }),
      );
      resetCreateForm();
      handleCloseCreateModal();
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message:
            err?.data?.message ||
            "Tạo tài khoản thất bại. Email có thể đã tồn tại.",
        }),
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-gray-100 space-y-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-emerald-600" />
          Tạo tài khoản nhân viên
        </h3>

        <form
          onSubmit={handleSubmitCreate(handleCreate)}
          className="space-y-4 text-xs"
        >
          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Họ và tên</label>
            <input
              type="text"
              placeholder="Nguyễn Văn Nhân Viên"
              {...registerCreate("full_name", {
                required: "Vui lòng nhập họ và tên",
              })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {createErrors.full_name && (
              <p className="text-rose-500 text-[11px]">
                {createErrors.full_name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="nhanvien@didong.com"
              {...registerCreate("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không hợp lệ",
                },
              })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {createErrors.email && (
              <p className="text-rose-500 text-[11px]">
                {createErrors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">
              Mật khẩu khởi tạo
            </label>
            <input
              type="password"
              placeholder="Ít nhất 6 ký tự"
              {...registerCreate("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {createErrors.password && (
              <p className="text-rose-500 text-[11px]">
                {createErrors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Vai trò</label>
            <select
              {...registerCreate("role")}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="Nhân viên sale">Nhân viên sale</option>
              <option value="Khách hàng ">Khách hàng</option>
              <option value="Nhân viên kho">Nhân viên kho</option>
              <option value="Quản trị viên">Quản trị viên</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCloseCreateModal}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow-md shadow-emerald-600/20 disabled:opacity-60"
            >
              {isCreating ? "Đang tạo..." : "Tạo tài khoản"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
