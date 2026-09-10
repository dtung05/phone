import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BrandCategorySelect from "./BrandCategorySelect";
import VariantFields from "./VariantFields";
import ProductImageUpload from "./ProductImageUpload";
import { showToast } from "../../store/slices/toastSlice";

const ProductForm = ({
  handleOnsub,
  defaultValues,
  isLoading,
  isEdit = false,
  initialThumbnail = null,
  initialImages = [],
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [existingThumbnail, setExistingThumbnail] = useState(initialThumbnail);
  const [existingImages, setExistingImages] = useState(initialImages || []);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (data) => {
    try {
      if (data.specifications) {
        try {
          JSON.parse(data.specifications);
        } catch (e) {
          dispatch(
            showToast({
              message: "Thông số kỹ thuật phải đúng định dạng JSON!",
              type: "error",
            }),
          );
          return;
        }
      }
      if (!data.variants || data.variants.length === 0) {
        dispatch(
          showToast({
            message: "Vui lòng thêm ít nhất một biến thể sản phẩm!",
            type: "error",
          }),
        );
        return;
      }
      const parsedVariants = [];
      for (let i = 0; i < data.variants.length; i++) {
        const v = data.variants[i];
        if (!v.selling_price || Number(v.selling_price) < 0) {
          dispatch(
            showToast({
              message: `Biến thể #${i + 1} phải có giá bán hợp lệ!`,
              type: "error",
            }),
          );
          return;
        }

        try {
          const parsedAttrs = JSON.parse(v.attributes_json || "{}");
          parsedVariants.push({
            id: v.id || null,
            selling_price: Number(v.selling_price),
            attributes: parsedAttrs,
          });
        } catch (e) {
          dispatch(
            showToast({
              message: `Biến thể #${i + 1} có thuộc tính JSON không hợp lệ!`,
              type: "error",
            }),
          );
          return;
        }
      }
      const formData = new FormData();
      formData.append("product_name", data.name);
      formData.append("category_id", data.category_id);
      formData.append("brand_id", data.brand_id);
      formData.append("discount_percentage", data.discount_percentage || 0);
      formData.append("review_video", data.review_video || "");
      if (data.thumbnail?.[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      } else if (existingThumbnail) {
        formData.append("existing_thumbnail", existingThumbnail);
      }
      galleryFiles.forEach((file) => {
        formData.append("images[]", file);
      });

      if (isEdit) {
        formData.append("existing_images", JSON.stringify(existingImages));
      }
      formData.append("specifications", data.specifications || "{}");
      formData.append("variants", JSON.stringify(parsedVariants));
      const result = await handleOnsub(formData);
      console.log("UPDATE SUCCESS", result);
      dispatch(
        showToast({
          message:
            result?.message ||
            (isEdit
              ? "Cập nhật sản phẩm thành công!"
              : "Thêm sản phẩm thành công!"),
          type: "success",
        }),
      );

      reset();
      setGalleryFiles([]);
      navigate("/staff/products");
    } catch (error) {
      console.error(error);
      const serverErrors = error?.data?.errors;
      let serverMessage = error?.data?.message;
      if (serverErrors && typeof serverErrors === "object") {
        const firstKey = Object.keys(serverErrors)[0];
        if (
          Array.isArray(serverErrors[firstKey]) &&
          serverErrors[firstKey].length > 0
        ) {
          serverMessage = serverErrors[firstKey][0];
        }
      }
      dispatch(
        showToast({
          message:
            serverMessage ||
            (isEdit
              ? "Cập nhật sản phẩm thất bại!"
              : "Dữ liệu không hợp lệ hoặc thêm sản phẩm thất bại!"),
          type: "error",
        }),
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-0 text-slate-900 font-sans">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              {isEdit
                ? "Cập nhật thông tin sản phẩm"
                : "Thêm sản phẩm công nghệ mới"}
            </h1>
            <p className="text-xs text-slate-500">
              {isEdit
                ? "Chỉnh sửa thông số thiết bị, giá bán và biến thể sản phẩm"
                : "Quản lý thông tin thiết bị, hình ảnh và biến thể sản phẩm"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
            >
              Hủy thay đổi
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isLoading
                ? "Đang lưu..."
                : isEdit
                  ? "Cập nhật sản phẩm"
                  : "Lưu sản phẩm"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-3">
                Thông tin cơ bản
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tên sản phẩm <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name", {
                      required: "Tên sản phẩm không được bỏ trống",
                    })}
                    placeholder="VD: iPhone 15 Pro Max, MacBook Air M2..."
                    className={`w-full border rounded px-3 py-2 text-sm outline-none transition-all ${
                      errors.name
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-slate-300 focus:border-slate-600"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <BrandCategorySelect register={register} errors={errors} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Giảm giá (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      {...register("discount_percentage", {
                        valueAsNumber: true,
                      })}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Link Video Review
                    </label>
                    <input
                      {...register("review_video")}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-slate-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">
                    Cấu hình biến thể
                  </h2>
                  <p className="text-xs text-slate-500">
                    Thiết lập giá và thuộc tính (dạng JSON) cho từng phiên bản
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    appendVariant({
                      selling_price: "",
                      attributes_json:
                        '{\n  "storage": "256GB",\n  "color": "Trắng"\n}',
                    })
                  }
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-300 rounded hover:bg-slate-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm biến thể
                </button>
              </div>

              <VariantFields
                variantFields={variantFields}
                removeVariant={removeVariant}
                register={register}
                errors={errors}
              />
            </div>

            {/* THÔNG SỐ KỸ THUẬT */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-3">
                Thông số kỹ thuật chi tiết (JSON)
              </h2>
              <textarea
                {...register("specifications", {
                  validate: (val) => {
                    if (!val) return true;
                    try {
                      JSON.parse(val);
                      return true;
                    } catch (e) {
                      return 'Thông số kỹ thuật phải đúng định dạng JSON hợp lệ (ví dụ: {"RAM": "8GB"})';
                    }
                  },
                })}
                rows={5}
                placeholder='Nhập thông số định dạng JSON. Ví dụ: &#10;{&#10;  "Màn hình": "6.7 inch OLED",&#10;  "Chip": "Apple A17 Pro",&#10;  "Pin": "4422 mAh"&#10;}'
                className="w-full font-mono border border-slate-300 rounded p-3 text-xs outline-none focus:border-slate-600"
              />
              {errors.specifications && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.specifications.message}
                </p>
              )}
            </div>
          </div>

          <ProductImageUpload
            register={register}
            errors={errors}
            setValue={setValue}
            galleryFiles={galleryFiles}
            setGalleryFiles={setGalleryFiles}
            existingThumbnail={existingThumbnail}
            setExistingThumbnail={setExistingThumbnail}
            existingImages={existingImages}
            setExistingImages={setExistingImages}
          />
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
