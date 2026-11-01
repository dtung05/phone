import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Search,
  UserPlus,
  Lock,
  Unlock,
  Edit2,
  Eye,
  RotateCcw,
  X,
} from "lucide-react";
import {
  useGetUsersQuery,
  useToggleUserStatusMutation,
} from "../../../store/api/userApi";
import { showToast } from "../../../store/slices/toastSlice";
import CreateUser from "../../../components/staff/user/CreateUser";
import UpdateUser from "../../../components/staff/user/UpdateUser";
import UserDetail from "../../../components/staff/user/UserDetail";
import Loading from "../../../components/common/feedback/Loading";
import NoResult from "../../../components/common/feedback/NoResult";
import Pagination_2 from "../../../components/common/pagination/Pagination_2";
import Button from "../../../components/common/form/Button";

const UserListStaff = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailUserId, setDetailUserId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useGetUsersQuery({
    search: debouncedSearch || undefined,
    role: role || undefined,
    status: status || undefined,
    page,
  });

  const [toggleUserStatus] = useToggleUserStatusMutation();

  const handleToggleStatus = async (user) => {
    try {
      const res = await toggleUserStatus(user.id).unwrap();
      dispatch(
        showToast({
          type: "success",
          message: res.message,
        }),
      );
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message: err?.data?.message || "Thao tác thất bại.",
        }),
      );
    }
  };

  const resetStatus = () => {
    setStatus("");
    setRole("");
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
  };

  const users = data?.data || [];
  const totalUsers = data?.total || 0;

  return (
    <div className="space-y-3 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
            Quản lý tài khoản
          </h1>
          <p className="text-xs text-slate-500">
            Tổng cộng {totalUsers} người dùng trong hệ thống
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          variant="primary"
          size="sm"
          icon={UserPlus}
        >
          Thêm nhân viên
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-md p-2.5 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, email..."
            className="w-full pl-8 pr-6 py-1.5 bg-white border border-slate-200 hover:border-slate-300 focus:border-emerald-600 rounded text-xs text-slate-800 placeholder-slate-400 outline-none transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={12} />
            </button>
          )}
        </div>

        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setPage(1);
          }}
          className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 focus:border-emerald-600 rounded text-xs text-slate-700 outline-none transition-colors cursor-pointer"
        >
          <option value="">Tất cả vai trò</option>
          <option value="Quản trị viên">Quản trị viên</option>
          <option value="Nhân viên sale">Nhân viên sale</option>
          <option value="Nhân viên kho">Nhân viên kho</option>
          <option value="Khách hàng">Khách hàng</option>
        </select>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 focus:border-emerald-600 rounded text-xs text-slate-700 outline-none transition-colors cursor-pointer"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Active">Hoạt động</option>
          <option value="Locked">Đã khóa</option>
        </select>

        {(search || role || status) && (
          <button
            type="button"
            onClick={resetStatus}
            title="Đặt lại bộ lọc"
            className="px-2 py-1.5 text-xs text-slate-500 hover:text-slate-900 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Đặt lại</span>
          </button>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center">
            <Loading text="Đang tải dữ liệu..." />
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center">
            <NoResult
              title="Không tìm thấy người dùng"
              content="Thử kiểm tra lại từ khóa hoặc bỏ lọc."
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto min-h-[300px]">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-500">
                    <th className="py-2.5 px-4 w-16 text-center font-normal">Mã</th>
                    <th className="py-2.5 px-4">Họ và tên</th>
                    <th className="py-2.5 px-4">Email</th>
                    <th className="py-2.5 px-4">Vai trò</th>
                    <th className="py-2.5 px-4 text-center">Trạng thái</th>
                    <th className="py-2.5 px-4 text-center">Đơn hàng</th>
                    <th className="py-2.5 px-4 text-right pr-4">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-2.5 px-4 text-center text-slate-400 font-mono">
                        #{u.id}
                      </td>

                      <td className="py-2.5 px-4 font-medium text-slate-900">
                        {u.full_name || "—"}
                      </td>

                      <td className="py-2.5 px-4 text-slate-600">
                        {u.email}
                      </td>

                      <td className="py-2.5 px-4 text-slate-800">
                        {u.role || "Khách hàng"}
                      </td>

                      <td className="py-2.5 px-4 text-center">
                        {u.status === "Active" ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            Đã khóa
                          </span>
                        )}
                      </td>

                      <td className="py-2.5 px-4 text-center text-slate-500 font-mono">
                        {u.orders_count || 0}
                      </td>

                      <td className="py-2.5 px-4 text-right pr-4">
                        <div className="inline-flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setDetailUserId(u.id)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(u)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                            title="Phân quyền"
                          >
                            <Edit2 size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleStatus(u)}
                            className={`p-1 rounded transition-colors ${
                              u.status === "Active"
                                ? "text-slate-400 hover:text-rose-600"
                                : "text-slate-400 hover:text-emerald-700"
                            }`}
                            title={
                              u.status === "Active"
                                ? "Khóa tài khoản"
                                : "Mở khóa tài khoản"
                            }
                          >
                            {u.status === "Active" ? (
                              <Lock size={14} />
                            ) : (
                              <Unlock size={14} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-2.5 bg-slate-50/50 border-t border-slate-200">
              <Pagination_2 meta={data} setPage={setPage} page={page} />
            </div>
          </>
        )}
      </div>

      {isCreateModalOpen && (
        <CreateUser setIsCreateModalOpen={setIsCreateModalOpen} />
      )}

      {selectedUser && (
        <UpdateUser
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}

      {detailUserId && (
        <UserDetail
          userId={detailUserId}
          onClose={() => setDetailUserId(null)}
        />
      )}
    </div>
  );
};

export default UserListStaff;
