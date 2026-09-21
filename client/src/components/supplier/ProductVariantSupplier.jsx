import { Layers, Loader2, Search, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/toastSlice";
import { useGetStaffVariantsQuery } from "../../store/api/purchaseReceiptApi";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../utils/image";
import { formatPrice } from "../../utils/price";

const ProductVariantSupplier = ({
  append,
  setIsVariantModalOpen,
  watchItems,
}) => {
  const dispatch = useDispatch();
  const [variantSearch, setVariantSearch] = useState("");
  const [debouncedVariantSearch, setDebouncedVariantSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVariantSearch(variantSearch);
    }, 600);
    return () => clearTimeout(timer);
  }, [variantSearch]);

  const { data: variants, isLoading: isVariantsLoading } =
    useGetStaffVariantsQuery({ search: debouncedVariantSearch });
  const handleAddVariant = (variant) => {
    const exists = watchItems.some((item) => item.variant?.id === variant.id);
    if (exists) {
      dispatch(
        showToast({
          message: "Biến thể này đã có trong danh sách nhập!",
          type: "warning",
        }),
      );
      return;
    }
    const calculatedUnitPrice = Number(variant.selling_price)
      ? Math.round(variant.selling_price * 0.75)
      : 0;
    append({
      variant,
      product_variant_id: variant.id,
      quantity: 1,
      unit_price: calculatedUnitPrice,
      note: "",
    });

    setIsVariantModalOpen(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Layers size={16} className="text-emerald-600" />
            <span>Chọn biến thể sản phẩm cần nhập</span>
          </h3>
          <button
            type="button"
            onClick={() => setIsVariantModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-3 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={variantSearch}
              onChange={(e) => setVariantSearch(e.target.value)}
              placeholder="Tìm kiếm theo tên sản phẩm..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-slate-600"
            />
          </div>
        </div>

        <div className="p-3 overflow-y-auto divide-y divide-slate-100 flex-1">
          {isVariantsLoading ? (
            <div className="py-12 flex items-center justify-center text-emerald-600">
              <Loader2 size={24} className="animate-spin" />
            </div>
          ) : !variants || variants.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Không tìm thấy biến thể nào phù hợp
            </div>
          ) : (
            variants.map((v) => {
              const p = v.product;
              const isAdded = watchItems.some(
                (item) => item.variant?.id === v.id,
              );

              return (
                <div
                  key={v.id}
                  className="py-2.5 px-2 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={getImageUrl(p?.thumbnail)}
                      alt={p?.product_name}
                      className="w-11 h-11 object-contain rounded-lg border border-slate-200 bg-white shrink-0 p-1"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/80x80?text=No+Img";
                      }}
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-900 truncate">
                        {p?.product_name || `Sản phẩm #${v.product_id}`}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {v.attributes &&
                          typeof v.attributes === "object" &&
                          Object.entries(v.attributes).map(([key, val]) => (
                            <span
                              key={key}
                              className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded text-slate-600 border border-slate-200/60"
                            >
                              {val}
                            </span>
                          ))}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                        <span>
                          Tồn kho: <strong>{v.stock_quantity}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Vốn hiện tại:{" "}
                          <strong>{formatPrice(v.average_cost)}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Giá bán lẻ:{" "}
                          <strong>{formatPrice(v.selling_price)}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isAdded}
                    onClick={() => handleAddVariant(v)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
                      isAdded
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
                    }`}
                  >
                    {isAdded ? "Đã chọn" : "+ Chọn nhập"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductVariantSupplier;
