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
} from "lucide-react";
import { useCreatePurchaseReceiptMutation } from "../../store/api/purchaseReceiptApi";
import { formatPrice } from "../../utils/price";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/toastSlice";
import SupplierFormCreate from "../../components/supplier/SupplierFormCreate";
import SupplierSelect from "../../components/supplier/SupplierSelect";
import ProductVariantSupplier from "../../components/supplier/ProductVariantSupplier";
import PurchaseItems from "../../components/purchase/PurchaseItems";
import EmptyState from "../../components/block/message/EmptyState";

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
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/staff/purchase-receipts"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg border border-slate-200 shadow-2xs transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Lập Phiếu Nhập Kho Mới
            </h1>
            <p className="text-xs text-slate-500">
              Nhập hàng từ đối tác phân phối và tự động cập nhật giá vốn bình
              quân
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 size={16} className="text-emerald-600" />
            <span>1. Thông tin đợt nhập hàng</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Nhà cung cấp
                </label>
                <button
                  type="button"
                  onClick={() => setIsSupplierModalOpen(true)}
                  className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <Plus size={12} /> Thêm nhanh NCC
                </button>
              </div>
              <SupplierSelect
                register={register}
                name="supplier_id"
                error={errors.supplier_id}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ngày nhập hàng <span className="text-red-500">*</span>
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
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 outline-none focus:bg-white focus:border-slate-600"
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Layers size={16} className="text-emerald-600" />
                <span>2. Danh sách biến thể sản phẩm nhập</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsVariantModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <Plus size={14} />
              <span>Thêm sản phẩm nhập</span>
            </button>
          </div>
          {fields.length === 0 ? (
            <EmptyState
              icon={Layers}
              title="Chưa có mặt hàng nào trong phiếu nhập"
              content='Bấm nút "Thêm sản phẩm nhập" ở trên để chọn các biến thể thiết bị cần nhập kho.'
            />
          ) : (
            <PurchaseItems
              fields={fields}
              watchItems={watchItems}
              register={register}
            />
          )}
        </div>

        {/* tổng tiền sản phẩm */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                TỔNG MẶT HÀNG
              </p>
              <p className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
                {fields.length} biến thể{" "}
                <span className="font-semibold text-slate-500">
                  ({totalQuantity} chiếc)
                </span>
              </p>
            </div>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                TỔNG GIÁ TRỊ PHIẾU NHẬP
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tracking-tight mt-0.5">
                {formatPrice(totalAmount)}
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00A96E] hover:bg-[#008f5d] text-white rounded-lg text-sm font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <CheckCircle2 size={18} />
            )}
            <span>Hoàn tất & Lưu phiếu nhập kho</span>
          </button>
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
