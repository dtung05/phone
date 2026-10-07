import { Link } from "react-router-dom";
import { Award, ChevronRight } from "lucide-react";

export default function HomeBrands({ brands = [] }) {
  if (!brands || brands.length === 0) return null;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 py-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200/80 shadow-2xs">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#d9f7eb] text-[#009b7a] flex items-center justify-center">
              <Award size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                THƯƠNG HIỆU CHÍNH HÃNG
              </h2>
              <p className="text-xs text-gray-500">Đối tác phân phối ủy quyền chính thức</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brands/${brand.id}/products`}
              className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-200/80 bg-gray-50/50 hover:bg-white hover:border-[#009b7a]/60 hover:shadow-xs transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-base font-bold text-gray-800 shadow-2xs group-hover:scale-105 group-hover:bg-[#d9f7eb] group-hover:text-[#006b5a] transition-all mb-2">
                {brand.name ? brand.name.charAt(0).toUpperCase() : "B"}
              </div>

              <h4 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#009b7a] transition-colors line-clamp-1">
                {brand.name}
              </h4>

              <div className="mt-1 flex items-center gap-0.5 text-[11px] text-gray-400 font-medium">
                <span>{brand.products_count !== undefined ? `${brand.products_count} mẫu` : "Chính hãng"}</span>
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
