import React, { useState, useEffect } from "react";
import { X, Upload, Link as LinkIcon, Image as ImageIcon, Loader2 } from "lucide-react";
import { getImageUrl } from "../../utils/image";

const BannerModalForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
}) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [position, setPosition] = useState("main");
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageType, setImageType] = useState("file"); // "file" | "url"
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setLink(initialData.link || "");
      setPosition((initialData.position || "main").trim());
      setIsActive(String(initialData.is_active) === "1");
      setStartDate(initialData.start_date || "");
      setEndDate(initialData.end_date || "");
      setImageType("url");
      setImageUrl(initialData.imager || "");
      setImageFile(null);
      setPreviewUrl(getImageUrl(initialData.imager));
    } else {
      const today = new Date().toISOString().split("T")[0];
      const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      setTitle("");
      setLink("/products/sale");
      setPosition("main");
      setIsActive(true);
      setStartDate(today);
      setEndDate(nextMonth);
      setImageType("file");
      setImageUrl("");
      setImageFile(null);
      setPreviewUrl("");
    }
  }, [initialData, isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUrlChange = (val) => {
    setImageUrl(val);
    setPreviewUrl(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("position", position);
    formData.append("is_active", isActive ? "1" : "0");
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);

    if (imageType === "file" && imageFile) {
      formData.append("imager_file", imageFile);
    } else if (imageUrl) {
      formData.append("imager", imageUrl);
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
              {initialData ? "Chỉnh sửa Banner quảng cáo" : "Thêm Banner quảng cáo mới"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Banner sẽ được hiển thị trên trang chủ để quảng bá chương trình Sale
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Tiêu đề */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tiêu đề chiến dịch / Banner <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Siêu Sale Mùa Thu - Giảm đến 30%"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
            />
          </div>

          {/* Vị trí & Trạng thái */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vị trí hiển thị <span className="text-red-500">*</span>
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
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
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
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
              Link liên kết khi người dùng nhấp <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <LinkIcon
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                required
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="/products/sale hoặc /products/ten-san-pham"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-mono text-slate-800 outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Gợi ý: Nhập <code className="text-emerald-700 font-bold">/products/sale</code> để chuyển đến trang danh sách khuyến mãi
            </p>
          </div>

          {/* Thời gian chiến dịch */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ngày bắt đầu <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-700 outline-none focus:border-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ngày kết thúc <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-700 outline-none focus:border-slate-600"
              />
            </div>
          </div>

          {/* Chọn ảnh Banner (Upload hoặc URL) */}
          <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/60 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Hình ảnh Banner quảng cáo <span className="text-red-500">*</span>
              </label>
              <div className="flex rounded-lg bg-slate-200/80 p-0.5 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setImageType("file")}
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
                  onClick={() => setImageType("url")}
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
                    value={imageUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://example.com/banner.jpg"
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-mono text-slate-800 outline-none focus:border-slate-600 bg-white"
                  />
                </div>
              </div>
            )}

            {/* Xem trước ảnh */}
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
                      e.target.src = "https://placehold.co/600x200?text=Loi+Anh";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
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
