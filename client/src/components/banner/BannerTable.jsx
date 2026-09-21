import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/toastSlice";
import { useState } from "react";
import { useDeleteBannerMutation, useToggleBannerActiveMutation } from "../../store/api/bannerApi";
import { getImageUrl } from "../../utils/image";
import { isExpired } from "../../utils/date_time";
import { Calendar, Edit3, ExternalLink, Loader2, Trash2 } from "lucide-react";

const BannerTable = ({ banners, setIsModalOpen ,setEditingBanner  }) => {
  const dispatch = useDispatch();
  const [toggleActive] = useToggleBannerActiveMutation();
  const [deleteBanner] = useDeleteBannerMutation();
    const [togglingId, setTogglingId] = useState(null);
  const getPositionLabel = (pos) => {
    const clean = (pos || "").trim();
    switch (clean) {
      case "main":
        return {
          text: "Banner Chính ",
          color: "bg-blue-50 text-blue-700 border-blue-200",
        };
      case "left":
        return {
          text: "Cột Trái ",
          color: "bg-purple-50 text-purple-700 border-purple-200",
        };
      case "min":
        return {
          text: "Banner Phụ",
          color: "bg-amber-50 text-amber-700 border-amber-200",
        };
      default:
        return {
          text: pos || "Mặc định",
          color: "bg-slate-50 text-slate-700 border-slate-200",
        };
    }
  };
  const handleOpenEdit = (banner) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
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
    if (
      !window.confirm(`Bạn có chắc chắn muốn xóa banner "${banner.title}"?`)
    ) {
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
  return (
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
                        e.target.src =
                          "https://placehold.co/120x70?text=No+Banner";
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
                        {item.start_date}{" "}
                        <span className="text-slate-400">→</span>{" "}
                        {item.end_date}
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
  );
};

export default BannerTable;
