import { useState } from "react";
import { Plus, Search, Trash2, Edit3, Image as ImageIcon, RotateCcw, Calendar, ExternalLink, Loader2 } from "lucide-react";
import {
  useGetStaffBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useToggleBannerActiveMutation,
  useDeleteBannerMutation,
} from "../../store/api/bannerApi";
import { getImageUrl } from "../../utils/image";
import Loading from "../../components/block/Loading";
import Pagination from "../../components/block/Pagination";
import BannerModalForm from "../../components/banner/BannerModalForm";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/toastSlice";

const BannerManager = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");
  const [isActive, setIsActive] = useState("");
  const [page, setPage] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  // RTK Query
  const { data: response, isLoading } = useGetStaffBannersQuery({
    search,
    position,
    is_active: isActive,
    page,
  });

  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();
  const [toggleActive] = useToggleBannerActiveMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const banners = response?.data || [];
  const total = response?.total || 0;
  const lastPage = response?.last_page || 1;
  const currentPage = response?.current_page || 1;

  const handleOpenCreate = () => {
    setEditingBanner(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (banner) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editingBanner) {
        await updateBanner({ id: editingBanner.id, data: formData }).unwrap();
        dispatch(
          showToast({
            message: "Cập nhật banner quảng cáo thành công!",
            type: "success",
          }),
        );
      } else {
        await createBanner(formData).unwrap();
        dispatch(
          showToast({
            message: "Thêm mới banner quảng cáo thành công!",
            type: "success",
          }),
        );
      }
      setIsModalOpen(false);
    } catch (err) {
      dispatch(
        showToast({
          message: err?.data?.message || "Thao tác thất bại, vui lòng kiểm tra lại!",
          type: "error",
        }),
      );
    }
  };

  const handleToggle = async (banner) => {
    try {
      setTogglingId(banner.id);
      await toggleActive(banner.id).unwrap();
      dispatch(
        showToast({
          message: "Đổi trạng thái hiển thị banner thành công!",
          type: "success",
        }),
      );
    } catch (err) {
      dispatch(
        showToast({
          message: err?.data?.message || "Không thể đổi trạng thái banner.",
          type: "error",
        }),
      );
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (banner) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa banner "${banner.title}"?`)) {
      return;
    }
    try {
      await deleteBanner(banner.id).unwrap();
      dispatch(
        showToast({
          message: "Đã xóa banner quảng cáo thành công!",
          type: "success",
        }),
      );
    } catch (err) {
      dispatch(
        showToast({
          message: err?.data?.message || "Không thể xóa banner.",
          type: "error",
        }),
      );
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setPosition("");
    setIsActive("");
    setPage(1);
  };

  const getPositionLabel = (pos) => {
    const clean = (pos || "").trim();
    switch (clean) {
      case "main":
        return { text: "Banner Chính (Slider)", color: "bg-blue-50 text-blue-700 border-blue-200" };
      case "left":
        return { text: "Cột Trái (Đứng)", color: "bg-purple-50 text-purple-700 border-purple-200" };
      case "min":
        return { text: "Banner Phụ (Cuộn)", color: "bg-amber-50 text-amber-700 border-amber-200" };
      default:
        return { text: pos || "Mặc định", color: "bg-slate-50 text-slate-700 border-slate-200" };
    }
  };

  const isExpired = (endDate) => {
    if (!endDate) return false;
    const end = new Date(endDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return end < now;
  };

  const hasFilters = Boolean(search || position || isActive);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Quản lý Banner quảng cáo
            </h1>
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
              {total} banner
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Thiết lập các banner chiến dịch khuyến mãi, giảm giá và quảng cáo sản phẩm trên trang chủ
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <Plus size={16} />
          <span>Thêm Banner mới</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-5 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Tìm theo tiêu đề banner..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all"
            />
          </div>

          <div className="lg:col-span-3">
            <select
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 outline-none focus:bg-white focus:border-slate-600 transition-all cursor-pointer"
            >
              <option value="">-- Tất cả vị trí --</option>
              <option value="main">Banner Chính (Slider)</option>
              <option value="left">Cột Trái (Đứng)</option>
              <option value="min">Banner Phụ (Cuộn)</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <select
              value={isActive}
              onChange={(e) => {
                setIsActive(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 outline-none focus:bg-white focus:border-slate-600 transition-all cursor-pointer"
            >
              <option value="">-- Trạng thái hiển thị --</option>
              <option value="1">Đang bật (Active)</option>
              <option value="0">Tạm ẩn (Inactive)</option>
            </select>
          </div>

          <div className="lg:col-span-1 flex items-center">
            {hasFilters && (
              <button
                onClick={handleResetFilters}
                title="Đặt lại bộ lọc"
                className="w-full flex items-center justify-center p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
              >
                <RotateCcw size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-16">
            <Loading />
          </div>
        ) : banners.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <ImageIcon size={24} />
            </div>
            <p className="text-sm font-semibold text-slate-700">Chưa có banner nào phù hợp</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Hãy bấm "Thêm Banner mới" để tạo banner quảng cáo chiến dịch khuyến mãi lên trang chủ.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-16 text-center">Mã</th>
                  <th className="py-3 px-4">Ảnh Banner</th>
                  <th className="py-3 px-4">Tiêu đề & Link liên kết</th>
                  <th className="py-3 px-4">Vị trí</th>
                  <th className="py-3 px-4">Thời gian chạy</th>
                  <th className="py-3 px-4 text-center">Hiển thị</th>
                  <th className="py-3 px-4 text-center w-28">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {banners.map((item) => {
                  const pos = getPositionLabel(item.position);
                  const isRowToggling = togglingId === item.id;
                  const isRowActive = String(item.is_active) === "1";
                  const expired = isExpired(item.end_date);

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-500 text-[11px]">
                        #{item.id}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="w-24 h-14 rounded-lg bg-slate-900 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
                          <img
                            src={getImageUrl(item.imager)}
                            alt={item.title}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.src = "https://placehold.co/120x70?text=No+Banner";
                            }}
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="max-w-xs sm:max-w-md">
                          <p className="font-bold text-slate-900 truncate">
                            {item.title}
                          </p>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 hover:underline mt-0.5"
                          >
                            <span>{item.link}</span>
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold border ${pos.color}`}
                        >
                          {pos.text}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-[11px] text-slate-600">
                            <Calendar size={12} className="text-slate-400" />
                            <span>
                              {item.start_date} <span className="text-slate-400">→</span> {item.end_date}
                            </span>
                          </div>
                          {expired && (
                            <span className="inline-block text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded border border-red-200">
                              Đã hết hạn
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex flex-col items-center gap-1">
                          <button
                            type="button"
                            disabled={isRowToggling}
                            onClick={() => handleToggle(item)}
                            className={`relative inline-flex items-center h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              isRowActive ? "bg-emerald-600" : "bg-slate-300"
                            } ${isRowToggling ? "opacity-60 cursor-not-allowed" : ""}`}
                            title={isRowActive ? "Bấm để ẩn" : "Bấm để hiển thị"}
                          >
                            {isRowToggling ? (
                              <span className="absolute inset-0 flex items-center justify-center text-white">
                                <Loader2 size={10} className="animate-spin" />
                              </span>
                            ) : (
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                  isRowActive ? "translate-x-5" : "translate-x-0"
                                }`}
                              />
                            )}
                          </button>
                          <span
                            className={`text-[10px] font-semibold ${
                              isRowActive ? "text-emerald-700" : "text-slate-400"
                            }`}
                          >
                            {isRowActive ? "Bật" : "Ẩn"}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            title="Chỉnh sửa banner"
                            className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            title="Xóa banner"
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {lastPage > 1 && (
          <div className="p-4 border-t border-slate-100 flex justify-end">
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {/* Modal Form */}
      <BannerModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingBanner}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
};

export default BannerManager;
