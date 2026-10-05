import { Shield } from "lucide-react";
import { useUpdateUserMutation } from "../../../store/api/userApi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/slices/toastSlice";
import { useEffect } from "react";

const UpdateUser = ({ selectedUser, setSelectedUser }) => {
  const dispatch = useDispatch();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdateForm,
    setValue: setUpdateValue,
  } = useForm();

  const handleCloseEditModal = () => {
    setSelectedUser(null);
    resetUpdateForm();
  };
  const handleUpdateRole = async (formData) => {
    if (!selectedUser) return;

    try {
      const res = await updateUser({
        id: selectedUser.id,
        role: formData.role,
      }).unwrap();
      dispatch(
        showToast({
          type: "success",
          message: res.message || "Cập nhật vai trò thành công!",
        }),
      );
      handleCloseEditModal();
    } catch (err) {
      console.log(err);
      dispatch(
        showToast({
          type: "error",
          message: err?.data?.message || "Cập nhật thất bại.",
        }),
      );
    }
  };
  useEffect(() => {
    if (selectedUser) {
      setUpdateValue("role", selectedUser.role);
    }
  }, [selectedUser, setUpdateValue]);
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-xl border border-gray-100 space-y-4">
        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          Đổi vai trò: {selectedUser.full_name}
        </h3>

        <form
          onSubmit={handleSubmitUpdate(handleUpdateRole)}
          className="space-y-4 text-xs"
        >
          <div className="space-y-1">
            <label className="font-semibold text-gray-700">
              Chọn vai trò mới
            </label>
            <select
              {...registerUpdate("role")}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="Khách hàng">Khách hàng</option>
              <option value="Nhân viên sale">Nhân viên sale</option>
              <option value="Nhân viên kho">Nhân viên kho</option>
              <option value="Quản trị viên">Quản trị viên</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCloseEditModal}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow-md shadow-emerald-600/20 disabled:opacity-60"
            >
              {isUpdating ? "Đang lưu..." : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
