import React from "react";
import { getImageUrl } from "../../../utils/image";
import { ExternalLink } from "lucide-react";
import { normalizeSpecifications, normalizeImages } from "../../../utils/product";

const ProductSpecification = ({ product }) => {
  const images = normalizeImages(product?.images);
  const specifications = normalizeSpecifications(product?.specifications);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm space-y-3">
        <h3 className="font-bold text-gray-900 text-xs sm:text-sm border-b border-gray-100 pb-2.5">
          Thông số kỹ thuật
        </h3>
        {specifications &&
        Object.keys(specifications).length > 0 ? (
          <div className="divide-y divide-gray-100 text-xs">
            {Object.entries(specifications).map(([key, val]) => (
              <div
                key={key}
                className="py-2.5 flex items-start justify-between gap-4"
              >
                <span className="text-gray-400 capitalize font-normal">
                  {key}
                </span>
                <span className="font-semibold text-gray-800 text-right">
                  {String(val)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic font-normal">
            Chưa cập nhật thông số
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 text-xs sm:text-sm border-b border-gray-100 pb-2.5">
          Hình ảnh & Video giới thiệu
        </h3>

        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Ảnh đại diện
          </p>
          <img
            src={getImageUrl(product?.thumbnail)}
            alt={product?.product_name || "product"}
            className="w-32 h-32 object-contain border border-gray-200/60 rounded-xl p-2 bg-gray-50/50"
            onError={(e) => {
              e.target.src = "https://placehold.co/100x100?text=No+Img";
            }}
          />
        </div>

        {images && images.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Bộ sưu tập ảnh
            </p>
            <div className="flex flex-wrap gap-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={getImageUrl(img)}
                  alt="gallery"
                  className="w-16 h-16 object-contain border border-gray-200/60 rounded-lg p-1 bg-gray-50/50"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/80x80?text=No+Img";
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {product?.review_video && (
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Video Review
            </p>
            <a
              href={product.review_video}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-[#009b7a] hover:text-[#008266] hover:underline flex items-center gap-1"
            >
              <ExternalLink size={13} /> {product.review_video}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSpecification;
