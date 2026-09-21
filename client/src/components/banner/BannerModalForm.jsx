import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  X,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { getImageUrl } from "../../utils/image";

const BannerModalForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
}) => {
  const getDefaultDates = () => {
    const today = new Date().toISOString().split("T")[0];
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    return { today, nextMonth };
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      link: "/products/",
      position: "main",
      isActive: true,
      startDate: "",
      endDate: "",
      imageType: "file",
      imageUrl: "",
      imageFile: null,
      previewUrl: "",
    },
  });

  const imageType = watch("imageType");
  const imageFile = watch("imageFile");
  const previewUrl = watch("previewUrl");
  const isActive = watch("isActive");

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      reset({
        title: initialData.title || "",
        link: initialData.link || "",
        position: (initialData.position || "main").trim(),
        isActive: String(initialData.is_active) === "1",
        startDate: initialData.start_date || "",
        endDate: initialData.end_date || "",
        imageType: "url",
        imageUrl: initialData.imager || "",
        imageFile: null,
        previewUrl: getImageUrl(initialData.imager),
      });
    } else {
      const { today, nextMonth } = getDefaultDates();
      reset({
        title: "",
        link: "/products/",
        position: "main",
        isActive: true,
        startDate: today,
        endDate: nextMonth,
        imageType: "file",
        imageUrl: "",
        imageFile: null,
        previewUrl: "",
      });
    }
  }, [initialData, isOpen, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("imageFile", file);
      setValue("previewUrl", URL.createObjectURL(file));
    }
  };

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setValue("imageUrl", val);
    setValue("previewUrl", val);
  };

  const onFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("link", data.link);
    formData.append("position", data.position);
    formData.append("is_active", data.isActive ? "1" : "0");
    formData.append("start_date", data.startDate);
    formData.append("end_date", data.endDate);
    if (data.imageType === "file" && data.imageFile) {
      formData.append("imager_file", data.imageFile);
    } else if (data.imageUrl) {
      formData.append("imager", data.imageUrl);
    }

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              {initialData
                ? "Chỉnh sửa Banner quảng cáo"
                : "Thêm Banner quảng cáo mới"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Banner sẽ được hiển thị trên trang chủ để quảng bá chương trình
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="p-6 overflow-y-auto space-y-4 flex-1"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tiêu đề chiến dịch <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="VD: Siêu Sale Mùa Thu - Giảm đến 30%"
              {...register("title", { required: "Vui lòng nhập tiêu đề" })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
            />
            {errors.title && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vị trí hiển thị <span className="text-red-500">*</span>
              </label>
              <select
                {...register("position", { required: true })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-slate-600"
              >
                <option value="main">Banner chính giữa (Trượt lớn)</option>
                <option value="left">Banner cột trái (Đứng)</option>
                <option value="min">Banner phụ bên dưới (Cuộn ngang)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Trạng thái hiển thị
              </label>
              <div className="flex items-center h-9">
                <label className="relative inline-flex items-center cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    {...register("isActive")}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  <span className="text-xs font-medium text-slate-700">
                    {isActive ? "Đang bật" : "Tạm ẩn"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Đường dẫn liên kết khi click */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Link liên kết khi người dùng nhấp + slug{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <LinkIcon
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="/products/sale hoặc /products/ten-san-pham"
                {...register("link", {
                  required: "Vui lòng nhập link liên kết",
                })}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-mono text-slate-800 outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
              />
            </div>
            {errors.link && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.link.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ngày bắt đầu <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("startDate", {
                  required: "Vui lòng chọn ngày bắt đầu",
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-700 outline-none focus:border-slate-600"
              />
              {errors.startDate && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ngày kết thúc <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("endDate", {
                  required: "Vui lòng chọn ngày kết thúc",
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-700 outline-none focus:border-slate-600"
              />
              {errors.endDate && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/60 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Hình ảnh Banner quảng cáo{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex rounded-lg bg-slate-200/80 p-0.5 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setValue("imageType", "file")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    imageType === "file"
                      ? "bg-white text-slate-800 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Tải file lên
                </button>
                <button
                  type="button"
                  onClick={() => setValue("imageType", "url")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    imageType === "url"
                      ? "bg-white text-slate-800 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Dán link URL
                </button>
              </div>
            </div>

            {imageType === "file" ? (
              <div>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-slate-500 bg-white rounded-lg p-4 cursor-pointer transition-colors">
                  <Upload size={24} className="text-slate-400 mb-1.5" />
                  <span className="text-xs font-medium text-slate-700">
                    Bấm để chọn file ảnh từ máy tính
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Hỗ trợ: JPG, PNG, WEBP (Tối đa 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {imageFile && (
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1 truncate">
                    ✓ Đã chọn: {imageFile.name}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <div className="relative">
                  <ImageIcon
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="url"
                    placeholder="https://example.com/banner.jpg"
                    {...register("imageUrl", { onChange: handleUrlChange })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-mono text-slate-800 outline-none focus:border-slate-600 bg-white"
                  />
                </div>
              </div>
            )}

            {previewUrl && (
              <div className="mt-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Xem trước ảnh:
                </p>
                <div className="h-28 rounded-lg border border-slate-200 bg-slate-900 overflow-hidden flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x200?text=Loi+Anh";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-sm transition-all disabled:opacity-60"
            >
              {isLoading && <Loader2 size={13} className="animate-spin" />}
              <span>{initialData ? "Lưu thay đổi" : "Tạo Banner"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerModalForm;
