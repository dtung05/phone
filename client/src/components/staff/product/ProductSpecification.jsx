import React from "react";
import { getImageUrl } from "../../../utils/image";
import { ExternalLink } from "lucide-react";

const ProductSpecification = ({product}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2.5">
          Thông số kỹ thuật
        </h3>
        {product.specifications &&
        Object.keys(product.specifications).length > 0 ? (
          <div className="divide-y divide-slate-100 text-xs">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div
                key={key}
                className="py-2.5 flex items-start justify-between gap-4"
              >
                <span className="text-slate-400 capitalize font-medium">
                  {key}
                </span>
                <span className="font-bold text-slate-800 text-right">
                  {String(val)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">
            Chưa cập nhật thông số
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2.5">
          Hình ảnh & Video giới thiệu
        </h3>
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">
            Ảnh đại diện
          </p>
          <img
            src={getImageUrl(product.thumbnail)}
            alt={product.product_name}
            className="w-32 h-32 object-contain border border-slate-200 rounded-xl p-2 bg-slate-50"
          />
        </div>

        {product.images && product.images.length > 0 && (
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">
              Bộ sưu tập ảnh
            </p>
            <div className="flex flex-wrap gap-2">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={getImageUrl(img)}
                  alt="gallery"
                  className="w-16 h-16 object-contain border border-slate-200 rounded-lg p-1 bg-slate-50"
                />
              ))}
            </div>
          </div>
        )}

        {product.review_video && (
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">
              Video Review
            </p>
            <a
              href={product.review_video}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
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
