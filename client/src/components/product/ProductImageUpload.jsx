import { useState } from "react";
import { Upload, X } from "lucide-react";

const ProductImageUpload = ({
  register,
  errors,
  setValue,
  galleryFiles,
  setGalleryFiles,
}) => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const removeThumbnail = () => {
    setThumbnailPreview(null);
    setValue("thumbnail", null);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setGalleryFiles((prev) => [...prev, ...files]);
    }
    e.target.value = "";
  };

  const removeDetailImage = (indexToRemove) => {
    setGalleryFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-3">
          Hình ảnh sản phẩm
        </h2>

        {/* THUMBNAIL */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Ảnh đại diện (Thumbnail) <span className="text-red-500">*</span>
          </label>

          {thumbnailPreview ? (
            <div className="relative border border-slate-200 rounded bg-slate-50 h-48 overflow-hidden group">
              <img
                src={thumbnailPreview}
                alt="Thumbnail"
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={removeThumbnail}
                className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors shadow"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-300 rounded hover:border-slate-400 cursor-pointer bg-slate-50 hover:bg-slate-100/50 transition-colors">
              <Upload className="w-5 h-5 text-slate-400 mb-2" />
              <span className="text-xs font-medium text-slate-600">
                Tải ảnh đại diện lên
              </span>
              <input
                type="file"
                accept="image/*"
                {...register("thumbnail", {
                  required: "Ảnh đại diện là bắt buộc",
                  onChange: handleThumbnailChange,
                })}
                className="hidden"
              />
            </label>
          )}
          {errors.thumbnail && (
            <p className="text-red-500 text-xs mt-1">
              {errors.thumbnail.message || "Vui lòng chọn ảnh đại diện"}
            </p>
          )}
        </div>

        {/* GALLERY CHI TIẾT */}
        <div className="space-y-2 pt-3 border-t border-slate-100">
          <label className="block text-xs font-semibold text-slate-700">
            Bộ ảnh chi tiết (Gallery)
          </label>
          <label className="flex items-center justify-center p-2.5 border border-dashed border-slate-300 rounded hover:border-slate-400 cursor-pointer bg-slate-50 text-slate-600 text-xs font-medium gap-2 transition-colors">
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Thêm nhiều ảnh chi tiết...</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImagesChange}
              className="hidden"
            />
          </label>

          {galleryFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-2 pt-2">
              {galleryFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square border border-slate-200 rounded overflow-hidden bg-slate-50 group"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeDetailImage(idx)}
                    className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImageUpload;
