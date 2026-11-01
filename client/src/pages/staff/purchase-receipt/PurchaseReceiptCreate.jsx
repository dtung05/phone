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
  FileText,
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
import Button, { ButtonLink } from "../../../components/common/form/Button";

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
    <div className="space-y-5 pb-10">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/staff/purchase-receipts"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
            title="Quay lại danh sách"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                Lập phiếu nhập kho
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Phiếu mới
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ghi nhận lô hàng mới và tự động cập nhật giá vốn bình quân vào kho
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2.5">
          <ButtonLink to="/staff/purchase-receipts" variant="secondary" size="md">
            Hủy bỏ
          </ButtonLink>
          <Button
            type="button"
            onClick={handleSubmit(onSubmit, onError)}
            loading={isSubmitting}
            variant="primary"
            size="md"
            icon={CheckCircle2}
          >
            Lưu phiếu nhập
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Layers size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      Chi tiết sản phẩm nhập
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Đã chọn {fields.length} mặt hàng
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => setIsVariantModalOpen(true)}
                  variant="primary"
                  size="sm"
                  icon={Plus}
                >
                  Chọn sản phẩm nhập
                </Button>
              </div>

              {fields.length === 0 ? (
                <EmptyState
                  icon={Layers}
                  title="Chưa có mặt hàng nào trong phiếu nhập"
                  content='Bấm nút "Chọn sản phẩm nhập" ở trên để chọn các biến thể thiết bị cần nhập kho.'
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

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3 text-xs text-emerald-800">
              <Info size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Lưu ý quản lý kho:</span> Sau khi lưu phiếu, số lượng tồn kho của các biến thể sẽ được cộng dồn ngay lập tức và tính lại giá vốn bình quân gia quyền.
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-4">
            
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Building2 size={16} className="text-emerald-600" />
                <span>Thông tin nhà cung ứng</span>
              </h2>

              <div className="space-y-4">
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-emerald-600 transition-all cursor-pointer"
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

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText size={16} className="text-emerald-600" />
                <span>Tổng kết phiếu nhập</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Số loại sản phẩm:</span>
                  <span className="font-bold text-slate-800">{fields.length} mặt hàng</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Tổng số lượng nhập:</span>
                  <span className="font-bold text-slate-800">{totalQuantity} chiếc</span>
                </div>

                <div className="border-t border-dashed border-slate-200 pt-3 flex items-center justify-between">
                  <span className="font-bold text-slate-700">Tổng thanh toán:</span>
                  <span className="text-xl font-bold text-emerald-700 font-mono">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <Button
                  type="submit"
                  loading={isSubmitting}
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon={CheckCircle2}
                >
                  Hoàn tất & Lưu phiếu
                </Button>

                <ButtonLink
                  to="/staff/purchase-receipts"
                  variant="secondary"
                  size="md"
                  className="w-full"
                >
                  Hủy thao tác
                </ButtonLink>
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
