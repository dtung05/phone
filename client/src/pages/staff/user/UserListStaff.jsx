import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Users,
  Search,
  UserPlus,
  Shield,
  Lock,
  Unlock,
  Edit2,
  CheckCircle,
  XCircle,
  Mail,
  Filter,
  Eye,
  RotateCcw,
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
    }, 600);
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
    setPage(1);
    setSearch("");
    setRole("");
    setDebouncedSearch("");
  };
  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
  };
  console.log(data);
  const users = data?.data || [];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" />
            Quản lý tài khoản & Phân quyền
          </h1>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Thêm nhân viên mới</span>
        </button>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm theo tên hoặc email người dùng..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-2 min-w-[170px]">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Tất cả vai trò</option>
            <option value="Khách hàng">Khách hàng</option>
            <option value="Nhân viên sale">Nhân viên sale</option>
            <option value="Nhân viên kho">Nhân viên kho</option>
            <option value="Quản trị viên">Quản trị viên</option>
          </select>
        </div>
        <div className="min-w-[150px]">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="Active">Hoạt động (Active)</option>
            <option value="Locked">Đã khóa (Locked)</option>
          </select>
        </div>
        <button
          onClick={resetStatus}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 hover:border-emerald-300 active:scale-95 transition-all self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Đặt lại</span>
        </button>
      </div>
      {/* List user  */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <Loading text="Đang tải danh sách người dùng" />
        ) : users.length === 0 ? (
          <NoResult title="Không tìm thấy người dùng" />
        ) : (
          // Danh sách trang tài khonar
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-500 font-semibold uppercase tracking-wider">
                    <th className="py-3.5 pl-6">ID</th>
                    <th className="py-3.5">Người dùng</th>
                    <th className="py-3.5">Vai trò</th>
                    <th className="py-3.5">Trạng thái</th>
                    <th className="py-3.5">Đơn hàng</th>
                    <th className="py-3.5 pr-6 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="py-3.5 pl-6 font-mono font-bold text-gray-700">
                        #{u.id}
                      </td>
                      <td className="py-3.5">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {u.full_name}
                          </p>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3 text-gray-400" />
                            {u.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            u.role === "Quản trị viên"
                              ? "bg-purple-100 text-purple-800"
                              : u.role === "Nhân viên sale"
                                ? "bg-blue-100 text-blue-800"
                                : u.role === "Nhân viên kho"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          <Shield className="w-3 h-3" />
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            u.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {u.status === "Active" ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-500" />
                              Hoạt động
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-rose-500" />
                              Đã khóa
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3.5 text-gray-600 font-medium">
                        {u.orders_count || 0} đơn
                      </td>
                      <td className="py-3.5 pr-6 text-right space-x-2">
                        <button
                          onClick={() => setDetailUserId(u.id)}
                          className="p-1.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-emerald-600 transition-colors"
                          title="Xem chi tiết tài khoản"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleOpenEditModal(u)}
                          className="p-1.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                          title="Đổi vai trò"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggleStatus(u)}
                          className={`p-1.5 rounded-xl border transition-colors ${
                            u.status === "Active"
                              ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                              : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                          }`}
                          title={
                            u.status === "Active"
                              ? "Khóa tài khoản"
                              : "Mở khóa tài khoản"
                          }
                        >
                          {u.status === "Active" ? (
                            <Lock className="w-3.5 h-3.5" />
                          ) : (
                            <Unlock className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination_2 meta={data} setPage={setPage} page={page} />
          </>
        )}
      </div>

      {/* Thêm nhân viên */}
      {isCreateModalOpen && (
        <CreateUser setIsCreateModalOpen={setIsCreateModalOpen} />
      )}

      {/*đổi vai trò */}
      {selectedUser && (
        <UpdateUser
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
      {/* Mở trang chi tiết */}
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
