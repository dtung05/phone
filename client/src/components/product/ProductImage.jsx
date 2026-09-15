import { useEffect, useState } from "react";
import { getImageUrl } from "../../utils/image";

export default function ProductImages({ thumbnail, images = [] }) {
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (thumbnail) {
      setCurrentImage(thumbnail);
    }
  }, [thumbnail]);

  const allImages = [thumbnail, ...(Array.isArray(images) ? images : [])].filter(Boolean);

  return (
    <div className="w-full lg:w-[450px] shrink-0 space-y-3">
      {/* ẢNH CHÍNH */}
      <div className="border border-gray-200 rounded-lg bg-white p-4 flex items-center justify-center aspect-square">
        <img
          src={getImageUrl(currentImage)}
          alt="Hình ảnh sản phẩm"
          className="max-h-[380px] w-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x400?text=No+Image";
          }}
        />
      </div>

      {/* DANH SÁCH THUMBNAIL */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {allImages.map((item, index) => {
            const isSelected = currentImage === item;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImage(item)}
                className={`shrink-0 w-16 h-16 rounded border p-1 bg-white cursor-pointer transition-colors ${
                  isSelected
                    ? "border-red-600 ring-1 ring-red-600"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={getImageUrl(item)}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/80x80?text=Img";
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
