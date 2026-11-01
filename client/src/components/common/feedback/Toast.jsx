import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../../store/slices/toastSlice";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

const typeConfig = {
  success: {
    title: "Thành công",
    icon: CheckCircle2,
    iconWrapper: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20",
    shadow: "shadow-emerald-500/10",
  },
  error: {
    title: "Đã xảy ra lỗi",
    icon: AlertCircle,
    iconWrapper: "bg-rose-50 text-rose-600 ring-1 ring-rose-500/20",
    shadow: "shadow-rose-500/10",
  },
  warning: {
    title: "Cảnh báo",
    icon: AlertTriangle,
    iconWrapper: "bg-amber-50 text-amber-600 ring-1 ring-amber-500/20",
    shadow: "shadow-amber-500/10",
  },
  info: {
    title: "Thông báo",
    icon: Info,
    iconWrapper: "bg-blue-50 text-blue-600 ring-1 ring-blue-500/20",
    shadow: "shadow-blue-500/10",
  },
};

const Toast = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.toast);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(hideToast());
    }, 200); // Đợi animation trượt ra kết thúc
  };

  useEffect(() => {
    if (!message) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [message]);

  if (!message && !isVisible) return null;

  const current = typeConfig[type] || typeConfig.info;
  const IconComponent = current.icon;

  return (
    <div className="fixed top-5 right-5 z-[9999] pointer-events-none flex flex-col items-end max-w-sm sm:max-w-md w-full px-4 sm:px-0">
      <div
        className={`pointer-events-auto w-full flex items-start gap-3.5 p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xl ${current.shadow} transition-all duration-300 ease-out transform ${
          isVisible
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-8 opacity-0 scale-95"
        }`}
      >
        {/* Icon Badge */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${current.iconWrapper}`}
        >
          <IconComponent className="w-5 h-5" strokeWidth={2.2} />
        </div>

        {/* Nội dung */}
        <div className="flex-1 min-w-0 pt-0.5">
          <h4 className="text-sm font-semibold text-slate-800 tracking-tight leading-snug">
            {current.title}
          </h4>
          <p className="mt-0.5 text-xs text-slate-600 leading-relaxed break-words font-normal">
            {message}
          </p>
        </div>

        {/* Nút đóng nhanh */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng"
          className="shrink-0 -mr-1 -mt-1 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
