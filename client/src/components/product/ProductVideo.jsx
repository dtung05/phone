import React from "react";
import { getImageUrl } from "../../utils/image";

export default function ProductVideo({ videoUrl }) {
  if (!videoUrl) return null;

  // Xử lý link YouTube để lấy link nhúng embed
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
    );
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const isDirectVideo =
    videoUrl.endsWith(".mp4") ||
    videoUrl.endsWith(".webm") ||
    videoUrl.endsWith(".ogg");

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-4 h-full flex flex-col">
      <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2.5 mb-3">
        Video đánh giá
      </h2>

      <div className="relative w-full aspect-video rounded overflow-hidden bg-black border border-gray-200 flex-1 min-h-[220px]">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Video đánh giá sản phẩm"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : isDirectVideo ? (
          <video
            src={getImageUrl(videoUrl)}
            controls
            className="w-full h-full object-contain"
          >
            Trình duyệt không hỗ trợ phát video.
          </video>
        ) : (
          <iframe
            src={videoUrl}
            title="Video đánh giá sản phẩm"
            className="w-full h-full"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
