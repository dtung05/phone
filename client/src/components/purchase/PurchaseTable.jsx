import formatPrice, { readNumberToVietnameseWords } from "../../utils/price";

const PurchaseTable = ({ items , receipt }) => {
  const totalQuantity = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );
  const totalAmountNumber = Number(receipt.total_amount) || 0;
  const totalWords = readNumberToVietnameseWords(totalAmountNumber);
  return (
    <>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse border border-slate-800 text-xs">
          <thead>
            <tr className="bg-slate-100 print:bg-slate-100 text-slate-900 font-bold border-b border-slate-800 text-center">
              <th className="border border-slate-800 p-2 w-10">STT</th>
              <th className="border border-slate-800 p-2 text-left">
                Tên sản phẩm, nhãn hiệu & quy cách
              </th>
              <th className="border border-slate-800 p-2 w-20 text-center">
                Mã BT
              </th>
              <th className="border border-slate-800 p-2 w-14 text-center">
                ĐVT
              </th>
              <th className="border border-slate-800 p-2 w-16 text-center">
                Số lượng
              </th>
              <th className="border border-slate-800 p-2 w-28 text-right">
                Đơn giá vốn
              </th>
              <th className="border border-slate-800 p-2 w-32 text-right">
                Thành tiền
              </th>
              <th className="border border-slate-800 p-2 text-left w-24">
                Ghi chú
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => {
              const variant = item.product_variant;
              const product = variant?.product;
              const attrs = variant?.attributes;

              return (
                <tr key={item.id} className="border-b border-slate-800/60">
                  <td className="border border-slate-800 p-2 text-center font-mono">
                    {idx + 1}
                  </td>

                  <td className="border border-slate-800 p-2">
                    <div className="font-bold text-slate-900">
                      {product?.product_name ||
                        `Sản phẩm #${variant?.product_id}`}
                    </div>
                    {attrs && typeof attrs === "object" && (
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        {Object.entries(attrs)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" • ")}
                      </div>
                    )}
                  </td>

                  <td className="border border-slate-800 p-2 text-center font-mono text-[11px] text-slate-600">
                    #{item.product_variant_id}
                  </td>

                  <td className="border border-slate-800 p-2 text-center">
                    Chiếc
                  </td>

                  <td className="border border-slate-800 p-2 text-center font-bold font-mono">
                    {item.quantity}
                  </td>

                  <td className="border border-slate-800 p-2 text-right font-mono font-medium">
                    {formatPrice(item.unit_price)}
                  </td>

                  <td className="border border-slate-800 p-2 text-right font-mono font-bold text-slate-900">
                    {formatPrice(item.total_amount)}
                  </td>

                  <td className="border border-slate-800 p-2 text-[11px] text-slate-500 italic">
                    {item.note || "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-bold bg-slate-50 print:bg-slate-50">
              <td
                colSpan={4}
                className="border border-slate-800 p-2 text-center uppercase"
              >
                Tổng cộng
              </td>
              <td className="border border-slate-800 p-2 text-center font-mono text-sm">
                {totalQuantity}
              </td>
              <td className="border border-slate-800 p-2 text-right font-mono">
                -
              </td>
              <td className="border border-slate-800 p-2 text-right font-mono text-sm text-slate-900">
                {formatPrice(totalAmountNumber)}
              </td>
              <td className="border border-slate-800 p-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="text-xs text-slate-800 space-y-1 my-4">
        <p>
          - Tổng số tiền (viết bằng chữ):{" "}
          <strong className="italic text-slate-900">{totalWords}.</strong>
        </p>
        <p>
          - Số chứng từ gốc kèm theo: 01 hóa đơn VAT / Phiếu giao hàng đối tác.
        </p>
      </div>
    </>
  );
};

export default PurchaseTable;
