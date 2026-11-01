import React from "react";
import { Controller } from "react-hook-form";
import { useGetBrandsQuery } from "@/store/api/brandApi";
import { useGetCategoryQuery } from "@/store/api/categoryApi";

const BrandCategorySelect = ({ control, register, errors }) => {
  const { data: brands = [], isLoading: isLoadingBrands } = useGetBrandsQuery();
  const { data: categories = [], isLoading: isLoadingCategories } = useGetCategoryQuery();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Danh mục <span className="text-red-500">*</span>
        </label>

        {control ? (
          <Controller
            control={control}
            name="category_id"
            rules={{ required: "Vui lòng chọn danh mục" }}
            render={({ field }) => (
              <select
                {...field}
                value={
                  field.value !== undefined && field.value !== null && field.value !== ""
                    ? String(field.value)
                    : ""
                }
                onChange={(e) => field.onChange(e.target.value)}
                className={`w-full border rounded px-3 py-2 text-sm bg-white outline-none ${
                  errors?.category_id
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-slate-300 focus:border-slate-600"
                }`}
              >
                <option value="">
                  {isLoadingCategories ? "-- Đang tải danh mục... --" : "-- Chọn danh mục --"}
                </option>
                {categories?.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          />
        ) : (
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
              <option key={category.id} value={String(category.id)}>
                {category.name}
              </option>
            ))}
          </select>
        )}

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

        {control ? (
          <Controller
            control={control}
            name="brand_id"
            rules={{ required: "Vui lòng chọn thương hiệu" }}
            render={({ field }) => (
              <select
                {...field}
                value={
                  field.value !== undefined && field.value !== null && field.value !== ""
                    ? String(field.value)
                    : ""
                }
                onChange={(e) => field.onChange(e.target.value)}
                className={`w-full border rounded px-3 py-2 text-sm bg-white outline-none ${
                  errors?.brand_id
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-slate-300 focus:border-slate-600"
                }`}
              >
                <option value="">
                  {isLoadingBrands ? "-- Đang tải thương hiệu... --" : "-- Chọn thương hiệu --"}
                </option>
                {brands?.map((brand) => (
                  <option key={brand.id} value={String(brand.id)}>
                    {brand.name}
                  </option>
                ))}
              </select>
            )}
          />
        ) : (
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
              <option key={brand.id} value={String(brand.id)}>
                {brand.name}
              </option>
            ))}
          </select>
        )}

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
