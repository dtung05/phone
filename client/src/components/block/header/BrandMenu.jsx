import { useGetBrandsQuery } from "../../../store/api/brandApi";
import { NavLink } from "react-router-dom";

const BrandMenu = () => {
  const { data: brands = [] } = useGetBrandsQuery();

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-[1500px] px-5">
        <div className="flex h-[52px] items-center gap-2 overflow-x-auto scrollbar-hide">
          <p className="shrink-0 rounded-lg px-5 py-2 font-semibold text-[#009b7a]">
            Hãng sản phẩm:
          </p>

          {brands.map((brand) => (
            <NavLink
              key={brand.id}
              to={`/brands/${brand.id}/products`}
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-5 py-2 font-medium transition ${
                  isActive
                    ? "bg-[#d9f7eb] text-[#009b7a]"
                    : "text-gray-700 hover:bg-[#d9f7eb] hover:text-[#009b7a]"
                }`
              }
            >
              {brand.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandMenu;