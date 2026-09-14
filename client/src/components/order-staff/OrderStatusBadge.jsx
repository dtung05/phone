import React from "react";
import {
  Clock,
  CheckCircle2,
  Truck,
  CheckCheck,
  XCircle,
  CreditCard,
  AlertCircle,
} from "lucide-react";

export const ORDER_STATUS_CONFIG = {
  "Chờ xử lý": {
    label: "Chờ xử lý",
    color: "bg-amber-50 text-amber-700 border-amber-200/80",
    dot: "bg-amber-500",
    Icon: Clock,
  },
  "Đã xác nhận": {
    label: "Đã xác nhận",
    color: "bg-blue-50 text-blue-700 border-blue-200/80",
    dot: "bg-blue-500",
    Icon: CheckCircle2,
  },
  "Đang giao": {
    label: "Đang giao",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    dot: "bg-indigo-500",
    Icon: Truck,
  },
  "Thành công": {
    label: "Thành công",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dot: "bg-emerald-500",
    Icon: CheckCheck,
  },
  "Đã hủy": {
    label: "Đã hủy",
    color: "bg-rose-50 text-rose-700 border-rose-200/80",
    dot: "bg-rose-500",
    Icon: XCircle,
  },
};

export const PAYMENT_STATUS_CONFIG = {
  Paid: {
    label: "Đã thanh toán",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    Icon: CheckCircle2,
  },
  Unpaid: {
    label: "Chưa thanh toán",
    color: "bg-amber-50 text-amber-700 border-amber-200/80",
    Icon: AlertCircle,
  },
};

export const OrderStatusBadge = ({ status, className = "" }) => {
  const config = ORDER_STATUS_CONFIG[status] || {
    label: status || "Không xác định",
    color: "bg-slate-100 text-slate-700 border-slate-200",
    dot: "bg-slate-400",
    Icon: Clock,
  };
  const { Icon } = config;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
};

export const PaymentStatusBadge = ({ status, className = "" }) => {
  const config = PAYMENT_STATUS_CONFIG[status] || {
    label: status || "Chưa rõ",
    color: "bg-slate-100 text-slate-700 border-slate-200",
    Icon: CreditCard,
  };
  const { Icon } = config;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold border ${config.color} ${className}`}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
};

export const PaymentMethodBadge = ({ method, className = "" }) => {
  const isVnPay = method === "vn_pay";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
        isVnPay
          ? "bg-sky-50 text-sky-700 border border-sky-200/70"
          : "bg-slate-100 text-slate-700 border border-slate-200/70"
      } ${className}`}
    >
      <CreditCard className="w-3 h-3" />
      <span>{isVnPay ? "VNPAY" : "COD"}</span>
    </span>
  );
};

export default OrderStatusBadge;
