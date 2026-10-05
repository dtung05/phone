import React from "react";
import { Search } from "lucide-react";

const NoResult = ({
  Icon,
  title = "Không tìm thấy kết quả",
  content = "Hãy thử kiểm tra lại lỗi chính tả hoặc tìm kiếm với từ khóa khác tổng quát hơn.",
  action,
}) => {
  return (
    <div className="my-8 flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/60 p-8 text-center animate-in fade-in duration-200">
      <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xs border border-slate-100 text-slate-400">
        {Icon ? (
          <Icon size={26} strokeWidth={1.5} />
        ) : (
          <Search size={26} strokeWidth={1.5} />
        )}
      </div>
      <h4 className="text-base font-semibold text-slate-800">{title}</h4>
      <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500">
        {content}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default NoResult;
