import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import {
  ArrowLeft,
  Plus,
  Building2,
  Calendar,
  Layers,
  CheckCircle2,
  Loader2,
  FileText,
  Clock,
  Info,
} from "lucide-react";
import { useCreatePurchaseReceiptMutation } from "../../../store/api/purchaseReceiptApi";
import { formatPrice } from "../../../utils/price";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/slices/toastSlice";
import SupplierFormCreate from "../../../components/staff/supplier/SupplierFormCreate";
import SupplierSelect from "../../../components/staff/supplier/SupplierSelect";
import ProductVariantSupplier from "../../../components/staff/supplier/ProductVariantSupplier";
import PurchaseItems from "../../../components/staff/purchase/PurchaseItems";
import EmptyState from "../../../components/common/feedback/EmptyState";

const PurchaseReceiptCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supplier_id: "",
      received_at: today,
      items: [],
    },
  });

  // Quản lý mảng động items
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const watchItems = useWatch({ control, name: "items" }) || [];
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [createReceipt, { isLoading: isSubmitting }] =
    useCreatePurchaseReceiptMutation();

  const onSubmit = async (data) => {
    if (!data.items || data.items.length === 0) {
      dispatch(
        showToast({
          message: "Vui lòng chọn ít nhất 1 biến thể sản phẩm để nhập kho!",
          type: "warning",
        }),
      );
      return;
    }
    const payload = {
      supplier_id: data.supplier_id || null,
      received_at: data.received_at,
      items: data.items.map((item) => ({
        product_variant_id: item.variant.id,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        note: item.note || "",
      })),
    };
    try {
      const res = await createReceipt(payload).unwrap();
      dispatch(
        showToast({
          message: res.message,
          type: "success",
        }),
      );
      const newId = res?.data?.receipt?.id;
      if (newId) {
        navigate(`/staff/purchase-receipts/${newId}`);
      } else {
        navigate("/staff/purchase-receipts");
      }
    } catch (err) {
      dispatch(
        showToast({
          message:
            err?.data?.message || "Đã xảy ra lỗi khi tạo phiếu nhập kho.",
          type: "error",
        }),
      );
    }
  };

  // Callback xử lý khi submit có lỗi validation
  const onError = (errors) => {
    if (errors.items) {
      const firstErrorIndex = errors.items.findIndex((item) => item);
      if (firstErrorIndex !== -1) {
        const itemError = errors.items[firstErrorIndex];
        const errorMsg =
          itemError?.quantity?.message ||
          itemError?.unit_price?.message ||
          `Vui lòng kiểm tra dữ liệu dòng #${firstErrorIndex + 1}`;
        dispatch(showToast({ message: errorMsg, type: "error" }));
        return;
      }
    }
    dispatch(
      showToast({
        message: "Vui lòng kiểm tra lại các thông tin nhập liệu!",
        type: "error",
      }),
    );
  };

  const totalQuantity = watchItems.reduce(
    (sum, item) => sum + (Number(item?.quantity) || 0),
    0,
  );
  const totalAmount = watchItems.reduce(
    (sum, item) =>
      sum + (Number(item?.quantity) || 0) * (Number(item?.unit_price) || 0),
    0,
  );

  return (
    <div className="space-y-5 pb-12">
      {/* 1. HEADER THANH ĐIỀU HƯỚNG TRANG */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/staff/purchase-receipts"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg border border-slate-200 shadow-2xs transition-colors shrink-0"
            title="Quay lại danh sách"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                Tạo phiếu nhập hàng
              </h1>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                Phiếu mới
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Nhập kho sản phẩm từ nhà cung cấp và tự động đồng bộ giá vốn bình quân
            </p>
          </div>
        </div>

        {/* Nút hành động nhanh trên header cho màn hình máy tính */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            to="/staff/purchase-receipts"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
          >
            Hủy bỏ
          </Link>
          <button
            type="button"
            onClick={handleSubmit(onSubmit, onError)}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#00A96E] hover:bg-[#008f5d] text-white rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <CheckCircle2 size={15} />
            )}
            <span>Lưu phiếu nhập</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="grid grid-cols-1 lg:grid-cols-15 gap-5 items-start">
          
          <div className="lg:col-span-11 space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Layers size={16} className="text-[#00A96E]" />
                  <h2 className="text-sm font-bold text-slate-800">
                    Chi tiết sản phẩm nhập
                  </h2>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                    {fields.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVariantModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00A96E] hover:bg-[#008f5d] text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  <Plus size={14} />
                  <span>Chọn sản phẩm nhập</span>
                </button>
              </div>

              {fields.length === 0 ? (
                <EmptyState
                  icon={Layers}
                  title="Chưa có sản phẩm nào trong phiếu nhập"
                  content='Bấm nút "Chọn sản phẩm nhập" để tìm kiếm và thêm các biến thể hàng hóa cần nhập kho.'
                />
              ) : (
                <PurchaseItems
                  fields={fields}
                  watchItems={watchItems}
                  register={register}
                  remove={remove}
                />
              )}
            </div>

            
          </div>

          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-4">
            
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Building2 size={16} className="text-[#00A96E]" />
                <span>Thông tin nhà cung cấp</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Nhà cung cấp
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsSupplierModalOpen(true)}
                      className="text-[11px] font-bold text-[#00A96E] hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Plus size={12} /> Thêm nhanh
                    </button>
                  </div>
                  <SupplierSelect
                    register={register}
                    name="supplier_id"
                    error={errors.supplier_id}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Ngày nhập kho <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="date"
                      {...register("received_at", {
                        required: "Vui lòng chọn ngày nhập hàng",
                      })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-slate-600 transition-all cursor-pointer"
                    />
                  </div>
                  {errors.received_at && (
                    <span className="text-[11px] text-red-500 mt-1 block">
                      {errors.received_at.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText size={16} className="text-[#00A96E]" />
                <span>Tổng kết phiếu nhập</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Số loại mặt hàng:</span>
                  <span className="font-bold text-slate-800">{fields.length} mặt hàng</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Tổng số lượng nhập:</span>
                  <span className="font-bold text-slate-800">{totalQuantity} chiếc</span>
                </div>

                <div className="border-t border-dashed border-slate-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Tổng tiền hàng:</span>
                    <span className="text-lg font-black text-[#00A96E] font-mono">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-slate-600 pt-1">
                  <span className="font-semibold text-slate-700">Cần trả nhà cung cấp:</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#00A96E] hover:bg-[#008f5d] active:scale-[0.99] text-white rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}
                  <span>Hoàn tất & Lưu phiếu</span>
                </button>

                <Link
                  to="/staff/purchase-receipts"
                  className="w-full inline-flex items-center justify-center py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                >
                  Hủy thao tác
                </Link>
              </div>
            </div>

          </div>

        </div>
      </form>

      {isVariantModalOpen && (
        <ProductVariantSupplier
          append={append}
          setIsVariantModalOpen={setIsVariantModalOpen}
          watchItems={watchItems}
        />
      )}
      {isSupplierModalOpen && (
        <SupplierFormCreate
          setIsSupplierModalOpen={setIsSupplierModalOpen}
          setSupplierId={(id) => setValue("supplier_id", id)}
        />
      )}
    </div>
  );
};

export default PurchaseReceiptCreate;
