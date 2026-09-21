import PurchaseReceiptList from "../../pages/purchase-receipt/PurchaseReceiptList";
import PurchaseReceiptCreate from "../../pages/purchase-receipt/PurchaseReceiptCreate";
import PurchaseReceiptDetail from "../../pages/purchase-receipt/PurchaseReceiptDetail";

const purchaseReceipt = [
  {
    path: "purchase-receipts",
    Component: PurchaseReceiptList,
  },
  {
    path: "purchase-receipts/create",
    Component: PurchaseReceiptCreate,
  },
  {
    path: "purchase-receipts/:id",
    Component: PurchaseReceiptDetail,
  },
];

export default purchaseReceipt;
