import { useEffect, useState } from "react";
import { Plus, Search, Image as ImageIcon, RotateCcw } from "lucide-react";
import {
  useGetStaffBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
} from "../../store/api/bannerApi";
import Loading from "../../components/block/Loading";
import Pagination from "../../components/block/Pagination";
import BannerModalForm from "../../components/banner/BannerModalForm";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/toastSlice";
import BannerTable from "../../components/banner/BannerTable";
import NoResult from "../../components/block/NoResult";
import BannerSearch from "../../components/banner/BannerSearch";

const BannerManager = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");
  const [isActive, setIsActive] = useState("");
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);
  const { data: response, isLoading } = useGetStaffBannersQuery({
    search: debouncedSearch,
    position,
    is_active: isActive,
    page,
  });

  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();

  const banners = response?.data || [];
  const total = response?.total || 0;
  const lastPage = response?.last_page || 1;
  const currentPage = response?.current_page || 1;

  const handleOpenCreate = () => {
    setEditingBanner(null);
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
          message:
            err?.data?.message || "Thao tác thất bại, vui lòng kiểm tra lại!",
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
            Thiết lập các banner chiến dịch khuyến mãi, giảm giá và quảng cáo
            sản phẩm trên trang chủ
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

      <BannerSearch
        search={search}
        setSearch={setSearch}
        position={position}
        setPosition={setPosition}
        isActive={isActive}
        setIsActive={setIsActive}
        setPage={setPage}
        hasFilters={hasFilters}
        handleResetFilters={handleResetFilters}
      />
      {/* Hiển thị */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-16">
            <Loading />
          </div>
        ) : banners.length === 0 ? (
          <NoResult
            Icon={ImageIcon}
            title="Chưa có banner nào phù hợp"
            content=" Hãy bấm Thêm Banner mới để tạo banner quảng cáo chiến dịch"
            action={
              <button
                onClick={handleResetFilters}
                title="Đặt lại bộ lọc"
                className="w-full flex items-center justify-center p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
              >
                <span> Đặt lại </span>
              </button>
            }
          />
        ) : (
          <BannerTable
            banners={banners}
            setEditingBanner={setEditingBanner}
            setIsModalOpen={setIsModalOpen}
          />
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
