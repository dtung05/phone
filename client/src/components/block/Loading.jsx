import { Loader2 } from "lucide-react";

export default function Loading({ text = "Đang tải..." }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
      <Loader2
        size={40}
        className="animate-spin text-emerald-600 mx-auto mb-2"
      />
      <p className="text-xs text-slate-500">{text}</p>
    </div>
  );
}
