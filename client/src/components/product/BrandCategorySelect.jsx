import { useGetBrandsQuery } from "../../store/api/brandApi";
import { useGetCategoryQuery } from "../../store/api/CategoryApi";

const BrandCategorySelect = ({ register, errors }) => {
  const { data: brands } = useGetBrandsQuery();
  const { data: categories } = useGetCategoryQuery();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Danh mục <span className="text-red-500">*</span>
        </label>

        <select
          {...register("category_id", {
            required: "Vui lòng chọn danh mục",
          })}
          className={`w-full border rounded px-3 py-2 text-sm bg-white outline-none ${
            errors?.category_id
              ? "border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-slate-300 focus:border-slate-600"
          }`}
        >
          <option value="">-- Chọn danh mục --</option>

          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors?.category_id && (
          <p className="text-red-500 text-xs mt-1">
            {errors.category_id.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Thương hiệu <span className="text-red-500">*</span>
        </label>

        <select
          {...register("brand_id", {
            required: "Vui lòng chọn thương hiệu",
          })}
          className={`w-full border rounded px-3 py-2 text-sm bg-white outline-none ${
            errors?.brand_id
              ? "border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-slate-300 focus:border-slate-600"
          }`}
        >
          <option value="">-- Chọn thương hiệu --</option>

          {brands?.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        {errors?.brand_id && (
          <p className="text-red-500 text-xs mt-1">
            {errors.brand_id.message}
          </p>
        )}
      </div>
    </div>
  );
};
export default BrandCategorySelect;