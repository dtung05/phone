import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FolderTree, Tag, Layers } from "lucide-react";
import {
  useGetCategoryQuery,
  useGetTrashedCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useRestoreCategoryMutation,
} from "../../store/api/CategoryApi";
import {
  useGetBrandsQuery,
  useGetTrashedBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useRestoreBrandMutation,
} from "../../store/api/brandApi";
import { showToast } from "../../store/slices/toastSlice";
import EntityManageSection from "../../components/category-brand/EntityManageSection";
import EntityModal from "../../components/category-brand/EntityModal";
import ConfirmDeleteModal from "../../components/category-brand/ConfirmDeleteModal";

const CategoryBrandManage = () => {
  const dispatch = useDispatch();

  // Queries: Active items
  const {
    data: categories = [],
    isLoading: isLoadingCats,
    isError: isErrorCats,
  } = useGetCategoryQuery();

  const {
    data: brands = [],
    isLoading: isLoadingBrands,
    isError: isErrorBrands,
  } = useGetBrandsQuery();

  // Queries: Trashed items (soft-deleted)
  const { data: trashedCategories = [] } = useGetTrashedCategoriesQuery();
  const { data: trashedBrands = [] } = useGetTrashedBrandsQuery();

  // Mutations for Category
  const [createCategory, { isLoading: isCreatingCat }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingCat }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeletingCat }] =
    useDeleteCategoryMutation();
  const [restoreCategory, { isLoading: isRestoringCat }] =
    useRestoreCategoryMutation();

  // Mutations for Brand
  const [createBrand, { isLoading: isCreatingBrand }] =
    useCreateBrandMutation();
  const [updateBrand, { isLoading: isUpdatingBrand }] =
    useUpdateBrandMutation();
  const [deleteBrand, { isLoading: isDeletingBrand }] =
    useDeleteBrandMutation();
  const [restoreBrand, { isLoading: isRestoringBrand }] =
    useRestoreBrandMutation();

  // Modal states
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "category", 
    mode: "create", 
    item: null,
  });

  const [deleteState, setDeleteState] = useState({
    isOpen: false,
    type: "category", // 'category' | 'brand'
    item: null,
  });

  const totalCategoryProducts = categories.reduce(
    (sum, c) => sum + (c.products_count || 0),
    0
  );
  const totalBrandProducts = brands.reduce(
    (sum, b) => sum + (b.products_count || 0),
    0
  );

  // Handlers for Add/Edit Modal
  const handleOpenAdd = (type) => {
    setModalState({
      isOpen: true,
      type,
      mode: "create",
      item: null,
    });
  };

  const handleOpenEdit = (type, item) => {
    setModalState({
      isOpen: true,
      type,
      mode: "edit",
      item,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      type: "category",
      mode: "create",
      item: null,
    });
  };

  const handleSaveModal = async (name) => {
    try {
      const { type, mode, item } = modalState;

      if (type === "category") {
        if (mode === "create") {
          const res = await createCategory({ name }).unwrap();
          dispatch(
            showToast({
              message: res?.message || "Thêm danh mục thành công!",
              type: "success",
            })
          );
        } else {
          const res = await updateCategory({ id: item.id, name }).unwrap();
          dispatch(
            showToast({
              message: res?.message || "Cập nhật danh mục thành công!",
              type: "success",
            })
          );
        }
      } else {
        // type === 'brand'
        if (mode === "create") {
          const res = await createBrand({ name }).unwrap();
          dispatch(
            showToast({
              message: res?.message || "Thêm thương hiệu thành công!",
              type: "success",
            })
          );
        } else {
          const res = await updateBrand({ id: item.id, name }).unwrap();
          dispatch(
            showToast({
              message: res?.message || "Cập nhật thương hiệu thành công!",
              type: "success",
            })
          );
        }
      }

      handleCloseModal();
    } catch (error) {
      console.error(error);
      const serverMessage =
        error?.data?.message ||
        (error?.data?.errors?.name && error.data.errors.name[0]) ||
        "Đã có lỗi xảy ra khi lưu dữ liệu!";
      dispatch(
        showToast({
          message: serverMessage,
          type: "error",
        })
      );
    }
  };

  // Handlers for Delete Modal
  const handleOpenDelete = (type, item) => {
    setDeleteState({
      isOpen: true,
      type,
      item,
    });
  };

  const handleCloseDelete = () => {
    setDeleteState({
      isOpen: false,
      type: "category",
      item: null,
    });
  };

  const handleConfirmDelete = async () => {
    const { type, item } = deleteState;
    if (!item) return;

    try {
      if (type === "category") {
        const res = await deleteCategory(item.id).unwrap();
        dispatch(
          showToast({
            message: res?.message || "Xóa mềm danh mục thành công!",
            type: "success",
          })
        );
      } else {
        const res = await deleteBrand(item.id).unwrap();
        dispatch(
          showToast({
            message: res?.message || "Xóa mềm thương hiệu thành công!",
            type: "success",
          })
        );
      }
      handleCloseDelete();
    } catch (error) {
      console.error(error);
      const serverMessage =
        error?.data?.message || "Không thể xóa mục này do còn sản phẩm liên kết!";
      dispatch(
        showToast({
          message: serverMessage,
          type: "error",
        })
      );
    }
  };

  const handleRestore = async (type, item) => {
    try {
      if (type === "category") {
        const res = await restoreCategory(item.id).unwrap();
        dispatch(
          showToast({
            message: res?.message || `Đã bỏ xóa mềm và khôi phục "${item.name}"!`,
            type: "success",
          })
        );
      } else {
        const res = await restoreBrand(item.id).unwrap();
        dispatch(
          showToast({
            message: res?.message || `Đã bỏ xóa mềm và khôi phục "${item.name}"!`,
            type: "success",
          })
        );
      }
    } catch (error) {
      console.error(error);
      const serverMessage =
        error?.data?.message || "Khôi phục mục thất bại. Vui lòng thử lại!";
      dispatch(
        showToast({
          message: serverMessage,
          type: "error",
        })
      );
    }
  };

  const isModalLoading =
    isCreatingCat || isUpdatingCat || isCreatingBrand || isUpdatingBrand;
  const isDeleteLoading = isDeletingCat || isDeletingBrand;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Layers size={20} />
              </span>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                Quản lý Danh mục & Thương hiệu
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Phân hệ thiết lập thuộc tính phân loại sản phẩm dành cho Nhân viên
              kho và Quản trị viên (hỗ trợ xóa mềm và khôi phục)
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                Tổng danh mục
              </span>
              <span className="text-sm font-bold text-slate-800">
                {categories.length}{" "}
                {trashedCategories.length > 0 && (
                  <span className="text-[11px] text-amber-600 font-normal">
                    (+{trashedCategories.length} đã xóa mềm)
                  </span>
                )}
              </span>
            </div>

            <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                Tổng thương hiệu
              </span>
              <span className="text-sm font-bold text-slate-800">
                {brands.length}{" "}
                {trashedBrands.length > 0 && (
                  <span className="text-[11px] text-amber-600 font-normal">
                    (+{trashedBrands.length} đã xóa mềm)
                  </span>
                )}
              </span>
            </div>

            <div className="px-3.5 py-2 bg-emerald-50/70 border border-emerald-200/80 rounded-lg text-xs">
              <span className="text-emerald-700 block text-[10px] uppercase font-semibold">
                Sản phẩm đã gán
              </span>
              <span className="text-sm font-bold text-emerald-800">
                {Math.max(totalCategoryProducts, totalBrandProducts)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <EntityManageSection
          title="Danh mục sản phẩm"
          entityName="danh mục"
          description="Phân nhóm thiết bị (Điện thoại, Tablet, Laptop, Phụ kiện...)"
          items={categories}
          trashedItems={trashedCategories}
          isLoading={isLoadingCats}
          isError={isErrorCats}
          onAdd={() => handleOpenAdd("category")}
          onEdit={(item) => handleOpenEdit("category", item)}
          onDelete={(item) => handleOpenDelete("category", item)}
          onRestore={(item) => handleRestore("category", item)}
          isRestoring={isRestoringCat}
          icon={FolderTree}
          badgeBg="bg-blue-50 text-blue-700 border-blue-200"
        />

        <EntityManageSection
          title="Thương hiệu sản phẩm"
          entityName="thương hiệu"
          description="Hãng công nghệ sản xuất (Apple, Samsung, Xiaomi, OPPO...)"
          items={brands}
          trashedItems={trashedBrands}
          isLoading={isLoadingBrands}
          isError={isErrorBrands}
          onAdd={() => handleOpenAdd("brand")}
          onEdit={(item) => handleOpenEdit("brand", item)}
          onDelete={(item) => handleOpenDelete("brand", item)}
          onRestore={(item) => handleRestore("brand", item)}
          isRestoring={isRestoringBrand}
          icon={Tag}
          badgeBg="bg-purple-50 text-purple-700 border-purple-200"
        />
      </div>

      <EntityModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveModal}
        title={
          modalState.mode === "create"
            ? `Thêm ${modalState.type === "category" ? "danh mục" : "thương hiệu"} mới`
            : `Chỉnh sửa ${modalState.type === "category" ? "danh mục" : "thương hiệu"}`
        }
        label={`Tên ${modalState.type === "category" ? "danh mục" : "thương hiệu"}`}
        placeholder={
          modalState.type === "category"
            ? "VD: Điện thoại thông minh, Phụ kiện..."
            : "VD: Apple, Samsung, Sony..."
        }
        initialValue={modalState.item?.name || ""}
        isLoading={isModalLoading}
      />

      <ConfirmDeleteModal
        isOpen={deleteState.isOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        entityName={deleteState.item?.name || ""}
        entityType={deleteState.type === "category" ? "danh mục" : "thương hiệu"}
        productsCount={deleteState.item?.products_count || 0}
        isLoading={isDeleteLoading}
      />
    </div>
  );
};

export default CategoryBrandManage;
