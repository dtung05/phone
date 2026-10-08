import React from "react";
import { useGetBrandsQuery } from "../../../store/api/brandApi";
import { NavLink, Link } from "react-router-dom";
import { Smartphone, Sparkles } from "lucide-react";

const BrandMenu = () => {
  const { data: brands = [] } = useGetBrandsQuery();

  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <NavLink
            to="/products"
            end
            className={({ isActive }) =>
              `shrink-0 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#eefbf6] text-[#006b5a] font-bold shadow-2xs"
                  : "text-gray-700 hover:bg-gray-100/70 hover:text-gray-900"
              }`
            }
          >
            <Smartphone size={15} className="text-[#009b7a]" />
            <span>Tất cả điện thoại</span>
          </NavLink>

          <span className="text-gray-200 shrink-0">|</span>

          {brands.map((brand) => (
            <NavLink
              key={brand.id}
              to={`/brands/${brand.id}/products`}
              className={({ isActive }) =>
                `shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#009b7a] text-white font-bold shadow-xs"
                    : "text-gray-700 hover:bg-gray-100/70 hover:text-gray-900"
                }`
              }
            >
              {brand.name}
            </NavLink>
          ))}

          <Link
            to="/products/sale"
            className="shrink-0 ml-auto inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-all"
          >
            <Sparkles size={15} className="text-red-500 animate-spin" />
            <span>Khuyến mãi HOT</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrandMenu;