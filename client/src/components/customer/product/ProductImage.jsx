import { useEffect, useState } from "react";
import { getImageUrl } from "../../../utils/image";

export default function ProductImages({ thumbnail, images = [] }) {
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (thumbnail) {
      setCurrentImage(thumbnail);
    }
  }, [thumbnail]);

  const allImages = [thumbnail, ...(Array.isArray(images) ? images : [])].filter(Boolean);

  return (
    <div className="w-full space-y-3">
      <div className="border border-gray-200/80 rounded-2xl bg-white p-4 flex items-center justify-center aspect-square shadow-2xs">
        <img
          src={getImageUrl(currentImage)}
          alt="Hình ảnh sản phẩm"
          className="max-h-[340px] sm:max-h-[380px] w-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x400?text=No+Image";
          }}
        />
      </div>

      {allImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {allImages.map((item, index) => {
            const isSelected = currentImage === item;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImage(item)}
                className={`shrink-0 w-16 h-16 rounded-xl border p-1 bg-white cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#009b7a] ring-2 ring-[#009b7a]/40 shadow-xs"
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
